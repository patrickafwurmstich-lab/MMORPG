extends RefCounted
## Efeitos visuais simples (números flutuantes, corte, anel). Usar com preload + funções estáticas.


static func numero(raiz: Node, pos: Vector3, texto: String, cor: Color, tamanho: int = 64) -> void:
	var l := Label3D.new()
	l.text = texto
	l.modulate = cor
	l.font_size = tamanho
	l.outline_size = 14
	l.outline_modulate = Color(0, 0, 0, 0.85)
	l.billboard = BaseMaterial3D.BILLBOARD_ENABLED
	l.no_depth_test = true
	l.pixel_size = 0.006
	raiz.add_child(l)
	l.global_position = pos + Vector3(randf_range(-0.3, 0.3), 0.0, randf_range(-0.3, 0.3))
	var tw := l.create_tween()
	tw.set_parallel(true)
	tw.tween_property(l, "global_position", l.global_position + Vector3(0, 1.1, 0), 0.9)
	tw.tween_property(l, "modulate:a", 0.0, 0.9).set_delay(0.35)
	tw.chain().tween_callback(l.queue_free)


static func corte(raiz: Node, origem: Vector3, frente: Vector3, cor: Color, largura: float = 2.2) -> void:
	# Lâmina de luz achatada que aparece na frente do golpe e some rápido.
	var mi := MeshInstance3D.new()
	var malha := BoxMesh.new()
	malha.size = Vector3(largura, 0.05, 0.35)
	mi.mesh = malha
	var mat := StandardMaterial3D.new()
	mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat.albedo_color = cor
	mat.cull_mode = BaseMaterial3D.CULL_DISABLED
	mi.material_override = mat
	mi.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	raiz.add_child(mi)
	var f := Vector3(frente.x, 0.0, frente.z).normalized()
	if f.length() < 0.1:
		f = Vector3.FORWARD
	mi.global_position = origem + f * 1.2 + Vector3(0, 1.1, 0)
	mi.global_rotation = Vector3(0.0, atan2(f.x, f.z), randf_range(-0.5, 0.5))
	var tw := mi.create_tween()
	tw.tween_property(mat, "albedo_color:a", 0.0, 0.18)
	tw.tween_callback(mi.queue_free)


static func anel(raiz: Node, pos: Vector3, raio: float, cor: Color, duracao: float = 0.35) -> void:
	var mi := MeshInstance3D.new()
	var malha := TorusMesh.new()
	malha.inner_radius = raio * 0.85
	malha.outer_radius = raio
	mi.mesh = malha
	var mat := StandardMaterial3D.new()
	mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat.albedo_color = cor
	mi.material_override = mat
	mi.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	raiz.add_child(mi)
	mi.global_position = pos + Vector3(0, 0.08, 0)
	var tw := mi.create_tween()
	tw.set_parallel(true)
	tw.tween_property(mi, "scale", Vector3(2.2, 1.0, 2.2), duracao)
	tw.tween_property(mat, "albedo_color:a", 0.0, duracao)
	tw.chain().tween_callback(mi.queue_free)


static func material(cor: Color, rugosidade: float = 0.4) -> StandardMaterial3D:
	# Aparência de "brinquedo de plástico" (estilo ithappy).
	var m := StandardMaterial3D.new()
	m.albedo_color = cor
	m.roughness = rugosidade
	m.metallic_specular = 0.6
	return m


static func caixa(pai: Node3D, tamanho: Vector3, pos: Vector3, mat: Material) -> MeshInstance3D:
	var mi := MeshInstance3D.new()
	var malha := BoxMesh.new()
	malha.size = tamanho
	mi.mesh = malha
	mi.material_override = mat
	mi.position = pos
	pai.add_child(mi)
	return mi
