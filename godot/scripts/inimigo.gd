extends CharacterBody3D
## Inimigos do Andar 1: lobo (fera), golem (constructo) e boneco de treino.
## Valores da calibração v1: fera 650 / constructo 1.100 de vida, armadura 50.

const Efeitos := preload("res://scripts/efeitos.gd")

const TIPOS := {
	"lobo": {"nome": "Lobo", "vida": 650.0, "armadura": 50.0, "dano": 80.0, "aviso": 0.55, "intervalo": 1.6,
		"impacto": 25.0, "vel": 4.4, "alcance": 1.9, "postura": 120.0, "raio": 0.6, "aggro": 12.0},
	"golem": {"nome": "Golem", "vida": 1100.0, "armadura": 50.0, "dano": 160.0, "aviso": 1.0, "intervalo": 3.0,
		"impacto": 50.0, "vel": 1.9, "alcance": 2.7, "postura": 260.0, "raio": 0.9, "aggro": 11.0},
	"boneco": {"nome": "Boneco de treino", "vida": 99999.0, "armadura": 50.0, "dano": 0.0, "aviso": 1.0, "intervalo": 99.0,
		"impacto": 0.0, "vel": 0.0, "alcance": 0.0, "postura": 300.0, "raio": 0.45, "aggro": 0.0},
}
const GRAVIDADE := 18.0

var tipo: String = "lobo"
var ponto_inicial: Vector3 = Vector3.ZERO

var dados: Dictionary
var raio: float = 0.6
var vida: float
var vida_max: float
var postura: float
var postura_max: float
var estado: String = "ocioso"   # ocioso | perseguir | aviso | recuperar | atordoado | voltar | morto
var t_estado: float = 0.0
var dur_estado: float = 0.0
var recarga: float = 1.0
var tempo: float = 0.0
var t_ult_impacto: float = -10.0
var imune_impacto_ate: float = -10.0
var quebrado: bool = false
var frente_travada: Vector3 = Vector3.FORWARD
var registro_dano: Array = []   # boneco: [tempo, dano]
var dano_total: float = 0.0

var visual: Node3D
var corpo_anim: Node3D
var pernas: Array = []
var bracos: Array = []
var materiais: Array = []
var placa: Label3D
var alerta: Label3D
var marca_aviso: MeshInstance3D
var mat_aviso: StandardMaterial3D


func _ready() -> void:
	add_to_group("inimigos")
	dados = TIPOS.get(tipo, TIPOS["lobo"])
	raio = dados["raio"]
	vida_max = dados["vida"]
	vida = vida_max
	postura_max = dados["postura"]
	postura = postura_max
	collision_layer = 4
	collision_mask = 1 | 2 | 4

	var col := CollisionShape3D.new()
	var forma := CapsuleShape3D.new()
	forma.radius = raio
	forma.height = 1.6 if tipo != "golem" else 2.8
	col.shape = forma
	col.position = Vector3(0, forma.height * 0.5, 0)
	if tipo == "lobo":
		forma.height = 1.4
		col.position = Vector3(0, 0.6, 0)
	add_child(col)

	visual = Node3D.new()
	add_child(visual)
	corpo_anim = Node3D.new()
	visual.add_child(corpo_anim)
	match tipo:
		"golem":
			_montar_golem()
		"boneco":
			_montar_boneco()
		_:
			_montar_lobo()

	placa = Label3D.new()
	placa.billboard = BaseMaterial3D.BILLBOARD_ENABLED
	placa.no_depth_test = true
	placa.font_size = 40
	placa.outline_size = 10
	placa.pixel_size = 0.005
	placa.position = Vector3(0, 2.3 if tipo != "golem" else 3.5, 0)
	add_child(placa)

	alerta = Label3D.new()
	alerta.text = "!"
	alerta.billboard = BaseMaterial3D.BILLBOARD_ENABLED
	alerta.no_depth_test = true
	alerta.font_size = 120
	alerta.outline_size = 16
	alerta.modulate = Color(1, 0.25, 0.2)
	alerta.pixel_size = 0.006
	alerta.position = placa.position + Vector3(0, 0.5, 0)
	alerta.visible = false
	add_child(alerta)

	# Marca vermelha no chão durante o aviso (área do golpe).
	marca_aviso = MeshInstance3D.new()
	var disco := CylinderMesh.new()
	var alc: float = dados["alcance"]
	disco.top_radius = alc * 0.75
	disco.bottom_radius = alc * 0.75
	disco.height = 0.02
	marca_aviso.mesh = disco
	mat_aviso = StandardMaterial3D.new()
	mat_aviso.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	mat_aviso.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_aviso.albedo_color = Color(1, 0.15, 0.1, 0.0)
	marca_aviso.material_override = mat_aviso
	marca_aviso.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	marca_aviso.position = Vector3(0, 0.05, alc * 0.6)
	marca_aviso.visible = false
	visual.add_child(marca_aviso)
	_atualizar_placa()


# ================================================================ visuais (estilo brinquedo)
func _mat(cor: Color, rug: float = 0.35) -> StandardMaterial3D:
	var m := Efeitos.material(cor, rug)
	materiais.append(m)
	return m


func _montar_lobo() -> void:
	var pelo := _mat(Color(0.55, 0.6, 0.7))
	var claro := _mat(Color(0.85, 0.87, 0.9))
	var olho := _mat(Color(1.0, 0.85, 0.2), 0.2)
	Efeitos.caixa(corpo_anim, Vector3(0.55, 0.5, 1.15), Vector3(0, 0.75, 0), pelo)
	Efeitos.caixa(corpo_anim, Vector3(0.45, 0.42, 0.45), Vector3(0, 1.0, 0.7), pelo)
	Efeitos.caixa(corpo_anim, Vector3(0.25, 0.2, 0.3), Vector3(0, 0.92, 1.02), claro)
	Efeitos.caixa(corpo_anim, Vector3(0.12, 0.2, 0.08), Vector3(0.14, 1.28, 0.62), pelo)
	Efeitos.caixa(corpo_anim, Vector3(0.12, 0.2, 0.08), Vector3(-0.14, 1.28, 0.62), pelo)
	Efeitos.caixa(corpo_anim, Vector3(0.08, 0.08, 0.04), Vector3(0.12, 1.06, 0.93), olho)
	Efeitos.caixa(corpo_anim, Vector3(0.08, 0.08, 0.04), Vector3(-0.12, 1.06, 0.93), olho)
	var cauda := Efeitos.caixa(corpo_anim, Vector3(0.15, 0.15, 0.5), Vector3(0, 0.9, -0.75), pelo)
	cauda.rotation_degrees = Vector3(30, 0, 0)
	for p in [Vector3(0.18, 0.5, 0.4), Vector3(-0.18, 0.5, 0.4), Vector3(0.18, 0.5, -0.4), Vector3(-0.18, 0.5, -0.4)]:
		var junta := Node3D.new()
		junta.position = p
		corpo_anim.add_child(junta)
		Efeitos.caixa(junta, Vector3(0.15, 0.5, 0.15), Vector3(0, -0.25, 0), claro)
		pernas.append(junta)


func _montar_golem() -> void:
	var pedra := _mat(Color(0.62, 0.52, 0.42), 0.8)
	var musgo := _mat(Color(0.45, 0.7, 0.4), 0.7)
	var nucleo := _mat(Color(0.3, 0.9, 1.0), 0.2)
	nucleo.emission_enabled = true
	nucleo.emission = Color(0.3, 0.9, 1.0)
	for x in [0.35, -0.35]:
		var junta := Node3D.new()
		junta.position = Vector3(x, 1.0, 0)
		corpo_anim.add_child(junta)
		Efeitos.caixa(junta, Vector3(0.45, 1.0, 0.5), Vector3(0, -0.5, 0), pedra)
		pernas.append(junta)
	Efeitos.caixa(corpo_anim, Vector3(1.4, 1.2, 0.85), Vector3(0, 1.65, 0), pedra)
	Efeitos.caixa(corpo_anim, Vector3(1.45, 0.25, 0.9), Vector3(0, 2.2, 0), musgo)
	Efeitos.caixa(corpo_anim, Vector3(0.3, 0.3, 0.1), Vector3(0, 1.7, 0.45), nucleo)
	Efeitos.caixa(corpo_anim, Vector3(0.6, 0.5, 0.55), Vector3(0, 2.55, 0.05), pedra)
	Efeitos.caixa(corpo_anim, Vector3(0.4, 0.08, 0.05), Vector3(0, 2.6, 0.33), nucleo)
	for x in [0.95, -0.95]:
		var ombro := Node3D.new()
		ombro.position = Vector3(x, 2.05, 0)
		corpo_anim.add_child(ombro)
		Efeitos.caixa(ombro, Vector3(0.45, 1.3, 0.5), Vector3(0, -0.6, 0), pedra)
		Efeitos.caixa(ombro, Vector3(0.6, 0.45, 0.6), Vector3(0, -1.35, 0), pedra)
		bracos.append(ombro)


func _montar_boneco() -> void:
	var madeira := _mat(Color(0.6, 0.42, 0.25), 0.8)
	var palha := _mat(Color(0.95, 0.82, 0.45), 0.9)
	var alvo := _mat(Color(0.95, 0.3, 0.3), 0.5)
	Efeitos.caixa(corpo_anim, Vector3(0.14, 1.0, 0.14), Vector3(0, 0.5, 0), madeira)
	var tronco := MeshInstance3D.new()
	var cil := CylinderMesh.new()
	cil.top_radius = 0.3
	cil.bottom_radius = 0.36
	cil.height = 0.8
	tronco.mesh = cil
	tronco.material_override = palha
	tronco.position = Vector3(0, 1.35, 0)
	corpo_anim.add_child(tronco)
	Efeitos.caixa(corpo_anim, Vector3(1.3, 0.12, 0.12), Vector3(0, 1.5, 0), madeira)
	var cabeca := MeshInstance3D.new()
	var esf := SphereMesh.new()
	esf.radius = 0.22
	esf.height = 0.44
	cabeca.mesh = esf
	cabeca.material_override = palha
	cabeca.position = Vector3(0, 1.98, 0)
	corpo_anim.add_child(cabeca)
	Efeitos.caixa(corpo_anim, Vector3(0.3, 0.3, 0.04), Vector3(0, 1.35, 0.34), alvo)


# ================================================================ comportamento
func _physics_process(delta: float) -> void:
	tempo += delta
	t_estado += delta
	recarga -= delta
	if not is_on_floor():
		velocity.y -= GRAVIDADE * delta
	else:
		velocity.y = -0.5

	if estado == "morto":
		velocity.x = 0.0
		velocity.z = 0.0
		move_and_slide()
		return

	if tempo - t_ult_impacto > 2.0:
		postura = minf(postura_max, postura + 20.0 * delta)

	var jogador = get_tree().get_first_node_in_group("jogador")
	var para := Vector3.ZERO
	var dist := 999.0
	var jogador_vivo := false
	if jogador != null:
		para = jogador.global_position - global_position
		para.y = 0.0
		dist = para.length()
		jogador_vivo = jogador.estado != "morto"

	var vel_alvo := Vector3.ZERO
	var vel: float = dados["vel"]
	match estado:
		"ocioso":
			if tipo != "boneco" and jogador_vivo and dist < float(dados["aggro"]):
				_mudar("perseguir")
		"perseguir":
			if not jogador_vivo or dist > float(dados["aggro"]) * 2.0:
				_mudar("voltar")
			else:
				_virar(para, delta, 8.0)
				if dist > float(dados["alcance"]) * 0.85:
					vel_alvo = para.normalized() * vel
				if dist <= float(dados["alcance"]) and recarga <= 0.0:
					_iniciar_aviso(para)
		"aviso":
			var prog := clampf(t_estado / float(dados["aviso"]), 0.0, 1.0)
			mat_aviso.albedo_color = Color(1, 0.15, 0.1, 0.15 + 0.45 * prog)
			_pose_aviso(prog)
			if t_estado >= float(dados["aviso"]):
				_executar_golpe(jogador)
		"recuperar":
			if t_estado >= dur_estado:
				_pose_neutra()
				_mudar("perseguir")
		"atordoado":
			corpo_anim.rotation.z = sin(tempo * 18.0) * 0.06
			if t_estado >= dur_estado:
				corpo_anim.rotation.z = 0.0
				quebrado = false
				_mudar("perseguir" if tipo != "boneco" else "ocioso")
		"voltar":
			var casa := ponto_inicial - global_position
			casa.y = 0.0
			if jogador_vivo and dist < float(dados["aggro"]) * 0.7:
				_mudar("perseguir")
			elif casa.length() > 0.5:
				_virar(casa, delta, 6.0)
				vel_alvo = casa.normalized() * vel
			else:
				vida = vida_max
				postura = postura_max
				_mudar("ocioso")

	velocity.x = move_toward(velocity.x, vel_alvo.x, 30.0 * delta)
	velocity.z = move_toward(velocity.z, vel_alvo.z, 30.0 * delta)
	move_and_slide()
	_animar_andar(delta)
	_atualizar_placa()


func _mudar(novo: String, dur: float = 0.0) -> void:
	if estado == "aviso" and novo != "aviso":
		marca_aviso.visible = false
		alerta.visible = false
	estado = novo
	t_estado = 0.0
	dur_estado = dur


func _virar(dir: Vector3, delta: float, vel: float) -> void:
	if dir.length() < 0.01:
		return
	visual.rotation.y = lerp_angle(visual.rotation.y, atan2(dir.x, dir.z), minf(1.0, vel * delta))


func _iniciar_aviso(para: Vector3) -> void:
	visual.rotation.y = atan2(para.x, para.z)
	frente_travada = para.normalized()
	_mudar("aviso")
	marca_aviso.visible = true
	alerta.visible = true


func _executar_golpe(jogador) -> void:
	marca_aviso.visible = false
	alerta.visible = false
	recarga = maxf(0.4, float(dados["intervalo"]) - float(dados["aviso"]))
	_pose_golpe()
	var resultado := "fora"
	if jogador != null:
		var para: Vector3 = jogador.global_position - global_position
		para.y = 0.0
		var dentro := para.length() <= float(dados["alcance"]) + 0.6
		var no_cone := para.length() < 0.5 or rad_to_deg(frente_travada.angle_to(para.normalized())) <= 60.0
		if dentro and no_cone:
			resultado = jogador.receber_golpe(float(dados["dano"]), float(dados["impacto"]), global_position)
	if resultado == "aparado":
		_sofrer_postura(jogador.impacto_aparar(), true)
		if estado != "atordoado":
			_mudar("atordoado", 0.9)
		return
	_mudar("recuperar", 0.45 if tipo == "lobo" else 0.8)


# ---------------------------------------------------------------- dano recebido
func esta_vivo() -> bool:
	return estado != "morto"


func receber_ataque(dano_base: float, impacto: float, origem: Vector3) -> float:
	if estado == "morto":
		return 0.0
	var m := 200.0 / (200.0 + float(dados["armadura"]))
	var mult := 1.0
	var para_atk := origem - global_position
	para_atk.y = 0.0
	var frente := visual.global_transform.basis.z
	var flanco := frente.dot(para_atk.normalized()) < -0.5 and tipo != "boneco"
	if flanco:
		mult *= 1.3
	if quebrado:
		mult *= 1.3
	var dano := dano_base * m * mult
	vida -= dano
	dano_total += dano
	registro_dano.append([tempo, dano])

	var cor := Color(1, 1, 1)
	if quebrado:
		cor = Color(1, 0.5, 1)
	elif flanco:
		cor = Color(1, 0.85, 0.3)
	var txt := str(int(round(dano)))
	if flanco:
		txt += " flanco"
	Efeitos.numero(get_parent(), global_position + Vector3(0, 2.0 if tipo != "golem" else 3.2, 0), txt, cor, 60)
	_piscar()
	_sofrer_postura(impacto, false)

	if tipo == "boneco" and vida < vida_max * 0.5:
		vida = vida_max
	if vida <= 0.0:
		_morrer()
	return dano


func _sofrer_postura(impacto: float, por_aparar: bool) -> void:
	t_ult_impacto = tempo
	if tempo < imune_impacto_ate and not por_aparar:
		return
	postura -= impacto
	if postura <= 0.0:
		postura = postura_max
		quebrado = true
		imune_impacto_ate = tempo + 2.0 + 8.0
		_mudar("atordoado", 2.0)
		_pose_neutra()
		Efeitos.numero(get_parent(), global_position + Vector3(0, 2.6, 0), "POSTURA QUEBRADA", Color(1, 0.5, 1), 44)


func _morrer() -> void:
	vida = 0.0
	_mudar("morto")
	collision_layer = 0
	var tw := create_tween()
	tw.tween_property(visual, "rotation:z", deg_to_rad(90), 0.4)
	tw.tween_property(visual, "position:y", -0.6, 1.5).set_delay(1.0)
	get_tree().create_timer(6.0).timeout.connect(_renascer)


func _renascer() -> void:
	global_position = ponto_inicial
	visual.rotation = Vector3.ZERO
	visual.position = Vector3.ZERO
	vida = vida_max
	postura = postura_max
	quebrado = false
	collision_layer = 4
	recarga = 1.0
	_pose_neutra()
	_mudar("ocioso")


func _piscar() -> void:
	for m in materiais:
		var mat := m as StandardMaterial3D
		mat.emission_enabled = true
		mat.emission = Color(1, 1, 1)
		mat.emission_energy_multiplier = 1.2
	get_tree().create_timer(0.08).timeout.connect(_parar_piscar)


func _parar_piscar() -> void:
	for m in materiais:
		var mat := m as StandardMaterial3D
		if tipo == "golem" and mat.albedo_color.b > 0.9:
			mat.emission = Color(0.3, 0.9, 1.0)
			mat.emission_energy_multiplier = 1.0
		else:
			mat.emission_enabled = false


# ---------------------------------------------------------------- poses
func _pose_aviso(prog: float) -> void:
	if tipo == "golem":
		for b in bracos:
			(b as Node3D).rotation.x = lerpf(0.0, deg_to_rad(-150), prog)
	elif tipo == "lobo":
		corpo_anim.position.z = lerpf(0.0, -0.25, prog)
		corpo_anim.rotation.x = lerpf(0.0, deg_to_rad(-12), prog)


func _pose_golpe() -> void:
	var tw := create_tween()
	if tipo == "golem":
		for b in bracos:
			tw.parallel().tween_property(b, "rotation:x", deg_to_rad(-20), 0.12)
	elif tipo == "lobo":
		tw.tween_property(corpo_anim, "position:z", 0.6, 0.1)
		tw.parallel().tween_property(corpo_anim, "rotation:x", deg_to_rad(8), 0.1)
		tw.tween_property(corpo_anim, "position:z", 0.0, 0.3)
		tw.parallel().tween_property(corpo_anim, "rotation:x", 0.0, 0.3)


func _pose_neutra() -> void:
	corpo_anim.position = Vector3.ZERO
	corpo_anim.rotation = Vector3.ZERO
	for b in bracos:
		(b as Node3D).rotation.x = 0.0


func _animar_andar(_delta: float) -> void:
	var v := Vector2(velocity.x, velocity.z).length()
	var fase := tempo * (10.0 if tipo == "lobo" else 5.0)
	for i in pernas.size():
		var p := pernas[i] as Node3D
		var lado := 1.0 if i % 2 == 0 else -1.0
		if tipo == "lobo" and i >= 2:
			lado = -lado
		p.rotation.x = sin(fase) * 0.6 * lado * clampf(v / 2.0, 0.0, 1.0)


func _atualizar_placa() -> void:
	var nome: String = dados["nome"]
	if tipo == "boneco":
		var agora := tempo
		var soma := 0.0
		var novos: Array = []
		for reg in registro_dano:
			if agora - float(reg[0]) <= 5.0:
				novos.append(reg)
				soma += float(reg[1])
		registro_dano = novos
		placa.text = "%s\nDPS (5 s): %d   Total: %d" % [nome, int(soma / 5.0), int(dano_total)]
		placa.modulate = Color(1, 1, 0.85)
		return
	if estado == "morto":
		placa.text = "%s — derrotado" % nome
		placa.modulate = Color(0.7, 0.7, 0.7)
		return
	placa.text = "%s\nVida %d / %d   Postura %d" % [nome, int(ceil(vida)), int(vida_max), int(postura)]
	placa.modulate = Color(1, 0.6, 1) if quebrado else Color(1, 1, 1)
