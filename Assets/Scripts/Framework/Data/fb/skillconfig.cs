// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace fb
{

using global::System;
using global::System.Collections.Generic;
using global::FlatBuffers;

public struct skillconfigTB : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static void ValidateVersion() { FlatBufferConstants.FLATBUFFERS_1_12_0(); }
  public static skillconfigTB GetRootAsskillconfigTB(ByteBuffer _bb) { return GetRootAsskillconfigTB(_bb, new skillconfigTB()); }
  public static skillconfigTB GetRootAsskillconfigTB(ByteBuffer _bb, skillconfigTB obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p = new Table(_i, _bb); }
  public skillconfigTB __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public fb.skillconfigTR? SkillconfigTRS(int j) { int o = __p.__offset(4); return o != 0 ? (fb.skillconfigTR?)(new fb.skillconfigTR()).__assign(__p.__indirect(__p.__vector(o) + j * 4), __p.bb) : null; }
  public int SkillconfigTRSLength { get { int o = __p.__offset(4); return o != 0 ? __p.__vector_len(o) : 0; } }
  public fb.skillconfigTR? SkillconfigTRSByKey(int key) { int o = __p.__offset(4); return o != 0 ? fb.skillconfigTR.__lookup_by_key(__p.__vector(o), key, __p.bb) : null; }

  public static Offset<fb.skillconfigTB> CreateskillconfigTB(FlatBufferBuilder builder,
      VectorOffset skillconfigTRSOffset = default(VectorOffset)) {
    builder.StartTable(1);
    skillconfigTB.AddSkillconfigTRS(builder, skillconfigTRSOffset);
    return skillconfigTB.EndskillconfigTB(builder);
  }

  public static void StartskillconfigTB(FlatBufferBuilder builder) { builder.StartTable(1); }
  public static void AddSkillconfigTRS(FlatBufferBuilder builder, VectorOffset skillconfigTRSOffset) { builder.AddOffset(0, skillconfigTRSOffset.Value, 0); }
  public static VectorOffset CreateSkillconfigTRSVector(FlatBufferBuilder builder, Offset<fb.skillconfigTR>[] data) { builder.StartVector(4, data.Length, 4); for (int i = data.Length - 1; i >= 0; i--) builder.AddOffset(data[i].Value); return builder.EndVector(); }
  public static VectorOffset CreateSkillconfigTRSVectorBlock(FlatBufferBuilder builder, Offset<fb.skillconfigTR>[] data) { builder.StartVector(4, data.Length, 4); builder.Add(data); return builder.EndVector(); }
  public static void StartSkillconfigTRSVector(FlatBufferBuilder builder, int numElems) { builder.StartVector(4, numElems, 4); }
  public static Offset<fb.skillconfigTB> EndskillconfigTB(FlatBufferBuilder builder) {
    int o = builder.EndTable();
    return new Offset<fb.skillconfigTB>(o);
  }
  public static void FinishskillconfigTBBuffer(FlatBufferBuilder builder, Offset<fb.skillconfigTB> offset) { builder.Finish(offset.Value); }
  public static void FinishSizePrefixedskillconfigTBBuffer(FlatBufferBuilder builder, Offset<fb.skillconfigTB> offset) { builder.FinishSizePrefixed(offset.Value); }
};

public struct skillconfigTR : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static void ValidateVersion() { FlatBufferConstants.FLATBUFFERS_1_12_0(); }
  public static skillconfigTR GetRootAsskillconfigTR(ByteBuffer _bb) { return GetRootAsskillconfigTR(_bb, new skillconfigTR()); }
  public static skillconfigTR GetRootAsskillconfigTR(ByteBuffer _bb, skillconfigTR obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p = new Table(_i, _bb); }
  public skillconfigTR __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public int _id { get { int o = __p.__offset(4); return o != 0 ? __p.bb.GetInt(o + __p.bb_pos) : (int)0; } }
  public string _name { get { int o = __p.__offset(6); return o != 0 ? __p.__string(o + __p.bb_pos) : null; } }
#if ENABLE_SPAN_T
  public Span<byte> Get_nameBytes() { return __p.__vector_as_span<byte>(6, 1); }
#else
  public ArraySegment<byte>? Get_nameBytes() { return __p.__vector_as_arraysegment(6); }
#endif
  public byte[] Get_nameArray() { return __p.__vector_as_array<byte>(6); }
  public string _description { get { int o = __p.__offset(8); return o != 0 ? __p.__string(o + __p.bb_pos) : null; } }
#if ENABLE_SPAN_T
  public Span<byte> Get_descriptionBytes() { return __p.__vector_as_span<byte>(8, 1); }
#else
  public ArraySegment<byte>? Get_descriptionBytes() { return __p.__vector_as_arraysegment(8); }
#endif
  public byte[] Get_descriptionArray() { return __p.__vector_as_array<byte>(8); }
  public int _cooltime { get { int o = __p.__offset(10); return o != 0 ? __p.bb.GetInt(o + __p.bb_pos) : (int)0; } }
  public int _costsp { get { int o = __p.__offset(12); return o != 0 ? __p.bb.GetInt(o + __p.bb_pos) : (int)0; } }
  public float _attackdistance { get { int o = __p.__offset(14); return o != 0 ? __p.bb.GetFloat(o + __p.bb_pos) : (float)0.0f; } }
  public float _attackangle { get { int o = __p.__offset(16); return o != 0 ? __p.bb.GetFloat(o + __p.bb_pos) : (float)0.0f; } }
  public string _attacktargettags(int j) { int o = __p.__offset(18); return o != 0 ? __p.__string(__p.__vector(o) + j * 4) : null; }
  public int _attacktargettagsLength { get { int o = __p.__offset(18); return o != 0 ? __p.__vector_len(o) : 0; } }
  public string _impacttype(int j) { int o = __p.__offset(20); return o != 0 ? __p.__string(__p.__vector(o) + j * 4) : null; }
  public int _impacttypeLength { get { int o = __p.__offset(20); return o != 0 ? __p.__vector_len(o) : 0; } }
  public int _nextbattlerid { get { int o = __p.__offset(22); return o != 0 ? __p.bb.GetInt(o + __p.bb_pos) : (int)0; } }
  public float _atkratio { get { int o = __p.__offset(24); return o != 0 ? __p.bb.GetFloat(o + __p.bb_pos) : (float)0.0f; } }
  public float _durationtime { get { int o = __p.__offset(26); return o != 0 ? __p.bb.GetFloat(o + __p.bb_pos) : (float)0.0f; } }
  public float _atkinterval { get { int o = __p.__offset(28); return o != 0 ? __p.bb.GetFloat(o + __p.bb_pos) : (float)0.0f; } }
  public string _skillprefab { get { int o = __p.__offset(30); return o != 0 ? __p.__string(o + __p.bb_pos) : null; } }
#if ENABLE_SPAN_T
  public Span<byte> Get_skillprefabBytes() { return __p.__vector_as_span<byte>(30, 1); }
#else
  public ArraySegment<byte>? Get_skillprefabBytes() { return __p.__vector_as_arraysegment(30); }
#endif
  public byte[] Get_skillprefabArray() { return __p.__vector_as_array<byte>(30); }
  public string _animationname { get { int o = __p.__offset(32); return o != 0 ? __p.__string(o + __p.bb_pos) : null; } }
#if ENABLE_SPAN_T
  public Span<byte> Get_animationnameBytes() { return __p.__vector_as_span<byte>(32, 1); }
#else
  public ArraySegment<byte>? Get_animationnameBytes() { return __p.__vector_as_arraysegment(32); }
#endif
  public byte[] Get_animationnameArray() { return __p.__vector_as_array<byte>(32); }
  public string _hitfxprefab { get { int o = __p.__offset(34); return o != 0 ? __p.__string(o + __p.bb_pos) : null; } }
#if ENABLE_SPAN_T
  public Span<byte> Get_hitfxprefabBytes() { return __p.__vector_as_span<byte>(34, 1); }
#else
  public ArraySegment<byte>? Get_hitfxprefabBytes() { return __p.__vector_as_arraysegment(34); }
#endif
  public byte[] Get_hitfxprefabArray() { return __p.__vector_as_array<byte>(34); }
  public int _level { get { int o = __p.__offset(36); return o != 0 ? __p.bb.GetInt(o + __p.bb_pos) : (int)0; } }
  public int _attacktype { get { int o = __p.__offset(38); return o != 0 ? __p.bb.GetInt(o + __p.bb_pos) : (int)0; } }
  public int _selectortype { get { int o = __p.__offset(40); return o != 0 ? __p.bb.GetInt(o + __p.bb_pos) : (int)0; } }

  public static Offset<fb.skillconfigTR> CreateskillconfigTR(FlatBufferBuilder builder,
      int _id = 0,
      StringOffset _nameOffset = default(StringOffset),
      StringOffset _descriptionOffset = default(StringOffset),
      int _cooltime = 0,
      int _costsp = 0,
      float _attackdistance = 0.0f,
      float _attackangle = 0.0f,
      VectorOffset _attacktargettagsOffset = default(VectorOffset),
      VectorOffset _impacttypeOffset = default(VectorOffset),
      int _nextbattlerid = 0,
      float _atkratio = 0.0f,
      float _durationtime = 0.0f,
      float _atkinterval = 0.0f,
      StringOffset _skillprefabOffset = default(StringOffset),
      StringOffset _animationnameOffset = default(StringOffset),
      StringOffset _hitfxprefabOffset = default(StringOffset),
      int _level = 0,
      int _attacktype = 0,
      int _selectortype = 0) {
    builder.StartTable(19);
    skillconfigTR.Add_selectortype(builder, _selectortype);
    skillconfigTR.Add_attacktype(builder, _attacktype);
    skillconfigTR.Add_level(builder, _level);
    skillconfigTR.Add_hitfxprefab(builder, _hitfxprefabOffset);
    skillconfigTR.Add_animationname(builder, _animationnameOffset);
    skillconfigTR.Add_skillprefab(builder, _skillprefabOffset);
    skillconfigTR.Add_atkinterval(builder, _atkinterval);
    skillconfigTR.Add_durationtime(builder, _durationtime);
    skillconfigTR.Add_atkratio(builder, _atkratio);
    skillconfigTR.Add_nextbattlerid(builder, _nextbattlerid);
    skillconfigTR.Add_impacttype(builder, _impacttypeOffset);
    skillconfigTR.Add_attacktargettags(builder, _attacktargettagsOffset);
    skillconfigTR.Add_attackangle(builder, _attackangle);
    skillconfigTR.Add_attackdistance(builder, _attackdistance);
    skillconfigTR.Add_costsp(builder, _costsp);
    skillconfigTR.Add_cooltime(builder, _cooltime);
    skillconfigTR.Add_description(builder, _descriptionOffset);
    skillconfigTR.Add_name(builder, _nameOffset);
    skillconfigTR.Add_id(builder, _id);
    return skillconfigTR.EndskillconfigTR(builder);
  }

  public static void StartskillconfigTR(FlatBufferBuilder builder) { builder.StartTable(19); }
  public static void Add_id(FlatBufferBuilder builder, int Id) { builder.AddInt(0, Id, 0); }
  public static void Add_name(FlatBufferBuilder builder, StringOffset NameOffset) { builder.AddOffset(1, NameOffset.Value, 0); }
  public static void Add_description(FlatBufferBuilder builder, StringOffset DescriptionOffset) { builder.AddOffset(2, DescriptionOffset.Value, 0); }
  public static void Add_cooltime(FlatBufferBuilder builder, int Cooltime) { builder.AddInt(3, Cooltime, 0); }
  public static void Add_costsp(FlatBufferBuilder builder, int Costsp) { builder.AddInt(4, Costsp, 0); }
  public static void Add_attackdistance(FlatBufferBuilder builder, float Attackdistance) { builder.AddFloat(5, Attackdistance, 0.0f); }
  public static void Add_attackangle(FlatBufferBuilder builder, float Attackangle) { builder.AddFloat(6, Attackangle, 0.0f); }
  public static void Add_attacktargettags(FlatBufferBuilder builder, VectorOffset AttacktargettagsOffset) { builder.AddOffset(7, AttacktargettagsOffset.Value, 0); }
  public static VectorOffset Create_attacktargettagsVector(FlatBufferBuilder builder, StringOffset[] data) { builder.StartVector(4, data.Length, 4); for (int i = data.Length - 1; i >= 0; i--) builder.AddOffset(data[i].Value); return builder.EndVector(); }
  public static VectorOffset Create_attacktargettagsVectorBlock(FlatBufferBuilder builder, StringOffset[] data) { builder.StartVector(4, data.Length, 4); builder.Add(data); return builder.EndVector(); }
  public static void Start_attacktargettagsVector(FlatBufferBuilder builder, int numElems) { builder.StartVector(4, numElems, 4); }
  public static void Add_impacttype(FlatBufferBuilder builder, VectorOffset ImpacttypeOffset) { builder.AddOffset(8, ImpacttypeOffset.Value, 0); }
  public static VectorOffset Create_impacttypeVector(FlatBufferBuilder builder, StringOffset[] data) { builder.StartVector(4, data.Length, 4); for (int i = data.Length - 1; i >= 0; i--) builder.AddOffset(data[i].Value); return builder.EndVector(); }
  public static VectorOffset Create_impacttypeVectorBlock(FlatBufferBuilder builder, StringOffset[] data) { builder.StartVector(4, data.Length, 4); builder.Add(data); return builder.EndVector(); }
  public static void Start_impacttypeVector(FlatBufferBuilder builder, int numElems) { builder.StartVector(4, numElems, 4); }
  public static void Add_nextbattlerid(FlatBufferBuilder builder, int Nextbattlerid) { builder.AddInt(9, Nextbattlerid, 0); }
  public static void Add_atkratio(FlatBufferBuilder builder, float Atkratio) { builder.AddFloat(10, Atkratio, 0.0f); }
  public static void Add_durationtime(FlatBufferBuilder builder, float Durationtime) { builder.AddFloat(11, Durationtime, 0.0f); }
  public static void Add_atkinterval(FlatBufferBuilder builder, float Atkinterval) { builder.AddFloat(12, Atkinterval, 0.0f); }
  public static void Add_skillprefab(FlatBufferBuilder builder, StringOffset SkillprefabOffset) { builder.AddOffset(13, SkillprefabOffset.Value, 0); }
  public static void Add_animationname(FlatBufferBuilder builder, StringOffset AnimationnameOffset) { builder.AddOffset(14, AnimationnameOffset.Value, 0); }
  public static void Add_hitfxprefab(FlatBufferBuilder builder, StringOffset HitfxprefabOffset) { builder.AddOffset(15, HitfxprefabOffset.Value, 0); }
  public static void Add_level(FlatBufferBuilder builder, int Level) { builder.AddInt(16, Level, 0); }
  public static void Add_attacktype(FlatBufferBuilder builder, int Attacktype) { builder.AddInt(17, Attacktype, 0); }
  public static void Add_selectortype(FlatBufferBuilder builder, int Selectortype) { builder.AddInt(18, Selectortype, 0); }
  public static Offset<fb.skillconfigTR> EndskillconfigTR(FlatBufferBuilder builder) {
    int o = builder.EndTable();
    return new Offset<fb.skillconfigTR>(o);
  }

  public static VectorOffset CreateSortedVectorOfskillconfigTR(FlatBufferBuilder builder, Offset<skillconfigTR>[] offsets) {
    Array.Sort(offsets, (Offset<skillconfigTR> o1, Offset<skillconfigTR> o2) => builder.DataBuffer.GetInt(Table.__offset(4, o1.Value, builder.DataBuffer)).CompareTo(builder.DataBuffer.GetInt(Table.__offset(4, o2.Value, builder.DataBuffer))));
    return builder.CreateVectorOfTables(offsets);
  }

  public static skillconfigTR? __lookup_by_key(int vectorLocation, int key, ByteBuffer bb) {
    int span = bb.GetInt(vectorLocation - 4);
    int start = 0;
    while (span != 0) {
      int middle = span / 2;
      int tableOffset = Table.__indirect(vectorLocation + 4 * (start + middle), bb);
      int comp = bb.GetInt(Table.__offset(4, bb.Length - tableOffset, bb)).CompareTo(key);
      if (comp > 0) {
        span = middle;
      } else if (comp < 0) {
        middle++;
        start += middle;
        span -= middle;
      } else {
        return new skillconfigTR().__assign(tableOffset, bb);
      }
    }
    return null;
  }
};


}
