extends Node3D
## Andar 1 — arena de teste do combate (protótipo jogável no Godot 4).
## Monta tudo em código: controles, céu, luz, chão, jogador, inimigos e HUD.

const Efeitos := preload("res://scripts/efeitos.gd")
const JogadorScript := preload("res://scripts/jogador.gd")
const InimigoScript := preload("res://scripts/inimigo.gd")
const HudScript := preload("res://scripts/hud.gd")

var jogador


func _ready() -> void:
	Engine.time_scale = 1.0
	randomize()
	_criar_acoes()
	_criar_ambiente()
	_criar_arena()

	jogador = JogadorScript.new()
	jogador.name = "Jogador"
	jogador.position = Vector3(0, 0.2, 8)
	add_child(jogador)

	_inimigo("boneco", Vector3(-3.5, 0, 3))
	_inimigo("boneco", Vector3(3.5, 0, 3))
	_inimigo("lobo", Vector3(8, 0, -8))
	_inimigo("lobo", Vector3(11, 0, -5))
	_inimigo("golem", Vector3(-10, 0, -12))

	var hud = HudScript.new()
	hud.name = "HUD"
	add_child(hud)
	hud.jogador = jogador


func _unhandled_input(evento: InputEvent) -> void:
	if evento.is_action_pressed("reiniciar"):
		Engine.time_scale = 1.0
		get_tree().reload_current_scene()


# ---------------------------------------------------------------- controles
func _criar_acoes() -> void:
	_tecla("frente", [KEY_W, KEY_UP])
	_tecla("tras", [KEY_S, KEY_DOWN])
	_tecla("esquerda", [KEY_A, KEY_LEFT])
	_tecla("direita", [KEY_D, KEY_RIGHT])
	_tecla("correr", [KEY_SHIFT])
	_tecla("esquiva", [KEY_SPACE])
	_tecla("ataque_pesado", [KEY_E])
	_tecla("impeto", [KEY_Q])
	_tecla("travar", [KEY_TAB])
	_tecla("reiniciar", [KEY_R])
	_tecla("liberar_mouse", [KEY_ESCAPE])
	_tecla("ajuda", [KEY_F1])
	_mouse("ataque_leve", MOUSE_BUTTON_LEFT)
	_mouse("bloquear", MOUSE_BUTTON_RIGHT)
	_mouse("travar", MOUSE_BUTTON_MIDDLE)


func _tecla(acao: String, teclas: Array) -> void:
	if not InputMap.has_action(acao):
		InputMap.add_action(acao)
	for k in teclas:
		var ev := InputEventKey.new()
		ev.physical_keycode = k
		InputMap.action_add_event(acao, ev)


func _mouse(acao: String, botao: MouseButton) -> void:
	if not InputMap.has_action(acao):
		InputMap.add_action(acao)
	var ev := InputEventMouseButton.new()
	ev.button_index = botao
	InputMap.action_add_event(acao, ev)


# ---------------------------------------------------------------- mundo
func _criar_ambiente() -> void:
	var ceu_mat := ProceduralSkyMaterial.new()
	ceu_mat.sky_top_color = Color(0.32, 0.58, 0.95)
	ceu_mat.sky_horizon_color = Color(0.78, 0.87, 0.97)
	ceu_mat.ground_horizon_color = Color(0.72, 0.8, 0.72)
	ceu_mat.ground_bottom_color = Color(0.3, 0.38, 0.3)
	var ceu := Sky.new()
	ceu.sky_material = ceu_mat

	var amb := Environment.new()
	amb.background_mode = Environment.BG_SKY
	amb.sky = ceu
	amb.ambient_light_source = Environment.AMBIENT_SOURCE_SKY
	amb.ambient_light_energy = 0.9
	amb.tonemap_mode = Environment.TONE_MAPPER_FILMIC

	var we := WorldEnvironment.new()
	we.environment = amb
	add_child(we)

	var sol := DirectionalLight3D.new()
	sol.rotation_degrees = Vector3(-52, -35, 0)
	sol.light_energy = 1.15
	sol.shadow_enabled = true
	sol.directional_shadow_max_distance = 45.0
	add_child(sol)


func _criar_arena() -> void:
	# Chão de grama + piso circular de pedra no meio.
	_bloco(Vector3(0, -0.5, 0), Vector3(70, 1, 70), Color(0.42, 0.68, 0.36), true)
	var piso := MeshInstance3D.new()
	var cil := CylinderMesh.new()
	cil.top_radius = 9.0
	cil.bottom_radius = 9.0
	cil.height = 0.06
	piso.mesh = cil
	piso.material_override = Efeitos.material(Color(0.78, 0.74, 0.66), 0.7)
	piso.position = Vector3(0, 0.03, 0)
	add_child(piso)

	# Pilares coloridos (estilo brinquedo) ao redor.
	var cores := [Color(0.95, 0.55, 0.35), Color(0.45, 0.65, 0.95), Color(0.98, 0.82, 0.35), Color(0.7, 0.5, 0.9)]
	for i in 10:
		var ang := TAU * float(i) / 10.0
		var p := Vector3(cos(ang) * 22.0, 1.5, sin(ang) * 22.0)
		_bloco(p, Vector3(1.6, 3.0, 1.6), cores[i % cores.size()], false)
	# Algumas pedras para testar a câmera.
	_bloco(Vector3(13, 0.6, 6), Vector3(2.5, 1.2, 2.0), Color(0.6, 0.6, 0.62), false)
	_bloco(Vector3(-14, 0.8, 2), Vector3(2.0, 1.6, 3.0), Color(0.6, 0.6, 0.62), false)

	# Paredes invisíveis na borda.
	for l in [Vector3(0, 2, 34), Vector3(0, 2, -34)]:
		_parede(l, Vector3(70, 4, 1))
	for l in [Vector3(34, 2, 0), Vector3(-34, 2, 0)]:
		_parede(l, Vector3(1, 4, 70))


func _bloco(pos: Vector3, tam: Vector3, cor: Color, chao: bool) -> void:
	var corpo := StaticBody3D.new()
	corpo.position = pos
	corpo.collision_layer = 1
	var col := CollisionShape3D.new()
	var forma := BoxShape3D.new()
	forma.size = tam
	col.shape = forma
	corpo.add_child(col)
	var mi := MeshInstance3D.new()
	var malha := BoxMesh.new()
	malha.size = tam
	mi.mesh = malha
	mi.material_override = Efeitos.material(cor, 0.9 if chao else 0.45)
	corpo.add_child(mi)
	add_child(corpo)


func _parede(pos: Vector3, tam: Vector3) -> void:
	var corpo := StaticBody3D.new()
	corpo.position = pos
	var col := CollisionShape3D.new()
	var forma := BoxShape3D.new()
	forma.size = tam
	col.shape = forma
	corpo.add_child(col)
	add_child(corpo)


func _inimigo(tipo: String, pos: Vector3) -> void:
	var e = InimigoScript.new()
	e.tipo = tipo
	e.ponto_inicial = pos
	e.position = pos
	add_child(e)
