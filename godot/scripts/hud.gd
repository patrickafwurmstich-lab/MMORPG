extends CanvasLayer
## HUD: barras de Vida / Resistência / Postura / Ímpeto, mensagens, alvo travado e ajuda.

var jogador
var barras: Dictionary = {}
var textos: Dictionary = {}
var msg: Label
var t_msg: float = 0.0
var alvo_lbl: Label
var ajuda: Label
var fps: Label

const AJUDA := """[F1] esconder ajuda
WASD  mover      Shift  disparar
Mouse  câmera    Roda  zoom
Clique esq.  ataque leve (combo x3)
E  ataque pesado    Q  golpe de Ímpeto (50)
Clique dir.  bloquear (apertar na hora = APARAR)
Espaço  esquiva (na hora certa = PERFEITA)
Tab / botão do meio  travar alvo
R  reiniciar    Esc  soltar o mouse"""


func _ready() -> void:
	add_to_group("hud")
	var raiz := Control.new()
	raiz.set_anchors_preset(Control.PRESET_FULL_RECT)
	raiz.mouse_filter = Control.MOUSE_FILTER_IGNORE
	add_child(raiz)

	var caixa := VBoxContainer.new()
	caixa.set_anchors_preset(Control.PRESET_BOTTOM_LEFT)
	caixa.offset_left = 24
	caixa.offset_top = -150
	caixa.offset_right = 600
	caixa.offset_bottom = -20
	caixa.add_theme_constant_override("separation", 6)
	raiz.add_child(caixa)
	_barra(caixa, "vida", "Vida", Color(0.9, 0.25, 0.25), 340)
	_barra(caixa, "res", "Resistência", Color(0.95, 0.8, 0.25), 260)
	_barra(caixa, "postura", "Postura", Color(0.35, 0.6, 1.0), 260)
	_barra(caixa, "impeto", "Ímpeto", Color(1.0, 0.5, 0.15), 260)

	msg = Label.new()
	msg.set_anchors_preset(Control.PRESET_CENTER_TOP)
	msg.offset_top = 150
	msg.offset_left = -400
	msg.offset_right = 400
	msg.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	msg.add_theme_font_size_override("font_size", 30)
	msg.add_theme_constant_override("outline_size", 8)
	msg.add_theme_color_override("font_outline_color", Color(0, 0, 0))
	raiz.add_child(msg)

	alvo_lbl = Label.new()
	alvo_lbl.set_anchors_preset(Control.PRESET_CENTER_TOP)
	alvo_lbl.offset_top = 20
	alvo_lbl.offset_left = -300
	alvo_lbl.offset_right = 300
	alvo_lbl.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	alvo_lbl.add_theme_font_size_override("font_size", 22)
	alvo_lbl.add_theme_constant_override("outline_size", 6)
	alvo_lbl.add_theme_color_override("font_outline_color", Color(0, 0, 0))
	raiz.add_child(alvo_lbl)

	ajuda = Label.new()
	ajuda.text = AJUDA
	ajuda.position = Vector2(16, 12)
	ajuda.add_theme_font_size_override("font_size", 16)
	ajuda.add_theme_constant_override("outline_size", 5)
	ajuda.add_theme_color_override("font_outline_color", Color(0, 0, 0))
	raiz.add_child(ajuda)

	fps = Label.new()
	fps.set_anchors_preset(Control.PRESET_TOP_RIGHT)
	fps.offset_left = -220
	fps.offset_top = 10
	fps.offset_right = -14
	fps.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
	fps.add_theme_constant_override("outline_size", 5)
	fps.add_theme_color_override("font_outline_color", Color(0, 0, 0))
	raiz.add_child(fps)


func _barra(pai: Control, chave: String, titulo: String, cor: Color, largura: float) -> void:
	var linha := HBoxContainer.new()
	linha.add_theme_constant_override("separation", 10)
	pai.add_child(linha)
	var nome := Label.new()
	nome.text = titulo
	nome.custom_minimum_size = Vector2(110, 0)
	nome.add_theme_constant_override("outline_size", 5)
	nome.add_theme_color_override("font_outline_color", Color(0, 0, 0))
	linha.add_child(nome)
	var b := ProgressBar.new()
	b.custom_minimum_size = Vector2(largura, 18)
	b.show_percentage = false
	b.size_flags_vertical = Control.SIZE_SHRINK_CENTER
	var fundo := StyleBoxFlat.new()
	fundo.bg_color = Color(0, 0, 0, 0.55)
	fundo.set_corner_radius_all(6)
	var cheio := StyleBoxFlat.new()
	cheio.bg_color = cor
	cheio.set_corner_radius_all(6)
	b.add_theme_stylebox_override("background", fundo)
	b.add_theme_stylebox_override("fill", cheio)
	linha.add_child(b)
	var valor := Label.new()
	valor.add_theme_constant_override("outline_size", 5)
	valor.add_theme_color_override("font_outline_color", Color(0, 0, 0))
	linha.add_child(valor)
	barras[chave] = b
	textos[chave] = valor


func _definir(chave: String, atual: float, maximo: float) -> void:
	var b := barras[chave] as ProgressBar
	b.max_value = maximo
	b.value = atual
	(textos[chave] as Label).text = "%d / %d" % [int(round(atual)), int(round(maximo))]


func mostrar(texto: String, cor: Color) -> void:
	msg.text = texto
	msg.modulate = cor
	t_msg = 1.6


func _process(delta: float) -> void:
	if Input.is_action_just_pressed("ajuda"):
		ajuda.visible = not ajuda.visible
	fps.text = "FPS %d" % Engine.get_frames_per_second()
	t_msg -= delta
	msg.modulate.a = clampf(t_msg / 0.5, 0.0, 1.0)
	if jogador == null or not is_instance_valid(jogador):
		return
	_definir("vida", jogador.vida, jogador.vida_max)
	_definir("res", jogador.res, jogador.res_max)
	_definir("postura", jogador.postura, jogador.postura_max)
	_definir("impeto", jogador.impeto, 100.0)
	var alvo = jogador.alvo_travado
	if alvo != null and is_instance_valid(alvo):
		alvo_lbl.text = ">> %s — Vida %d / %d" % [alvo.dados["nome"], int(ceil(alvo.vida)), int(alvo.vida_max)]
	else:
		alvo_lbl.text = ""
