extends CharacterBody3D
## Jogador: terceira pessoa + combate (núcleo v8, calibração v1.1, regras de defesa D.1).
## Build de teste: espada longa, armadura média.

const Efeitos := preload("res://scripts/efeitos.gd")
const CAMINHO_GLB := "res://privado/personagens_ithappy.glb"

# ---------------------------------------------------------------- ficha
const FOR := 20.0
const DES := 20.0
const VIG := 15.0
const PER := 10.0
const CON := 10.0
const P_ARMA := 57.5          # calibração v1
const ARMADURA := 85.0        # armadura média
const PESO := 12.0            # armadura média 9 + espada 3

const VEL_CORRER := 5.0
const VEL_DISPARADA := 7.2
const GRAVIDADE := 18.0

# Espada longa (v1.1). Pesos do pesado: hipótese do protótipo (FOR .6 / DES .4).
const ATAQUES := {
	"leve": {"K": 0.62, "T": 0.68, "I": 10.0, "wF": 0.3, "wD": 0.7, "alcance": 2.4, "cone": 80.0, "ganho": 4.0, "impacto_em": 0.48},
	"pesado": {"K": 1.45, "T": 1.20, "I": 26.0, "wF": 0.6, "wD": 0.4, "alcance": 2.7, "cone": 90.0, "ganho": 8.0, "impacto_em": 0.52},
	"impeto": {"K": 2.20, "T": 1.00, "I": 40.0, "wF": 0.5, "wD": 0.5, "alcance": 3.3, "cone": 160.0, "ganho": 0.0, "impacto_em": 0.5},
}

# Roupa do personagem ithappy (o resto das peças fica escondido).
const ROUPA := ["Body_010", "Hairstyle_male_010", "Outerwear_029", "Pants_010", "Shoe_Sneakers_009", "Male_emotion_usual_001"]
const MAPA_ANIM := {
	"idle": "Idle_Breathing", "correr": "Run_Forward", "andar": "Walk_Forward",
	"golpe_leve": "Hit_Reaction_Light", "golpe_pesado": "Hit_Reaction_Heavy",
	"morte": "Death_Backward", "esquiva": "Jump_Start",
}

# ---------------------------------------------------------------- recursos
var vida_max: float
var vida: float
var res_max: float
var res: float
var postura_max: float
var postura: float
var impeto: float = 0.0
var custo_esquiva: float

# ---------------------------------------------------------------- estado
var estado: String = "livre"   # livre | ataque | esquiva | atordoado | golpeado | morto
var t_estado: float = 0.0
var dur_estado: float = 0.0
var tempo: float = 0.0
var atk_nome: String = ""
var atk: Dictionary = {}
var atk_resolvido: bool = false
var fila_leve: bool = false
var combo: int = 0
var t_esq_inicio: float = -10.0
var iframe_ate: float = -10.0
var dir_esquiva: Vector3 = Vector3.ZERO
var bloqueando: bool = false
var t_bloq_press: float = -10.0
var t_bloq_solto: float = -10.0
var parry_valido: bool = false
var t_ult_gasto: float = -10.0
var t_ult_impacto: float = -10.0
var alvo_travado = null

# ---------------------------------------------------------------- nós
var visual: Node3D
var modelo: Node3D
var anim: AnimationPlayer
var esqueleto: Skeleton3D
var nomes_anim: Dictionary = {}
var braco_reserva: Node3D
var cam_yaw: Node3D
var cam_pitch: Node3D
var braco_cam: SpringArm3D
var camera: Camera3D


static func r(x: float) -> float:
	return x / (x + 40.0)


func _ready() -> void:
	add_to_group("jogador")
	collision_layer = 2
	collision_mask = 1 | 4

	vida_max = 1000.0 * (1.0 + 0.9 * r(VIG))
	res_max = 100.0 * (1.0 + 0.6 * r(VIG))
	postura_max = 100.0 * (1.0 + 0.8 * r(VIG) + 0.4 * r(FOR))
	custo_esquiva = 20.0 * (1.0 + PESO / 40.0)
	vida = vida_max
	res = res_max
	postura = postura_max

	var col := CollisionShape3D.new()
	var cap := CapsuleShape3D.new()
	cap.radius = 0.35
	cap.height = 1.7
	col.shape = cap
	col.position = Vector3(0, 0.85, 0)
	add_child(col)

	_montar_camera()
	_montar_modelo()
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED


# ================================================================ câmera
func _montar_camera() -> void:
	cam_yaw = Node3D.new()
	cam_yaw.position = Vector3(0, 1.55, 0)
	add_child(cam_yaw)
	cam_pitch = Node3D.new()
	cam_pitch.rotation_degrees = Vector3(-15, 0, 0)
	cam_yaw.add_child(cam_pitch)
	braco_cam = SpringArm3D.new()
	braco_cam.spring_length = 4.5
	braco_cam.collision_mask = 1
	braco_cam.margin = 0.2
	braco_cam.position = Vector3(0.45, 0, 0)
	braco_cam.add_excluded_object(get_rid())
	cam_pitch.add_child(braco_cam)
	camera = Camera3D.new()
	camera.fov = 70.0
	braco_cam.add_child(camera)
	camera.current = true


func _unhandled_input(evento: InputEvent) -> void:
	var capturado := Input.mouse_mode == Input.MOUSE_MODE_CAPTURED
	if evento is InputEventMouseMotion:
		if capturado:
			var mm := evento as InputEventMouseMotion
			cam_yaw.rotation.y -= mm.relative.x * 0.0035
			cam_pitch.rotation.x = clampf(cam_pitch.rotation.x - mm.relative.y * 0.0035, deg_to_rad(-65), deg_to_rad(35))
		return
	if evento is InputEventMouseButton:
		var mb := evento as InputEventMouseButton
		if not mb.pressed:
			return
		if not capturado:
			Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
			get_viewport().set_input_as_handled()
		elif mb.button_index == MOUSE_BUTTON_WHEEL_UP:
			braco_cam.spring_length = maxf(1.5, braco_cam.spring_length - 0.4)
		elif mb.button_index == MOUSE_BUTTON_WHEEL_DOWN:
			braco_cam.spring_length = minf(9.0, braco_cam.spring_length + 0.4)
		return
	if evento.is_action_pressed("liberar_mouse"):
		Input.mouse_mode = Input.MOUSE_MODE_VISIBLE


# ================================================================ modelo
func _montar_modelo() -> void:
	visual = Node3D.new()
	add_child(visual)
	if ResourceLoader.exists(CAMINHO_GLB):
		var cena = load(CAMINHO_GLB)
		if cena is PackedScene:
			modelo = cena.instantiate() as Node3D
	if modelo == null:
		_modelo_reserva()
		return
	visual.add_child(modelo)
	var players := modelo.find_children("*", "AnimationPlayer", true, false)
	if players.size() > 0:
		anim = players[0] as AnimationPlayer
	var esqs := modelo.find_children("*", "Skeleton3D", true, false)
	if modelo is Skeleton3D:
		esqueleto = modelo as Skeleton3D
	elif esqs.size() > 0:
		esqueleto = esqs[0] as Skeleton3D
	_vestir()
	if anim != null:
		_mapear_anims()
		if esqueleto != null:
			_criar_anims_combate()
		_tocar("idle")
	if esqueleto != null:
		_anexar_espada()


func _modelo_reserva() -> void:
	# Sem o GLB: boneco de cápsula para o jogo continuar funcionando.
	var corpo := MeshInstance3D.new()
	var cap := CapsuleMesh.new()
	cap.radius = 0.35
	cap.height = 1.6
	corpo.mesh = cap
	corpo.material_override = Efeitos.material(Color(0.3, 0.55, 0.95))
	corpo.position = Vector3(0, 0.8, 0)
	visual.add_child(corpo)
	Efeitos.caixa(visual, Vector3(0.3, 0.12, 0.12), Vector3(0, 1.35, 0.3), Efeitos.material(Color(0.1, 0.1, 0.1)))
	braco_reserva = Node3D.new()
	braco_reserva.position = Vector3(-0.4, 1.2, 0)
	visual.add_child(braco_reserva)
	Efeitos.caixa(braco_reserva, Vector3(0.08, 0.08, 1.1), Vector3(0, 0, 0.6), Efeitos.material(Color(0.85, 0.88, 0.95), 0.2))


func _vestir() -> void:
	var malhas := modelo.find_children("*", "MeshInstance3D", true, false)
	var mostradas := 0
	for m in malhas:
		var mi := m as MeshInstance3D
		var manter := false
		for nome in ROUPA:
			if String(mi.name).begins_with(nome):
				manter = true
		mi.visible = manter
		if manter:
			mostradas += 1
	if mostradas < 2:
		for m in malhas:
			(m as MeshInstance3D).visible = true


func _mapear_anims() -> void:
	var lista := anim.get_animation_list()
	for logico in MAPA_ANIM:
		var alvo: String = MAPA_ANIM[logico]
		for n in lista:
			if String(n).ends_with(alvo):
				nomes_anim[logico] = String(n)
				break
	for l in ["idle", "correr", "andar"]:
		if nomes_anim.has(l):
			var a := anim.get_animation(nomes_anim[l])
			if a != null:
				a.loop_mode = Animation.LOOP_LINEAR


func _tocar(logico: String, mistura: float = 0.15, vel: float = 1.0) -> void:
	if anim == null or not nomes_anim.has(logico):
		return
	var nome: String = nomes_anim[logico]
	if anim.current_animation == nome and logico != "golpe_leve" and logico != "golpe_pesado" and not logico.begins_with("ataque"):
		anim.speed_scale = vel
		return
	anim.play(nome, mistura)
	anim.speed_scale = vel
	if logico.begins_with("ataque") or logico.begins_with("golpe") or logico == "morte":
		anim.seek(0.0, true)


# ---------------------------------------------------------------- animações de ataque procedurais
# O pacote ithappy não tem animações de ataque, então elas são geradas aqui:
# braço direito aponta para direções definidas no espaço do personagem (+Z frente, +Y cima, +X esquerda).
func _criar_anims_combate() -> void:
	var i_braco := esqueleto.find_bone("RightArm")
	var i_ante := esqueleto.find_bone("RightForeArm")
	var i_tronco := esqueleto.find_bone("Spine1")
	if i_braco < 0 or i_ante < 0:
		return
	var idle_nome: String = nomes_anim.get("idle", "")
	var idle: Animation = anim.get_animation(idle_nome) if idle_nome != "" else null

	var rel: Transform3D = visual.global_transform.affine_inverse() * esqueleto.global_transform
	var b_inv: Basis = rel.basis.orthonormalized().inverse()

	var lib := AnimationLibrary.new()
	# [nome, T, [dir preparação], [dir golpe], giro tronco prep, giro golpe, inclinação prep, inclinação golpe]
	var defs := [
		["ataque_leve1", 0.68, Vector3(-0.85, 0.45, -0.25), Vector3(0.55, 0.1, 0.83), -30.0, 35.0, 0.0, 8.0],
		["ataque_leve2", 0.68, Vector3(0.6, 0.55, 0.45), Vector3(-0.75, 0.0, 0.66), 30.0, -35.0, 0.0, 8.0],
		["ataque_leve3", 0.68, Vector3(-0.35, 0.15, -0.7), Vector3(0.0, 0.15, 1.0), -20.0, 12.0, -5.0, 15.0],
		["ataque_pesado", 1.20, Vector3(-0.2, 1.0, -0.3), Vector3(0.0, -0.4, 0.92), -10.0, 5.0, -15.0, 28.0],
		["ataque_impeto", 1.00, Vector3(-0.9, 0.3, -0.45), Vector3(0.9, 0.2, 0.4), -60.0, 75.0, 0.0, 10.0],
		["bloqueio", 0.5, Vector3(0.35, 0.45, 0.83), Vector3(0.35, 0.45, 0.83), 15.0, 15.0, 0.0, 0.0],
	]
	for d in defs:
		var a := _anim_golpe(idle, i_braco, i_ante, i_tronco, b_inv, d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[0] == "bloqueio")
		lib.add_animation(StringName(d[0]), a)
	anim.add_animation_library("combate", lib)
	for d in defs:
		nomes_anim[d[0]] = "combate/" + String(d[0])


func _caminho_osso(idle: Animation, osso: String) -> NodePath:
	if idle != null:
		for t in idle.get_track_count():
			var p := String(idle.track_get_path(t))
			if p.ends_with(":" + osso):
				return NodePath(p)
	var raiz: Node = anim.get_node(anim.root_node)
	return NodePath(String(raiz.get_path_to(esqueleto)) + ":" + osso)


func _rot_idle(idle: Animation, osso: int) -> Quaternion:
	var padrao := esqueleto.get_bone_rest(osso).basis.get_rotation_quaternion()
	if idle == null:
		return padrao
	var t := idle.find_track(_caminho_osso(idle, esqueleto.get_bone_name(osso)), Animation.TYPE_ROTATION_3D)
	if t < 0:
		return padrao
	return idle.rotation_track_interpolate(t, 0.0)


func _rot_global_rest(osso: int) -> Quaternion:
	if osso < 0:
		return Quaternion.IDENTITY
	return esqueleto.get_bone_global_rest(osso).basis.get_rotation_quaternion()


func _local_com_mundo(osso: int, w: Quaternion, base_local: Quaternion) -> Quaternion:
	# global_novo = W * P * L  =>  L' = P^-1 * W * P * L
	var p := _rot_global_rest(esqueleto.get_bone_parent(osso))
	return (p.inverse() * w * p * base_local).normalized()


func _anim_golpe(idle: Animation, i_braco: int, i_ante: int, i_tronco: int, b_inv: Basis, dur: float,
		d_prep: Vector3, d_golpe: Vector3, giro_prep: float, giro_golpe: float,
		incl_prep: float, incl_golpe: float, parado: bool) -> Animation:
	var a := Animation.new()
	a.length = dur
	if parado:
		a.loop_mode = Animation.LOOP_LINEAR
	var modificados := [esqueleto.get_bone_name(i_braco), esqueleto.get_bone_name(i_ante)]
	if i_tronco >= 0:
		modificados.append(esqueleto.get_bone_name(i_tronco))

	# Pose base parada (primeiro quadro do idle) em todos os outros ossos, para as pernas não congelarem no meio da corrida.
	if idle != null:
		for t in idle.get_track_count():
			var tipo := idle.track_get_type(t)
			var caminho := idle.track_get_path(t)
			var osso_nome := String(caminho).get_slice(":", 1)
			if osso_nome in modificados:
				continue
			if tipo == Animation.TYPE_ROTATION_3D:
				var nt := a.add_track(Animation.TYPE_ROTATION_3D)
				a.track_set_path(nt, caminho)
				a.rotation_track_insert_key(nt, 0.0, idle.rotation_track_interpolate(t, 0.0))
			elif tipo == Animation.TYPE_POSITION_3D:
				var np := a.add_track(Animation.TYPE_POSITION_3D)
				a.track_set_path(np, caminho)
				a.position_track_insert_key(np, 0.0, idle.position_track_interpolate(t, 0.0))

	# Braço
	var pos_braco := esqueleto.get_bone_global_rest(i_braco).origin
	var pos_ante := esqueleto.get_bone_global_rest(i_ante).origin
	var d_rest := (pos_ante - pos_braco).normalized()
	var rest_braco := esqueleto.get_bone_rest(i_braco).basis.get_rotation_quaternion()
	var rest_ante := esqueleto.get_bone_rest(i_ante).basis.get_rotation_quaternion()
	var q_idle_braco := _rot_idle(idle, i_braco)
	var q_idle_ante := _rot_idle(idle, i_ante)
	var q_prep := _local_com_mundo(i_braco, Quaternion(d_rest, (b_inv * d_prep).normalized()), rest_braco)
	var q_golpe := _local_com_mundo(i_braco, Quaternion(d_rest, (b_inv * d_golpe).normalized()), rest_braco)

	var tb := a.add_track(Animation.TYPE_ROTATION_3D)
	a.track_set_path(tb, _caminho_osso(idle, esqueleto.get_bone_name(i_braco)))
	var ta := a.add_track(Animation.TYPE_ROTATION_3D)
	a.track_set_path(ta, _caminho_osso(idle, esqueleto.get_bone_name(i_ante)))
	if parado:
		a.rotation_track_insert_key(tb, 0.0, q_golpe)
		a.rotation_track_insert_key(ta, 0.0, rest_ante)
	else:
		a.rotation_track_insert_key(tb, 0.0, q_idle_braco)
		a.rotation_track_insert_key(tb, dur * 0.30, q_prep)
		a.rotation_track_insert_key(tb, dur * 0.50, q_golpe)
		a.rotation_track_insert_key(tb, dur * 0.72, q_golpe)
		a.rotation_track_insert_key(tb, dur, q_idle_braco)
		a.rotation_track_insert_key(ta, 0.0, q_idle_ante)
		a.rotation_track_insert_key(ta, dur * 0.30, rest_ante)
		a.rotation_track_insert_key(ta, dur * 0.72, rest_ante)
		a.rotation_track_insert_key(ta, dur, q_idle_ante)

	# Tronco: giro em torno do eixo vertical do personagem + inclinação para frente.
	if i_tronco >= 0:
		var cima := (b_inv * Vector3.UP).normalized()
		var lado := (b_inv * Vector3.RIGHT).normalized()   # +X do personagem (lado esquerdo dele)
		var q_idle_tronco := _rot_idle(idle, i_tronco)
		var w_prep := Quaternion(cima, deg_to_rad(giro_prep)) * Quaternion(lado, deg_to_rad(incl_prep))
		var w_golpe := Quaternion(cima, deg_to_rad(giro_golpe)) * Quaternion(lado, deg_to_rad(incl_golpe))
		var tt := a.add_track(Animation.TYPE_ROTATION_3D)
		a.track_set_path(tt, _caminho_osso(idle, esqueleto.get_bone_name(i_tronco)))
		if parado:
			a.rotation_track_insert_key(tt, 0.0, _local_com_mundo(i_tronco, w_golpe, q_idle_tronco))
		else:
			a.rotation_track_insert_key(tt, 0.0, q_idle_tronco)
			a.rotation_track_insert_key(tt, dur * 0.30, _local_com_mundo(i_tronco, w_prep, q_idle_tronco))
			a.rotation_track_insert_key(tt, dur * 0.50, _local_com_mundo(i_tronco, w_golpe, q_idle_tronco))
			a.rotation_track_insert_key(tt, dur * 0.72, _local_com_mundo(i_tronco, w_golpe, q_idle_tronco))
			a.rotation_track_insert_key(tt, dur, q_idle_tronco)
	return a


func _anexar_espada() -> void:
	var i_mao := esqueleto.find_bone("RightHand")
	if i_mao < 0:
		return
	var g_mao := esqueleto.get_bone_global_rest(i_mao)
	var dedos := Vector3(-0.07, -0.07, 0.0)
	var polegar := Vector3(0, 0, 0.05)
	var i_meio := esqueleto.find_bone("RightHandMiddle1")
	var i_pol := esqueleto.find_bone("RightHandThumb1")
	if i_meio >= 0:
		dedos = esqueleto.get_bone_global_rest(i_meio).origin - g_mao.origin
	if i_pol >= 0:
		polegar = esqueleto.get_bone_global_rest(i_pol).origin - g_mao.origin
	# Direções no espaço local da mão.
	var inv := g_mao.basis.orthonormalized().inverse()
	var d_dedos := (inv * dedos).normalized()
	var d_lamina := (inv * polegar)
	d_lamina = (d_lamina - d_dedos * d_lamina.dot(d_dedos)).normalized()   # lâmina sai pelo lado do polegar (punho fechado)
	var lado := d_dedos.cross(d_lamina).normalized()

	var anexo := BoneAttachment3D.new()
	anexo.bone_name = "RightHand"
	esqueleto.add_child(anexo)
	var espada := Node3D.new()
	espada.transform = Transform3D(Basis(lado, d_lamina, d_dedos), d_dedos * dedos.length() * 0.75)
	anexo.add_child(espada)
	var aco := Efeitos.material(Color(0.88, 0.9, 0.96), 0.15)
	aco.metallic = 0.6
	Efeitos.caixa(espada, Vector3(0.06, 0.95, 0.02), Vector3(0, 0.6, 0), aco)                                   # lâmina
	Efeitos.caixa(espada, Vector3(0.26, 0.05, 0.06), Vector3(0, 0.1, 0), Efeitos.material(Color(0.95, 0.75, 0.25)))  # guarda
	Efeitos.caixa(espada, Vector3(0.05, 0.22, 0.05), Vector3(0, -0.03, 0), Efeitos.material(Color(0.4, 0.22, 0.12)))  # cabo


# ================================================================ laço principal
func _physics_process(delta: float) -> void:
	tempo += delta
	t_estado += delta
	_regenerar(delta)
	_atualizar_trava()

	if not is_on_floor():
		velocity.y -= GRAVIDADE * delta
	else:
		velocity.y = -0.5

	var entrada := Input.get_vector("esquerda", "direita", "frente", "tras")
	var base := cam_yaw.global_transform.basis
	var frente_cam := -base.z
	frente_cam.y = 0.0
	frente_cam = frente_cam.normalized()
	var direita_cam := base.x
	direita_cam.y = 0.0
	direita_cam = direita_cam.normalized()
	var dir := (direita_cam * entrada.x + frente_cam * -entrada.y)
	if dir.length() > 1.0:
		dir = dir.normalized()

	match estado:
		"morto":
			velocity.x = move_toward(velocity.x, 0.0, 20.0 * delta)
			velocity.z = move_toward(velocity.z, 0.0, 20.0 * delta)
		"atordoado", "golpeado":
			velocity.x = move_toward(velocity.x, 0.0, 15.0 * delta)
			velocity.z = move_toward(velocity.z, 0.0, 15.0 * delta)
			if t_estado >= dur_estado:
				_mudar("livre")
		"esquiva":
			var fator := clampf(1.0 - t_estado / 0.42, 0.0, 1.0)
			velocity.x = dir_esquiva.x * (4.0 + 8.0 * fator)
			velocity.z = dir_esquiva.z * (4.0 + 8.0 * fator)
			visual.rotation.x = 0.0
			if t_estado >= 0.42:
				_mudar("livre")
		"ataque":
			_processar_ataque(dir)
		_:
			_processar_livre(dir, delta)

	move_and_slide()
	_animar_reserva()


func _processar_livre(dir: Vector3, delta: float) -> void:
	bloqueando = Input.is_action_pressed("bloquear") and res > 0.0
	var vel := VEL_CORRER
	var disparada := Input.is_action_pressed("correr") and dir.length() > 0.1 and res > 1.0 and not bloqueando
	if disparada:
		vel = VEL_DISPARADA
		res = maxf(0.0, res - 8.0 * delta)
		t_ult_gasto = tempo
	if bloqueando:
		vel = 2.0
	velocity.x = dir.x * vel
	velocity.z = dir.z * vel

	if alvo_travado != null and (bloqueando or dir.length() < 0.1):
		_virar_para(alvo_travado.global_position, delta, 12.0)
	elif dir.length() > 0.1:
		_virar_dir(dir, delta, 12.0)

	if bloqueando:
		_tocar("bloqueio", 0.08)
	elif dir.length() > 0.1:
		_tocar("correr", 0.15, 1.35 if disparada else 1.0)
	else:
		_tocar("idle", 0.2)

	# Comandos
	if Input.is_action_just_pressed("esquiva"):
		_esquivar(dir)
	elif Input.is_action_just_pressed("ataque_leve"):
		_atacar("leve")
	elif Input.is_action_just_pressed("ataque_pesado"):
		_atacar("pesado")
	elif Input.is_action_just_pressed("impeto"):
		if impeto >= 50.0:
			impeto -= 50.0
			_atacar("impeto")
		else:
			_msg("Ímpeto insuficiente (precisa de 50)", Color(1, 0.7, 0.4))
	elif Input.is_action_just_pressed("travar"):
		_alternar_trava()


func _processar_ataque(dir: Vector3) -> void:
	var t: float = atk["T"]
	velocity.x = dir.x * 0.8
	velocity.z = dir.z * 0.8
	if Input.is_action_just_pressed("ataque_leve") and atk_nome == "leve":
		fila_leve = true
	if Input.is_action_just_pressed("esquiva") and t_estado > t * 0.55:
		_esquivar(dir)   # cancelar a recuperação com esquiva
		return
	if not atk_resolvido and t_estado >= t * float(atk["impacto_em"]):
		atk_resolvido = true
		_resolver_golpe()
	if t_estado >= t:
		if fila_leve:
			_atacar("leve")
		else:
			_mudar("livre")
	elif fila_leve and t_estado >= t * 0.8 and atk_nome == "leve":
		_atacar("leve")


func _mudar(novo: String, dur: float = 0.0) -> void:
	estado = novo
	t_estado = 0.0
	dur_estado = dur
	if novo != "livre":
		bloqueando = false


# ================================================================ ações
func _esquivar(dir: Vector3) -> void:
	if res < custo_esquiva:
		_msg("Sem resistência para esquivar", Color(1, 0.6, 0.4))
		return
	res -= custo_esquiva
	t_ult_gasto = tempo
	if dir.length() < 0.1:
		dir = -visual.global_transform.basis.z   # para trás
		dir.y = 0.0
	dir_esquiva = dir.normalized()
	t_esq_inicio = tempo
	iframe_ate = tempo + 0.30
	_mudar("esquiva")
	if dir_esquiva.dot(visual.global_transform.basis.z) >= 0.0:
		visual.rotation.y = atan2(dir_esquiva.x, dir_esquiva.z)
	_tocar("esquiva", 0.05, 1.8)
	var tw := create_tween()
	tw.tween_property(visual, "scale", Vector3(1.1, 0.75, 1.1), 0.1)
	tw.tween_property(visual, "scale", Vector3.ONE, 0.25)


func _atacar(nome: String) -> void:
	atk_nome = nome
	atk = ATAQUES[nome]
	atk_resolvido = false
	fila_leve = false
	_mudar("ataque")
	_mirar_automatico()
	var logico := "ataque_pesado"
	if nome == "leve":
		combo = combo % 3 + 1
		logico = "ataque_leve%d" % combo
	elif nome == "impeto":
		logico = "ataque_impeto"
	var a_dur: float = atk["T"]
	_tocar(logico, 0.06, 1.0)
	if anim != null and nomes_anim.has(logico):
		var a := anim.get_animation(nomes_anim[logico])
		if a != null:
			anim.speed_scale = a.length / a_dur


func _resolver_golpe() -> void:
	var frente := visual.global_transform.basis.z
	frente.y = 0.0
	frente = frente.normalized()
	var cor := Color(1, 1, 1, 0.8) if atk_nome == "leve" else Color(1, 0.8, 0.3, 0.85)
	Efeitos.corte(get_parent(), global_position, frente, cor, 2.0 if atk_nome == "leve" else 3.0)
	var base: float = P_ARMA * float(atk["K"]) * (1.0 + float(atk["wF"]) * r(FOR) + float(atk["wD"]) * r(DES))
	var impacto: float = float(atk["I"]) * (1.0 + 0.6 * r(FOR) + 0.4 * r(CON))
	var acertos := 0
	for e in get_tree().get_nodes_in_group("inimigos"):
		if not e.esta_vivo():
			continue
		var para: Vector3 = e.global_position - global_position
		para.y = 0.0
		var dist := para.length()
		if dist > float(atk["alcance"]) + float(e.raio):
			continue
		if dist > 0.3 and rad_to_deg(frente.angle_to(para.normalized())) > float(atk["cone"]) * 0.5:
			continue
		e.receber_ataque(base, impacto, global_position)
		acertos += 1
	if acertos > 0:
		_ganhar_impeto(float(atk["ganho"]) * acertos)


func _mirar_automatico() -> void:
	# Mira suave: vira para o alvo travado, ou para o inimigo mais próximo à frente.
	var alvo = alvo_travado
	if alvo == null:
		var frente := visual.global_transform.basis.z
		var melhor := 4.5
		for e in get_tree().get_nodes_in_group("inimigos"):
			if not e.esta_vivo():
				continue
			var para: Vector3 = e.global_position - global_position
			para.y = 0.0
			var d := para.length()
			if d < melhor and frente.angle_to(para) < deg_to_rad(70):
				melhor = d
				alvo = e
	if alvo != null:
		var p: Vector3 = alvo.global_position - global_position
		visual.rotation.y = atan2(p.x, p.z)


func _ganhar_impeto(v: float) -> void:
	impeto = minf(100.0, impeto + v)


# ================================================================ defesa (D.1)
## Chamado pelo inimigo no fim do aviso. Retorna: esquiva_perfeita | esquiva | aparado | bloqueado | acertou | nada
func receber_golpe(dano: float, impacto: float, origem: Vector3) -> String:
	if estado == "morto":
		return "nada"
	if tempo < iframe_ate:
		if tempo - t_esq_inicio <= 0.12:
			res = minf(res_max, res + custo_esquiva)   # devolve o custo
			_ganhar_impeto(20.0)
			_msg("ESQUIVA PERFEITA!  +20 Ímpeto", Color(0.5, 1, 1))
			Efeitos.anel(get_parent(), global_position, 1.0, Color(0.5, 1, 1, 0.8))
			_camera_lenta()
			return "esquiva_perfeita"
		_msg("Esquivou", Color(0.8, 0.95, 1))
		return "esquiva"

	var para_origem := origem - global_position
	para_origem.y = 0.0
	var de_frente := visual.global_transform.basis.z.angle_to(para_origem) < deg_to_rad(100)
	if bloqueando and estado == "livre" and de_frente:
		var janela := minf(180.0, 140.0 + 67.0 * r(PER)) / 1000.0
		if parry_valido and tempo - t_bloq_press <= janela:
			_ganhar_impeto(15.0)
			_msg("APARADO!", Color(1, 0.9, 0.3))
			Efeitos.anel(get_parent(), global_position + para_origem.normalized() * 0.8, 0.8, Color(1, 0.9, 0.3, 0.9))
			return "aparado"
		var custo := (0.08 * dano + 0.25 * impacto) / (1.0 + 0.6 * r(FOR) + 0.4 * r(VIG))
		t_ult_gasto = tempo
		if res >= custo:
			res -= custo
			var passou := dano * 0.30 * _mitigacao()
			_sofrer(passou, Color(1, 0.75, 0.5))
			_msg("Bloqueado (-%d resistência)" % int(round(custo)), Color(0.85, 0.85, 0.85))
			return "bloqueado"
		res = 0.0
		_msg("GUARDA QUEBRADA!", Color(1, 0.4, 0.3))
		_sofrer(dano * _mitigacao(), Color(1, 0.3, 0.3))
		if estado != "morto":
			_mudar("atordoado", 1.2)
			_tocar("golpe_pesado", 0.05)
		return "acertou"

	var mult := 1.3 if (estado == "atordoado" and dur_estado >= 2.0) else 1.0
	_sofrer(dano * _mitigacao() * mult, Color(1, 0.3, 0.3))
	if estado == "morto":
		return "acertou"
	postura -= impacto
	t_ult_impacto = tempo
	if postura <= 0.0:
		postura = 0.0
		_msg("POSTURA QUEBRADA!", Color(1, 0.4, 0.3))
		_mudar("atordoado", 2.0)
		_tocar("golpe_pesado", 0.05)
	elif estado != "ataque" or impacto >= 40.0:
		_mudar("golpeado", 0.45 if impacto < 40.0 else 0.7)
		_tocar("golpe_leve" if impacto < 40.0 else "golpe_pesado", 0.05)
	return "acertou"


func impacto_aparar() -> float:
	return 25.0 * (1.0 + 0.5 * r(FOR) + 0.5 * r(PER))


func _mitigacao() -> float:
	return 200.0 / (200.0 + ARMADURA)


func _sofrer(d: float, cor: Color) -> void:
	vida -= d
	Efeitos.numero(get_parent(), global_position + Vector3(0, 2.0, 0), str(int(round(d))), cor, 56)
	if vida <= 0.0:
		vida = 0.0
		_mudar("morto")
		_tocar("morte", 0.1)
		_msg("VOCÊ CAIU — renascendo em 3 s (ou R para reiniciar)", Color(1, 0.4, 0.4))
		get_tree().create_timer(3.0).timeout.connect(_renascer)


func _renascer() -> void:
	vida = vida_max
	res = res_max
	postura = postura_max
	global_position = Vector3(0, 0.2, 8)
	velocity = Vector3.ZERO
	_mudar("livre")
	_tocar("idle", 0.0)


func _camera_lenta() -> void:
	Engine.time_scale = 0.35
	get_tree().create_timer(0.35, true, false, true).timeout.connect(func() -> void: Engine.time_scale = 1.0)


func _regenerar(delta: float) -> void:
	# Bloqueio: controla a janela de aparar (só vale se o botão foi apertado de novo depois de 0,4 s solto).
	if Input.is_action_just_pressed("bloquear"):
		parry_valido = tempo - t_bloq_solto > 0.4 or t_bloq_solto < 0.0
		t_bloq_press = tempo
	if Input.is_action_just_released("bloquear"):
		t_bloq_solto = tempo
	if estado == "morto":
		return
	if tempo - t_ult_gasto > 0.8 and not bloqueando:
		res = minf(res_max, res + 18.0 * delta)
	if tempo - t_ult_impacto > 2.0:
		postura = minf(postura_max, postura + 12.0 * delta)


# ================================================================ trava de alvo
func _alternar_trava() -> void:
	if alvo_travado != null:
		alvo_travado = null
		return
	var melhor := 18.0
	for e in get_tree().get_nodes_in_group("inimigos"):
		if not e.esta_vivo():
			continue
		var d := global_position.distance_to(e.global_position)
		if d < melhor:
			melhor = d
			alvo_travado = e


func _atualizar_trava() -> void:
	if alvo_travado == null:
		return
	if not is_instance_valid(alvo_travado) or not alvo_travado.esta_vivo() or global_position.distance_to(alvo_travado.global_position) > 25.0:
		alvo_travado = null
		return
	var para: Vector3 = alvo_travado.global_position - global_position
	var yaw := atan2(-para.x, -para.z)
	cam_yaw.rotation.y = lerp_angle(cam_yaw.rotation.y, yaw, 0.12)


func _virar_dir(dir: Vector3, delta: float, vel: float) -> void:
	visual.rotation.y = lerp_angle(visual.rotation.y, atan2(dir.x, dir.z), minf(1.0, vel * delta))


func _virar_para(pos: Vector3, delta: float, vel: float) -> void:
	var p := pos - global_position
	_virar_dir(p, delta, vel)


# ================================================================ diversos
func _animar_reserva() -> void:
	if braco_reserva == null:
		return
	if estado == "ataque":
		var k := t_estado / float(atk["T"])
		braco_reserva.rotation.y = lerpf(deg_to_rad(80), deg_to_rad(-80), clampf((k - 0.3) / 0.25, 0.0, 1.0))
	elif bloqueando:
		braco_reserva.rotation.y = deg_to_rad(-40)
	else:
		braco_reserva.rotation.y = deg_to_rad(20)


func _msg(texto: String, cor: Color) -> void:
	var hud = get_tree().get_first_node_in_group("hud")
	if hud != null:
		hud.mostrar(texto, cor)
