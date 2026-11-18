# MMORPG — animações de combate no personagem ithappy (Blender 5.2, modo fundo)
# Gera: Ataque_Leve_1/2/3, Ataque_Pesado, Ataque_Impeto, Bloqueio, Esquiva + espada na mão direita.
# Saída: MMORPG_Godot/privado/personagem_combate.glb e prévias em Claude_Blender/mmorpg/
import bpy, os, math, traceback
from mathutils import Vector, Matrix

DOCS = r"C:\Users\Administrador\Documents"
BASE = os.path.join(DOCS, "Claude_Blender")
ENTRADA = os.path.join(DOCS, "ParecisTelha", "personagens", "personagens_ithappy.glb")
SAIDA = os.path.join(DOCS, "MMORPG_Godot", "privado", "personagem_combate.glb")
PREV = os.path.join(BASE, "mmorpg"); os.makedirs(PREV, exist_ok=True)
FPS = 30
ROUPA = ["Body_010", "Hairstyle_male_010", "Outerwear_029", "Pants_010", "Shoe_Sneakers_009", "Male_emotion_usual_001"]
log = []
def L(*a):
    log.append(" ".join(str(x) for x in a))
    open(os.path.join(BASE, "job_log.txt"), "w", encoding="utf-8").write("\n".join(log))

# Segue a skill 'animation' (blender-skills): 30 fps, antecipação antes do golpe, sem chave de escala, ações no NLA.
# Poses: direções no espaço do personagem (x = esquerda dele, y = cima, z = frente). Lado direito = x negativo.
# Cada pose: braço (RightArm), antebraço (RightForeArm), giro do tronco (graus, + = vira p/ esquerda),
# inclinação (graus, + = para frente), giro do quadril, descida do quadril (m), e opcionalmente braço esquerdo.
P = {
    "neutra": None,
    "leve1_prep":  dict(lam=(-0.5, 0.6, -0.6), arm=(-0.80, 0.35, -0.35), fore=(-0.55, 0.75, 0.10), giro=-35, incl=0,  quad=-10, desce=0.02),
    "leve1_golpe": dict(lam=(0.6, 0.1, 0.8), arm=(0.45, 0.05, 0.89),   fore=(0.80, 0.05, 0.60),  giro=40,  incl=8,  quad=15,  desce=0.05),
    "leve2_prep":  dict(lam=(0.6, 0.6, -0.4), arm=(0.50, 0.45, 0.50),   fore=(0.85, 0.45, 0.15),  giro=30,  incl=0,  quad=8,   desce=0.02),
    "leve2_golpe": dict(lam=(-0.6, 0.0, 0.8), arm=(-0.70, 0.05, 0.70),  fore=(-0.92, 0.05, 0.38), giro=-40, incl=8,  quad=-15, desce=0.05),
    "leve3_prep":  dict(lam=(0.0, 0.1, 1.0), arm=(-0.45, -0.10, -0.55), fore=(-0.15, 0.10, 0.98), giro=-25, incl=-5, quad=-8, desce=0.02),
    "leve3_golpe": dict(lam=(0.0, 0.1, 1.0), arm=(-0.10, 0.15, 0.99),  fore=(0.0, 0.12, 1.0),    giro=15,  incl=15, quad=10,  desce=0.08),
    "pesado_prep": dict(lam=(0.0, 0.5, -0.85), arm=(-0.25, 0.95, -0.15), fore=(-0.10, 0.55, -0.83), giro=-15, incl=-15, quad=-5, desce=0.0),
    "pesado_golpe":dict(lam=(0.0, -0.5, 0.85), arm=(-0.05, -0.30, 0.95), fore=(0.0, -0.60, 0.80),  giro=5,   incl=30, quad=5,   desce=0.12),
    "impeto_prep": dict(lam=(-0.7, 0.2, -0.7), arm=(-0.90, 0.25, -0.40), fore=(-0.95, 0.20, -0.20), giro=-55, incl=0, quad=-30, desce=0.06),
    "impeto_golpe":dict(lam=(0.9, 0.1, 0.4), arm=(0.90, 0.15, 0.40),   fore=(0.95, 0.10, 0.25),  giro=70,  incl=10, quad=60,  desce=0.10),
    "bloqueio":    dict(lam=(0.9, 0.35, 0.2), arm=(-0.35, -0.15, 0.92), fore=(0.60, 0.55, 0.58),  giro=15,  incl=5,  quad=5,   desce=0.06),
    "esquiva":     dict(lam=(0.0, -0.3, -0.95), arm=(-0.30, -0.55, 0.78), fore=(0.25, 0.35, 0.90),  giro=0,   incl=35, quad=0,   desce=0.28,
                        larm=(0.30, -0.55, 0.78), lfore=(-0.25, 0.35, 0.90)),
}
# Ações: (nome, duração em s, [(fração do tempo, pose)], loop)
ACOES = [
    ("Ataque_Leve_1", 0.68, [(0, "neutra"), (0.30, "leve1_prep"), (0.50, "leve1_golpe"), (0.72, "leve1_golpe"), (1, "neutra")]),
    ("Ataque_Leve_2", 0.68, [(0, "neutra"), (0.30, "leve2_prep"), (0.50, "leve2_golpe"), (0.72, "leve2_golpe"), (1, "neutra")]),
    ("Ataque_Leve_3", 0.68, [(0, "neutra"), (0.30, "leve3_prep"), (0.50, "leve3_golpe"), (0.72, "leve3_golpe"), (1, "neutra")]),
    ("Ataque_Pesado", 1.20, [(0, "neutra"), (0.32, "pesado_prep"), (0.42, "pesado_prep"), (0.54, "pesado_golpe"), (0.75, "pesado_golpe"), (1, "neutra")]),
    ("Ataque_Impeto", 1.00, [(0, "neutra"), (0.30, "impeto_prep"), (0.52, "impeto_golpe"), (0.72, "impeto_golpe"), (1, "neutra")]),
    ("Bloqueio", 0.50, [(0, "bloqueio"), (1, "bloqueio")]),
    ("Esquiva", 0.42, [(0, "neutra"), (0.25, "esquiva"), (0.75, "esquiva"), (1, "neutra")]),
]
PREVIAS = [("Ataque_Leve_1", 0.30), ("Ataque_Leve_1", 0.50), ("Ataque_Leve_2", 0.50), ("Ataque_Leve_3", 0.50),
           ("Ataque_Pesado", 0.32), ("Ataque_Pesado", 0.54), ("Ataque_Impeto", 0.52), ("Bloqueio", 0.0), ("Esquiva", 0.5)]

try:
    L("blender", bpy.app.version_string)
    for o in list(bpy.data.objects):
        bpy.data.objects.remove(o, do_unlink=True)
    bpy.ops.import_scene.gltf(filepath=ENTRADA)
    arm = next(o for o in bpy.data.objects if o.type == 'ARMATURE')
    L("armature", arm.name, "acoes:", [a.name for a in bpy.data.actions])

    # Roupa: remove as peças que não usamos.
    for o in list(bpy.data.objects):
        if o.type == 'MESH' and not any(o.name.startswith(n) for n in ROUPA):
            bpy.data.objects.remove(o, do_unlink=True)
    L("malhas:", [o.name for o in bpy.data.objects if o.type == 'MESH'])

    vl = bpy.context.view_layer
    pb = arm.pose.bones
    for b in pb:
        b.rotation_mode = 'QUATERNION'
    idle = next((a for a in bpy.data.actions if "Idle_Breathing" in a.name), None)
    if arm.animation_data is None:
        arm.animation_data_create()
    arm.animation_data.action = idle
    if idle is not None:
        bpy.context.scene.frame_set(int(idle.frame_range[0]))
    vl.update()
    BASE_POSE = {b.name: (b.location.copy(), b.rotation_quaternion.copy(), b.scale.copy()) for b in pb}
    arm.animation_data.action = None

    MW = arm.matrix_world.copy()
    def wpos(nome):
        return MW @ arm.data.bones[nome].head_local
    frente = wpos("LeftToeBase") - wpos("LeftFoot"); frente.z = 0; frente.normalize()
    cima = Vector((0, 0, 1)); esq = cima.cross(frente).normalized()
    L("frente do personagem (mundo):", tuple(round(c, 3) for c in frente))
    M3inv = MW.to_3x3().inverted()
    def c2a(v):  # espaço do personagem -> espaço da armature
        w = esq * v[0] + cima * v[1] + frente * v[2]
        return (M3inv @ w).normalized()

    def girar(nome, eixo_c, graus):
        b = pb[nome]; M = b.matrix.copy(); h = M.translation.copy()
        R = Matrix.Rotation(math.radians(graus), 4, c2a(eixo_c))
        b.matrix = Matrix.Translation(h) @ R @ Matrix.Translation(-h) @ M; vl.update()

    def apontar(nome, d):
        b = pb[nome]; M = b.matrix.copy(); h = M.translation.copy()
        atual = Vector(M.col[1][:3]).normalized()
        R = atual.rotation_difference(c2a(d)).to_matrix().to_4x4()
        b.matrix = Matrix.Translation(h) @ R @ Matrix.Translation(-h) @ M; vl.update()

    def aplicar(chave):
        for b in pb:
            l, q, s = BASE_POSE[b.name]; b.location = l; b.rotation_quaternion = q; b.scale = s
        vl.update()
        p = P[chave]
        if p is None:
            return
        if p["quad"] or p["desce"]:
            h = pb["Hips"]; M = h.matrix.copy()
            M = Matrix.Translation(-c2a((0, 1, 0)) * p["desce"] / max(1e-6, MW.to_scale().z)) @ M
            hpos = M.translation.copy()
            M = Matrix.Translation(hpos) @ Matrix.Rotation(math.radians(p["quad"]), 4, c2a((0, 1, 0))) @ Matrix.Translation(-hpos) @ M
            h.matrix = M; vl.update()
        if "Spine1" in pb:
            girar("Spine1", (0, 1, 0), p["giro"] - p["quad"])
            girar("Spine1", (1, 0, 0), p["incl"])
        apontar("RightArm", p["arm"]); apontar("RightForeArm", p["fore"])
        if "lam" in p and LAMINA_LOCAL is not None:
            b = pb["RightHand"]; M = b.matrix.copy(); hh = M.translation.copy()
            atual = (M.to_3x3() @ LAMINA_LOCAL).normalized()
            R = atual.rotation_difference(c2a(p["lam"])).to_matrix().to_4x4()
            b.matrix = Matrix.Translation(hh) @ R @ Matrix.Translation(-hh) @ M; vl.update()
        if "larm" in p:
            apontar("LeftArm", p["larm"]); apontar("LeftForeArm", p["lfore"])

    LAMINA_LOCAL = None
    def capturar():
        return {b.name: (b.location.copy(), b.rotation_quaternion.copy()) for b in pb}

    # Espada (na pose de descanso), presa ao osso RightHand.
    arm.data.pose_position = 'REST'; vl.update()
    def h(nome): return MW @ arm.data.bones[nome].head_local
    mao = h("RightHand"); dedos = h("RightHandMiddle1") - mao; pol = h("RightHandThumb1") - mao
    d_dedos = dedos.normalized(); d_lam = (pol - d_dedos * pol.dot(d_dedos)).normalized(); lado = d_dedos.cross(d_lam).normalized()
    pega = mao + dedos * 0.75
    aco = bpy.data.materials.new("Espada_Aco"); aco.use_nodes = True
    bs = aco.node_tree.nodes["Principled BSDF"]; bs.inputs["Base Color"].default_value = (0.85, 0.87, 0.93, 1); bs.inputs["Metallic"].default_value = 0.7; bs.inputs["Roughness"].default_value = 0.2
    ouro = bpy.data.materials.new("Espada_Guarda"); ouro.use_nodes = True
    bs = ouro.node_tree.nodes["Principled BSDF"]; bs.inputs["Base Color"].default_value = (0.95, 0.7, 0.2, 1); bs.inputs["Roughness"].default_value = 0.35
    couro = bpy.data.materials.new("Espada_Cabo"); couro.use_nodes = True
    bs = couro.node_tree.nodes["Principled BSDF"]; bs.inputs["Base Color"].default_value = (0.35, 0.18, 0.09, 1); bs.inputs["Roughness"].default_value = 0.7
    pecas = []
    for nome, tam, y, m in [("Lamina", (0.055, 0.95, 0.018), 0.60, aco), ("Guarda", (0.24, 0.045, 0.06), 0.11, ouro), ("Cabo", (0.045, 0.22, 0.045), -0.02, couro), ("Pomo", (0.07, 0.06, 0.07), -0.15, ouro)]:
        bpy.ops.mesh.primitive_cube_add(size=1, location=(0, y, 0)); o = bpy.context.active_object
        o.scale = tam; bpy.ops.object.transform_apply(location=True, rotation=False, scale=True)
        bev = o.modifiers.new("B", 'BEVEL'); bev.width = 0.006; bev.segments = 2
        bpy.ops.object.modifier_apply(modifier="B")
        o.data.materials.append(m); pecas.append(o)
    bpy.ops.object.select_all(action='DESELECT')
    for o in pecas: o.select_set(True)
    bpy.context.view_layer.objects.active = pecas[0]; bpy.ops.object.join()
    espada = bpy.context.active_object; espada.name = "Espada"; espada.data.name = "Espada"
    # Ponta da lâmina = sai do punho pelo lado do polegar.
    espada.matrix_world = Matrix.Translation(pega) @ Matrix((lado, d_lam, lado.cross(d_lam))).transposed().to_4x4()
    mw = espada.matrix_world.copy()
    espada.parent = arm; espada.parent_type = 'BONE'; espada.parent_bone = "RightHand"
    vl.update(); espada.matrix_world = mw
    arm.data.pose_position = 'POSE'; vl.update()
    LAMINA_LOCAL = (arm.data.bones["RightHand"].matrix_local.to_3x3().inverted() @ (M3inv @ d_lam)).normalized()
    L("espada ok, pega", tuple(round(c, 3) for c in pega))

    # Gerar as ações.
    for nome, dur, chaves, *_ in ACOES:
        quadros = max(2, round(dur * FPS))
        poses = []
        for frac, chave in chaves:
            aplicar(chave); poses.append((1 + round(frac * quadros), capturar()))
        act = bpy.data.actions.new(nome); act.use_fake_user = True
        arm.animation_data.action = act
        for f, pose in poses:
            for b in pb:
                l, q = pose[b.name]; b.location = l; b.rotation_quaternion = q
                b.keyframe_insert("rotation_quaternion", frame=f, group=b.name)
                if b.name == "Hips":
                    b.keyframe_insert("location", frame=f, group=b.name)
        try:
            tr = arm.animation_data.nla_tracks.new(); tr.name = nome
            st = tr.strips.new(nome, 1, act); tr.mute = True
        except Exception as e:
            L("nla falhou", nome, e)
        arm.animation_data.action = None
        L("acao", nome, "quadros", quadros)
    # As animações originais também vão para NLA, para exportar tudo junto.
    for a in bpy.data.actions:
        a.use_fake_user = True

    # Prévias (Workbench).
    sc = bpy.context.scene
    sc.render.engine = 'BLENDER_WORKBENCH'; sc.render.resolution_x = 520; sc.render.resolution_y = 520
    sc.display.shading.light = 'STUDIO'; sc.display.shading.color_type = 'MATERIAL'
    sc.render.film_transparent = False
    cam_d = bpy.data.cameras.new("Cam"); cam = bpy.data.objects.new("Cam", cam_d); sc.collection.objects.link(cam); sc.camera = cam
    cam_d.lens = 40
    alvo = MW @ arm.data.bones["Hips"].head_local + Vector((0, 0, 0.35))
    pos_cam = alvo - esq * 1.9 + frente * 2.6 + cima * 0.7     # frente-direita do personagem
    cam.location = pos_cam
    cam.rotation_euler = (alvo - pos_cam).to_track_quat('-Z', 'Y').to_euler()
    for i, (nome, frac) in enumerate(PREVIAS):
        act = bpy.data.actions[nome]; arm.animation_data.action = act
        f0, f1 = act.frame_range
        sc.frame_set(int(round(f0 + frac * (f1 - f0))))
        sc.render.filepath = os.path.join(PREV, "prev_%02d_%s_%d.png" % (i, nome, int(frac * 100)))
        bpy.ops.render.render(write_still=True)
    arm.animation_data.action = None
    L("previas ok")

    bpy.ops.export_scene.gltf(filepath=SAIDA, export_format='GLB', export_animations=True,
                              export_animation_mode='ACTIONS', export_force_sampling=True, use_selection=False)
    L("export ok", SAIDA)
except Exception:
    L("ERRO", traceback.format_exc())
L("FIM")
