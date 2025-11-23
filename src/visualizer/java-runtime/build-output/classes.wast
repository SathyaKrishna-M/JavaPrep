(module
  (type $type0 (func (param i32)))
  (type $type1 (func (param i32) (result i32)))
  (type $type2 (func (result i32)))
  (type $type3 (func))
  (type $type4 (func (param i32) (result i64)))
  (type $type5 (func (param i32 i32) (result i32)))
  (type $type6 (func (param i32 i32)))
  (type $type7 (func (param i32 i32 i32)))
  (type $type8 (func (param i64)))
  (type $type9 (func (param i64) (result i32)))
  (type $type10 (func (param i64 i64) (result i64)))
  (type $type11 (func (result i64)))
  (type $type12 (func (result f64)))
  (type $type13 (func (param i64 i64) (result i32)))
  (type $type14 (func (param i32 i32 i32) (result i32)))
  (type $type15 (func (param i32 i32 i32 i32) (result i32)))
  (type $type16 (func (param i32 i32 i32 i32 i32)))
  (type $type17 (func (param i32 i32 i32 i32)))
  (type $type18 (func (param i32 i64)))
  (type $type19 (func (param i32 f32)))
  (type $type20 (func (param i32 f64)))
  (type $type21 (func (param i32) (result f32)))
  (type $type22 (func (param i32) (result f64)))

  ;; function #0
  (func $currentTimeMillis (import "teavm" "currentTimeMillis") (type $type12))

  ;; function #1
  (func $logString (import "teavm" "logString") (type $type0))

  ;; function #2
  (func $logInt (import "teavm" "logInt") (type $type0))

  ;; function #3
  (func $logOutOfMemory (import "teavm" "logOutOfMemory") (type $type3))

  ;; function #4
  (func $meth_jl_IndexOutOfBoundsException__init_ (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TIndexOutOfBoundsException.java:22
      (i32.store align=4
        (get_local 1)
        (i32.const 0))
      ;; org/teavm/classlib/java/lang/TIndexOutOfBoundsException.java:22
      (call $meth_jl_RuntimeException__init_
        (get_local 0))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/classlib/java/lang/TIndexOutOfBoundsException.java:23
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #5
  (func $meth_otr_RuntimeClass_getClass (type $type1)
    ;; org/teavm/runtime/RuntimeClass.java:79
    (return
      (i32.shl
        (i32.load align=4
          (get_local 0))
        (i32.const 3))))

  ;; function #6
  (func $meth_otr_GC_getRegionCount (type $type2)
    ;; org/teavm/runtime/GC.java:98
    (return
      ;; org/teavm/runtime/GC.java:98
      (i32.add
        ;; org/teavm/runtime/GC.java:98
        (i32.wrap/i64
          ;; org/teavm/runtime/GC.java:98
          (i64.div_s
            (i64.extend_u/i32
              (i32.load align=4
                (i32.const 4000)))
            ;; org/teavm/runtime/GC.java:98
            (i64.extend_s/i32
              (i32.const 1024))))
        (i32.const 1))))

  ;; function #7
  (func $meth_otr_GC_alloc (type $type1)
    (local i32 i32)
    (block i32
      ;; org/teavm/runtime/GC.java:102
      (set_local 1
        (i32.load align=4
          (i32.const 928)))
      ;; org/teavm/runtime/GC.java:103
      (set_local 2
        (i32.add
          (get_local 1)
          (get_local 0)))
      (if
        (i32.ge_u
          (i32.add
            (get_local 2)
            (i32.const 8))
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:104
            (i32.const 924)))
        (then
          ;; org/teavm/runtime/GC.java:105
          (call $meth_otr_GC_getNextChunk
            (get_local 0))
          ;; org/teavm/runtime/GC.java:106
          (set_local 1
            (i32.load align=4
              (i32.const 928)))
          ;; org/teavm/runtime/GC.java:107
          (set_local 2
            (i32.add
              (get_local 1)
              (get_local 0)))))
      ;; org/teavm/runtime/GC.java:109
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:109
        (i32.const 928)
        (get_local 2))
      ;; org/teavm/runtime/GC.java:110
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:110
        (i32.const 944)
        ;; org/teavm/runtime/GC.java:110
        (i32.sub
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:110
            (i32.const 944))
          (get_local 0)))
      (drop
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:112
      (return
        (get_local 1))))

  ;; function #8
  (func $meth_otr_GC_getNextChunk (type $type0)
    (block
      (if
        ;; org/teavm/runtime/GC.java:116
        (call $meth_otr_GC_getNextChunkIfPossible
          (get_local 0))
        (then
          ;; org/teavm/runtime/GC.java:117
          (return)))
      ;; org/teavm/runtime/GC.java:119
      (call $meth_otr_GC_collectGarbageImpl
        (get_local 0))
      (if
        ;; org/teavm/runtime/GC.java:120
        (i32.eq
          ;; org/teavm/runtime/GC.java:120
          (call $meth_otr_GC_hasAvailableMemory
            (get_local 0))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:121
          (call $meth_otr_GC_collectGarbageFullImpl
            (get_local 0))
          (if
            ;; org/teavm/runtime/GC.java:122
            (i32.eq
              ;; org/teavm/runtime/GC.java:122
              (call $meth_otr_GC_hasAvailableMemory
                (get_local 0))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:123
              (call $meth_otr_ExceptionHandling_printStack)
              (block
                (call $meth_otbw_WasmRuntime_printOutOfMemory)
                (unreachable))))))))

  ;; function #9
  (func $meth_otr_GC_hasAvailableMemory (type $type1)
    ;; org/teavm/runtime/GC.java:130
    (return
      (if i32
        ;; org/teavm/runtime/GC.java:130
        (block $block_0 i32
          (drop
            (br_if $block_0
              ;; org/teavm/runtime/GC.java:130
              (i32.const 0)
              ;; org/teavm/runtime/GC.java:130
              (i32.eq
                (i32.load offset=4 align=4
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:130
                    (i32.const 928)))
                (get_local 0))))
          ;; org/teavm/runtime/GC.java:130
          (block $block_1 i32
            (drop
              (br_if $block_1
                ;; org/teavm/runtime/GC.java:130
                (i32.const 0)
                ;; org/teavm/runtime/GC.java:130
                (i32.gt_s
                  (i32.load offset=4 align=4
                    (i32.load align=4
                      ;; org/teavm/runtime/GC.java:130
                      (i32.const 928)))
                  ;; org/teavm/runtime/GC.java:130
                  (i32.add
                    (get_local 0)
                    (i32.const 8)))))
            ;; org/teavm/runtime/GC.java:132
            (i32.eq
              ;; org/teavm/runtime/GC.java:132
              (call $meth_otr_GC_getNextChunkIfPossible
                (get_local 0))
              (i32.const 0))))
        (then
          (i32.const 0))
        (else
          (i32.const 1)))))

  ;; function #10
  (func $meth_otr_GC_getNextChunkIfPossible (type $type1)
    (local i32)
    (block i32
      (block $block_1
        (block $block_0
          (loop $block_2
            (if
              (i32.lt_u
                (i32.load align=4
                  ;; org/teavm/runtime/GC.java:137
                  (i32.const 928))
                (i32.load align=4
                  ;; org/teavm/runtime/GC.java:137
                  (i32.const 924)))
              (then
                ;; org/teavm/runtime/GC.java:138
                (i32.store align=4
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:138
                    (i32.const 928))
                  (i32.const 0))
                ;; org/teavm/runtime/GC.java:139
                (i32.store offset=4 align=4
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:139
                    (i32.const 928))
                  ;; org/teavm/runtime/GC.java:139
                  (i32.wrap/i64
                    ;; org/teavm/runtime/GC.java:139
                    (i64.sub
                      (i64.extend_u/i32
                        (i32.load align=4
                          ;; org/teavm/runtime/GC.java:139
                          (i32.const 924)))
                      (i64.extend_u/i32
                        (i32.load align=4
                          ;; org/teavm/runtime/GC.java:139
                          (i32.const 928))))))))
            ;; org/teavm/runtime/GC.java:141
            (set_local 1
              (i32.sub
                (i32.load align=4
                  ;; org/teavm/runtime/GC.java:141
                  (i32.const 936))
                (i32.const 1)))
            ;; org/teavm/runtime/GC.java:141
            (i32.store align=4
              ;; org/teavm/runtime/GC.java:141
              (i32.const 936)
              (get_local 1))
            (if
              (i32.eq
                (get_local 1)
                (i32.const 0))
              (then
                ;; org/teavm/runtime/GC.java:141
                (br $block_0)))
            ;; org/teavm/runtime/GC.java:144
            (i32.store align=4
              ;; org/teavm/runtime/GC.java:144
              (i32.const 932)
              (i32.add
                (i32.load align=4
                  ;; org/teavm/runtime/GC.java:144
                  (i32.const 932))
                (i32.mul
                  (i32.const 1)
                  (i32.const 4))))
            ;; org/teavm/runtime/GC.java:145
            (i32.store align=4
              ;; org/teavm/runtime/GC.java:145
              (i32.const 928)
              (i32.load align=4
                (i32.load align=4
                  ;; org/teavm/runtime/GC.java:145
                  (i32.const 932))))
            (if
              ;; org/teavm/runtime/GC.java:146
              (i32.ge_s
                (i32.load offset=4 align=4
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:146
                    (i32.const 928)))
                ;; org/teavm/runtime/GC.java:146
                (i32.add
                  (get_local 0)
                  (i32.const 8)))
              (then
                ;; org/teavm/runtime/GC.java:146
                (br $block_1)))
            (if
              ;; org/teavm/runtime/GC.java:146
              (i32.eq
                (i32.load offset=4 align=4
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:146
                    (i32.const 928)))
                (get_local 0))
              (then
                ;; org/teavm/runtime/GC.java:146
                (br $block_1)))
            ;; org/teavm/runtime/GC.java:150
            (i32.store align=4
              ;; org/teavm/runtime/GC.java:150
              (i32.const 944)
              ;; org/teavm/runtime/GC.java:150
              (i32.sub
                (i32.load align=4
                  ;; org/teavm/runtime/GC.java:150
                  (i32.const 944))
                (i32.load offset=4 align=4
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:150
                    (i32.const 928)))))
            (br $block_2)))
        ;; org/teavm/runtime/GC.java:142
        (return
          (i32.const 0)))
      ;; org/teavm/runtime/GC.java:147
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:147
        (i32.const 924)
        (i32.add
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:147
            (i32.const 928))
          (i32.load offset=4 align=4
            (i32.load align=4
              ;; org/teavm/runtime/GC.java:147
              (i32.const 928)))))
      ;; org/teavm/runtime/GC.java:152
      (return
        (i32.const 1))))

  ;; function #11
  (func $teavm_gc_collect (export "teavm_gc_collect") (type $type3)
    (block
      ;; org/teavm/runtime/GC.java:157
      (call $teavm_gc_fixHeap)
      ;; org/teavm/runtime/GC.java:158
      (call $meth_otr_GC_collectGarbageImpl
        (i32.const 0))))

  ;; function #12
  (func $teavm_gc_collectFull (export "teavm_gc_collectFull") (type $type3)
    (block
      ;; org/teavm/runtime/GC.java:163
      (call $teavm_gc_fixHeap)
      ;; org/teavm/runtime/GC.java:164
      (call $meth_otr_GC_collectGarbageFullImpl
        (i32.const 0))))

  ;; function #13
  (func $meth_otr_GC_collectGarbageFullImpl (type $type0)
    (block
      ;; org/teavm/runtime/GC.java:168
      (call $meth_otr_GC_triggerFullGC)
      ;; org/teavm/runtime/GC.java:169
      (call $meth_otr_GC_collectGarbageImpl
        (get_local 0))))

  ;; function #14
  (func $meth_otr_GC_triggerFullGC (type $type3)
    (local i32)
    (block
      ;; org/teavm/runtime/GC.java:173
      (i32.store8 align=1
        ;; org/teavm/runtime/GC.java:173
        (i32.const 960)
        (i32.const 1))
      ;; org/teavm/runtime/GC.java:174
      (set_local 0
        ;; org/teavm/runtime/GC.java:174
        (call $meth_otr_GC_getRegionCount))
      (call $meth_otbw_WasmRuntime_fill
        (i32.load align=4
          (i32.const 3992))
        (i32.const 0)
        ;; org/teavm/runtime/GC.java:175
        (call $meth_otr_GC_getRegionCount))
      (call $meth_otbw_WasmRuntime_fill
        (i32.load align=4
          (i32.const 3980))
        (i32.const 0)
        ;; org/teavm/runtime/GC.java:176
        (i32.mul
          (get_local 0)
          (i32.const 2)))))

  ;; function #15
  (func $meth_otr_GC_collectGarbageImpl (type $type0)
    (local i64 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:180
      (call $meth_otr_GC_doCollectGarbage)
      ;; org/teavm/runtime/GC.java:182
      (set_local 1
        (i64.const 0))
      (if
        ;; org/teavm/runtime/GC.java:183
        (i32.eq
          ;; org/teavm/runtime/GC.java:183
          (call $meth_otr_GC_hasAvailableChunk
            (get_local 0))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:184
          (set_local 1
            ;; org/teavm/runtime/GC.java:184
            (call $meth_otr_GC_computeMinRequestedSize
              (get_local 0)))))
      (if
        (i32.load8_s align=1
          ;; org/teavm/runtime/GC.java:187
          (i32.const 960))
        (then
          ;; org/teavm/runtime/GC.java:195
          (i32.store align=4
            ;; org/teavm/runtime/GC.java:195
            (i32.const 964)
            (i32.const 0)))
        (else
          ;; org/teavm/runtime/GC.java:188
          (set_local 2
            (if i32
              ;; org/teavm/runtime/GC.java:188
              (i32.eq
                ;; org/teavm/runtime/GC.java:188
                (i32.const 0)
                (i32.const 0))
              (then
                (i32.const 8))
              (else
                (i32.const 2))))
          ;; org/teavm/runtime/GC.java:189
          (set_local 3
            (i32.add
              (i32.load align=4
                ;; org/teavm/runtime/GC.java:189
                (i32.const 964))
              (i32.const 1)))
          ;; org/teavm/runtime/GC.java:189
          (i32.store align=4
            ;; org/teavm/runtime/GC.java:189
            (i32.const 964)
            (get_local 3))
          (if
            ;; org/teavm/runtime/GC.java:189
            (block $block_0 i32
              (drop
                (br_if $block_0
                  ;; org/teavm/runtime/GC.java:189
                  (i32.const 0)
                  ;; org/teavm/runtime/GC.java:189
                  (i32.lt_s
                    (get_local 3)
                    (get_local 2))))
              ;; org/teavm/runtime/GC.java:189
              (call $meth_otr_GC_isAboutToExpand
                (get_local 1)))
            (then
              ;; org/teavm/runtime/GC.java:190
              (call $meth_otr_GC_triggerFullGC)
              ;; org/teavm/runtime/GC.java:191
              (call $meth_otr_GC_doCollectGarbage)
              ;; org/teavm/runtime/GC.java:192
              (i32.store align=4
                ;; org/teavm/runtime/GC.java:192
                (i32.const 964)
                (i32.const 0))))))
      ;; org/teavm/runtime/GC.java:197
      (i32.store8 align=1
        ;; org/teavm/runtime/GC.java:197
        (i32.const 960)
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:199
      (call $meth_otr_GC_resizeHeapIfNecessary
        (get_local 1))
      ;; org/teavm/runtime/GC.java:200
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:200
        (i32.const 928)
        (i32.load align=4
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:200
            (i32.const 932))))
      ;; org/teavm/runtime/GC.java:201
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:201
        (i32.const 924)
        (i32.add
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:201
            (i32.const 928))
          (i32.load offset=4 align=4
            (i32.load align=4
              ;; org/teavm/runtime/GC.java:201
              (i32.const 928)))))
      (call $meth_otbw_WasmRuntime_fill
        (i32.load align=4
          (i32.const 3992))
        (i32.const 1)
        ;; org/teavm/runtime/GC.java:203
        (call $meth_otr_GC_getRegionCount))))

  ;; function #16
  (func $meth_otr_GC_doCollectGarbage (type $type3)
    (block
      (drop
        (i32.const 0))
      (if
        (i32.eq
          (i32.load8_s align=1
            ;; org/teavm/runtime/GC.java:208
            (i32.const 960))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:209
          (call $meth_otr_GC_storeGapsInCardTable)))
      ;; org/teavm/runtime/GC.java:211
      (call $meth_otr_GC_mark)
      ;; org/teavm/runtime/GC.java:212
      (call $meth_otr_GC_processReferences)
      ;; org/teavm/runtime/GC.java:213
      (call $meth_otr_GC_sweep)
      ;; org/teavm/runtime/GC.java:214
      (call $meth_otr_GC_defragment)
      ;; org/teavm/runtime/GC.java:215
      (call $meth_otr_GC_updateFreeMemory)
      (drop
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:217
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:217
        (i32.const 940)
        (i32.load align=4
          ;; org/teavm/runtime/GC.java:217
          (i32.const 936)))))

  ;; function #17
  (func $meth_otr_GC_hasAvailableChunk (type $type1)
    (local i32 i32)
    (block i32
      (if
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:222
          (return
            (i32.const 1))))
      ;; org/teavm/runtime/GC.java:224
      (set_local 1
        (i32.load align=4
          (i32.const 932)))
      ;; org/teavm/runtime/GC.java:225
      (set_local 2
        (i32.const 0))
      (block $block_1
        (block $block_0
          (loop $block_2
            (br_if $block_0
              ;; org/teavm/runtime/GC.java:225
              (i32.ge_s
                (get_local 2)
                (i32.load align=4
                  ;; org/teavm/runtime/GC.java:225
                  (i32.const 936))))
            (if
              ;; org/teavm/runtime/GC.java:226
              (i32.eq
                (get_local 0)
                (i32.load offset=4 align=4
                  (i32.load align=4
                    (get_local 1))))
              (then
                ;; org/teavm/runtime/GC.java:226
                (br $block_1)))
            (if
              ;; org/teavm/runtime/GC.java:226
              (i32.le_s
                ;; org/teavm/runtime/GC.java:226
                (i32.add
                  (get_local 0)
                  (i32.const 8))
                (i32.load offset=4 align=4
                  (i32.load align=4
                    (get_local 1))))
              (then
                ;; org/teavm/runtime/GC.java:226
                (br $block_1)))
            ;; org/teavm/runtime/GC.java:229
            (set_local 1
              (i32.add
                (get_local 1)
                (i32.mul
                  (i32.const 1)
                  (i32.const 4))))
            ;; org/teavm/runtime/GC.java:225
            (set_local 2
              (i32.add
                (get_local 2)
                (i32.const 1)))
            (br $block_2)))
        ;; org/teavm/runtime/GC.java:231
        (return
          (i32.const 0)))
      ;; org/teavm/runtime/GC.java:227
      (return
        (i32.const 1))))

  ;; function #18
  (func $meth_otr_GC_computeMinRequestedSize (type $type4)
    (block i64
      (if
        (i32.eq
          (i32.load align=4
            (i32.load align=4
              ;; org/teavm/runtime/GC.java:235
              (i32.const 952)))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:236
          (set_local 0
            (i32.sub
              (get_local 0)
              (i32.load offset=4 align=4
                (i32.load align=4
                  ;; org/teavm/runtime/GC.java:236
                  (i32.const 952)))))))
      ;; org/teavm/runtime/GC.java:238
      (return
        ;; org/teavm/runtime/GC.java:238
        (i64.add
          (i64.extend_u/i32
            (i32.load align=4
              (i32.const 4000)))
          ;; org/teavm/runtime/GC.java:238
          (i64.extend_s/i32
            (get_local 0))))))

  ;; function #19
  (func $teavm_gc_fixHeap (export "teavm_gc_fixHeap") (type $type3)
    (block
      (if
        ;; org/teavm/runtime/GC.java:243
        (i32.gt_s
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:243
            (i32.const 936))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:244
          (i32.store align=4
            (i32.load align=4
              ;; org/teavm/runtime/GC.java:244
              (i32.const 928))
            (i32.const 0))
          ;; org/teavm/runtime/GC.java:245
          (i32.store offset=4 align=4
            (i32.load align=4
              ;; org/teavm/runtime/GC.java:245
              (i32.const 928))
            ;; org/teavm/runtime/GC.java:245
            (i32.wrap/i64
              ;; org/teavm/runtime/GC.java:245
              (i64.sub
                (i64.extend_u/i32
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:245
                    (i32.const 924)))
                (i64.extend_u/i32
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:245
                    (i32.const 928))))))))))

  ;; function #20
  (func $teavm_gc_tryShrink (export "teavm_gc_tryShrink") (type $type3)
    (local i64)
    (block
      ;; org/teavm/runtime/GC.java:251
      (set_local 0
        (i64.extend_u/i32
          (i32.load align=4
            (i32.const 4000))))
      (if
        ;; org/teavm/runtime/GC.java:253
        (i64.lt_s
          ;; org/teavm/runtime/GC.java:252
          (i64.sub
            (get_local 0)
            ;; org/teavm/runtime/GC.java:252
            (i64.extend_s/i32
              (i32.load align=4
                ;; org/teavm/runtime/GC.java:252
                (i32.const 944))))
          ;; org/teavm/runtime/GC.java:253
          (i64.div_s
            (get_local 0)
            (i64.const 4)))
        (then
          ;; org/teavm/runtime/GC.java:254
          (call $teavm_gc_collectFull)))))

  ;; function #21
  (func $meth_otr_GC_mark (type $type3)
    (block
      (drop
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:260
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:260
        (i32.const 948)
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:262
      (call $meth_otr_GC_markFromStaticFields)
      ;; org/teavm/runtime/GC.java:263
      (call $meth_otr_GC_markFromClasses)
      ;; org/teavm/runtime/GC.java:264
      (call $meth_otr_GC_markFromStack)
      (if
        (i32.eq
          (i32.load8_s align=1
            ;; org/teavm/runtime/GC.java:265
            (i32.const 960))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:266
          (call $meth_otr_GC_markFromOldGeneration)))
      (drop
        (i32.const 0))))

  ;; function #22
  (func $meth_otr_GC_markFromStaticFields (type $type3)
    (local i32 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:273
      (set_local 0
        (i32.const 24224))
      ;; org/teavm/runtime/GC.java:274
      (set_local 1
        (i32.load align=4
          (get_local 0)))
      ;; org/teavm/runtime/GC.java:275
      (set_local 2
        (i32.add
          (get_local 0)
          (i32.const 4)))
      (block $block_0
        (loop $block_1
          ;; org/teavm/runtime/GC.java:276
          (set_local 3
            (i32.add
              (get_local 1)
              (i32.const -1)))
          (if
            ;; org/teavm/runtime/GC.java:276
            (i32.le_s
              (get_local 1)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:276
              (br $block_0)))
          ;; org/teavm/runtime/GC.java:277
          (set_local 4
            (i32.load align=4
              (i32.load align=4
                (get_local 2))))
          (if
            ;; org/teavm/runtime/GC.java:278
            (i32.ne
              (get_local 4)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:279
              (call $meth_otr_GC_mark_0
                (get_local 4))))
          ;; org/teavm/runtime/GC.java:281
          (set_local 2
            (i32.add
              (get_local 2)
              (i32.const 4)))
          ;; org/teavm/runtime/GC.java:281
          (set_local 1
            (get_local 3))
          (br $block_1)))))

  ;; function #23
  (func $meth_otr_GC_markFromClasses (type $type3)
    (local i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:286
      (set_local 0
        (i32.const 66))
      ;; org/teavm/runtime/GC.java:287
      (set_local 1
        (i32.const 24320))
      ;; org/teavm/runtime/GC.java:288
      (set_local 2
        (i32.const 0))
      (block $block_0
        (loop $block_1
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:288
            (i32.ge_s
              (get_local 2)
              (get_local 0)))
          ;; org/teavm/runtime/GC.java:289
          (set_local 3
            (i32.load align=4
              (get_local 1)))
          (if
            ;; org/teavm/runtime/GC.java:290
            (i32.ne
              (i32.load offset=80 align=4
                (get_local 3))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:291
              (call $meth_otr_GC_mark_0
                (i32.load offset=80 align=4
                  (get_local 3)))))
          (if
            ;; org/teavm/runtime/GC.java:293
            (i32.ne
              (i32.load offset=84 align=4
                (get_local 3))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:294
              (call $meth_otr_GC_mark_0
                (i32.load offset=84 align=4
                  (get_local 3)))))
          (if
            ;; org/teavm/runtime/GC.java:296
            (i32.ne
              (i32.load offset=28 align=4
                (get_local 3))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:297
              (call $meth_otr_GC_mark_0
                (i32.load offset=28 align=4
                  (get_local 3)))))
          ;; org/teavm/runtime/GC.java:299
          (set_local 1
            (i32.add
              (get_local 1)
              (i32.const 4)))
          ;; org/teavm/runtime/GC.java:288
          (set_local 2
            (i32.add
              (get_local 2)
              (i32.const 1)))
          (br $block_1)))))

  ;; function #24
  (func $meth_otr_GC_markFromStack (type $type3)
    (local i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:304
      (set_local 0
        (call $meth_otbw_WasmRuntime_getStackTop))
      (block $block_0
        (loop $block_3
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:304
            (i32.eq
              (get_local 0)
              (i32.const 0)))
          ;; org/teavm/runtime/GC.java:306
          (set_local 1
            (call $meth_otbw_WasmRuntime_getStackRootCount
              (get_local 0)))
          ;; org/teavm/runtime/GC.java:307
          (set_local 2
            (call $meth_otbw_WasmRuntime_getStackRootPointer
              (get_local 0)))
          (block $block_1
            (loop $block_2
              ;; org/teavm/runtime/GC.java:308
              (set_local 3
                (i32.add
                  (get_local 1)
                  (i32.const -1)))
              (if
                ;; org/teavm/runtime/GC.java:308
                (i32.le_s
                  (get_local 1)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/GC.java:308
                  (br $block_1)))
              ;; org/teavm/runtime/GC.java:310
              (call $meth_otr_GC_mark_0
                (i32.load align=4
                  (get_local 2)))
              ;; org/teavm/runtime/GC.java:311
              (set_local 2
                (i32.add
                  (get_local 2)
                  (i32.const 4)))
              ;; org/teavm/runtime/GC.java:311
              (set_local 1
                (get_local 3))
              (br $block_2)))
          ;; org/teavm/runtime/GC.java:305
          (set_local 0
            (call $meth_otbw_WasmRuntime_getNextStackFrame
              (get_local 0)))
          (br $block_3)))))

  ;; function #25
  (func $meth_otr_GC_markFromOldGeneration (type $type3)
    (local i32 i32 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:318
      (set_local 0
        ;; org/teavm/runtime/GC.java:318
        (call $meth_otr_GC_getRegionCount))
      ;; org/teavm/runtime/GC.java:319
      (set_local 1
        (i32.const 1024))
      ;; org/teavm/runtime/GC.java:321
      (set_local 2
        (i32.load align=4
          (i32.const 3992)))
      ;; org/teavm/runtime/GC.java:322
      (set_local 3
        (i32.load align=4
          (i32.const 3996)))
      ;; org/teavm/runtime/GC.java:324
      (set_local 4
        (i32.const 0))
      (block $block_0
        (loop $block_3
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:324
            (i32.ge_s
              (get_local 4)
              ;; org/teavm/runtime/GC.java:324
              (i32.sub
                (get_local 0)
                (i32.const 3))))
          (block $block_1
            (if
              ;; org/teavm/runtime/GC.java:326
              (i32.ne
                ;; org/teavm/runtime/GC.java:326
                (i32.and
                  (i32.load align=4
                    (get_local 2))
                  (i32.const 16843009))
                (i32.const 16843009))
              (then
                ;; org/teavm/runtime/GC.java:327
                (set_local 5
                  (i32.const 0))
                (loop $block_2
                  (if
                    ;; org/teavm/runtime/GC.java:327
                    (i32.ge_s
                      (get_local 5)
                      (i32.const 4))
                    (then
                      ;; org/teavm/runtime/GC.java:327
                      (br $block_1)))
                  (if
                    ;; org/teavm/runtime/GC.java:329
                    (i32.eq
                      ;; org/teavm/runtime/GC.java:329
                      (i32.and
                        (i32.load8_s align=1
                          (i32.add
                            (get_local 2)
                            (get_local 5)))
                        (i32.const 1))
                      (i32.const 0))
                    (then
                      ;; org/teavm/runtime/GC.java:330
                      (call $meth_otr_GC_markFromRegion
                        ;; org/teavm/runtime/GC.java:330
                        (i32.add
                          (get_local 4)
                          (get_local 5)))))
                  ;; org/teavm/runtime/GC.java:327
                  (set_local 5
                    (i32.add
                      (get_local 5)
                      (i32.const 1)))
                  (br $block_2)))))
          ;; org/teavm/runtime/GC.java:334
          (set_local 2
            (i32.add
              (get_local 2)
              (i32.const 4)))
          ;; org/teavm/runtime/GC.java:335
          (set_local 3
            (i32.add
              (get_local 3)
              ;; org/teavm/runtime/GC.java:335
              (i32.mul
                (i32.const 4)
                (get_local 1))))
          ;; org/teavm/runtime/GC.java:324
          (set_local 4
            (i32.add
              (get_local 4)
              (i32.const 4)))
          (br $block_3)))
      (block $block_4
        (loop $block_5
          (br_if $block_4
            ;; org/teavm/runtime/GC.java:338
            (i32.ge_s
              (get_local 4)
              (get_local 0)))
          (if
            ;; org/teavm/runtime/GC.java:339
            (i32.eq
              ;; org/teavm/runtime/GC.java:339
              (i32.and
                (i32.load8_s align=1
                  (get_local 2))
                (i32.const 1))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:340
              (call $meth_otr_GC_markFromRegion
                (get_local 4))))
          ;; org/teavm/runtime/GC.java:342
          (set_local 2
            (i32.add
              (get_local 2)
              (i32.const 1)))
          ;; org/teavm/runtime/GC.java:338
          (set_local 4
            (i32.add
              (get_local 4)
              (i32.const 1)))
          (br $block_5)))))

  ;; function #26
  (func $meth_otr_GC_markFromRegion (type $type0)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:347
      (set_local 1
        (i32.add
          (i32.load align=4
            (i32.const 3992))
          (get_local 0)))
      ;; org/teavm/runtime/GC.java:348
      (set_local 2
        (i32.load16_s align=2
          (i32.add
            (i32.load align=4
              (i32.const 3980))
            (i32.mul
              (get_local 0)
              (i32.const 2)))))
      (if
        (i32.eq
          (get_local 2)
          (i32.const 0))
        (then
          (i32.store8 align=1
            (get_local 1)
            ;; org/teavm/runtime/GC.java:350
            (i32.shr_s
              ;; org/teavm/runtime/GC.java:350
              (i32.shl
                ;; org/teavm/runtime/GC.java:350
                (i32.or
                  (i32.load8_s align=1
                    (get_local 1))
                  (i32.const 1))
                (i32.const 24))
              (i32.const 24)))
          ;; org/teavm/runtime/GC.java:351
          (return)))
      ;; org/teavm/runtime/GC.java:353
      (set_local 3
        (i32.add
          (get_local 2)
          (i32.const -1)))
      ;; org/teavm/runtime/GC.java:355
      (set_local 4
        (i32.const 1024))
      ;; org/teavm/runtime/GC.java:356
      (set_local 5
        (i32.add
          (i32.load align=4
            (i32.const 3996))
          ;; org/teavm/runtime/GC.java:356
          (i32.mul
            (get_local 0)
            (get_local 4))))
      (drop
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:358
      (set_local 6
        (i32.add
          (get_local 5)
          (get_local 4)))
      ;; org/teavm/runtime/GC.java:359
      (set_local 7
        (i32.add
          (get_local 5)
          (get_local 3)))
      ;; org/teavm/runtime/GC.java:360
      (set_local 8
        (i32.add
          (i32.load align=4
            (i32.const 3996))
          (i32.wrap/i64
            (i64.extend_u/i32
              (i32.load align=4
                (i32.const 4000))))))
      (if
        (i32.ge_u
          (get_local 8)
          (get_local 6))
        (then
          ;; org/teavm/runtime/GC.java:361
          (set_local 8
            (get_local 6))))
      ;; org/teavm/runtime/GC.java:365
      (set_local 9
        (i32.const 0))
      (block $block_0
        (loop $block_2
          (br_if $block_0
            (i32.ge_u
              (get_local 7)
              (get_local 8)))
          ;; org/teavm/runtime/GC.java:367
          (set_local 10
            (i32.load align=4
              (get_local 7)))
          (if
            (block $block_1 i32
              (drop
                (br_if $block_1
                  (i32.const 0)
                  (i32.eq
                    (get_local 10)
                    (i32.const 0))))
              ;; org/teavm/runtime/GC.java:369
              (i32.and
                (get_local 10)
                (i32.const 1073741824)))
            (then
              ;; org/teavm/runtime/GC.java:370
              (set_local 9
                (i32.or
                  (get_local 9)
                  ;; org/teavm/runtime/GC.java:370
                  (call $meth_otr_GC_doMarkOldGeneration
                    (get_local 7))))))
          ;; org/teavm/runtime/GC.java:373
          (set_local 7
            (i32.add
              (get_local 7)
              ;; org/teavm/runtime/GC.java:373
              (call $meth_otr_GC_objectSize
                (get_local 7))))
          (br $block_2)))
      (if
        (i32.eq
          (get_local 9)
          (i32.const 0))
        (then
          (i32.store8 align=1
            (get_local 1)
            ;; org/teavm/runtime/GC.java:377
            (i32.shr_s
              ;; org/teavm/runtime/GC.java:377
              (i32.shl
                ;; org/teavm/runtime/GC.java:377
                (i32.or
                  (i32.load8_s align=1
                    (get_local 1))
                  (i32.const 1))
                (i32.const 24))
              (i32.const 24)))))))

  ;; function #27
  (func $meth_otr_GC_mark_0 (type $type0)
    (block
      (if
        ;; org/teavm/runtime/GC.java:382
        (block $block_0 i32
          (drop
            (br_if $block_0
              ;; org/teavm/runtime/GC.java:382
              (i32.const 0)
              ;; org/teavm/runtime/GC.java:382
              (i32.eq
                (get_local 0)
                (i32.const 0))))
          ;; org/teavm/runtime/GC.java:382
          (i32.eq
            ;; org/teavm/runtime/GC.java:382
            (call $meth_otr_GC_isMarked
              (get_local 0))
            (i32.const 0)))
        (then
          ;; org/teavm/runtime/GC.java:385
          (call $meth_otr_MarkQueue_init)
          ;; org/teavm/runtime/GC.java:386
          (drop
            (call $meth_otr_GC_enqueueMark
              (get_local 0)))
          ;; org/teavm/runtime/GC.java:387
          (call $meth_otr_GC_doProcessMarkQueue)
          ;; org/teavm/runtime/GC.java:388
          (return)))))

  ;; function #28
  (func $meth_otr_GC_doMarkOldGeneration (type $type1)
    (local i32)
    (block i32
      ;; org/teavm/runtime/GC.java:391
      (call $meth_otr_MarkQueue_init)
      ;; org/teavm/runtime/GC.java:392
      (set_local 1
        ;; org/teavm/runtime/GC.java:392
        (call $meth_otr_GC_markObjectData
          (get_local 0)))
      ;; org/teavm/runtime/GC.java:393
      (call $meth_otr_GC_doProcessMarkQueue)
      ;; org/teavm/runtime/GC.java:394
      (return
        (get_local 1))))

  ;; function #29
  (func $meth_otr_GC_doProcessMarkQueue (type $type3)
    (local i32 i64 i32 i32 i32)
    (block
      (block $block_0
        (loop $block_2
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:398
            (i32.ne
              ;; org/teavm/runtime/GC.java:398
              (call $meth_otr_MarkQueue_isEmpty)
              (i32.const 0)))
          ;; org/teavm/runtime/GC.java:399
          (set_local 0
            ;; org/teavm/runtime/GC.java:399
            (call $meth_otr_MarkQueue_dequeue))
          (drop
            (i32.const 0))
          ;; org/teavm/runtime/GC.java:402
          (set_local 1
            (i64.sub
              (i64.extend_u/i32
                (get_local 0))
              (i64.extend_u/i32
                (i32.load align=4
                  (i32.const 3996)))))
          ;; org/teavm/runtime/GC.java:403
          (set_local 2
            (i32.add
              (i32.load align=4
                (i32.const 3980))
              (i32.mul
                ;; org/teavm/runtime/GC.java:403
                (i32.wrap/i64
                  ;; org/teavm/runtime/GC.java:403
                  (i64.div_s
                    (get_local 1)
                    ;; org/teavm/runtime/GC.java:403
                    (i64.extend_s/i32
                      (i32.const 1024))))
                (i32.const 2))))
          ;; org/teavm/runtime/GC.java:404
          (set_local 3
            (i32.shr_s
              (i32.shl
                ;; org/teavm/runtime/GC.java:404
                (i32.wrap/i64
                  ;; org/teavm/runtime/GC.java:404
                  (i64.add
                    ;; org/teavm/runtime/GC.java:404
                    (i64.rem_s
                      (get_local 1)
                      ;; org/teavm/runtime/GC.java:404
                      (i64.extend_s/i32
                        (i32.const 1024)))
                    (i64.const 1)))
                (i32.const 16))
              (i32.const 16)))
          (if
            ;; org/teavm/runtime/GC.java:405
            (i32.eq
              ;; org/teavm/runtime/GC.java:405
              (block $block_1 i32
                (drop
                  (br_if $block_1
                    ;; org/teavm/runtime/GC.java:405
                    (i32.const 0)
                    (i32.eq
                      (i32.load16_s align=2
                        (get_local 2))
                      (i32.const 0))))
                ;; org/teavm/runtime/GC.java:405
                (i32.le_s
                  (i32.load16_s align=2
                    (get_local 2))
                  (get_local 3)))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:406
              (i32.store16 align=2
                (get_local 2)
                (get_local 3))))
          ;; org/teavm/runtime/GC.java:408
          (set_local 4
            (i32.add
              (i32.load align=4
                (i32.const 3992))
              (i32.wrap/i64
                ;; org/teavm/runtime/GC.java:408
                (i64.div_s
                  (get_local 1)
                  ;; org/teavm/runtime/GC.java:408
                  (i64.extend_s/i32
                    (i32.const 1024))))))
          (i32.store8 align=1
            (get_local 4)
            ;; org/teavm/runtime/GC.java:409
            (i32.shr_s
              ;; org/teavm/runtime/GC.java:409
              (i32.shl
                ;; org/teavm/runtime/GC.java:409
                (i32.or
                  (i32.load8_s align=1
                    (get_local 4))
                  (i32.const 2))
                (i32.const 24))
              (i32.const 24)))
          ;; org/teavm/runtime/GC.java:411
          (drop
            (call $meth_otr_GC_markObjectData
              (get_local 0)))
          (br $block_2)))))

  ;; function #30
  (func $meth_otr_GC_markObjectData (type $type1)
    (local i32)
    (block i32
      ;; org/teavm/runtime/GC.java:416
      (set_local 1
        ;; org/teavm/runtime/GC.java:416
        (call $meth_otr_RuntimeClass_getClass
          (get_local 0)))
      (if
        ;; org/teavm/runtime/GC.java:417
        (i32.eq
          (i32.load offset=32 align=4
            (get_local 1))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:418
          (return
            ;; org/teavm/runtime/GC.java:418
            (call $meth_otr_GC_markObject
              (get_local 1)
              (get_local 0)))))
      ;; org/teavm/runtime/GC.java:420
      (return
        ;; org/teavm/runtime/GC.java:420
        (call $meth_otr_GC_markArray
          (get_local 1)
          (get_local 0)))))

  ;; function #31
  (func $meth_otr_GC_markObject (type $type5)
    (local i32)
    (block i32
      ;; org/teavm/runtime/GC.java:425
      (set_local 2
        (i32.const 0))
      (block $block_0
        (loop $block_5
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:426
            (i32.eq
              (get_local 0)
              (i32.const 0)))
          (block $block_4
            (block
              (block $block_3
                (block $block_2
                  (block $block_1
                    (br_table $block_1 $block_2 $block_3
                      (i32.sub
                        ;; org/teavm/runtime/GC.java:427
                        (i32.and
                          ;; org/teavm/runtime/GC.java:427
                          (i32.shr_s
                            (i32.load offset=12 align=4
                              (get_local 0))
                            (i32.const 7))
                          (i32.const 7))
                        (i32.const 1))))
                  ;; org/teavm/runtime/GC.java:430
                  (set_local 2
                    (i32.or
                      (get_local 2)
                      ;; org/teavm/runtime/GC.java:430
                      (call $meth_otr_GC_markWeakReference
                        (get_local 1))))
                  ;; org/teavm/runtime/GC.java:431
                  (br $block_4))
                ;; org/teavm/runtime/GC.java:434
                (set_local 2
                  (i32.or
                    (get_local 2)
                    ;; org/teavm/runtime/GC.java:434
                    (call $meth_otr_GC_markReferenceQueue
                      (get_local 1))))
                ;; org/teavm/runtime/GC.java:435
                (br $block_4)))
            ;; org/teavm/runtime/GC.java:438
            (set_local 2
              (i32.or
                (get_local 2)
                ;; org/teavm/runtime/GC.java:438
                (call $meth_otr_GC_markFields
                  (get_local 0)
                  (get_local 1)))))
          ;; org/teavm/runtime/GC.java:441
          (set_local 0
            (i32.load offset=56 align=4
              (get_local 0)))
          (br $block_5)))
      ;; org/teavm/runtime/GC.java:443
      (return
        (get_local 2))))

  ;; function #32
  (func $meth_otr_GC_markWeakReference (type $type1)
    (local i32)
    (block i32
      ;; org/teavm/runtime/GC.java:447
      (set_local 1
        (i32.const 0))
      (if
        ;; org/teavm/runtime/GC.java:448
        (i32.ne
          (i32.load offset=8 align=4
            (get_local 0))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:449
          (set_local 1
            (i32.or
              (get_local 1)
              ;; org/teavm/runtime/GC.java:449
              (call $meth_otr_GC_enqueueMark
                (i32.load offset=8 align=4
                  (get_local 0)))))
          (if
            ;; org/teavm/runtime/GC.java:450
            (block $block_0 i32
              (drop
                (br_if $block_0
                  ;; org/teavm/runtime/GC.java:450
                  (i32.const 0)
                  ;; org/teavm/runtime/GC.java:450
                  (i32.eq
                    (i32.load offset=16 align=4
                      (get_local 0))
                    (i32.const 0))))
              ;; org/teavm/runtime/GC.java:450
              (i32.ne
                (i32.load offset=12 align=4
                  (get_local 0))
                (i32.const 0)))
            (then
              ;; org/teavm/runtime/GC.java:451
              (set_local 1
                (i32.or
                  (get_local 1)
                  ;; org/teavm/runtime/GC.java:451
                  (call $meth_otr_GC_enqueueMark
                    (i32.load offset=12 align=4
                      (get_local 0)))))))))
      (if
        ;; org/teavm/runtime/GC.java:454
        (i32.ne
          (i32.load offset=16 align=4
            (get_local 0))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:455
          (set_local 1
            (i32.or
              (get_local 1)
              ;; org/teavm/runtime/GC.java:455
              (call $meth_otr_GC_enqueueMark
                (i32.load offset=16 align=4
                  (get_local 0))))))
        (else
          (if
            ;; org/teavm/runtime/GC.java:456
            (i32.ne
              (i32.load offset=12 align=4
                (get_local 0))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:457
              (i32.store offset=16 align=4
                (get_local 0)
                (i32.load align=4
                  ;; org/teavm/runtime/GC.java:457
                  (i32.const 948)))
              ;; org/teavm/runtime/GC.java:458
              (i32.store align=4
                ;; org/teavm/runtime/GC.java:458
                (i32.const 948)
                (get_local 0))))))
      ;; org/teavm/runtime/GC.java:460
      (return
        (get_local 1))))

  ;; function #33
  (func $meth_otr_GC_markReferenceQueue (type $type1)
    (local i32 i32)
    (block i32
      ;; org/teavm/runtime/GC.java:464
      (set_local 1
        (i32.load offset=8 align=4
          (get_local 0)))
      ;; org/teavm/runtime/GC.java:465
      (set_local 2
        (i32.const 0))
      (if
        ;; org/teavm/runtime/GC.java:466
        (i32.ne
          (get_local 1)
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:467
          (set_local 2
            (i32.or
              (get_local 2)
              ;; org/teavm/runtime/GC.java:467
              (call $meth_otr_GC_enqueueMark
                (get_local 1))))))
      ;; org/teavm/runtime/GC.java:469
      (return
        (get_local 2))))

  ;; function #34
  (func $meth_otr_GC_markFields (type $type5)
    (local i32 i32 i32 i32 i32)
    (block i32
      ;; org/teavm/runtime/GC.java:473
      (set_local 2
        (i32.load offset=72 align=4
          (get_local 0)))
      (if
        ;; org/teavm/runtime/GC.java:474
        (i32.eq
          (get_local 2)
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:475
          (return
            (i32.const 0))))
      ;; org/teavm/runtime/GC.java:477
      (set_local 3
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:478
      (set_local 4
        (i32.load16_s align=2
          (get_local 2)))
      (block $block_0
        (loop $block_1
          ;; org/teavm/runtime/GC.java:479
          (set_local 5
            (i32.shr_s
              (i32.shl
                ;; org/teavm/runtime/GC.java:479
                (i32.sub
                  (get_local 4)
                  (i32.const 1))
                (i32.const 16))
              (i32.const 16)))
          (if
            ;; org/teavm/runtime/GC.java:479
            (i32.le_s
              (get_local 4)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:479
              (br $block_0)))
          ;; org/teavm/runtime/GC.java:480
          (set_local 2
            (i32.add
              (get_local 2)
              (i32.const 2)))
          ;; org/teavm/runtime/GC.java:481
          (set_local 6
            (i32.load16_s align=2
              (get_local 2)))
          ;; org/teavm/runtime/GC.java:483
          (set_local 3
            (i32.or
              (get_local 3)
              ;; org/teavm/runtime/GC.java:483
              (call $meth_otr_GC_enqueueMark
                (i32.load align=4
                  (i32.add
                    (get_local 1)
                    (get_local 6))))))
          ;; org/teavm/runtime/GC.java:483
          (set_local 4
            (get_local 5))
          (br $block_1)))
      ;; org/teavm/runtime/GC.java:485
      (return
        (get_local 3))))

  ;; function #35
  (func $meth_otr_GC_markArray (type $type5)
    (local i32 i32 i32)
    (block i32
      (if
        ;; org/teavm/runtime/GC.java:489
        (i32.and
          (i32.load offset=12 align=4
            (i32.load offset=32 align=4
              (get_local 0)))
          (i32.const 2))
        (then
          ;; org/teavm/runtime/GC.java:490
          (return
            (i32.const 0))))
      ;; org/teavm/runtime/GC.java:492
      (set_local 2
        (call $meth_otbw_WasmRuntime_align
          (i32.add
            (get_local 1)
            (i32.mul
              (i32.const 1)
              (i32.const 12)))
          (i32.const 4)))
      ;; org/teavm/runtime/GC.java:493
      (set_local 3
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:494
      (set_local 4
        (i32.const 0))
      (block $block_0
        (loop $block_1
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:494
            (i32.ge_s
              (get_local 4)
              (i32.load offset=8 align=4
                (get_local 1))))
          ;; org/teavm/runtime/GC.java:496
          (set_local 3
            (i32.or
              (get_local 3)
              ;; org/teavm/runtime/GC.java:496
              (call $meth_otr_GC_enqueueMark
                (i32.load align=4
                  (get_local 2)))))
          ;; org/teavm/runtime/GC.java:497
          (set_local 2
            (i32.add
              (get_local 2)
              (i32.const 4)))
          ;; org/teavm/runtime/GC.java:494
          (set_local 4
            (i32.add
              (get_local 4)
              (i32.const 1)))
          (br $block_1)))
      ;; org/teavm/runtime/GC.java:499
      (return
        (get_local 3))))

  ;; function #36
  (func $meth_otr_GC_enqueueMark (type $type1)
    (block i32
      (if
        ;; org/teavm/runtime/GC.java:503
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:504
          (return
            (i32.const 0))))
      (if
        ;; org/teavm/runtime/GC.java:506
        (i32.eq
          ;; org/teavm/runtime/GC.java:506
          (call $meth_otr_GC_isMarked
            (get_local 0))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:507
          (call $meth_otr_GC_doEnqueueMark
            (get_local 0))
          ;; org/teavm/runtime/GC.java:508
          (return
            (i32.const 1))))
      ;; org/teavm/runtime/GC.java:510
      (return
        (if i32
          ;; org/teavm/runtime/GC.java:510
          (i32.and
            (i32.load align=4
              (get_local 0))
            (i32.const 1073741824))
          (then
            (i32.const 0))
          (else
            (i32.const 1))))))

  ;; function #37
  (func $meth_otr_GC_doEnqueueMark (type $type0)
    (block
      (if
        (i32.eq
          (i32.load8_s align=1
            ;; org/teavm/runtime/GC.java:515
            (i32.const 960))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:518
          (i32.store align=4
            (get_local 0)
            ;; org/teavm/runtime/GC.java:518
            (i32.or
              (i32.load align=4
                (get_local 0))
              (i32.const -2147483648))))
        (else
          ;; org/teavm/runtime/GC.java:516
          (i32.store align=4
            (get_local 0)
            ;; org/teavm/runtime/GC.java:516
            (i32.or
              (i32.load align=4
                (get_local 0))
              (i32.const -1073741824)))))
      ;; org/teavm/runtime/GC.java:520
      (call $meth_otr_MarkQueue_enqueue
        (get_local 0))))

  ;; function #38
  (func $meth_otr_GC_processReferences (type $type3)
    (local i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:524
      (set_local 0
        (i32.load align=4
          (i32.const 948)))
      (block $block_0
        (loop $block_1
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:525
            (i32.eq
              (get_local 0)
              (i32.const 0)))
          ;; org/teavm/runtime/GC.java:526
          (set_local 1
            (i32.load offset=16 align=4
              (get_local 0)))
          ;; org/teavm/runtime/GC.java:527
          (i32.store offset=16 align=4
            (get_local 0)
            (i32.const 0))
          (if
            ;; org/teavm/runtime/GC.java:528
            (i32.eq
              ;; org/teavm/runtime/GC.java:528
              (call $meth_otr_GC_isMarked
                (i32.load offset=12 align=4
                  (get_local 0)))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:529
              (i32.store offset=12 align=4
                (get_local 0)
                (i32.const 0))
              ;; org/teavm/runtime/GC.java:530
              (set_local 2
                (i32.load offset=8 align=4
                  (get_local 0)))
              (if
                ;; org/teavm/runtime/GC.java:531
                (i32.ne
                  (get_local 2)
                  (i32.const 0))
                (then
                  (if
                    ;; org/teavm/runtime/GC.java:532
                    (i32.eq
                      (i32.load offset=8 align=4
                        (get_local 2))
                      (i32.const 0))
                    (then
                      ;; org/teavm/runtime/GC.java:533
                      (i32.store offset=8 align=4
                        (get_local 2)
                        (get_local 0)))
                    (else
                      ;; org/teavm/runtime/GC.java:535
                      (i32.store offset=16 align=4
                        (i32.load offset=12 align=4
                          (get_local 2))
                        (get_local 0))
                      ;; org/teavm/runtime/GC.java:536
                      (call $meth_otr_GC_makeInvalid
                        (i32.load offset=12 align=4
                          (get_local 2)))))
                  ;; org/teavm/runtime/GC.java:538
                  (i32.store offset=12 align=4
                    (get_local 2)
                    (get_local 0))
                  ;; org/teavm/runtime/GC.java:539
                  (call $meth_otr_GC_makeInvalid
                    (get_local 2))))))
          ;; org/teavm/runtime/GC.java:539
          (set_local 0
            (get_local 1))
          (br $block_1)))))

  ;; function #39
  (func $meth_otr_GC_makeInvalid (type $type0)
    (local i64 i32)
    (block
      ;; org/teavm/runtime/GC.java:547
      (set_local 1
        (i64.sub
          (i64.extend_u/i32
            (get_local 0))
          (i64.extend_u/i32
            (i32.load align=4
              (i32.const 3996)))))
      ;; org/teavm/runtime/GC.java:548
      (set_local 2
        (i32.add
          (i32.load align=4
            (i32.const 3992))
          (i32.wrap/i64
            ;; org/teavm/runtime/GC.java:548
            (i64.div_s
              (get_local 1)
              ;; org/teavm/runtime/GC.java:548
              (i64.extend_s/i32
                (i32.const 1024))))))
      (i32.store8 align=1
        (get_local 2)
        ;; org/teavm/runtime/GC.java:549
        (i32.shr_s
          ;; org/teavm/runtime/GC.java:549
          (i32.shl
            ;; org/teavm/runtime/GC.java:549
            (i32.and
              (i32.load8_s align=1
                (get_local 2))
              (i32.const -2))
            (i32.const 24))
          (i32.const 24)))))

  ;; function #40
  (func $meth_otr_GC_sweep (type $type3)
    (local i32 i32 i64 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    (block
      (drop
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:555
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:555
        (i32.const 932)
        (i32.load align=4
          (i32.const 3972)))
      ;; org/teavm/runtime/GC.java:556
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:556
        (i32.const 936)
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:557
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:557
        (i32.const 940)
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:559
      (set_local 0
        (i32.load align=4
          (i32.const 3996)))
      ;; org/teavm/runtime/GC.java:560
      (set_local 1
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:561
      (set_local 2
        (i64.extend_u/i32
          (i32.load align=4
            (i32.const 4000))))
      ;; org/teavm/runtime/GC.java:562
      (set_local 3
        ;; org/teavm/runtime/GC.java:562
        (call $meth_otr_GC_getRegionCount))
      ;; org/teavm/runtime/GC.java:563
      (set_local 4
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:564
      (set_local 5
        (i32.add
          (i32.load align=4
            (i32.const 3996))
          (i32.wrap/i64
            (get_local 2))))
      (block $block_4
        (block $block_0
          (loop $block_7
            (br_if $block_0
              (i32.ge_u
                (get_local 0)
                (get_local 5)))
            ;; org/teavm/runtime/GC.java:567
            (set_local 6
              (i32.load align=4
                (get_local 0)))
            (if
              (i32.eq
                (get_local 6)
                (i32.const 0))
              (then
                ;; org/teavm/runtime/GC.java:570
                (set_local 7
                  (i32.const 1)))
              (else
                ;; org/teavm/runtime/GC.java:572
                (set_local 7
                  (if i32
                    ;; org/teavm/runtime/GC.java:572
                    (i32.and
                      (get_local 6)
                      (i32.const -2147483648))
                    (then
                      (i32.const 0))
                    (else
                      (i32.const 1))))
                (if
                  (block $block_1 i32
                    (drop
                      (br_if $block_1
                        (i32.const 0)
                        (i32.eq
                          (get_local 7)
                          (i32.const 0))))
                    ;; org/teavm/runtime/GC.java:573
                    (block $block_2 i32
                      (drop
                        (br_if $block_2
                          ;; org/teavm/runtime/GC.java:573
                          (i32.const 0)
                          (i32.ne
                            (i32.load8_s align=1
                              ;; org/teavm/runtime/GC.java:573
                              (i32.const 960))
                            (i32.const 0))))
                      ;; org/teavm/runtime/GC.java:573
                      (i32.and
                        (get_local 6)
                        (i32.const 1073741824))))
                  (then
                    ;; org/teavm/runtime/GC.java:574
                    (set_local 7
                      (i32.const 0))))
                (if
                  (i32.eq
                    (get_local 7)
                    (i32.const 0))
                  (then
                    ;; org/teavm/runtime/GC.java:577
                    (set_local 6
                      (i32.and
                        (get_local 6)
                        (i32.const 2147483647)))))
                ;; org/teavm/runtime/GC.java:579
                (i32.store align=4
                  (get_local 0)
                  (get_local 6))))
            (block $block_3
              (if
                (get_local 7)
                (then
                  (if
                    ;; org/teavm/runtime/GC.java:583
                    (i32.eq
                      (get_local 1)
                      (i32.const 0))
                    (then
                      ;; org/teavm/runtime/GC.java:583
                      (set_local 1
                        (get_local 0))))
                  (if
                    (i32.lt_u
                      (get_local 0)
                      (get_local 4))
                    (then
                      ;; org/teavm/runtime/GC.java:587
                      (br $block_3)))
                  ;; org/teavm/runtime/GC.java:589
                  (set_local 8
                    (i32.wrap/i64
                      ;; org/teavm/runtime/GC.java:589
                      (i64.div_s
                        ;; org/teavm/runtime/GC.java:588
                        (i64.sub
                          (i64.extend_u/i32
                            (get_local 0))
                          (i64.extend_u/i32
                            (i32.load align=4
                              (i32.const 3996))))
                        ;; org/teavm/runtime/GC.java:589
                        (i64.extend_s/i32
                          (i32.const 1024)))))
                  ;; org/teavm/runtime/GC.java:590
                  (set_local 9
                    (i32.add
                      (i32.load align=4
                        (i32.const 3980))
                      (i32.mul
                        (get_local 8)
                        (i32.const 2))))
                  ;; org/teavm/runtime/GC.java:591
                  (set_local 4
                    (i32.add
                      (i32.load align=4
                        (i32.const 3996))
                      ;; org/teavm/runtime/GC.java:591
                      (i32.mul
                        ;; org/teavm/runtime/GC.java:591
                        (i32.add
                          (get_local 8)
                          (i32.const 1))
                        (i32.const 1024))))
                  (if
                    (i32.load16_s align=2
                      (get_local 9))
                    (then
                      ;; org/teavm/runtime/GC.java:606
                      (br $block_3)))
                  (block $block_5
                    (loop $block_6
                      ;; org/teavm/runtime/GC.java:594
                      (set_local 8
                        (i32.add
                          (get_local 8)
                          (i32.const 1)))
                      (if
                        ;; org/teavm/runtime/GC.java:594
                        (i32.eq
                          (get_local 8)
                          (get_local 3))
                        (then
                          ;; org/teavm/runtime/GC.java:595
                          (set_local 0
                            (get_local 5))
                          ;; org/teavm/runtime/GC.java:596
                          (br $block_4)))
                      ;; org/teavm/runtime/GC.java:598
                      (set_local 10
                        (i32.add
                          (i32.load align=4
                            (i32.const 3980))
                          (i32.mul
                            (get_local 8)
                            (i32.const 2))))
                      (if
                        (i32.load16_s align=2
                          (get_local 10))
                        (then
                          ;; org/teavm/runtime/GC.java:599
                          (br $block_5)))
                      (br $block_6)))
                  ;; org/teavm/runtime/GC.java:601
                  (set_local 11
                    (i32.add
                      (i32.load align=4
                        (i32.const 3996))
                      ;; org/teavm/runtime/GC.java:601
                      (i32.mul
                        (get_local 8)
                        (i32.const 1024))))
                  ;; org/teavm/runtime/GC.java:602
                  (set_local 0
                    (i32.add
                      (get_local 11)
                      ;; org/teavm/runtime/GC.java:602
                      (i32.sub
                        (i32.load16_s align=2
                          (get_local 10))
                        (i32.const 1))))
                  ;; org/teavm/runtime/GC.java:603
                  (set_local 4
                    (i32.add
                      (get_local 11)
                      (i32.const 1024)))
                  ;; org/teavm/runtime/GC.java:604
                  (br $block_7)))
              (if
                ;; org/teavm/runtime/GC.java:608
                (i32.ne
                  (get_local 1)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/GC.java:609
                  (call $meth_otr_GC_freeMemory
                    (get_local 1)
                    (get_local 0))
                  ;; org/teavm/runtime/GC.java:610
                  (set_local 1
                    (i32.const 0))))
              (if
                (i32.ge_u
                  (get_local 0)
                  (get_local 4))
                (then
                  ;; org/teavm/runtime/GC.java:615
                  (set_local 8
                    (i32.wrap/i64
                      ;; org/teavm/runtime/GC.java:615
                      (i64.div_s
                        ;; org/teavm/runtime/GC.java:614
                        (i64.sub
                          (i64.extend_u/i32
                            (get_local 0))
                          (i64.extend_u/i32
                            (i32.load align=4
                              (i32.const 3996))))
                        ;; org/teavm/runtime/GC.java:615
                        (i64.extend_s/i32
                          (i32.const 1024)))))
                  ;; org/teavm/runtime/GC.java:616
                  (set_local 4
                    (i32.add
                      (i32.load align=4
                        (i32.const 3996))
                      ;; org/teavm/runtime/GC.java:616
                      (i32.mul
                        ;; org/teavm/runtime/GC.java:616
                        (i32.add
                          (get_local 8)
                          (i32.const 1))
                        (i32.const 1024))))
                  (if
                    ;; org/teavm/runtime/GC.java:619
                    (block $block_8 i32
                      (drop
                        (br_if $block_8
                          ;; org/teavm/runtime/GC.java:619
                          (i32.const 0)
                          (i32.ne
                            (i32.load8_s align=1
                              ;; org/teavm/runtime/GC.java:619
                              (i32.const 960))
                            (i32.const 0))))
                      ;; org/teavm/runtime/GC.java:619
                      (block $block_9 i32
                        (drop
                          (br_if $block_9
                            ;; org/teavm/runtime/GC.java:619
                            (i32.const 0)
                            ;; org/teavm/runtime/GC.java:619
                            (i32.ne
                              ;; org/teavm/runtime/GC.java:619
                              (i32.and
                                (i32.load8_s align=1
                                  (i32.add
                                    (i32.load align=4
                                      (i32.const 3992))
                                    (get_local 8)))
                                (i32.const 2))
                              (i32.const 0))))
                        ;; org/teavm/runtime/GC.java:620
                        (i32.eq
                          ;; org/teavm/runtime/GC.java:620
                          (i32.and
                            (i32.load8_s align=1
                              (i32.add
                                (i32.load align=4
                                  (i32.const 3992))
                                (get_local 8)))
                            (i32.const 4))
                          (i32.const 0))))
                    (then
                      (block $block_11
                        (block $block_10
                          (loop $block_12
                            ;; org/teavm/runtime/GC.java:626
                            (set_local 8
                              (i32.add
                                (get_local 8)
                                (i32.const 1)))
                            (if
                              ;; org/teavm/runtime/GC.java:626
                              (i32.eq
                                (get_local 8)
                                (get_local 3))
                              (then
                                ;; org/teavm/runtime/GC.java:626
                                (br $block_10)))
                            (if
                              (i32.eq
                                (i32.load16_s align=2
                                  (i32.add
                                    (i32.load align=4
                                      (i32.const 3980))
                                    (i32.mul
                                      (get_local 8)
                                      (i32.const 2))))
                                (i32.const 0))
                              (then
                                ;; org/teavm/runtime/GC.java:630
                                (br $block_11)))
                            (if
                              ;; org/teavm/runtime/GC.java:631
                              (i32.and
                                (i32.load8_s align=1
                                  (i32.add
                                    (i32.load align=4
                                      (i32.const 3992))
                                    (get_local 8)))
                                (i32.const 2))
                              (then
                                ;; org/teavm/runtime/GC.java:631
                                (br $block_11)))
                            (if
                              ;; org/teavm/runtime/GC.java:632
                              (i32.and
                                (i32.load8_s align=1
                                  (i32.add
                                    (i32.load align=4
                                      (i32.const 3992))
                                    (get_local 8)))
                                (i32.const 4))
                              (then
                                ;; org/teavm/runtime/GC.java:632
                                (br $block_11)))
                            (br $block_12))))
                      ;; org/teavm/runtime/GC.java:634
                      (set_local 12
                        (i32.add
                          (get_local 8)
                          (i32.const -1)))
                      ;; org/teavm/runtime/GC.java:635
                      (set_local 9
                        (i32.add
                          (i32.load align=4
                            (i32.const 3980))
                          (i32.mul
                            (get_local 12)
                            (i32.const 2))))
                      ;; org/teavm/runtime/GC.java:637
                      (set_local 11
                        (i32.add
                          (i32.load align=4
                            (i32.const 3996))
                          ;; org/teavm/runtime/GC.java:637
                          (i32.mul
                            (get_local 12)
                            (i32.const 1024))))
                      ;; org/teavm/runtime/GC.java:638
                      (set_local 10
                        (i32.add
                          (get_local 11)
                          ;; org/teavm/runtime/GC.java:638
                          (i32.sub
                            (i32.load16_s align=2
                              (get_local 9))
                            (i32.const 1))))
                      ;; org/teavm/runtime/GC.java:639
                      (set_local 4
                        (i32.add
                          (get_local 11)
                          (i32.const 1024)))
                      (if
                        (i32.lt_u
                          (get_local 0)
                          (get_local 10))
                        (then
                          ;; org/teavm/runtime/GC.java:640
                          (set_local 0
                            (get_local 10))
                          ;; org/teavm/runtime/GC.java:641
                          (br $block_7)))
                      ;; org/teavm/runtime/GC.java:641
                      (set_local 0
                        (get_local 10)))))))
            ;; org/teavm/runtime/GC.java:647
            (set_local 13
              ;; org/teavm/runtime/GC.java:647
              (call $meth_otr_GC_objectSize
                (get_local 0)))
            ;; org/teavm/runtime/GC.java:648
            (set_local 0
              (i32.add
                (get_local 0)
                (get_local 13)))
            (br $block_7))))
      (if
        ;; org/teavm/runtime/GC.java:651
        (i32.ne
          (get_local 1)
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:652
          (call $meth_otr_GC_freeMemory
            (get_local 1)
            (get_local 0))))
      ;; org/teavm/runtime/GC.java:655
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:655
        (i32.const 932)
        (i32.load align=4
          (i32.const 3972)))
      (drop
        (i32.const 0))))

  ;; function #41
  (func $meth_otr_GC_storeGapsInCardTable (type $type3)
    (local i32 i32 i64 i64 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:660
      (set_local 0
        (i32.const 0))
      (block $block_0
        (loop $block_3
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:660
            (i32.ge_s
              (get_local 0)
              (i32.load align=4
                ;; org/teavm/runtime/GC.java:660
                (i32.const 940))))
          ;; org/teavm/runtime/GC.java:661
          (set_local 1
            (i32.load align=4
              (i32.add
                (i32.load align=4
                  (i32.const 3972))
                (i32.mul
                  (get_local 0)
                  (i32.const 4)))))
          ;; org/teavm/runtime/GC.java:663
          (set_local 2
            (i64.sub
              (i64.extend_u/i32
                (get_local 1))
              (i64.extend_u/i32
                (i32.load align=4
                  (i32.const 3996)))))
          ;; org/teavm/runtime/GC.java:664
          (set_local 3
            (i64.add
              (get_local 2)
              ;; org/teavm/runtime/GC.java:664
              (i64.extend_s/i32
                (i32.load offset=4 align=4
                  (get_local 1)))))
          ;; org/teavm/runtime/GC.java:665
          (set_local 4
            (i32.wrap/i64
              ;; org/teavm/runtime/GC.java:665
              (i64.div_s
                (get_local 2)
                ;; org/teavm/runtime/GC.java:665
                (i64.extend_s/i32
                  (i32.const 1024)))))
          ;; org/teavm/runtime/GC.java:666
          (set_local 5
            (i32.wrap/i64
              ;; org/teavm/runtime/GC.java:666
              (i64.div_s
                (get_local 3)
                ;; org/teavm/runtime/GC.java:666
                (i64.extend_s/i32
                  (i32.const 1024)))))
          (block $block_1
            (loop $block_2
              (br_if $block_1
                ;; org/teavm/runtime/GC.java:667
                (i32.gt_s
                  (get_local 4)
                  (get_local 5)))
              ;; org/teavm/runtime/GC.java:668
              (set_local 6
                (i32.add
                  (i32.load align=4
                    (i32.const 3992))
                  (get_local 4)))
              (i32.store8 align=1
                (get_local 6)
                ;; org/teavm/runtime/GC.java:669
                (i32.shr_s
                  ;; org/teavm/runtime/GC.java:669
                  (i32.shl
                    ;; org/teavm/runtime/GC.java:669
                    (i32.or
                      (i32.load8_s align=1
                        (get_local 6))
                      (i32.const 4))
                    (i32.const 24))
                  (i32.const 24)))
              ;; org/teavm/runtime/GC.java:667
              (set_local 4
                (i32.add
                  (get_local 4)
                  (i32.const 1)))
              (br $block_2)))
          ;; org/teavm/runtime/GC.java:660
          (set_local 0
            (i32.add
              (get_local 0)
              (i32.const 1)))
          (br $block_3)))))

  ;; function #42
  (func $meth_otr_GC_clearGapsFromCardTable (type $type3)
    (local i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:676
      (set_local 0
        ;; org/teavm/runtime/GC.java:676
        (call $meth_otr_GC_getRegionCount))
      ;; org/teavm/runtime/GC.java:678
      (set_local 1
        (i32.load align=4
          (i32.const 3992)))
      ;; org/teavm/runtime/GC.java:680
      (set_local 2
        (i32.const 0))
      (block $block_0
        (loop $block_1
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:680
            (i32.ge_s
              (get_local 2)
              ;; org/teavm/runtime/GC.java:680
              (i32.sub
                (get_local 0)
                (i32.const 3))))
          (i32.store align=4
            (get_local 1)
            ;; org/teavm/runtime/GC.java:681
            (i32.and
              (i32.load align=4
                (get_local 1))
              (i32.const -67372037)))
          ;; org/teavm/runtime/GC.java:682
          (set_local 1
            (i32.add
              (get_local 1)
              (i32.const 4)))
          ;; org/teavm/runtime/GC.java:680
          (set_local 2
            (i32.add
              (get_local 2)
              (i32.const 4)))
          (br $block_1)))
      (block $block_2
        (loop $block_3
          (br_if $block_2
            ;; org/teavm/runtime/GC.java:685
            (i32.ge_s
              (get_local 2)
              (get_local 0)))
          (i32.store8 align=1
            (get_local 1)
            ;; org/teavm/runtime/GC.java:686
            (i32.shr_s
              ;; org/teavm/runtime/GC.java:686
              (i32.shl
                ;; org/teavm/runtime/GC.java:686
                (i32.and
                  (i32.load8_s align=1
                    (get_local 1))
                  (i32.const -5))
                (i32.const 24))
              (i32.const 24)))
          ;; org/teavm/runtime/GC.java:687
          (set_local 1
            (i32.add
              (get_local 1)
              (i32.const 1)))
          ;; org/teavm/runtime/GC.java:685
          (set_local 2
            (i32.add
              (get_local 2)
              (i32.const 1)))
          (br $block_3)))))

  ;; function #43
  (func $meth_otr_GC_freeMemory (type $type6)
    (block
      ;; org/teavm/runtime/GC.java:692
      (i32.store align=4
        (get_local 0)
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:693
      (i32.store offset=4 align=4
        (get_local 0)
        ;; org/teavm/runtime/GC.java:693
        (i32.wrap/i64
          ;; org/teavm/runtime/GC.java:693
          (i64.sub
            (i64.extend_u/i32
              (get_local 1))
            (i64.extend_u/i32
              (get_local 0)))))
      (drop
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:695
      (i32.store align=4
        (i32.load align=4
          ;; org/teavm/runtime/GC.java:695
          (i32.const 932))
        (get_local 0))
      ;; org/teavm/runtime/GC.java:696
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:696
        (i32.const 932)
        (i32.add
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:696
            (i32.const 932))
          (i32.mul
            (i32.const 1)
            (i32.const 4))))
      ;; org/teavm/runtime/GC.java:697
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:697
        (i32.const 936)
        ;; org/teavm/runtime/GC.java:697
        (i32.add
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:697
            (i32.const 936))
          (i32.const 1)))
      ;; org/teavm/runtime/GC.java:698
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:698
        (i32.const 940)
        ;; org/teavm/runtime/GC.java:698
        (i32.add
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:698
            (i32.const 940))
          (i32.const 1)))))

  ;; function #44
  (func $meth_otr_GC_defragment (type $type3)
    (block
      (drop
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:703
      (call $meth_otr_GC_clearGapsFromCardTable)
      ;; org/teavm/runtime/GC.java:704
      (call $meth_otr_GC_storeGapsInCardTable)
      ;; org/teavm/runtime/GC.java:705
      (call $meth_otr_GC_markStackRoots)
      ;; org/teavm/runtime/GC.java:706
      (call $meth_otr_GC_moveNonRelocatableObjectsToOldGeneration)
      ;; org/teavm/runtime/GC.java:707
      (call $meth_otr_GC_calculateRelocationTargets)
      ;; org/teavm/runtime/GC.java:708
      (call $meth_otr_GC_updatePointersFromStaticRoots)
      ;; org/teavm/runtime/GC.java:709
      (call $meth_otr_GC_updatePointersFromClasses)
      ;; org/teavm/runtime/GC.java:710
      (call $meth_otr_GC_updatePointersFromObjects)
      ;; org/teavm/runtime/GC.java:711
      (call $meth_otr_GC_restoreObjectHeaders)
      ;; org/teavm/runtime/GC.java:712
      (call $meth_otr_GC_relocateObjects)
      ;; org/teavm/runtime/GC.java:713
      (call $meth_otr_GC_putNewFreeChunks)
      (drop
        (i32.const 0))))

  ;; function #45
  (func $meth_otr_GC_markStackRoots (type $type3)
    (local i32 i32 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:718
      (set_local 0
        (i32.load align=4
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:718
            (i32.const 932))))
      ;; org/teavm/runtime/GC.java:720
      (set_local 1
        (call $meth_otbw_WasmRuntime_getStackTop))
      (block $block_0
        (loop $block_5
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:720
            (i32.eq
              (get_local 1)
              (i32.const 0)))
          ;; org/teavm/runtime/GC.java:722
          (set_local 2
            (call $meth_otbw_WasmRuntime_getStackRootCount
              (get_local 1)))
          ;; org/teavm/runtime/GC.java:723
          (set_local 3
            (call $meth_otbw_WasmRuntime_getStackRootPointer
              (get_local 1)))
          (block $block_1
            (loop $block_4
              ;; org/teavm/runtime/GC.java:724
              (set_local 4
                (i32.add
                  (get_local 2)
                  (i32.const -1)))
              (if
                ;; org/teavm/runtime/GC.java:724
                (i32.le_s
                  (get_local 2)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/GC.java:724
                  (br $block_1)))
              ;; org/teavm/runtime/GC.java:725
              (set_local 5
                (i32.load align=4
                  (get_local 3)))
              (if
                ;; org/teavm/runtime/GC.java:726
                (block $block_2 i32
                  (drop
                    (br_if $block_2
                      ;; org/teavm/runtime/GC.java:726
                      (i32.const 0)
                      (i32.lt_u
                        (get_local 5)
                        (get_local 0))))
                  ;; org/teavm/runtime/GC.java:727
                  (i32.eq
                    ;; org/teavm/runtime/GC.java:727
                    (block $block_3 i32
                      (drop
                        (br_if $block_3
                          ;; org/teavm/runtime/GC.java:727
                          (i32.const 0)
                          (i32.ne
                            (i32.load8_s align=1
                              ;; org/teavm/runtime/GC.java:727
                              (i32.const 960))
                            (i32.const 0))))
                      ;; org/teavm/runtime/GC.java:727
                      (i32.and
                        (i32.load align=4
                          (get_local 5))
                        (i32.const 1073741824)))
                    (i32.const 0)))
                (then
                  ;; org/teavm/runtime/GC.java:728
                  (i32.store align=4
                    (get_local 5)
                    ;; org/teavm/runtime/GC.java:728
                    (i32.or
                      (i32.load align=4
                        (get_local 5))
                      (i32.const -2147483648)))))
              ;; org/teavm/runtime/GC.java:731
              (set_local 3
                (i32.add
                  (get_local 3)
                  (i32.const 4)))
              ;; org/teavm/runtime/GC.java:731
              (set_local 2
                (get_local 4))
              (br $block_4)))
          ;; org/teavm/runtime/GC.java:721
          (set_local 1
            (call $meth_otbw_WasmRuntime_getNextStackFrame
              (get_local 1)))
          (br $block_5)))))

  ;; function #46
  (func $meth_otr_GC_moveNonRelocatableObjectsToOldGeneration (type $type3)
    (local i32 i64 i32)
    (block
      ;; org/teavm/runtime/GC.java:737
      (set_local 0
        (i32.load align=4
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:737
            (i32.const 932))))
      ;; org/teavm/runtime/GC.java:738
      (set_local 1
        (i64.sub
          (i64.extend_u/i32
            (get_local 0))
          (i64.extend_u/i32
            (i32.load align=4
              (i32.const 3996)))))
      ;; org/teavm/runtime/GC.java:739
      (set_local 2
        (i32.const 0))
      (block $block_0
        (loop $block_1
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:739
            (i64.ge_s
              ;; org/teavm/runtime/GC.java:739
              (i64.mul
                ;; org/teavm/runtime/GC.java:739
                (i64.extend_s/i32
                  (get_local 2))
                ;; org/teavm/runtime/GC.java:739
                (i64.extend_s/i32
                  (i32.const 1024)))
              (get_local 1)))
          (if
            ;; org/teavm/runtime/GC.java:740
            (i32.and
              (i32.load8_s align=1
                (i32.add
                  (i32.load align=4
                    (i32.const 3992))
                  (get_local 2)))
              (i32.const 2))
            (then
              ;; org/teavm/runtime/GC.java:741
              (call $meth_otr_GC_moveObjectsToOldGenerationInRegion
                (get_local 2)
                (get_local 0))))
          ;; org/teavm/runtime/GC.java:739
          (set_local 2
            (i32.add
              (get_local 2)
              (i32.const 1)))
          (br $block_1)))))

  ;; function #47
  (func $meth_otr_GC_moveObjectsToOldGenerationInRegion (type $type6)
    (local i32 i32 i32 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:747
      (set_local 2
        (i32.sub
          (i32.load16_s align=2
            (i32.add
              (i32.load align=4
                (i32.const 3980))
              (i32.mul
                (get_local 0)
                (i32.const 2))))
          (i32.const 1)))
      ;; org/teavm/runtime/GC.java:749
      (set_local 3
        (i32.const 1024))
      ;; org/teavm/runtime/GC.java:750
      (set_local 4
        (i32.add
          (i32.load align=4
            (i32.const 3996))
          ;; org/teavm/runtime/GC.java:750
          (i32.mul
            (get_local 0)
            (get_local 3))))
      ;; org/teavm/runtime/GC.java:751
      (set_local 5
        (i32.add
          (get_local 4)
          (get_local 3)))
      ;; org/teavm/runtime/GC.java:752
      (set_local 6
        (i32.add
          (get_local 4)
          (get_local 2)))
      (if
        (i32.ge_u
          (get_local 1)
          (get_local 5))
        (then
          ;; org/teavm/runtime/GC.java:753
          (set_local 1
            (get_local 5))))
      (block $block_0
        (loop $block_2
          (br_if $block_0
            (i32.ge_u
              (get_local 6)
              (get_local 1)))
          ;; org/teavm/runtime/GC.java:758
          (set_local 7
            (i32.load align=4
              (get_local 6)))
          (if
            (block $block_1 i32
              (drop
                (br_if $block_1
                  (i32.const 0)
                  (i32.eq
                    (get_local 7)
                    (i32.const 0))))
              ;; org/teavm/runtime/GC.java:759
              (i32.eq
                ;; org/teavm/runtime/GC.java:759
                (i32.and
                  (get_local 7)
                  (i32.const 1073741824))
                (i32.const 0)))
            (then
              ;; org/teavm/runtime/GC.java:761
              (i32.store align=4
                (get_local 6)
                ;; org/teavm/runtime/GC.java:760
                (i32.or
                  (get_local 7)
                  (i32.const 1073741824)))))
          ;; org/teavm/runtime/GC.java:763
          (set_local 8
            ;; org/teavm/runtime/GC.java:763
            (call $meth_otr_GC_objectSize
              (get_local 6)))
          ;; org/teavm/runtime/GC.java:764
          (set_local 6
            (i32.add
              (get_local 6)
              (get_local 8)))
          (br $block_2)))))

  ;; function #48
  (func $meth_otr_GC_calculateRelocationTargets (type $type3)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i64 i32 i32 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:771
      (set_local 0
        (i32.add
          (i32.load align=4
            (i32.const 3996))
          (i32.wrap/i64
            (i64.extend_u/i32
              (i32.load align=4
                (i32.const 4000))))))
      ;; org/teavm/runtime/GC.java:773
      (set_local 1
        (i32.load align=4
          (i32.const 932)))
      ;; org/teavm/runtime/GC.java:774
      (set_local 2
        (i32.load align=4
          (i32.const 936)))
      ;; org/teavm/runtime/GC.java:775
      (set_local 3
        (i32.load align=4
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:775
            (i32.const 932))))
      ;; org/teavm/runtime/GC.java:776
      (set_local 4
        (i32.add
          (get_local 3)
          (i32.load offset=4 align=4
            (get_local 3))))
      ;; org/teavm/runtime/GC.java:779
      (set_local 5
        (i32.add
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:778
            (i32.const 932))
          (i32.mul
            (get_local 2)
            (i32.const 4))))
      ;; org/teavm/runtime/GC.java:780
      (set_local 6
        (get_local 3))
      ;; org/teavm/runtime/GC.java:781
      (i32.store offset=4 align=4
        (get_local 5)
        (get_local 6))
      ;; org/teavm/runtime/GC.java:782
      (i32.store offset=8 align=4
        (get_local 5)
        (get_local 0))
      ;; org/teavm/runtime/GC.java:783
      (i32.store align=4
        (get_local 5)
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:785
      (set_local 7
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:787
      (set_local 8
        (i32.add
          (get_local 3)
          (i32.mul
            (i32.const 1)
            (i32.const 8))))
      ;; org/teavm/runtime/GC.java:788
      (set_local 9
        (i32.add
          (get_local 3)
          (i32.load offset=4 align=4
            (get_local 3))))
      ;; org/teavm/runtime/GC.java:789
      (set_local 10
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:790
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:790
        (i32.const 952)
        (i32.load align=4
          (i32.const 3996)))
      ;; org/teavm/runtime/GC.java:792
      (set_local 11
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:792
      (set_local 12
        (get_local 5))
      (block $block_5
        (block $block_0
          (loop $block_12
            (br_if $block_0
              (i32.ge_u
                (get_local 4)
                (get_local 0)))
            ;; org/teavm/runtime/GC.java:794
            (set_local 13
              ;; org/teavm/runtime/GC.java:794
              (call $meth_otr_GC_objectSize
                (get_local 4)))
            (if
              (i32.eq
                (i32.load align=4
                  (get_local 4))
                (i32.const 0))
              (then
                ;; org/teavm/runtime/GC.java:887
                (set_local 11
                  (i32.const 0)))
              (else
                (block $block_2
                  ;; org/teavm/runtime/GC.java:796
                  (set_local 14
                    (i32.const 0))
                  ;; org/teavm/runtime/GC.java:797
                  (set_local 15
                    ;; org/teavm/runtime/GC.java:797
                    (call $meth_otr_GC_shouldRelocateObject
                      (get_local 4)))
                  ;; org/teavm/runtime/GC.java:798
                  (i32.store align=4
                    (get_local 4)
                    ;; org/teavm/runtime/GC.java:798
                    (i32.or
                      (i32.load align=4
                        (get_local 4))
                      (i32.const 1073741824)))
                  (if
                    (get_local 15)
                    (then
                      (block $block_1
                        (loop $block_3
                          ;; org/teavm/runtime/GC.java:801
                          (set_local 14
                            (i32.add
                              (get_local 6)
                              (get_local 13)))
                          (if
                            ;; org/teavm/runtime/GC.java:802
                            (i32.eq
                              (get_local 14)
                              (i32.load offset=8 align=4
                                (get_local 12)))
                            (then
                              ;; org/teavm/runtime/GC.java:802
                              (br $block_1)))
                          (if
                            (i32.lt_u
                              (i32.add
                                (get_local 14)
                                (i32.const 7))
                              (i32.load offset=8 align=4
                                (get_local 12)))
                            (then
                              ;; org/teavm/runtime/GC.java:804
                              (br $block_2)))
                          ;; org/teavm/runtime/GC.java:807
                          (set_local 16
                            (i32.add
                              (get_local 12)
                              (i32.mul
                                (i32.const 1)
                                (i32.const 12))))
                          (if
                            ;; org/teavm/runtime/GC.java:808
                            (i32.eq
                              (i32.load offset=4 align=4
                                (get_local 16))
                              (get_local 4))
                            (then
                              ;; org/teavm/runtime/GC.java:809
                              (set_local 15
                                (i32.const 0))
                              ;; org/teavm/runtime/GC.java:810
                              (br $block_2)))
                          ;; org/teavm/runtime/GC.java:812
                          (i32.store align=4
                            (get_local 12)
                            (get_local 7))
                          ;; org/teavm/runtime/GC.java:813
                          (set_local 7
                            (i32.const 0))
                          ;; org/teavm/runtime/GC.java:815
                          (set_local 6
                            (i32.load offset=4 align=4
                              (get_local 16)))
                          ;; org/teavm/runtime/GC.java:815
                          (set_local 12
                            (get_local 16))
                          (br $block_3))))))
                (if
                  (get_local 15)
                  (then
                    ;; org/teavm/runtime/GC.java:857
                    (set_local 11
                      (i32.const 0))
                    (block $block_4
                      (loop $block_6
                        (br_if $block_4
                          (i32.lt_u
                            (i32.add
                              (get_local 8)
                              (i32.const 12))
                            (get_local 9)))
                        ;; org/teavm/runtime/GC.java:860
                        (set_local 2
                          (i32.add
                            (get_local 2)
                            (i32.const -1)))
                        (if
                          (i32.eq
                            (get_local 2)
                            (i32.const 0))
                          (then
                            ;; org/teavm/runtime/GC.java:861
                            (i32.store offset=8 align=4
                              (get_local 5)
                              (get_local 4))
                            ;; org/teavm/runtime/GC.java:862
                            (br $block_5)))
                        ;; org/teavm/runtime/GC.java:864
                        (set_local 1
                          (i32.add
                            (get_local 1)
                            (i32.mul
                              (i32.const 1)
                              (i32.const 4))))
                        ;; org/teavm/runtime/GC.java:865
                        (set_local 17
                          (i32.load align=4
                            (get_local 1)))
                        ;; org/teavm/runtime/GC.java:866
                        (set_local 8
                          (i32.add
                            (get_local 17)
                            (i32.mul
                              (i32.const 1)
                              (i32.const 8))))
                        ;; org/teavm/runtime/GC.java:867
                        (set_local 9
                          (i32.add
                            (get_local 17)
                            (i32.load offset=4 align=4
                              (get_local 17))))
                        (br $block_6)))
                    ;; org/teavm/runtime/GC.java:870
                    (set_local 18
                      (get_local 8))
                    ;; org/teavm/runtime/GC.java:871
                    (i32.store align=4
                      (get_local 18)
                      (i32.load align=4
                        (get_local 4)))
                    ;; org/teavm/runtime/GC.java:872
                    (i32.store offset=4 align=4
                      (get_local 18)
                      (i32.load offset=4 align=4
                        (get_local 4)))
                    ;; org/teavm/runtime/GC.java:873
                    (i32.store offset=8 align=4
                      (get_local 18)
                      (get_local 6))
                    ;; org/teavm/runtime/GC.java:874
                    (set_local 7
                      (i32.add
                        (get_local 7)
                        (i32.const 1)))
                    ;; org/teavm/runtime/GC.java:875
                    (set_local 8
                      (i32.add
                        (get_local 8)
                        (i32.const 12)))
                    ;; org/teavm/runtime/GC.java:877
                    (set_local 19
                      (i64.extend_u/i32
                        (get_local 18)))
                    ;; org/teavm/runtime/GC.java:878
                    (i32.store align=4
                      (get_local 4)
                      ;; org/teavm/runtime/GC.java:878
                      (i32.or
                        ;; org/teavm/runtime/GC.java:878
                        (i32.wrap/i64
                          ;; org/teavm/runtime/GC.java:878
                          (i64.shr_u
                            (get_local 19)
                            (i64.extend_u/i32
                              (i32.const 33))))
                        (i32.const -2147483648)))
                    ;; org/teavm/runtime/GC.java:879
                    (i32.store offset=4 align=4
                      (get_local 4)
                      ;; org/teavm/runtime/GC.java:879
                      (i32.wrap/i64
                        ;; org/teavm/runtime/GC.java:879
                        (i64.shr_s
                          (get_local 19)
                          (i64.extend_u/i32
                            (i32.const 1)))))
                    ;; org/teavm/runtime/GC.java:882
                    (set_local 20
                      (i32.wrap/i64
                        ;; org/teavm/runtime/GC.java:882
                        (i64.div_s
                          ;; org/teavm/runtime/GC.java:882
                          (i64.sub
                            (i64.extend_u/i32
                              (get_local 4))
                            (i64.extend_u/i32
                              (i32.load align=4
                                (i32.const 3996))))
                          ;; org/teavm/runtime/GC.java:882
                          (i64.extend_s/i32
                            (i32.const 1024)))))
                    ;; org/teavm/runtime/GC.java:883
                    (set_local 21
                      (i32.add
                        (i32.load align=4
                          (i32.const 3992))
                        (get_local 20)))
                    (i32.store8 align=1
                      (get_local 21)
                      ;; org/teavm/runtime/GC.java:884
                      (i32.shr_s
                        ;; org/teavm/runtime/GC.java:884
                        (i32.shl
                          ;; org/teavm/runtime/GC.java:884
                          (i32.or
                            (i32.load8_s align=1
                              (get_local 21))
                            (i32.const 8))
                          (i32.const 24))
                        (i32.const 24)))
                    ;; org/teavm/runtime/GC.java:884
                    (set_local 6
                      (get_local 14)))
                  (else
                    (if
                      (i32.eq
                        (get_local 11)
                        (i32.const 0))
                      (then
                        ;; org/teavm/runtime/GC.java:821
                        (i32.store offset=8 align=4
                          (get_local 5)
                          (get_local 4))
                        ;; org/teavm/runtime/GC.java:822
                        (set_local 5
                          (i32.add
                            (get_local 5)
                            (i32.mul
                              (i32.const 1)
                              (i32.const 12))))
                        ;; org/teavm/runtime/GC.java:823
                        (i32.store offset=8 align=4
                          (get_local 5)
                          (get_local 0))
                        ;; org/teavm/runtime/GC.java:824
                        (set_local 11
                          (i32.const 1))))
                    (if
                      ;; org/teavm/runtime/GC.java:828
                      (block $block_7 i32
                        (drop
                          (br_if $block_7
                            ;; org/teavm/runtime/GC.java:828
                            (i32.const 0)
                            (i32.ne
                              (i32.load8_s align=1
                                ;; org/teavm/runtime/GC.java:828
                                (i32.const 960))
                              (i32.const 0))))
                        (i32.ge_u
                          (get_local 4)
                          (get_local 10)))
                      (then
                        ;; org/teavm/runtime/GC.java:829
                        (set_local 20
                          (i32.wrap/i64
                            ;; org/teavm/runtime/GC.java:829
                            (i64.div_s
                              ;; org/teavm/runtime/GC.java:829
                              (i64.sub
                                (i64.extend_u/i32
                                  (get_local 4))
                                (i64.extend_u/i32
                                  (i32.load align=4
                                    (i32.const 3996))))
                              ;; org/teavm/runtime/GC.java:829
                              (i64.extend_s/i32
                                (i32.const 1024)))))
                        ;; org/teavm/runtime/GC.java:830
                        (set_local 10
                          (i32.add
                            (i32.load align=4
                              (i32.const 3996))
                            (i32.wrap/i64
                              ;; org/teavm/runtime/GC.java:830
                              (i64.mul
                                ;; org/teavm/runtime/GC.java:830
                                (i64.extend_s/i32
                                  (i32.const 1024))
                                ;; org/teavm/runtime/GC.java:830
                                (i64.extend_s/i32
                                  ;; org/teavm/runtime/GC.java:830
                                  (i32.add
                                    (get_local 20)
                                    (i32.const 1)))))))
                        ;; org/teavm/runtime/GC.java:831
                        (set_local 22
                          (i32.load8_s align=1
                            (i32.add
                              (i32.load align=4
                                (i32.const 3992))
                              (get_local 20))))
                        (if
                          ;; org/teavm/runtime/GC.java:832
                          (block $block_8 i32
                            (drop
                              (br_if $block_8
                                ;; org/teavm/runtime/GC.java:832
                                (i32.const 0)
                                ;; org/teavm/runtime/GC.java:832
                                (i32.ne
                                  ;; org/teavm/runtime/GC.java:832
                                  (i32.and
                                    (get_local 22)
                                    (i32.const 2))
                                  (i32.const 0))))
                            ;; org/teavm/runtime/GC.java:832
                            (i32.eq
                              ;; org/teavm/runtime/GC.java:832
                              (i32.and
                                (get_local 22)
                                (i32.const 4))
                              (i32.const 0)))
                          (then
                            (block $block_9
                              (block $block_10
                                (loop $block_11
                                  ;; org/teavm/runtime/GC.java:834
                                  (set_local 20
                                    (i32.add
                                      (get_local 20)
                                      (i32.const 1)))
                                  ;; org/teavm/runtime/GC.java:835
                                  (set_local 23
                                    (i32.load8_s align=1
                                      (i32.add
                                        (i32.load align=4
                                          (i32.const 3992))
                                        (get_local 20))))
                                  (if
                                    ;; org/teavm/runtime/GC.java:836
                                    (i32.and
                                      (get_local 23)
                                      (i32.const 2))
                                    (then
                                      ;; org/teavm/runtime/GC.java:836
                                      (br $block_9)))
                                  (if
                                    ;; org/teavm/runtime/GC.java:836
                                    (i32.and
                                      (get_local 23)
                                      (i32.const 4))
                                    (then
                                      ;; org/teavm/runtime/GC.java:837
                                      (br $block_9)))
                                  (if
                                    (i32.eq
                                      (i32.load16_s align=2
                                        (i32.add
                                          (i32.load align=4
                                            (i32.const 3980))
                                          (i32.mul
                                            (get_local 20)
                                            (i32.const 2))))
                                      (i32.const 0))
                                    (then
                                      ;; org/teavm/runtime/GC.java:839
                                      (br $block_10)))
                                  (br $block_11))))
                            ;; org/teavm/runtime/GC.java:843
                            (set_local 24
                              (i32.add
                                (get_local 20)
                                (i32.const -1)))
                            ;; org/teavm/runtime/GC.java:844
                            (set_local 10
                              (i32.add
                                (i32.load align=4
                                  (i32.const 3996))
                                (i32.wrap/i64
                                  ;; org/teavm/runtime/GC.java:844
                                  (i64.mul
                                    ;; org/teavm/runtime/GC.java:844
                                    (i64.extend_s/i32
                                      (i32.const 1024))
                                    ;; org/teavm/runtime/GC.java:844
                                    (i64.extend_s/i32
                                      ;; org/teavm/runtime/GC.java:844
                                      (i32.add
                                        (get_local 24)
                                        (i32.const 1)))))))
                            ;; org/teavm/runtime/GC.java:846
                            (set_local 25
                              (i32.sub
                                (i32.load16_s align=2
                                  (i32.add
                                    (i32.load align=4
                                      (i32.const 3980))
                                    (i32.mul
                                      (get_local 24)
                                      (i32.const 2))))
                                (i32.const 1)))
                            ;; org/teavm/runtime/GC.java:847
                            (set_local 4
                              (i32.add
                                (i32.add
                                  (i32.load align=4
                                    (i32.const 3996))
                                  (i32.wrap/i64
                                    ;; org/teavm/runtime/GC.java:847
                                    (i64.mul
                                      ;; org/teavm/runtime/GC.java:847
                                      (i64.extend_s/i32
                                        (i32.const 1024))
                                      ;; org/teavm/runtime/GC.java:847
                                      (i64.extend_s/i32
                                        (get_local 24)))))
                                (get_local 25)))
                            ;; org/teavm/runtime/GC.java:848
                            (set_local 13
                              ;; org/teavm/runtime/GC.java:848
                              (call $meth_otr_GC_objectSize
                                (get_local 4)))))))
                    ;; org/teavm/runtime/GC.java:852
                    (i32.store offset=4 align=4
                      (get_local 5)
                      (i32.add
                        (get_local 4)
                        (get_local 13)))
                    ;; org/teavm/runtime/GC.java:853
                    (i32.store align=4
                      (get_local 5)
                      (i32.const 0))
                    ;; org/teavm/runtime/GC.java:854
                    (i32.store align=4
                      (get_local 4)
                      ;; org/teavm/runtime/GC.java:854
                      (i32.and
                        (i32.load align=4
                          (get_local 4))
                        (i32.const 2147483647)))
                    ;; org/teavm/runtime/GC.java:855
                    (i32.store align=4
                      ;; org/teavm/runtime/GC.java:855
                      (i32.const 952)
                      (get_local 4))))))
            ;; org/teavm/runtime/GC.java:889
            (set_local 4
              (i32.add
                (get_local 4)
                (get_local 13)))
            (br $block_12))))
      ;; org/teavm/runtime/GC.java:892
      (i32.store align=4
        (get_local 12)
        (get_local 7))
      (block $block_13
        (loop $block_14
          (br_if $block_13
            (i32.ge_u
              (get_local 4)
              (get_local 0)))
          ;; org/teavm/runtime/GC.java:895
          (set_local 13
            ;; org/teavm/runtime/GC.java:895
            (call $meth_otr_GC_objectSize
              (get_local 4)))
          (if
            (i32.load align=4
              (get_local 4))
            (then
              ;; org/teavm/runtime/GC.java:900
              (i32.store align=4
                (get_local 4)
                ;; org/teavm/runtime/GC.java:899
                (i32.or
                  ;; org/teavm/runtime/GC.java:898
                  (i32.and
                    (i32.load align=4
                      (get_local 4))
                    (i32.const 2147483647))
                  (i32.const 1073741824))))
            (else
              ;; org/teavm/runtime/GC.java:902
              (set_local 5
                (i32.add
                  (get_local 5)
                  (i32.mul
                    (i32.const 1)
                    (i32.const 12))))
              ;; org/teavm/runtime/GC.java:903
              (i32.store offset=4 align=4
                (get_local 5)
                (get_local 4))
              ;; org/teavm/runtime/GC.java:904
              (i32.store align=4
                (get_local 5)
                (i32.const 0))
              ;; org/teavm/runtime/GC.java:905
              (i32.store offset=8 align=4
                (get_local 5)
                (i32.add
                  (i32.load offset=4 align=4
                    (get_local 5))
                  (get_local 13)))))
          ;; org/teavm/runtime/GC.java:907
          (set_local 4
            (i32.add
              (get_local 4)
              (get_local 13)))
          (br $block_14)))
      ;; org/teavm/runtime/GC.java:910
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:910
        (i32.const 956)
        (get_local 5))))

  ;; function #49
  (func $meth_otr_GC_shouldRelocateObject (type $type1)
    (local i32)
    (block i32
      (block $block_1
        (block $block_0
          (if
            ;; org/teavm/runtime/GC.java:914
            (i32.eq
              ;; org/teavm/runtime/GC.java:914
              (i32.and
                (i32.load align=4
                  (get_local 0))
                (i32.const -2147483648))
              (i32.const 0))
            (then
              (if
                (i32.load8_s align=1
                  ;; org/teavm/runtime/GC.java:914
                  (i32.const 960))
                (then
                  ;; org/teavm/runtime/GC.java:914
                  (br $block_0)))
              (if
                ;; org/teavm/runtime/GC.java:914
                (i32.eq
                  ;; org/teavm/runtime/GC.java:914
                  (i32.and
                    (i32.load align=4
                      (get_local 0))
                    (i32.const 1073741824))
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/GC.java:914
                  (br $block_0)))))
          ;; org/teavm/runtime/GC.java:914
          (set_local 1
            (i32.const 0))
          ;; org/teavm/runtime/GC.java:914
          (br $block_1))
        ;; org/teavm/runtime/GC.java:914
        (set_local 1
          (i32.const 1)))
      ;; org/teavm/runtime/GC.java:914
      (return
        (get_local 1))))

  ;; function #50
  (func $meth_otr_GC_updatePointersFromStaticRoots (type $type3)
    (local i32 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:919
      (set_local 0
        (i32.const 24224))
      ;; org/teavm/runtime/GC.java:920
      (set_local 1
        (i32.load align=4
          (get_local 0)))
      ;; org/teavm/runtime/GC.java:921
      (set_local 2
        (i32.add
          (get_local 0)
          (i32.const 4)))
      (block $block_0
        (loop $block_1
          ;; org/teavm/runtime/GC.java:922
          (set_local 3
            (i32.add
              (get_local 1)
              (i32.const -1)))
          (if
            ;; org/teavm/runtime/GC.java:922
            (i32.le_s
              (get_local 1)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:922
              (br $block_0)))
          ;; org/teavm/runtime/GC.java:923
          (set_local 4
            (i32.load align=4
              (get_local 2)))
          (i32.store align=4
            (get_local 4)
            ;; org/teavm/runtime/GC.java:924
            (call $meth_otr_GC_updatePointer
              (i32.load align=4
                (get_local 4))))
          ;; org/teavm/runtime/GC.java:925
          (set_local 2
            (i32.add
              (get_local 2)
              (i32.const 4)))
          ;; org/teavm/runtime/GC.java:925
          (set_local 1
            (get_local 3))
          (br $block_1)))))

  ;; function #51
  (func $meth_otr_GC_updatePointersFromClasses (type $type3)
    (local i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:930
      (set_local 0
        (i32.const 66))
      ;; org/teavm/runtime/GC.java:931
      (set_local 1
        (i32.const 24320))
      ;; org/teavm/runtime/GC.java:932
      (set_local 2
        (i32.const 0))
      (block $block_0
        (loop $block_1
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:932
            (i32.ge_s
              (get_local 2)
              (get_local 0)))
          ;; org/teavm/runtime/GC.java:933
          (set_local 3
            (i32.load align=4
              (get_local 1)))
          (if
            ;; org/teavm/runtime/GC.java:934
            (i32.ne
              (i32.load offset=80 align=4
                (get_local 3))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:935
              (i32.store offset=80 align=4
                (get_local 3)
                ;; org/teavm/runtime/GC.java:935
                (call $meth_otr_GC_updatePointer
                  (i32.load offset=80 align=4
                    (get_local 3))))))
          (if
            ;; org/teavm/runtime/GC.java:937
            (i32.ne
              (i32.load offset=84 align=4
                (get_local 3))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:938
              (i32.store offset=84 align=4
                (get_local 3)
                ;; org/teavm/runtime/GC.java:938
                (call $meth_otr_GC_updatePointer
                  (i32.load offset=84 align=4
                    (get_local 3))))))
          (if
            ;; org/teavm/runtime/GC.java:940
            (i32.ne
              (i32.load offset=28 align=4
                (get_local 3))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:941
              (i32.store offset=28 align=4
                (get_local 3)
                ;; org/teavm/runtime/GC.java:941
                (call $meth_otr_GC_updatePointer
                  (i32.load offset=28 align=4
                    (get_local 3))))))
          ;; org/teavm/runtime/GC.java:943
          (set_local 1
            (i32.add
              (get_local 1)
              (i32.const 4)))
          ;; org/teavm/runtime/GC.java:932
          (set_local 2
            (i32.add
              (get_local 2)
              (i32.const 1)))
          (br $block_1)))))

  ;; function #52
  (func $meth_otr_GC_updatePointersFromObjects (type $type3)
    (block
      (if
        (i32.eq
          (i32.load8_s align=1
            ;; org/teavm/runtime/GC.java:948
            (i32.const 960))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:951
          (call $meth_otr_GC_updatePointersFromObjectsYoung))
        (else
          ;; org/teavm/runtime/GC.java:949
          (call $meth_otr_GC_updatePointersFromObjectsFull)))))

  ;; function #53
  (func $meth_otr_GC_updatePointersFromObjectsFull (type $type3)
    (local i32 i32 i32 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:958
      (set_local 0
        (i32.add
          (i32.load align=4
            (i32.const 3996))
          (i32.wrap/i64
            (i64.extend_u/i32
              (i32.load align=4
                (i32.const 4000))))))
      ;; org/teavm/runtime/GC.java:960
      (set_local 1
        (i32.load align=4
          (i32.const 3996)))
      (block $block_0
        (loop $block_1
          (br_if $block_0
            (i32.ge_u
              (get_local 1)
              (get_local 0)))
          ;; org/teavm/runtime/GC.java:963
          (set_local 2
            (i32.load align=4
              (get_local 1)))
          (if
            (i32.eq
              (get_local 2)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:975
              (set_local 3
                (i32.load offset=4 align=4
                  (get_local 1))))
            (else
              ;; org/teavm/runtime/GC.java:966
              (set_local 4
                ;; org/teavm/runtime/GC.java:966
                (call $meth_otr_GC_getRelocation
                  (get_local 1)))
              (if
                ;; org/teavm/runtime/GC.java:967
                (i32.ne
                  (get_local 4)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/GC.java:968
                  (set_local 2
                    (i32.load align=4
                      (get_local 4)))))
              ;; org/teavm/runtime/GC.java:970
              (set_local 5
                (i32.shl
                  (get_local 2)
                  (i32.const 3)))
              ;; org/teavm/runtime/GC.java:971
              (set_local 6
                (get_local 1))
              ;; org/teavm/runtime/GC.java:972
              (call $meth_otr_GC_updatePointers
                (get_local 5)
                (get_local 6))
              ;; org/teavm/runtime/GC.java:973
              (set_local 3
                ;; org/teavm/runtime/GC.java:973
                (call $meth_otr_GC_objectSize_0
                  (get_local 6)
                  (get_local 5)))))
          ;; org/teavm/runtime/GC.java:978
          (set_local 1
            (i32.add
              (get_local 1)
              (get_local 3)))
          (br $block_1)))))

  ;; function #54
  (func $meth_otr_GC_updatePointersFromObjectsYoung (type $type3)
    (local i32 i32 i32 i32 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:985
      (set_local 0
        ;; org/teavm/runtime/GC.java:985
        (call $meth_otr_GC_getRegionCount))
      ;; org/teavm/runtime/GC.java:986
      (set_local 1
        (i32.const 1024))
      ;; org/teavm/runtime/GC.java:988
      (set_local 2
        (i32.load align=4
          (i32.const 3992)))
      ;; org/teavm/runtime/GC.java:989
      (set_local 3
        (i32.load align=4
          (i32.const 3996)))
      ;; org/teavm/runtime/GC.java:991
      (set_local 4
        (i32.const 0))
      (block $block_0
        (loop $block_5
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:991
            (i32.ge_s
              (get_local 4)
              ;; org/teavm/runtime/GC.java:991
              (i32.sub
                (get_local 0)
                (i32.const 3))))
          (block $block_2
            ;; org/teavm/runtime/GC.java:992
            (set_local 5
              (i32.load align=4
                (get_local 2)))
            (if
              ;; org/teavm/runtime/GC.java:993
              (i32.eq
                ;; org/teavm/runtime/GC.java:993
                (block $block_1 i32
                  (drop
                    (br_if $block_1
                      ;; org/teavm/runtime/GC.java:993
                      (i32.const 0)
                      ;; org/teavm/runtime/GC.java:993
                      (i32.ne
                        ;; org/teavm/runtime/GC.java:993
                        (i32.and
                          (get_local 5)
                          (i32.const 16843009))
                        (i32.const 16843009))))
                  ;; org/teavm/runtime/GC.java:993
                  (i32.eq
                    ;; org/teavm/runtime/GC.java:993
                    (i32.and
                      (get_local 5)
                      (i32.const 33686018))
                    (i32.const 0)))
                (i32.const 0))
              (then
                ;; org/teavm/runtime/GC.java:994
                (set_local 6
                  (i32.const 0))
                (loop $block_4
                  (if
                    ;; org/teavm/runtime/GC.java:994
                    (i32.ge_s
                      (get_local 6)
                      (i32.const 4))
                    (then
                      ;; org/teavm/runtime/GC.java:994
                      (br $block_2)))
                  ;; org/teavm/runtime/GC.java:995
                  (set_local 7
                    (i32.load8_s align=1
                      (i32.add
                        (get_local 2)
                        (get_local 6))))
                  (if
                    ;; org/teavm/runtime/GC.java:996
                    (i32.eq
                      ;; org/teavm/runtime/GC.java:996
                      (block $block_3 i32
                        (drop
                          (br_if $block_3
                            ;; org/teavm/runtime/GC.java:996
                            (i32.const 0)
                            ;; org/teavm/runtime/GC.java:996
                            (i32.eq
                              ;; org/teavm/runtime/GC.java:996
                              (i32.and
                                (get_local 7)
                                (i32.const 1))
                              (i32.const 0))))
                        ;; org/teavm/runtime/GC.java:996
                        (i32.eq
                          ;; org/teavm/runtime/GC.java:996
                          (i32.and
                            (get_local 7)
                            (i32.const 2))
                          (i32.const 0)))
                      (i32.const 0))
                    (then
                      ;; org/teavm/runtime/GC.java:997
                      (call $meth_otr_GC_updatePointersFromRegion
                        ;; org/teavm/runtime/GC.java:997
                        (i32.add
                          (get_local 4)
                          (get_local 6)))))
                  ;; org/teavm/runtime/GC.java:994
                  (set_local 6
                    (i32.add
                      (get_local 6)
                      (i32.const 1)))
                  (br $block_4)))))
          ;; org/teavm/runtime/GC.java:1001
          (set_local 2
            (i32.add
              (get_local 2)
              (i32.const 4)))
          ;; org/teavm/runtime/GC.java:1002
          (set_local 3
            (i32.add
              (get_local 3)
              ;; org/teavm/runtime/GC.java:1002
              (i32.mul
                (i32.const 4)
                (get_local 1))))
          ;; org/teavm/runtime/GC.java:991
          (set_local 4
            (i32.add
              (get_local 4)
              (i32.const 4)))
          (br $block_5)))
      (block $block_6
        (loop $block_8
          (br_if $block_6
            ;; org/teavm/runtime/GC.java:1005
            (i32.ge_s
              (get_local 4)
              (get_local 0)))
          ;; org/teavm/runtime/GC.java:1006
          (set_local 5
            (i32.load8_s align=1
              (get_local 2)))
          (if
            ;; org/teavm/runtime/GC.java:1007
            (i32.eq
              ;; org/teavm/runtime/GC.java:1007
              (block $block_7 i32
                (drop
                  (br_if $block_7
                    ;; org/teavm/runtime/GC.java:1007
                    (i32.const 0)
                    ;; org/teavm/runtime/GC.java:1007
                    (i32.eq
                      ;; org/teavm/runtime/GC.java:1007
                      (i32.and
                        (get_local 5)
                        (i32.const 1))
                      (i32.const 0))))
                ;; org/teavm/runtime/GC.java:1007
                (i32.eq
                  ;; org/teavm/runtime/GC.java:1007
                  (i32.and
                    (get_local 5)
                    (i32.const 2))
                  (i32.const 0)))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:1008
              (call $meth_otr_GC_updatePointersFromRegion
                (get_local 4))))
          ;; org/teavm/runtime/GC.java:1010
          (set_local 2
            (i32.add
              (get_local 2)
              (i32.const 1)))
          ;; org/teavm/runtime/GC.java:1005
          (set_local 4
            (i32.add
              (get_local 4)
              (i32.const 1)))
          (br $block_8)))))

  ;; function #55
  (func $meth_otr_GC_updatePointersFromRegion (type $type0)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:1015
      (set_local 1
        (i32.sub
          (i32.load16_s align=2
            (i32.add
              (i32.load align=4
                (i32.const 3980))
              (i32.mul
                (get_local 0)
                (i32.const 2))))
          (i32.const 1)))
      (if
        ;; org/teavm/runtime/GC.java:1016
        (i32.lt_s
          (get_local 1)
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:1017
          (return)))
      ;; org/teavm/runtime/GC.java:1020
      (set_local 2
        (i32.const 1024))
      ;; org/teavm/runtime/GC.java:1021
      (set_local 3
        (i32.add
          (i32.load align=4
            (i32.const 3996))
          ;; org/teavm/runtime/GC.java:1021
          (i32.mul
            (get_local 0)
            (get_local 2))))
      ;; org/teavm/runtime/GC.java:1022
      (set_local 4
        (i32.add
          (get_local 3)
          (get_local 2)))
      ;; org/teavm/runtime/GC.java:1023
      (set_local 5
        (i32.add
          (get_local 3)
          (get_local 1)))
      ;; org/teavm/runtime/GC.java:1024
      (set_local 6
        (i32.add
          (i32.load align=4
            (i32.const 3996))
          (i32.wrap/i64
            (i64.extend_u/i32
              (i32.load align=4
                (i32.const 4000))))))
      (if
        (i32.ge_u
          (get_local 6)
          (get_local 4))
        (then
          ;; org/teavm/runtime/GC.java:1025
          (set_local 6
            (get_local 4))))
      (block $block_0
        (loop $block_1
          (br_if $block_0
            (i32.ge_u
              (get_local 5)
              (get_local 6)))
          ;; org/teavm/runtime/GC.java:1030
          (set_local 7
            (i32.load align=4
              (get_local 5)))
          (if
            (i32.eq
              (get_local 7)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:1041
              (set_local 8
                (i32.load offset=4 align=4
                  (get_local 5))))
            (else
              ;; org/teavm/runtime/GC.java:1033
              (set_local 9
                ;; org/teavm/runtime/GC.java:1033
                (call $meth_otr_GC_getRelocation
                  (get_local 5)))
              (if
                ;; org/teavm/runtime/GC.java:1034
                (i32.ne
                  (get_local 9)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/GC.java:1035
                  (set_local 7
                    (i32.load align=4
                      (get_local 9)))))
              ;; org/teavm/runtime/GC.java:1037
              (set_local 10
                (i32.shl
                  (get_local 7)
                  (i32.const 3)))
              ;; org/teavm/runtime/GC.java:1038
              (call $meth_otr_GC_updatePointers
                (get_local 10)
                (get_local 5))
              ;; org/teavm/runtime/GC.java:1039
              (set_local 8
                ;; org/teavm/runtime/GC.java:1039
                (call $meth_otr_GC_objectSize_0
                  (get_local 5)
                  (get_local 10)))))
          ;; org/teavm/runtime/GC.java:1044
          (set_local 5
            (i32.add
              (get_local 5)
              (get_local 8)))
          (br $block_1)))))

  ;; function #56
  (func $meth_otr_GC_updatePointers (type $type6)
    (block
      (if
        ;; org/teavm/runtime/GC.java:1049
        (i32.eq
          (i32.load offset=32 align=4
            (get_local 0))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:1050
          (call $meth_otr_GC_updatePointersInObject
            (get_local 0)
            (get_local 1)))
        (else
          ;; org/teavm/runtime/GC.java:1052
          (call $meth_otr_GC_updatePointersInArray
            (get_local 0)
            (get_local 1))))))

  ;; function #57
  (func $meth_otr_GC_updatePointersInObject (type $type6)
    (block
      (block $block_0
        (loop $block_5
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:1057
            (i32.eq
              (get_local 0)
              (i32.const 0)))
          (block $block_4
            (block
              (block $block_3
                (block $block_2
                  (block $block_1
                    (br_table $block_1 $block_2 $block_3
                      (i32.sub
                        ;; org/teavm/runtime/GC.java:1058
                        (i32.and
                          ;; org/teavm/runtime/GC.java:1058
                          (i32.shr_s
                            (i32.load offset=12 align=4
                              (get_local 0))
                            (i32.const 7))
                          (i32.const 7))
                        (i32.const 1))))
                  ;; org/teavm/runtime/GC.java:1061
                  (call $meth_otr_GC_updatePointersInWeakReference
                    (get_local 1))
                  ;; org/teavm/runtime/GC.java:1062
                  (br $block_4))
                ;; org/teavm/runtime/GC.java:1065
                (call $meth_otr_GC_updatePointersInReferenceQueue
                  (get_local 1))
                ;; org/teavm/runtime/GC.java:1066
                (br $block_4)))
            ;; org/teavm/runtime/GC.java:1069
            (call $meth_otr_GC_updatePointersInFields
              (get_local 0)
              (get_local 1)))
          ;; org/teavm/runtime/GC.java:1072
          (set_local 0
            (i32.load offset=56 align=4
              (get_local 0)))
          (br $block_5)))))

  ;; function #58
  (func $meth_otr_GC_updatePointersInWeakReference (type $type0)
    (block
      ;; org/teavm/runtime/GC.java:1077
      (i32.store offset=8 align=4
        (get_local 0)
        ;; org/teavm/runtime/GC.java:1077
        (call $meth_otr_GC_updatePointer
          (i32.load offset=8 align=4
            (get_local 0))))
      ;; org/teavm/runtime/GC.java:1078
      (i32.store offset=16 align=4
        (get_local 0)
        ;; org/teavm/runtime/GC.java:1078
        (call $meth_otr_GC_updatePointer
          (i32.load offset=16 align=4
            (get_local 0))))
      ;; org/teavm/runtime/GC.java:1079
      (i32.store offset=12 align=4
        (get_local 0)
        ;; org/teavm/runtime/GC.java:1079
        (call $meth_otr_GC_updatePointer
          (i32.load offset=12 align=4
            (get_local 0))))))

  ;; function #59
  (func $meth_otr_GC_updatePointersInReferenceQueue (type $type0)
    (block
      ;; org/teavm/runtime/GC.java:1083
      (i32.store offset=8 align=4
        (get_local 0)
        ;; org/teavm/runtime/GC.java:1083
        (call $meth_otr_GC_updatePointer
          (i32.load offset=8 align=4
            (get_local 0))))
      ;; org/teavm/runtime/GC.java:1084
      (i32.store offset=12 align=4
        (get_local 0)
        ;; org/teavm/runtime/GC.java:1084
        (call $meth_otr_GC_updatePointer
          (i32.load offset=12 align=4
            (get_local 0))))))

  ;; function #60
  (func $meth_otr_GC_updatePointersInFields (type $type6)
    (local i32 i32 i32 i32 i32)
    (block
      (block $block_0
        ;; org/teavm/runtime/GC.java:1088
        (set_local 2
          (i32.load offset=72 align=4
            (get_local 0)))
        (if
          ;; org/teavm/runtime/GC.java:1089
          (i32.ne
            (get_local 2)
            (i32.const 0))
          (then
            ;; org/teavm/runtime/GC.java:1090
            (set_local 3
              (i32.load16_s align=2
                (get_local 2)))
            (loop $block_1
              ;; org/teavm/runtime/GC.java:1091
              (set_local 4
                (i32.shr_s
                  (i32.shl
                    ;; org/teavm/runtime/GC.java:1091
                    (i32.sub
                      (get_local 3)
                      (i32.const 1))
                    (i32.const 16))
                  (i32.const 16)))
              (if
                ;; org/teavm/runtime/GC.java:1091
                (i32.le_s
                  (get_local 3)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/GC.java:1091
                  (br $block_0)))
              ;; org/teavm/runtime/GC.java:1092
              (set_local 2
                (i32.add
                  (get_local 2)
                  (i32.const 2)))
              ;; org/teavm/runtime/GC.java:1093
              (set_local 5
                (i32.load16_s align=2
                  (get_local 2)))
              ;; org/teavm/runtime/GC.java:1094
              (set_local 6
                (i32.add
                  (get_local 1)
                  (get_local 5)))
              (i32.store align=4
                (get_local 6)
                ;; org/teavm/runtime/GC.java:1095
                (call $meth_otr_GC_updatePointer
                  (i32.load align=4
                    (get_local 6))))
              ;; org/teavm/runtime/GC.java:1095
              (set_local 3
                (get_local 4))
              (br $block_1)))))))

  ;; function #61
  (func $meth_otr_GC_updatePointersInArray (type $type6)
    (local i32 i32 i32)
    (block
      (if
        ;; org/teavm/runtime/GC.java:1101
        (i32.and
          (i32.load offset=12 align=4
            (i32.load offset=32 align=4
              (get_local 0)))
          (i32.const 2))
        (then
          ;; org/teavm/runtime/GC.java:1102
          (return)))
      ;; org/teavm/runtime/GC.java:1104
      (set_local 2
        (call $meth_otbw_WasmRuntime_align
          (i32.add
            (get_local 1)
            (i32.mul
              (i32.const 1)
              (i32.const 12)))
          (i32.const 4)))
      ;; org/teavm/runtime/GC.java:1105
      (set_local 3
        (i32.load offset=8 align=4
          (get_local 1)))
      ;; org/teavm/runtime/GC.java:1106
      (set_local 4
        (i32.const 0))
      (block $block_0
        (loop $block_1
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:1106
            (i32.ge_s
              (get_local 4)
              (get_local 3)))
          (i32.store align=4
            (get_local 2)
            ;; org/teavm/runtime/GC.java:1107
            (call $meth_otr_GC_updatePointer
              (i32.load align=4
                (get_local 2))))
          ;; org/teavm/runtime/GC.java:1108
          (set_local 2
            (i32.add
              (get_local 2)
              (i32.const 4)))
          ;; org/teavm/runtime/GC.java:1106
          (set_local 4
            (i32.add
              (get_local 4)
              (i32.const 1)))
          (br $block_1)))))

  ;; function #62
  (func $meth_otr_GC_updatePointer (type $type1)
    (local i32)
    (block i32
      (if
        ;; org/teavm/runtime/GC.java:1113
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:1114
          (return
            (i32.const 0))))
      ;; org/teavm/runtime/GC.java:1116
      (set_local 1
        ;; org/teavm/runtime/GC.java:1116
        (call $meth_otr_GC_getRelocation
          (get_local 0)))
      (if
        ;; org/teavm/runtime/GC.java:1117
        (i32.ne
          (get_local 1)
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:1117
          (set_local 0
            (i32.load offset=8 align=4
              (get_local 1)))))
      ;; org/teavm/runtime/GC.java:1117
      (return
        (get_local 0))))

  ;; function #63
  (func $meth_otr_GC_getRelocation (type $type1)
    (local i32)
    (block i32
      (if
        ;; org/teavm/runtime/GC.java:1121
        (block $block_0 i32
          (drop
            (br_if $block_0
              ;; org/teavm/runtime/GC.java:1121
              (i32.const 0)
              (i32.lt_u
                (get_local 0)
                (i32.load align=4
                  (i32.const 3996)))))
          (i32.lt_u
            (get_local 0)
            (i32.add
              (i32.load align=4
                (i32.const 3996))
              (i32.wrap/i64
                (i64.extend_u/i32
                  (i32.load align=4
                    (i32.const 4000)))))))
        (then
          ;; org/teavm/runtime/GC.java:1124
          (set_local 1
            (get_local 0))
          (if
            ;; org/teavm/runtime/GC.java:1125
            (i32.eq
              ;; org/teavm/runtime/GC.java:1125
              (i32.and
                (i32.load align=4
                  (get_local 1))
                (i32.const -2147483648))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:1126
              (return
                (i32.const 0))))
          ;; org/teavm/runtime/GC.java:1129
          (return
            (i32.wrap/i64
              ;; org/teavm/runtime/GC.java:1128
              (i64.or
                ;; org/teavm/runtime/GC.java:1128
                (i64.shl
                  ;; org/teavm/runtime/GC.java:1128
                  (i64.and
                    ;; org/teavm/runtime/GC.java:1128
                    (i64.extend_s/i32
                      (i32.load align=4
                        (get_local 1)))
                    (i64.const 4294967295))
                  (i64.extend_u/i32
                    (i32.const 33)))
                ;; org/teavm/runtime/GC.java:1128
                (i64.shl
                  ;; org/teavm/runtime/GC.java:1128
                  (i64.and
                    ;; org/teavm/runtime/GC.java:1128
                    (i64.extend_s/i32
                      (i32.load offset=4 align=4
                        (get_local 1)))
                    (i64.const 4294967295))
                  (i64.extend_u/i32
                    (i32.const 1))))))))
      ;; org/teavm/runtime/GC.java:1122
      (return
        (i32.const 0))))

  ;; function #64
  (func $meth_otr_GC_restoreObjectHeaders (type $type3)
    (local i32 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:1136
      (set_local 0
        ;; org/teavm/runtime/GC.java:1136
        (call $meth_otr_GC_getRegionCount))
      ;; org/teavm/runtime/GC.java:1138
      (set_local 1
        (i32.load align=4
          (i32.const 3992)))
      ;; org/teavm/runtime/GC.java:1139
      (set_local 2
        (i32.add
          (i32.load align=4
            (i32.const 3996))
          (i32.wrap/i64
            (i64.extend_u/i32
              (i32.load align=4
                (i32.const 4000))))))
      ;; org/teavm/runtime/GC.java:1141
      (set_local 3
        (i32.const 0))
      (block $block_0
        (loop $block_3
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:1141
            (i32.ge_s
              (get_local 3)
              ;; org/teavm/runtime/GC.java:1141
              (i32.sub
                (get_local 0)
                (i32.const 3))))
          (block $block_1
            (if
              ;; org/teavm/runtime/GC.java:1143
              (i32.and
                (i32.load align=4
                  (get_local 1))
                (i32.const 134744072))
              (then
                ;; org/teavm/runtime/GC.java:1144
                (set_local 4
                  (i32.const 0))
                (loop $block_2
                  (if
                    ;; org/teavm/runtime/GC.java:1144
                    (i32.ge_s
                      (get_local 4)
                      (i32.const 4))
                    (then
                      ;; org/teavm/runtime/GC.java:1144
                      (br $block_1)))
                  (if
                    ;; org/teavm/runtime/GC.java:1146
                    (i32.and
                      (i32.load8_s align=1
                        (i32.add
                          (get_local 1)
                          (get_local 4)))
                      (i32.const 8))
                    (then
                      ;; org/teavm/runtime/GC.java:1147
                      (call $meth_otr_GC_restoreObjectHeadersInRegion
                        ;; org/teavm/runtime/GC.java:1147
                        (i32.add
                          (get_local 3)
                          (get_local 4))
                        (get_local 2))))
                  ;; org/teavm/runtime/GC.java:1144
                  (set_local 4
                    (i32.add
                      (get_local 4)
                      (i32.const 1)))
                  (br $block_2)))))
          ;; org/teavm/runtime/GC.java:1151
          (set_local 1
            (i32.add
              (get_local 1)
              (i32.const 4)))
          ;; org/teavm/runtime/GC.java:1141
          (set_local 3
            (i32.add
              (get_local 3)
              (i32.const 4)))
          (br $block_3)))
      (block $block_4
        (loop $block_5
          (br_if $block_4
            ;; org/teavm/runtime/GC.java:1154
            (i32.ge_s
              (get_local 3)
              (get_local 0)))
          (if
            ;; org/teavm/runtime/GC.java:1155
            (i32.and
              (i32.load8_s align=1
                (get_local 1))
              (i32.const 8))
            (then
              ;; org/teavm/runtime/GC.java:1156
              (call $meth_otr_GC_restoreObjectHeadersInRegion
                (get_local 3)
                (get_local 2))))
          ;; org/teavm/runtime/GC.java:1158
          (set_local 1
            (i32.add
              (get_local 1)
              (i32.const 1)))
          ;; org/teavm/runtime/GC.java:1154
          (set_local 3
            (i32.add
              (get_local 3)
              (i32.const 1)))
          (br $block_5)))))

  ;; function #65
  (func $meth_otr_GC_restoreObjectHeadersInRegion (type $type6)
    (local i32 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:1163
      (set_local 2
        (i32.sub
          (i32.load16_s align=2
            (i32.add
              (i32.load align=4
                (i32.const 3980))
              (i32.mul
                (get_local 0)
                (i32.const 2))))
          (i32.const 1)))
      ;; org/teavm/runtime/GC.java:1165
      (set_local 3
        (i32.const 1024))
      ;; org/teavm/runtime/GC.java:1166
      (set_local 4
        (i32.add
          (i32.load align=4
            (i32.const 3996))
          ;; org/teavm/runtime/GC.java:1166
          (i32.mul
            (get_local 0)
            (get_local 3))))
      ;; org/teavm/runtime/GC.java:1167
      (set_local 5
        (i32.add
          (get_local 4)
          (get_local 3)))
      ;; org/teavm/runtime/GC.java:1168
      (set_local 6
        (i32.add
          (get_local 4)
          (get_local 2)))
      (if
        (i32.ge_u
          (get_local 1)
          (get_local 5))
        (then
          ;; org/teavm/runtime/GC.java:1169
          (set_local 1
            (get_local 5))))
      ;; org/teavm/runtime/GC.java:1173
      (call $meth_otr_GC_restoreObjectHeadersInRange
        (get_local 6)
        (get_local 1))))

  ;; function #66
  (func $meth_otr_GC_restoreObjectHeadersInRange (type $type6)
    (local i32 i32)
    (block
      (block $block_0
        (loop $block_1
          (br_if $block_0
            (i32.ge_u
              (get_local 0)
              (get_local 1)))
          ;; org/teavm/runtime/GC.java:1178
          (set_local 2
            ;; org/teavm/runtime/GC.java:1178
            (call $meth_otr_GC_getRelocation
              (get_local 0)))
          (if
            ;; org/teavm/runtime/GC.java:1179
            (i32.ne
              (get_local 2)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:1180
              (i32.store align=4
                (get_local 0)
                ;; org/teavm/runtime/GC.java:1180
                (i32.or
                  (i32.load align=4
                    (get_local 2))
                  (i32.const -2147483648)))
              ;; org/teavm/runtime/GC.java:1181
              (i32.store offset=4 align=4
                (get_local 0)
                (i32.load offset=4 align=4
                  (get_local 2)))))
          ;; org/teavm/runtime/GC.java:1183
          (set_local 3
            ;; org/teavm/runtime/GC.java:1183
            (call $meth_otr_GC_objectSize
              (get_local 0)))
          ;; org/teavm/runtime/GC.java:1184
          (set_local 0
            (i32.add
              (get_local 0)
              (get_local 3)))
          (br $block_1)))))

  ;; function #67
  (func $meth_otr_GC_relocateObjects (type $type3)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:1191
      (set_local 0
        (i32.add
          (i32.load align=4
            (i32.const 3996))
          (i32.wrap/i64
            (i64.extend_u/i32
              (i32.load align=4
                (i32.const 4000))))))
      ;; org/teavm/runtime/GC.java:1193
      (set_local 1
        (i32.load align=4
          (i32.const 936)))
      ;; org/teavm/runtime/GC.java:1194
      (set_local 2
        (i32.load align=4
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:1194
            (i32.const 932))))
      ;; org/teavm/runtime/GC.java:1195
      (set_local 3
        (i32.add
          (get_local 2)
          (i32.load offset=4 align=4
            (get_local 2))))
      ;; org/teavm/runtime/GC.java:1198
      (set_local 4
        (i32.add
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:1197
            (i32.const 932))
          (i32.mul
            (get_local 1)
            (i32.const 4))))
      ;; org/teavm/runtime/GC.java:1199
      (set_local 5
        (i32.load align=4
          (get_local 4)))
      ;; org/teavm/runtime/GC.java:1200
      (set_local 6
        (i32.load offset=4 align=4
          (get_local 4)))
      ;; org/teavm/runtime/GC.java:1202
      (set_local 7
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:1203
      (set_local 8
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:1204
      (set_local 9
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:1205
      (set_local 10
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:1206
      (set_local 11
        ;; org/teavm/runtime/GC.java:1206
        (call $meth_otr_GC_getRegionCount))
      (block $block_0
        (loop $block_8
          (br_if $block_0
            (i32.ge_u
              (get_local 3)
              (get_local 0)))
          ;; org/teavm/runtime/GC.java:1209
          (set_local 12
            ;; org/teavm/runtime/GC.java:1209
            (call $meth_otr_GC_objectSize
              (get_local 3)))
          (if
            ;; org/teavm/runtime/GC.java:1210
            (i32.and
              (i32.load align=4
                (get_local 3))
              (i32.const -2147483648))
            (then
              ;; org/teavm/runtime/GC.java:1211
              (i32.store align=4
                (get_local 3)
                ;; org/teavm/runtime/GC.java:1211
                (i32.and
                  (i32.load align=4
                    (get_local 3))
                  (i32.const 2147483647)))
              (block $block_1
                (loop $block_2
                  (br_if $block_1
                    (i32.ne
                      (get_local 5)
                      (i32.const 0)))
                  (if
                    (get_local 9)
                    (then
                      ;; org/teavm/runtime/GC.java:1215
                      (call $meth_otr_GC_moveMemoryBlock
                        (get_local 8)
                        (get_local 7)
                        (get_local 9))
                      ;; org/teavm/runtime/GC.java:1216
                      (set_local 8
                        (i32.const 0))
                      ;; org/teavm/runtime/GC.java:1217
                      (set_local 9
                        (i32.const 0))))
                  ;; org/teavm/runtime/GC.java:1220
                  (i32.store offset=4 align=4
                    (get_local 4)
                    (get_local 6))
                  ;; org/teavm/runtime/GC.java:1221
                  (set_local 4
                    (i32.add
                      (get_local 4)
                      (i32.mul
                        (i32.const 1)
                        (i32.const 12))))
                  ;; org/teavm/runtime/GC.java:1222
                  (set_local 5
                    (i32.load align=4
                      (get_local 4)))
                  ;; org/teavm/runtime/GC.java:1223
                  (set_local 6
                    (i32.load offset=4 align=4
                      (get_local 4)))
                  (br $block_2)))
              (if
                ;; org/teavm/runtime/GC.java:1226
                (i32.eq
                  (get_local 8)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/GC.java:1227
                  (set_local 8
                    (get_local 3))
                  ;; org/teavm/runtime/GC.java:1227
                  (set_local 7
                    (get_local 6))))
              ;; org/teavm/runtime/GC.java:1231
              (set_local 6
                (i32.add
                  (get_local 6)
                  (get_local 12)))
              ;; org/teavm/runtime/GC.java:1232
              (set_local 9
                (i32.add
                  (get_local 9)
                  (get_local 12)))
              ;; org/teavm/runtime/GC.java:1233
              (set_local 5
                (i32.add
                  (get_local 5)
                  (i32.const -1))))
            (else
              (if
                ;; org/teavm/runtime/GC.java:1235
                (i32.ne
                  (get_local 8)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/GC.java:1236
                  (call $meth_otr_GC_moveMemoryBlock
                    (get_local 8)
                    (get_local 7)
                    (get_local 9))
                  ;; org/teavm/runtime/GC.java:1237
                  (set_local 8
                    (i32.const 0))
                  ;; org/teavm/runtime/GC.java:1238
                  (set_local 9
                    (i32.const 0))))
              (if
                ;; org/teavm/runtime/GC.java:1242
                (block $block_3 i32
                  (drop
                    (br_if $block_3
                      ;; org/teavm/runtime/GC.java:1242
                      (i32.const 0)
                      (i32.eq
                        (i32.load align=4
                          (get_local 3))
                        (i32.const 0))))
                  (i32.ge_u
                    (get_local 3)
                    (get_local 10)))
                (then
                  ;; org/teavm/runtime/GC.java:1243
                  (set_local 13
                    (i32.wrap/i64
                      ;; org/teavm/runtime/GC.java:1243
                      (i64.div_s
                        ;; org/teavm/runtime/GC.java:1243
                        (i64.sub
                          (i64.extend_u/i32
                            (get_local 3))
                          (i64.extend_u/i32
                            (i32.load align=4
                              (i32.const 3996))))
                        ;; org/teavm/runtime/GC.java:1243
                        (i64.extend_s/i32
                          (i32.const 1024)))))
                  ;; org/teavm/runtime/GC.java:1244
                  (set_local 10
                    (i32.add
                      (i32.load align=4
                        (i32.const 3996))
                      (i32.wrap/i64
                        ;; org/teavm/runtime/GC.java:1244
                        (i64.mul
                          ;; org/teavm/runtime/GC.java:1244
                          (i64.extend_s/i32
                            (i32.const 1024))
                          ;; org/teavm/runtime/GC.java:1244
                          (i64.extend_s/i32
                            ;; org/teavm/runtime/GC.java:1244
                            (i32.add
                              (get_local 13)
                              (i32.const 1)))))))
                  ;; org/teavm/runtime/GC.java:1245
                  (set_local 14
                    (i32.load8_s align=1
                      (i32.add
                        (i32.load align=4
                          (i32.const 3992))
                        (get_local 13))))
                  (if
                    ;; org/teavm/runtime/GC.java:1246
                    (block $block_4 i32
                      (drop
                        (br_if $block_4
                          ;; org/teavm/runtime/GC.java:1246
                          (i32.const 0)
                          ;; org/teavm/runtime/GC.java:1246
                          (i32.ne
                            ;; org/teavm/runtime/GC.java:1246
                            (i32.and
                              (get_local 14)
                              (i32.const 8))
                            (i32.const 0))))
                      ;; org/teavm/runtime/GC.java:1246
                      (i32.eq
                        ;; org/teavm/runtime/GC.java:1246
                        (i32.and
                          (get_local 14)
                          (i32.const 4))
                        (i32.const 0)))
                    (then
                      (block $block_5
                        (block $block_6
                          (loop $block_7
                            ;; org/teavm/runtime/GC.java:1247
                            (set_local 13
                              (i32.add
                                (get_local 13)
                                (i32.const 1)))
                            (if
                              ;; org/teavm/runtime/GC.java:1247
                              (i32.ge_s
                                (get_local 13)
                                (get_local 11))
                              (then
                                ;; org/teavm/runtime/GC.java:1247
                                (br $block_5)))
                            ;; org/teavm/runtime/GC.java:1248
                            (set_local 15
                              (i32.load8_s align=1
                                (i32.add
                                  (i32.load align=4
                                    (i32.const 3992))
                                  (get_local 13))))
                            (if
                              ;; org/teavm/runtime/GC.java:1249
                              (i32.and
                                (get_local 15)
                                (i32.const 8))
                              (then
                                ;; org/teavm/runtime/GC.java:1249
                                (br $block_5)))
                            (if
                              ;; org/teavm/runtime/GC.java:1249
                              (i32.and
                                (get_local 15)
                                (i32.const 4))
                              (then
                                ;; org/teavm/runtime/GC.java:1250
                                (br $block_5)))
                            (if
                              (i32.eq
                                (i32.load16_s align=2
                                  (i32.add
                                    (i32.load align=4
                                      (i32.const 3980))
                                    (i32.mul
                                      (get_local 13)
                                      (i32.const 2))))
                                (i32.const 0))
                              (then
                                ;; org/teavm/runtime/GC.java:1252
                                (br $block_6)))
                            (br $block_7))))
                      ;; org/teavm/runtime/GC.java:1256
                      (set_local 16
                        (i32.add
                          (get_local 13)
                          (i32.const -1)))
                      ;; org/teavm/runtime/GC.java:1257
                      (set_local 10
                        (i32.add
                          (i32.load align=4
                            (i32.const 3996))
                          (i32.wrap/i64
                            ;; org/teavm/runtime/GC.java:1257
                            (i64.mul
                              ;; org/teavm/runtime/GC.java:1257
                              (i64.extend_s/i32
                                (i32.const 1024))
                              ;; org/teavm/runtime/GC.java:1257
                              (i64.extend_s/i32
                                ;; org/teavm/runtime/GC.java:1257
                                (i32.add
                                  (get_local 16)
                                  (i32.const 1)))))))
                      ;; org/teavm/runtime/GC.java:1259
                      (set_local 17
                        (i32.sub
                          (i32.load16_s align=2
                            (i32.add
                              (i32.load align=4
                                (i32.const 3980))
                              (i32.mul
                                (get_local 16)
                                (i32.const 2))))
                          (i32.const 1)))
                      ;; org/teavm/runtime/GC.java:1260
                      (set_local 3
                        (i32.add
                          (i32.add
                            (i32.load align=4
                              (i32.const 3996))
                            (i32.wrap/i64
                              ;; org/teavm/runtime/GC.java:1260
                              (i64.mul
                                ;; org/teavm/runtime/GC.java:1260
                                (i64.extend_s/i32
                                  (i32.const 1024))
                                ;; org/teavm/runtime/GC.java:1260
                                (i64.extend_s/i32
                                  (get_local 16)))))
                          (get_local 17)))
                      ;; org/teavm/runtime/GC.java:1261
                      (set_local 12
                        ;; org/teavm/runtime/GC.java:1261
                        (call $meth_otr_GC_objectSize
                          (get_local 3)))))))))
          ;; org/teavm/runtime/GC.java:1266
          (set_local 3
            (i32.add
              (get_local 3)
              (get_local 12)))
          (br $block_8)))
      ;; org/teavm/runtime/GC.java:1269
      (i32.store offset=4 align=4
        (get_local 4)
        (get_local 6))
      (if
        ;; org/teavm/runtime/GC.java:1270
        (i32.ne
          (get_local 8)
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:1271
          (call $meth_otr_GC_moveMemoryBlock
            (get_local 8)
            (get_local 7)
            (get_local 9))))))

  ;; function #68
  (func $meth_otr_GC_moveMemoryBlock (type $type7)
    (local i64 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i64 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:1276
      (set_local 3
        (i64.sub
          (i64.extend_u/i32
            (get_local 0))
          (i64.extend_u/i32
            (i32.load align=4
              (i32.const 3996)))))
      ;; org/teavm/runtime/GC.java:1277
      (set_local 4
        (i32.wrap/i64
          ;; org/teavm/runtime/GC.java:1277
          (i64.div_s
            (get_local 3)
            ;; org/teavm/runtime/GC.java:1277
            (i64.extend_s/i32
              (i32.const 1024)))))
      ;; org/teavm/runtime/GC.java:1278
      (set_local 5
        (i32.add
          (i32.load align=4
            (i32.const 3980))
          (i32.mul
            (get_local 4)
            (i32.const 2))))
      ;; org/teavm/runtime/GC.java:1281
      (set_local 6
        (i32.wrap/i64
          ;; org/teavm/runtime/GC.java:1281
          (i64.div_s
            ;; org/teavm/runtime/GC.java:1280
            (i64.add
              (get_local 3)
              ;; org/teavm/runtime/GC.java:1280
              (i64.extend_s/i32
                (get_local 2)))
            ;; org/teavm/runtime/GC.java:1281
            (i64.extend_s/i32
              (i32.const 1024)))))
      ;; org/teavm/runtime/GC.java:1282
      (set_local 7
        (i32.add
          (i32.load align=4
            (i32.const 3980))
          (i32.mul
            (get_local 6)
            (i32.const 2))))
      (if
        ;; org/teavm/runtime/GC.java:1284
        (block $block_0 i32
          (drop
            (br_if $block_0
              ;; org/teavm/runtime/GC.java:1284
              (i32.const 0)
              ;; org/teavm/runtime/GC.java:1284
              (i32.eq
                (get_local 5)
                (get_local 7))))
          ;; org/teavm/runtime/GC.java:1284
          (i64.eq
            ;; org/teavm/runtime/GC.java:1284
            (i64.add
              ;; org/teavm/runtime/GC.java:1284
              (i64.rem_s
                (get_local 3)
                ;; org/teavm/runtime/GC.java:1284
                (i64.extend_s/i32
                  (i32.const 1024)))
              (i64.const 1))
            ;; org/teavm/runtime/GC.java:1284
            (i64.extend_s/i32
              (i32.load16_s align=2
                (get_local 5)))))
        (then
          ;; org/teavm/runtime/GC.java:1285
          (i32.store16 align=2
            (get_local 5)
            (i32.const 0))))
      ;; org/teavm/runtime/GC.java:1287
      (set_local 8
        (i32.add
          (get_local 4)
          (i32.const 1)))
      (block $block_1
        (loop $block_2
          (br_if $block_1
            ;; org/teavm/runtime/GC.java:1287
            (i32.ge_s
              (get_local 8)
              (get_local 6)))
          ;; org/teavm/runtime/GC.java:1288
          (i32.store16 align=2
            (i32.add
              (i32.load align=4
                (i32.const 3980))
              (i32.mul
                (get_local 8)
                (i32.const 2)))
            (i32.const 0))
          ;; org/teavm/runtime/GC.java:1287
          (set_local 8
            (i32.add
              (get_local 8)
              (i32.const 1)))
          (br $block_2)))
      (if
        ;; org/teavm/runtime/GC.java:1291
        (i32.eq
          ;; org/teavm/runtime/GC.java:1291
          (block $block_3 i32
            (drop
              (br_if $block_3
                ;; org/teavm/runtime/GC.java:1291
                (i32.const 0)
                ;; org/teavm/runtime/GC.java:1291
                (i32.ne
                  (get_local 5)
                  (get_local 7))))
            ;; org/teavm/runtime/GC.java:1291
            (i64.ne
              ;; org/teavm/runtime/GC.java:1291
              (i64.add
                ;; org/teavm/runtime/GC.java:1291
                (i64.rem_s
                  (get_local 3)
                  ;; org/teavm/runtime/GC.java:1291
                  (i64.extend_s/i32
                    (i32.const 1024)))
                (i64.const 1))
              ;; org/teavm/runtime/GC.java:1291
              (i64.extend_s/i32
                (i32.load16_s align=2
                  (get_local 5)))))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:1292
          (set_local 9
            (i32.add
              (i32.load align=4
                (i32.const 3996))
              (i32.wrap/i64
                (i64.extend_u/i32
                  (i32.load align=4
                    (i32.const 4000))))))
          ;; org/teavm/runtime/GC.java:1293
          (set_local 10
            (i32.add
              (get_local 0)
              (get_local 2)))
          (if
            (i32.ge_u
              (get_local 10)
              (get_local 9))
            (then
              ;; org/teavm/runtime/GC.java:1309
              (i32.store16 align=2
                (get_local 7)
                (i32.const 0)))
            (else
              (if
                (i32.load align=4
                  (get_local 10))
                (then
                  ;; org/teavm/runtime/GC.java:1297
                  (set_local 11
                    (get_local 6)))
                (else
                  ;; org/teavm/runtime/GC.java:1298
                  (set_local 10
                    (i32.add
                      (get_local 10)
                      (i32.load offset=4 align=4
                        (get_local 10))))
                  ;; org/teavm/runtime/GC.java:1300
                  (set_local 11
                    (i32.wrap/i64
                      ;; org/teavm/runtime/GC.java:1300
                      (i64.div_s
                        ;; org/teavm/runtime/GC.java:1299
                        (i64.sub
                          (i64.extend_u/i32
                            (get_local 10))
                          (i64.extend_u/i32
                            (i32.load align=4
                              (i32.const 3996))))
                        ;; org/teavm/runtime/GC.java:1300
                        (i64.extend_s/i32
                          (i32.const 1024)))))))
              (if
                ;; org/teavm/runtime/GC.java:1302
                (block $block_4 i32
                  (drop
                    (br_if $block_4
                      ;; org/teavm/runtime/GC.java:1302
                      (i32.const 0)
                      ;; org/teavm/runtime/GC.java:1302
                      (i32.ne
                        (get_local 11)
                        (get_local 6))))
                  (i32.lt_u
                    (get_local 10)
                    (get_local 9)))
                (then
                  ;; org/teavm/runtime/GC.java:1306
                  (i32.store16 align=2
                    (get_local 7)
                    ;; org/teavm/runtime/GC.java:1306
                    (i32.shr_s
                      ;; org/teavm/runtime/GC.java:1306
                      (i32.shl
                        ;; org/teavm/runtime/GC.java:1306
                        (i32.wrap/i64
                          ;; org/teavm/runtime/GC.java:1306
                          (i64.add
                            ;; org/teavm/runtime/GC.java:1306
                            (i64.rem_s
                              ;; org/teavm/runtime/GC.java:1305
                              (i64.sub
                                (i64.extend_u/i32
                                  (get_local 10))
                                (i64.extend_u/i32
                                  (i32.load align=4
                                    (i32.const 3996))))
                              ;; org/teavm/runtime/GC.java:1306
                              (i64.extend_s/i32
                                (i32.const 1024)))
                            (i64.const 1)))
                        (i32.const 16))
                      (i32.const 16))))
                (else
                  ;; org/teavm/runtime/GC.java:1303
                  (i32.store16 align=2
                    (get_local 7)
                    (i32.const 0))))))))
      (call $meth_otbw_WasmRuntime_moveMemoryBlock
        (get_local 0)
        (get_local 1)
        (get_local 2))
      ;; org/teavm/runtime/GC.java:1315
      (set_local 12
        (get_local 1))
      ;; org/teavm/runtime/GC.java:1316
      (set_local 13
        (i32.add
          (get_local 1)
          (get_local 2)))
      ;; org/teavm/runtime/GC.java:1317
      (set_local 14
        (i32.const 0))
      (block $block_5
        (loop $block_7
          (br_if $block_5
            (i32.ge_u
              (get_local 12)
              (get_local 13)))
          (if
            (i32.ge_u
              (get_local 12)
              (get_local 14))
            (then
              ;; org/teavm/runtime/GC.java:1320
              (set_local 15
                (i64.sub
                  (i64.extend_u/i32
                    (get_local 12))
                  (i64.extend_u/i32
                    (i32.load align=4
                      (i32.const 3996)))))
              ;; org/teavm/runtime/GC.java:1321
              (set_local 16
                (i32.wrap/i64
                  ;; org/teavm/runtime/GC.java:1321
                  (i64.div_s
                    (get_local 15)
                    ;; org/teavm/runtime/GC.java:1321
                    (i64.extend_s/i32
                      (i32.const 1024)))))
              ;; org/teavm/runtime/GC.java:1322
              (set_local 14
                (i32.add
                  (i32.load align=4
                    (i32.const 3996))
                  (i32.wrap/i64
                    ;; org/teavm/runtime/GC.java:1322
                    (i64.mul
                      ;; org/teavm/runtime/GC.java:1322
                      (i64.extend_s/i32
                        (i32.const 1024))
                      ;; org/teavm/runtime/GC.java:1322
                      (i64.extend_s/i32
                        ;; org/teavm/runtime/GC.java:1322
                        (i32.add
                          (get_local 16)
                          (i32.const 1)))))))
              ;; org/teavm/runtime/GC.java:1323
              (set_local 17
                (i32.add
                  (i32.load align=4
                    (i32.const 3980))
                  (i32.mul
                    (get_local 16)
                    (i32.const 2))))
              ;; org/teavm/runtime/GC.java:1324
              (set_local 18
                (i32.wrap/i64
                  ;; org/teavm/runtime/GC.java:1324
                  (i64.rem_s
                    (get_local 15)
                    ;; org/teavm/runtime/GC.java:1324
                    (i64.extend_s/i32
                      (i32.const 1024)))))
              (if
                ;; org/teavm/runtime/GC.java:1325
                (i32.eq
                  ;; org/teavm/runtime/GC.java:1325
                  (block $block_6 i32
                    (drop
                      (br_if $block_6
                        ;; org/teavm/runtime/GC.java:1325
                        (i32.const 0)
                        (i32.eq
                          (i32.load16_s align=2
                            (get_local 17))
                          (i32.const 0))))
                    ;; org/teavm/runtime/GC.java:1325
                    (i32.le_s
                      ;; org/teavm/runtime/GC.java:1325
                      (i32.sub
                        (i32.load16_s align=2
                          (get_local 17))
                        (i32.const 1))
                      (get_local 18)))
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/GC.java:1326
                  (i32.store16 align=2
                    (get_local 17)
                    ;; org/teavm/runtime/GC.java:1326
                    (i32.shr_s
                      ;; org/teavm/runtime/GC.java:1326
                      (i32.shl
                        ;; org/teavm/runtime/GC.java:1326
                        (i32.add
                          (get_local 18)
                          (i32.const 1))
                        (i32.const 16))
                      (i32.const 16)))))))
          ;; org/teavm/runtime/GC.java:1329
          (set_local 19
            ;; org/teavm/runtime/GC.java:1329
            (call $meth_otr_GC_objectSize
              (get_local 12)))
          ;; org/teavm/runtime/GC.java:1330
          (set_local 12
            (i32.add
              (get_local 12)
              (get_local 19)))
          (br $block_7)))
      (drop
        (i32.const 0))))

  ;; function #69
  (func $meth_otr_GC_putNewFreeChunks (type $type3)
    (local i32 i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:1337
      (set_local 0
        (i32.load align=4
          (i32.const 932)))
      ;; org/teavm/runtime/GC.java:1339
      (set_local 1
        (i32.add
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:1338
            (i32.const 932))
          (i32.mul
            (i32.load align=4
              ;; org/teavm/runtime/GC.java:1338
              (i32.const 936))
            (i32.const 4))))
      ;; org/teavm/runtime/GC.java:1340
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:1340
        (i32.const 936)
        (i32.const 0))
      (block $block_0
        (loop $block_1
          (br_if $block_0
            (i32.lt_u
              (i32.load align=4
                ;; org/teavm/runtime/GC.java:1341
                (i32.const 956))
              (get_local 1)))
          (if
            (i32.lt_u
              (i32.load offset=4 align=4
                (get_local 1))
              (i32.load offset=8 align=4
                (get_local 1)))
            (then
              ;; org/teavm/runtime/GC.java:1343
              (set_local 2
                (i32.load offset=4 align=4
                  (get_local 1)))
              (if
                (i32.ge_u
                  (get_local 2)
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:1344
                    (i32.const 952)))
                (then
                  ;; org/teavm/runtime/GC.java:1345
                  (i32.store align=4
                    ;; org/teavm/runtime/GC.java:1345
                    (i32.const 952)
                    (get_local 2))))
              ;; org/teavm/runtime/GC.java:1347
              (i32.store offset=4 align=4
                (get_local 2)
                ;; org/teavm/runtime/GC.java:1347
                (i32.wrap/i64
                  ;; org/teavm/runtime/GC.java:1347
                  (i64.sub
                    (i64.extend_u/i32
                      (i32.load offset=8 align=4
                        (get_local 1)))
                    (i64.extend_u/i32
                      (i32.load offset=4 align=4
                        (get_local 1))))))
              ;; org/teavm/runtime/GC.java:1348
              (i32.store align=4
                (get_local 2)
                (i32.const 0))
              (drop
                (i32.const 0))
              ;; org/teavm/runtime/GC.java:1350
              (i32.store align=4
                (get_local 0)
                (get_local 2))
              ;; org/teavm/runtime/GC.java:1351
              (set_local 0
                (i32.add
                  (get_local 0)
                  (i32.mul
                    (i32.const 1)
                    (i32.const 4))))
              ;; org/teavm/runtime/GC.java:1352
              (i32.store align=4
                ;; org/teavm/runtime/GC.java:1352
                (i32.const 936)
                ;; org/teavm/runtime/GC.java:1352
                (i32.add
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:1352
                    (i32.const 936))
                  (i32.const 1)))))
          ;; org/teavm/runtime/GC.java:1354
          (set_local 1
            (i32.add
              (get_local 1)
              (i32.mul
                (i32.const 1)
                (i32.const 12))))
          (br $block_1)))
      ;; org/teavm/runtime/GC.java:1356
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:1356
        (i32.const 940)
        (i32.load align=4
          ;; org/teavm/runtime/GC.java:1356
          (i32.const 936)))))

  ;; function #70
  (func $meth_otr_GC_updateFreeMemory (type $type3)
    (local i32 i32)
    (block
      ;; org/teavm/runtime/GC.java:1360
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:1360
        (i32.const 944)
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:1361
      (set_local 0
        (i32.load align=4
          (i32.const 932)))
      ;; org/teavm/runtime/GC.java:1362
      (set_local 1
        (i32.const 0))
      (block $block_0
        (loop $block_1
          (br_if $block_0
            ;; org/teavm/runtime/GC.java:1362
            (i32.ge_s
              (get_local 1)
              (i32.load align=4
                ;; org/teavm/runtime/GC.java:1362
                (i32.const 936))))
          ;; org/teavm/runtime/GC.java:1363
          (i32.store align=4
            ;; org/teavm/runtime/GC.java:1363
            (i32.const 944)
            ;; org/teavm/runtime/GC.java:1363
            (i32.add
              (i32.load align=4
                ;; org/teavm/runtime/GC.java:1363
                (i32.const 944))
              (i32.load offset=4 align=4
                (i32.load align=4
                  (get_local 0)))))
          ;; org/teavm/runtime/GC.java:1364
          (set_local 0
            (i32.add
              (get_local 0)
              (i32.mul
                (i32.const 1)
                (i32.const 4))))
          ;; org/teavm/runtime/GC.java:1362
          (set_local 1
            (i32.add
              (get_local 1)
              (i32.const 1)))
          (br $block_1)))))

  ;; function #71
  (func $meth_otr_GC_resizeHeapConsistent (type $type8)
    (local i64 i32 i32 i32 i32 i32 i64)
    (block
      ;; org/teavm/runtime/GC.java:1369
      (set_local 1
        (i64.extend_u/i32
          (i32.load align=4
            (i32.const 4000))))
      ;; org/teavm/runtime/GC.java:1370
      (set_local 2
        (call $meth_otbw_WasmRuntime_compare_0
          (get_local 0)
          (get_local 1)))
      (if
        (i32.eq
          (get_local 2)
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:1371
          (return)))
      (if
        ;; org/teavm/runtime/GC.java:1373
        (i32.gt_s
          (get_local 2)
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:1374
          (set_local 3
            ;; org/teavm/runtime/GC.java:1374
            (call $meth_otr_GC_getRegionCount))
          (call $meth_otbw_WasmHeap_resizeHeap
            (i32.wrap/i64
              (get_local 0)))
          ;; org/teavm/runtime/GC.java:1376
          (i32.store align=4
            ;; org/teavm/runtime/GC.java:1376
            (i32.const 932)
            (i32.load align=4
              (i32.const 3972)))
          ;; org/teavm/runtime/GC.java:1377
          (set_local 4
            ;; org/teavm/runtime/GC.java:1377
            (call $meth_otr_GC_getRegionCount))
          (block $block_0
            (loop $block_1
              (br_if $block_0
                ;; org/teavm/runtime/GC.java:1378
                (i32.ge_s
                  (get_local 3)
                  (get_local 4)))
              ;; org/teavm/runtime/GC.java:1379
              (i32.store16 align=2
                (i32.add
                  (i32.load align=4
                    (i32.const 3980))
                  (i32.mul
                    (get_local 3)
                    (i32.const 2)))
                (i32.const 0))
              ;; org/teavm/runtime/GC.java:1378
              (set_local 3
                (i32.add
                  (get_local 3)
                  (i32.const 1)))
              (br $block_1)))
          (if
            (i32.eq
              (i32.load align=4
                (i32.load align=4
                  ;; org/teavm/runtime/GC.java:1382
                  (i32.const 952)))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/GC.java:1383
              (set_local 5
                (i32.load align=4
                  (i32.const 952)))
              ;; org/teavm/runtime/GC.java:1383
              (i32.store offset=4 align=4
                (get_local 5)
                ;; org/teavm/runtime/GC.java:1383
                (i32.add
                  (i32.load offset=4 align=4
                    (get_local 5))
                  ;; org/teavm/runtime/GC.java:1383
                  (i32.wrap/i64
                    ;; org/teavm/runtime/GC.java:1383
                    (i64.sub
                      (get_local 0)
                      (get_local 1))))))
            (else
              ;; org/teavm/runtime/GC.java:1385
              (set_local 6
                ;; org/teavm/runtime/GC.java:1385
                (call $meth_otr_GC_objectSize
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:1385
                    (i32.const 952))))
              ;; org/teavm/runtime/GC.java:1386
              (i32.store align=4
                ;; org/teavm/runtime/GC.java:1386
                (i32.const 952)
                (i32.add
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:1386
                    (i32.const 952))
                  (get_local 6)))
              ;; org/teavm/runtime/GC.java:1387
              (i32.store align=4
                (i32.load align=4
                  ;; org/teavm/runtime/GC.java:1387
                  (i32.const 952))
                (i32.const 0))
              ;; org/teavm/runtime/GC.java:1388
              (i32.store offset=4 align=4
                (i32.load align=4
                  ;; org/teavm/runtime/GC.java:1388
                  (i32.const 952))
                ;; org/teavm/runtime/GC.java:1388
                (i32.wrap/i64
                  ;; org/teavm/runtime/GC.java:1388
                  (i64.sub
                    (get_local 0)
                    (get_local 1))))
              ;; org/teavm/runtime/GC.java:1389
              (i32.store align=4
                (i32.add
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:1389
                    (i32.const 932))
                  (i32.mul
                    (i32.load align=4
                      ;; org/teavm/runtime/GC.java:1389
                      (i32.const 936))
                    (i32.const 4)))
                (i32.load align=4
                  ;; org/teavm/runtime/GC.java:1389
                  (i32.const 952)))
              ;; org/teavm/runtime/GC.java:1390
              (i32.store align=4
                ;; org/teavm/runtime/GC.java:1390
                (i32.const 936)
                ;; org/teavm/runtime/GC.java:1390
                (i32.add
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:1390
                    (i32.const 936))
                  (i32.const 1)))
              ;; org/teavm/runtime/GC.java:1391
              (i32.store align=4
                ;; org/teavm/runtime/GC.java:1391
                (i32.const 940)
                ;; org/teavm/runtime/GC.java:1391
                (i32.add
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:1391
                    (i32.const 940))
                  (i32.const 1))))))
        (else
          (if
            ;; org/teavm/runtime/GC.java:1393
            (i32.const 0)
            (then
              ;; org/teavm/runtime/GC.java:1394
              (set_local 7
                (i64.sub
                  (i64.extend_u/i32
                    (i32.load align=4
                      ;; org/teavm/runtime/GC.java:1394
                      (i32.const 952)))
                  (i64.extend_u/i32
                    (i32.load align=4
                      (i32.const 3996)))))
              (if
                (i32.load align=4
                  (i32.load align=4
                    ;; org/teavm/runtime/GC.java:1395
                    (i32.const 952)))
                (then
                  ;; org/teavm/runtime/GC.java:1396
                  (set_local 7
                    (i64.add
                      (get_local 7)
                      ;; org/teavm/runtime/GC.java:1396
                      (i64.extend_s/i32
                        ;; org/teavm/runtime/GC.java:1396
                        (call $meth_otr_GC_objectSize
                          (i32.load align=4
                            ;; org/teavm/runtime/GC.java:1396
                            (i32.const 952))))))))
              (if
                ;; org/teavm/runtime/GC.java:1398
                (i64.lt_s
                  (get_local 0)
                  (get_local 7))
                (then
                  (if
                    ;; org/teavm/runtime/GC.java:1400
                    (i64.eq
                      (get_local 7)
                      (get_local 1))
                    (then
                      ;; org/teavm/runtime/GC.java:1401
                      (return)))
                  ;; org/teavm/runtime/GC.java:1401
                  (set_local 0
                    (get_local 7))))
              (if
                ;; org/teavm/runtime/GC.java:1404
                (i64.ne
                  (get_local 0)
                  (get_local 7))
                (then
                  ;; org/teavm/runtime/GC.java:1408
                  (set_local 5
                    (i32.load align=4
                      (i32.const 952)))
                  ;; org/teavm/runtime/GC.java:1408
                  (i32.store offset=4 align=4
                    (get_local 5)
                    ;; org/teavm/runtime/GC.java:1408
                    (i32.sub
                      (i32.load offset=4 align=4
                        (get_local 5))
                      ;; org/teavm/runtime/GC.java:1408
                      (i32.wrap/i64
                        ;; org/teavm/runtime/GC.java:1408
                        (i64.sub
                          (get_local 1)
                          (get_local 0))))))
                (else
                  ;; org/teavm/runtime/GC.java:1405
                  (i32.store align=4
                    ;; org/teavm/runtime/GC.java:1405
                    (i32.const 936)
                    ;; org/teavm/runtime/GC.java:1405
                    (i32.sub
                      (i32.load align=4
                        ;; org/teavm/runtime/GC.java:1405
                        (i32.const 936))
                      (i32.const 1)))
                  ;; org/teavm/runtime/GC.java:1406
                  (i32.store align=4
                    ;; org/teavm/runtime/GC.java:1406
                    (i32.const 940)
                    ;; org/teavm/runtime/GC.java:1406
                    (i32.sub
                      (i32.load align=4
                        ;; org/teavm/runtime/GC.java:1406
                        (i32.const 940))
                      (i32.const 1)))))
              (call $meth_otbw_WasmHeap_resizeHeap
                (i32.wrap/i64
                  (get_local 0)))
              ;; org/teavm/runtime/GC.java:1412
              (i32.store align=4
                ;; org/teavm/runtime/GC.java:1412
                (i32.const 932)
                (i32.load align=4
                  (i32.const 3972)))))))))

  ;; function #72
  (func $meth_otr_GC_resizeHeapIfNecessary (type $type8)
    (local i64 i64 i64 i64)
    (block
      ;; org/teavm/runtime/GC.java:1417
      (set_local 1
        (i64.extend_u/i32
          (i32.load align=4
            (i32.const 4000))))
      ;; org/teavm/runtime/GC.java:1418
      (set_local 2
        (i64.sub
          (get_local 1)
          ;; org/teavm/runtime/GC.java:1418
          (i64.extend_s/i32
            (i32.load align=4
              ;; org/teavm/runtime/GC.java:1418
              (i32.const 944)))))
      (if
        ;; org/teavm/runtime/GC.java:1419
        (call $meth_otr_GC_isAboutToExpand
          (get_local 0))
        (then
          ;; org/teavm/runtime/GC.java:1421
          (set_local 3
            ;; org/teavm/runtime/GC.java:1421
            (call $meth_otr_GC_min
              ;; org/teavm/runtime/GC.java:1420
              (call $meth_otr_GC_max
                (get_local 0)
                ;; org/teavm/runtime/GC.java:1420
                (i64.mul
                  ;; org/teavm/runtime/GC.java:1420
                  (i64.sub
                    (get_local 1)
                    ;; org/teavm/runtime/GC.java:1420
                    (i64.extend_s/i32
                      (i32.load align=4
                        ;; org/teavm/runtime/GC.java:1420
                        (i32.const 944))))
                  (i64.const 2)))
              (i64.extend_u/i32
                (i32.load align=4
                  (i32.const 3968)))))
          (if
            ;; org/teavm/runtime/GC.java:1422
            (i64.ne
              (get_local 3)
              (get_local 1))
            (then
              ;; org/teavm/runtime/GC.java:1423
              (set_local 4
                (i64.rem_s
                  (get_local 3)
                  (i64.const 8)))
              (if
                ;; org/teavm/runtime/GC.java:1423
                (i64.ne
                  (get_local 4)
                  (i64.const 0))
                (then
                  ;; org/teavm/runtime/GC.java:1424
                  (set_local 3
                    (i64.add
                      (get_local 3)
                      ;; org/teavm/runtime/GC.java:1424
                      (i64.sub
                        (i64.const 8)
                        (get_local 4))))))
              ;; org/teavm/runtime/GC.java:1426
              (call $meth_otr_GC_resizeHeapConsistent
                (get_local 3)))))
        (else
          (if
            ;; org/teavm/runtime/GC.java:1428
            (i64.lt_s
              (get_local 2)
              ;; org/teavm/runtime/GC.java:1428
              (i64.div_s
                (get_local 1)
                (i64.const 4)))
            (then
              ;; org/teavm/runtime/GC.java:1430
              (set_local 3
                ;; org/teavm/runtime/GC.java:1430
                (call $meth_otr_GC_max
                  ;; org/teavm/runtime/GC.java:1429
                  (i64.mul
                    (get_local 2)
                    (i64.const 3))
                  (i64.extend_u/i32
                    (i32.load align=4
                      (i32.const 3964)))))
              ;; org/teavm/runtime/GC.java:1431
              (set_local 4
                (i64.rem_s
                  (get_local 3)
                  (i64.const 8)))
              (if
                ;; org/teavm/runtime/GC.java:1431
                (i64.ne
                  (get_local 4)
                  (i64.const 0))
                (then
                  ;; org/teavm/runtime/GC.java:1432
                  (set_local 3
                    (i64.sub
                      (get_local 3)
                      (get_local 4)))))
              ;; org/teavm/runtime/GC.java:1434
              (call $meth_otr_GC_resizeHeapConsistent
                (get_local 3))))))))

  ;; function #73
  (func $meth_otr_GC_isAboutToExpand (type $type9)
    (local i64 i64)
    (block i32
      ;; org/teavm/runtime/GC.java:1439
      (set_local 1
        (i64.extend_u/i32
          (i32.load align=4
            (i32.const 4000))))
      ;; org/teavm/runtime/GC.java:1440
      (set_local 2
        (i64.sub
          (get_local 1)
          ;; org/teavm/runtime/GC.java:1440
          (i64.extend_s/i32
            (i32.load align=4
              ;; org/teavm/runtime/GC.java:1440
              (i32.const 944)))))
      ;; org/teavm/runtime/GC.java:1441
      (return
        (if i32
          ;; org/teavm/runtime/GC.java:1441
          (block $block_0 i32
            (drop
              (br_if $block_0
                ;; org/teavm/runtime/GC.java:1441
                (i32.const 0)
                ;; org/teavm/runtime/GC.java:1441
                (i64.gt_s
                  (get_local 0)
                  (get_local 1))))
            ;; org/teavm/runtime/GC.java:1441
            (i64.le_s
              (get_local 2)
              ;; org/teavm/runtime/GC.java:1441
              (i64.div_s
                (get_local 1)
                (i64.const 2))))
          (then
            (i32.const 0))
          (else
            (i32.const 1))))))

  ;; function #74
  (func $meth_otr_GC_min (type $type10)
    (block i64
      (if
        ;; org/teavm/runtime/GC.java:1445
        (i64.lt_s
          (get_local 0)
          (get_local 1))
        (then
          ;; org/teavm/runtime/GC.java:1445
          (set_local 1
            (get_local 0))))
      ;; org/teavm/runtime/GC.java:1445
      (return
        (get_local 1))))

  ;; function #75
  (func $meth_otr_GC_max (type $type10)
    (block i64
      (if
        ;; org/teavm/runtime/GC.java:1449
        (i64.gt_s
          (get_local 0)
          (get_local 1))
        (then
          ;; org/teavm/runtime/GC.java:1449
          (set_local 1
            (get_local 0))))
      ;; org/teavm/runtime/GC.java:1449
      (return
        (get_local 1))))

  ;; function #76
  (func $meth_otr_GC_objectSize (type $type1)
    (local i32)
    (block i32
      (if
        (i32.eq
          (i32.load align=4
            (get_local 0))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:1454
          (return
            (i32.load offset=4 align=4
              (get_local 0)))))
      ;; org/teavm/runtime/GC.java:1456
      (set_local 1
        (get_local 0))
      ;; org/teavm/runtime/GC.java:1458
      (return
        ;; org/teavm/runtime/GC.java:1458
        (call $meth_otr_GC_objectSize_0
          (get_local 1)
          ;; org/teavm/runtime/GC.java:1457
          (call $meth_otr_RuntimeClass_getClass
            (get_local 1))))))

  ;; function #77
  (func $meth_otr_GC_objectSize_0 (type $type5)
    (local i32 i32)
    (block i32
      (if
        ;; org/teavm/runtime/GC.java:1463
        (i32.eq
          (i32.load offset=32 align=4
            (get_local 1))
          (i32.const 0))
        (then
          ;; org/teavm/runtime/GC.java:1464
          (return
            (i32.load offset=8 align=4
              (get_local 1)))))
      ;; org/teavm/runtime/GC.java:1466
      (set_local 2
        (if i32
          ;; org/teavm/runtime/GC.java:1466
          (i32.eq
            ;; org/teavm/runtime/GC.java:1466
            (i32.and
              (i32.load offset=12 align=4
                (i32.load offset=32 align=4
                  (get_local 1)))
              (i32.const 2))
            (i32.const 0))
          (then
            (i32.const 4))
          (else
            (i32.load offset=8 align=4
              (i32.load offset=32 align=4
                (get_local 1))))))
      ;; org/teavm/runtime/GC.java:1469
      (set_local 3
        (get_local 0))
      ;; org/teavm/runtime/GC.java:1474
      (return
        (call $meth_otbw_WasmRuntime_align
          (i32.add
            (call $meth_otbw_WasmRuntime_align
              (i32.const 12)
              (get_local 2))
            ;; org/teavm/runtime/GC.java:1472
            (i32.mul
              (get_local 2)
              (i32.load offset=8 align=4
                (get_local 3))))
          (i32.const 4)))))

  ;; function #78
  (func $meth_otr_GC_isMarked (type $type1)
    (local i32)
    (block i32
      (block $block_1
        (block $block_0
          (if
            ;; org/teavm/runtime/GC.java:1478
            (i32.eq
              ;; org/teavm/runtime/GC.java:1478
              (i32.and
                (i32.load align=4
                  (get_local 0))
                (i32.const -2147483648))
              (i32.const 0))
            (then
              (if
                (i32.load8_s align=1
                  ;; org/teavm/runtime/GC.java:1478
                  (i32.const 960))
                (then
                  ;; org/teavm/runtime/GC.java:1478
                  (br $block_0)))
              (if
                ;; org/teavm/runtime/GC.java:1478
                (i32.eq
                  ;; org/teavm/runtime/GC.java:1478
                  (i32.and
                    (i32.load align=4
                      (get_local 0))
                    (i32.const 1073741824))
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/GC.java:1478
                  (br $block_0)))))
          ;; org/teavm/runtime/GC.java:1478
          (set_local 1
            (i32.const 1))
          ;; org/teavm/runtime/GC.java:1478
          (br $block_1))
        ;; org/teavm/runtime/GC.java:1478
        (set_local 1
          (i32.const 0)))
      ;; org/teavm/runtime/GC.java:1478
      (return
        (get_local 1))))

  ;; function #79
  (func $meth_otr_GC__clinit_ (type $type3)
    (local i32)
    (block
      ;; org/teavm/runtime/GC.java:42
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:42
        (i32.const 944)
        ;; org/teavm/runtime/GC.java:42
        (i32.wrap/i64
          (i64.extend_u/i32
            (i32.load align=4
              (i32.const 4000)))))
      ;; org/teavm/runtime/GC.java:47
      (i32.store8 align=1
        ;; org/teavm/runtime/GC.java:47
        (i32.const 960)
        (i32.const 1))
      ;; org/teavm/runtime/GC.java:84
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:84
        (i32.const 928)
        (i32.load align=4
          (i32.const 3996)))
      ;; org/teavm/runtime/GC.java:85
      (i32.store align=4
        (i32.load align=4
          ;; org/teavm/runtime/GC.java:85
          (i32.const 928))
        (i32.const 0))
      ;; org/teavm/runtime/GC.java:86
      (i32.store offset=4 align=4
        (i32.load align=4
          ;; org/teavm/runtime/GC.java:86
          (i32.const 928))
        ;; org/teavm/runtime/GC.java:86
        (i32.wrap/i64
          (i64.extend_u/i32
            (i32.load align=4
              (i32.const 4000)))))
      ;; org/teavm/runtime/GC.java:87
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:87
        (i32.const 924)
        (i32.add
          (i32.load align=4
            ;; org/teavm/runtime/GC.java:87
            (i32.const 928))
          (i32.load offset=4 align=4
            (i32.load align=4
              ;; org/teavm/runtime/GC.java:87
              (i32.const 928)))))
      ;; org/teavm/runtime/GC.java:88
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:88
        (i32.const 932)
        (i32.load align=4
          (i32.const 3972)))
      ;; org/teavm/runtime/GC.java:89
      (i32.store align=4
        (i32.load align=4
          ;; org/teavm/runtime/GC.java:89
          (i32.const 932))
        (i32.load align=4
          ;; org/teavm/runtime/GC.java:89
          (i32.const 928)))
      ;; org/teavm/runtime/GC.java:90
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:90
        (i32.const 936)
        (i32.const 1))
      ;; org/teavm/runtime/GC.java:91
      (i32.store align=4
        ;; org/teavm/runtime/GC.java:91
        (i32.const 940)
        (i32.const 1))
      ;; org/teavm/runtime/GC.java:93
      (set_local 0
        ;; org/teavm/runtime/GC.java:93
        (call $meth_otr_GC_getRegionCount))
      (call $meth_otbw_WasmRuntime_fill
        (i32.load align=4
          (i32.const 3992))
        (i32.const 1)
        (get_local 0))))

  ;; function #80
  (func $meth_ju_Arrays_copyOf (type $type5)
    (local i32 i32 i32 i32 i32 i32 i32)
    (block i32
      (set_local 8
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 2)))
      (block $block_4
        (block $block_2
          ;; org/teavm/classlib/java/util/TArrays.java:44
          (i32.store offset=4 align=4
            (get_local 8)
            (i32.const 0))
          ;; org/teavm/classlib/java/util/TArrays.java:44
          (i32.store offset=8 align=4
            (get_local 8)
            (i32.const 0))
          ;; org/teavm/classlib/java/util/TArrays.java:44
          (i32.store align=4
            (get_local 8)
            (i32.const 1))
          ;; org/teavm/classlib/java/util/TArrays.java:44
          (set_local 2
            (call $meth_otr_Allocator_allocateArray
              (i32.const 5392)
              (get_local 1)))
          (if
            ;; org/teavm/classlib/java/util/TArrays.java:44
            (i32.eq
              ;; org/teavm/classlib/java/util/TArrays.java:44
              (i32.load align=4
                (get_local 8))
              (i32.const 1))
            (then
              (if
                ;; org/teavm/classlib/java/util/TArrays.java:45
                (i32.eq
                  (get_local 0)
                  (i32.const 0))
                (then
                  ;; org/teavm/classlib/java/util/TArrays.java:45
                  (i32.store align=4
                    (get_local 8)
                    (i32.const 3))
                  ;; org/teavm/classlib/java/util/TArrays.java:45
                  (call $teavm_throwNullPointerException))
                (else
                  ;; org/teavm/classlib/java/util/TArrays.java:45
                  (set_local 3
                    (get_local 0))
                  ;; org/teavm/classlib/java/util/TArrays.java:45
                  (set_local 4
                    (i32.load align=4
                      (i32.add
                        (get_local 3)
                        (i32.const 8))))
                  ;; org/teavm/classlib/java/util/TArrays.java:45
                  (i32.store offset=4 align=4
                    (get_local 8)
                    (get_local 3))
                  ;; org/teavm/classlib/java/util/TArrays.java:45
                  (i32.store offset=8 align=4
                    (get_local 8)
                    (get_local 2))
                  ;; org/teavm/classlib/java/util/TArrays.java:45
                  (i32.store align=4
                    (get_local 8)
                    (i32.const 2))
                  ;; org/teavm/classlib/java/util/TArrays.java:45
                  (set_local 5
                    ;; org/teavm/classlib/java/util/TArrays.java:45
                    (call $meth_jl_Math_min
                      (get_local 1)
                      (get_local 4)))
                  (if
                    ;; org/teavm/classlib/java/util/TArrays.java:45
                    (i32.eq
                      ;; org/teavm/classlib/java/util/TArrays.java:45
                      (i32.load align=4
                        (get_local 8))
                      (i32.const 2))
                    (then
                      ;; org/teavm/classlib/java/util/TArrays.java:46
                      (set_local 6
                        (i32.const 0))
                      (block $block_1
                        (block $block_0
                          (loop $block_3
                            (br_if $block_0
                              ;; org/teavm/classlib/java/util/TArrays.java:46
                              (i32.ge_s
                                (get_local 6)
                                (get_local 5)))
                            ;; org/teavm/classlib/java/util/TArrays.java:47
                            (set_local 7
                              (get_local 2))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:47
                              (i32.lt_s
                                (get_local 6)
                                (i32.const 0))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:47
                                (br $block_1)))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:47
                              (i32.ge_s
                                (get_local 6)
                                (i32.load align=4
                                  (i32.add
                                    (get_local 3)
                                    (i32.const 8))))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:47
                                (br $block_1)))
                            ;; org/teavm/classlib/java/util/TArrays.java:47
                            (set_local 4
                              (i32.load16_u align=2
                                (i32.add
                                  (i32.add
                                    (get_local 3)
                                    (i32.const 12))
                                  (i32.shl
                                    (get_local 6)
                                    (i32.const 1)))))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:47
                              (i32.ge_s
                                (get_local 6)
                                (i32.load align=4
                                  (i32.add
                                    (get_local 7)
                                    (i32.const 8))))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:47
                                (i32.store offset=4 align=4
                                  (get_local 8)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/util/TArrays.java:47
                                (i32.store offset=8 align=4
                                  (get_local 8)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/util/TArrays.java:47
                                (i32.store align=4
                                  (get_local 8)
                                  (i32.const 5))
                                ;; org/teavm/classlib/java/util/TArrays.java:47
                                (call $teavm_throwArrayIndexOutOfBoundsException)
                                ;; org/teavm/classlib/java/util/TArrays.java:47
                                (br $block_2)))
                            (i32.store16 align=2
                              (i32.add
                                (i32.add
                                  (get_local 7)
                                  (i32.const 12))
                                (i32.shl
                                  (get_local 6)
                                  (i32.const 1)))
                              (get_local 4))
                            ;; org/teavm/classlib/java/util/TArrays.java:46
                            (set_local 6
                              (i32.add
                                (get_local 6)
                                (i32.const 1)))
                            (br $block_3)))
                        ;; org/teavm/classlib/java/util/TArrays.java:49
                        (br $block_4))
                      ;; org/teavm/classlib/java/util/TArrays.java:47
                      (i32.store offset=4 align=4
                        (get_local 8)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/util/TArrays.java:47
                      (i32.store offset=8 align=4
                        (get_local 8)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/util/TArrays.java:47
                      (i32.store align=4
                        (get_local 8)
                        (i32.const 4))
                      ;; org/teavm/classlib/java/util/TArrays.java:47
                      (call $teavm_throwArrayIndexOutOfBoundsException))))))))
        ;; org/teavm/classlib/java/util/TArrays.java:47
        (set_local 2
          (i32.const 0)))
      ;; org/teavm/classlib/java/util/TArrays.java:47
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 8)
          (i32.const 4)))
      ;; org/teavm/classlib/java/util/TArrays.java:47
      (return
        (get_local 2))))

  ;; function #81
  (func $meth_ju_Arrays_copyOf_0 (type $type5)
    (local i32 i32 i32 i32 i32 i32 i32)
    (block i32
      (set_local 8
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 2)))
      (block $block_4
        (block $block_2
          ;; org/teavm/classlib/java/util/TArrays.java:71
          (i32.store offset=4 align=4
            (get_local 8)
            (i32.const 0))
          ;; org/teavm/classlib/java/util/TArrays.java:71
          (i32.store offset=8 align=4
            (get_local 8)
            (i32.const 0))
          ;; org/teavm/classlib/java/util/TArrays.java:71
          (i32.store align=4
            (get_local 8)
            (i32.const 6))
          ;; org/teavm/classlib/java/util/TArrays.java:71
          (set_local 2
            (call $meth_otr_Allocator_allocateArray
              (i32.const 5648)
              (get_local 1)))
          (if
            ;; org/teavm/classlib/java/util/TArrays.java:71
            (i32.eq
              ;; org/teavm/classlib/java/util/TArrays.java:71
              (i32.load align=4
                (get_local 8))
              (i32.const 6))
            (then
              (if
                ;; org/teavm/classlib/java/util/TArrays.java:72
                (i32.eq
                  (get_local 0)
                  (i32.const 0))
                (then
                  ;; org/teavm/classlib/java/util/TArrays.java:72
                  (i32.store align=4
                    (get_local 8)
                    (i32.const 8))
                  ;; org/teavm/classlib/java/util/TArrays.java:72
                  (call $teavm_throwNullPointerException))
                (else
                  ;; org/teavm/classlib/java/util/TArrays.java:72
                  (set_local 3
                    (get_local 0))
                  ;; org/teavm/classlib/java/util/TArrays.java:72
                  (set_local 4
                    (i32.load align=4
                      (i32.add
                        (get_local 3)
                        (i32.const 8))))
                  ;; org/teavm/classlib/java/util/TArrays.java:72
                  (i32.store offset=4 align=4
                    (get_local 8)
                    (get_local 3))
                  ;; org/teavm/classlib/java/util/TArrays.java:72
                  (i32.store offset=8 align=4
                    (get_local 8)
                    (get_local 2))
                  ;; org/teavm/classlib/java/util/TArrays.java:72
                  (i32.store align=4
                    (get_local 8)
                    (i32.const 7))
                  ;; org/teavm/classlib/java/util/TArrays.java:72
                  (set_local 5
                    ;; org/teavm/classlib/java/util/TArrays.java:72
                    (call $meth_jl_Math_min
                      (get_local 1)
                      (get_local 4)))
                  (if
                    ;; org/teavm/classlib/java/util/TArrays.java:72
                    (i32.eq
                      ;; org/teavm/classlib/java/util/TArrays.java:72
                      (i32.load align=4
                        (get_local 8))
                      (i32.const 7))
                    (then
                      ;; org/teavm/classlib/java/util/TArrays.java:73
                      (set_local 6
                        (i32.const 0))
                      (block $block_1
                        (block $block_0
                          (loop $block_3
                            (br_if $block_0
                              ;; org/teavm/classlib/java/util/TArrays.java:73
                              (i32.ge_s
                                (get_local 6)
                                (get_local 5)))
                            ;; org/teavm/classlib/java/util/TArrays.java:74
                            (set_local 7
                              (get_local 2))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:74
                              (i32.lt_s
                                (get_local 6)
                                (i32.const 0))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:74
                                (br $block_1)))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:74
                              (i32.ge_s
                                (get_local 6)
                                (i32.load align=4
                                  (i32.add
                                    (get_local 3)
                                    (i32.const 8))))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:74
                                (br $block_1)))
                            ;; org/teavm/classlib/java/util/TArrays.java:74
                            (set_local 4
                              (i32.load align=4
                                (i32.add
                                  (i32.add
                                    (get_local 3)
                                    (i32.const 12))
                                  (i32.shl
                                    (get_local 6)
                                    (i32.const 2)))))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:74
                              (i32.ge_s
                                (get_local 6)
                                (i32.load align=4
                                  (i32.add
                                    (get_local 7)
                                    (i32.const 8))))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:74
                                (i32.store offset=4 align=4
                                  (get_local 8)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/util/TArrays.java:74
                                (i32.store offset=8 align=4
                                  (get_local 8)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/util/TArrays.java:74
                                (i32.store align=4
                                  (get_local 8)
                                  (i32.const 10))
                                ;; org/teavm/classlib/java/util/TArrays.java:74
                                (call $teavm_throwArrayIndexOutOfBoundsException)
                                ;; org/teavm/classlib/java/util/TArrays.java:74
                                (br $block_2)))
                            (i32.store align=4
                              (i32.add
                                (i32.add
                                  (get_local 7)
                                  (i32.const 12))
                                (i32.shl
                                  (get_local 6)
                                  (i32.const 2)))
                              (get_local 4))
                            ;; org/teavm/classlib/java/util/TArrays.java:73
                            (set_local 6
                              (i32.add
                                (get_local 6)
                                (i32.const 1)))
                            (br $block_3)))
                        ;; org/teavm/classlib/java/util/TArrays.java:76
                        (br $block_4))
                      ;; org/teavm/classlib/java/util/TArrays.java:74
                      (i32.store offset=4 align=4
                        (get_local 8)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/util/TArrays.java:74
                      (i32.store offset=8 align=4
                        (get_local 8)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/util/TArrays.java:74
                      (i32.store align=4
                        (get_local 8)
                        (i32.const 9))
                      ;; org/teavm/classlib/java/util/TArrays.java:74
                      (call $teavm_throwArrayIndexOutOfBoundsException))))))))
        ;; org/teavm/classlib/java/util/TArrays.java:74
        (set_local 2
          (i32.const 0)))
      ;; org/teavm/classlib/java/util/TArrays.java:74
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 8)
          (i32.const 4)))
      ;; org/teavm/classlib/java/util/TArrays.java:74
      (return
        (get_local 2))))

  ;; function #82
  (func $meth_ju_Arrays_copyOf_1 (type $type5)
    (local i32 i32 i32 i32 i32 i32 i64 i32)
    (block i32
      (set_local 9
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 2)))
      (block $block_4
        (block $block_2
          ;; org/teavm/classlib/java/util/TArrays.java:80
          (i32.store offset=4 align=4
            (get_local 9)
            (i32.const 0))
          ;; org/teavm/classlib/java/util/TArrays.java:80
          (i32.store offset=8 align=4
            (get_local 9)
            (i32.const 0))
          ;; org/teavm/classlib/java/util/TArrays.java:80
          (i32.store align=4
            (get_local 9)
            (i32.const 11))
          ;; org/teavm/classlib/java/util/TArrays.java:80
          (set_local 2
            (call $meth_otr_Allocator_allocateArray
              (i32.const 5904)
              (get_local 1)))
          (if
            ;; org/teavm/classlib/java/util/TArrays.java:80
            (i32.eq
              ;; org/teavm/classlib/java/util/TArrays.java:80
              (i32.load align=4
                (get_local 9))
              (i32.const 11))
            (then
              (if
                ;; org/teavm/classlib/java/util/TArrays.java:81
                (i32.eq
                  (get_local 0)
                  (i32.const 0))
                (then
                  ;; org/teavm/classlib/java/util/TArrays.java:81
                  (i32.store align=4
                    (get_local 9)
                    (i32.const 13))
                  ;; org/teavm/classlib/java/util/TArrays.java:81
                  (call $teavm_throwNullPointerException))
                (else
                  ;; org/teavm/classlib/java/util/TArrays.java:81
                  (set_local 3
                    (get_local 0))
                  ;; org/teavm/classlib/java/util/TArrays.java:81
                  (set_local 4
                    (i32.load align=4
                      (i32.add
                        (get_local 3)
                        (i32.const 8))))
                  ;; org/teavm/classlib/java/util/TArrays.java:81
                  (i32.store offset=4 align=4
                    (get_local 9)
                    (get_local 3))
                  ;; org/teavm/classlib/java/util/TArrays.java:81
                  (i32.store offset=8 align=4
                    (get_local 9)
                    (get_local 2))
                  ;; org/teavm/classlib/java/util/TArrays.java:81
                  (i32.store align=4
                    (get_local 9)
                    (i32.const 12))
                  ;; org/teavm/classlib/java/util/TArrays.java:81
                  (set_local 5
                    ;; org/teavm/classlib/java/util/TArrays.java:81
                    (call $meth_jl_Math_min
                      (get_local 1)
                      (get_local 4)))
                  (if
                    ;; org/teavm/classlib/java/util/TArrays.java:81
                    (i32.eq
                      ;; org/teavm/classlib/java/util/TArrays.java:81
                      (i32.load align=4
                        (get_local 9))
                      (i32.const 12))
                    (then
                      ;; org/teavm/classlib/java/util/TArrays.java:82
                      (set_local 6
                        (i32.const 0))
                      (block $block_1
                        (block $block_0
                          (loop $block_3
                            (br_if $block_0
                              ;; org/teavm/classlib/java/util/TArrays.java:82
                              (i32.ge_s
                                (get_local 6)
                                (get_local 5)))
                            ;; org/teavm/classlib/java/util/TArrays.java:83
                            (set_local 7
                              (get_local 2))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:83
                              (i32.lt_s
                                (get_local 6)
                                (i32.const 0))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:83
                                (br $block_1)))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:83
                              (i32.ge_s
                                (get_local 6)
                                (i32.load align=4
                                  (i32.add
                                    (get_local 3)
                                    (i32.const 8))))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:83
                                (br $block_1)))
                            ;; org/teavm/classlib/java/util/TArrays.java:83
                            (set_local 8
                              (i64.load align=8
                                (i32.add
                                  (i32.add
                                    (get_local 3)
                                    (i32.const 16))
                                  (i32.shl
                                    (get_local 6)
                                    (i32.const 3)))))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:83
                              (i32.ge_s
                                (get_local 6)
                                (i32.load align=4
                                  (i32.add
                                    (get_local 7)
                                    (i32.const 8))))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:83
                                (i32.store offset=4 align=4
                                  (get_local 9)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/util/TArrays.java:83
                                (i32.store offset=8 align=4
                                  (get_local 9)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/util/TArrays.java:83
                                (i32.store align=4
                                  (get_local 9)
                                  (i32.const 15))
                                ;; org/teavm/classlib/java/util/TArrays.java:83
                                (call $teavm_throwArrayIndexOutOfBoundsException)
                                ;; org/teavm/classlib/java/util/TArrays.java:83
                                (br $block_2)))
                            (i64.store align=8
                              (i32.add
                                (i32.add
                                  (get_local 7)
                                  (i32.const 16))
                                (i32.shl
                                  (get_local 6)
                                  (i32.const 3)))
                              (get_local 8))
                            ;; org/teavm/classlib/java/util/TArrays.java:82
                            (set_local 6
                              (i32.add
                                (get_local 6)
                                (i32.const 1)))
                            (br $block_3)))
                        ;; org/teavm/classlib/java/util/TArrays.java:85
                        (br $block_4))
                      ;; org/teavm/classlib/java/util/TArrays.java:83
                      (i32.store offset=4 align=4
                        (get_local 9)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/util/TArrays.java:83
                      (i32.store offset=8 align=4
                        (get_local 9)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/util/TArrays.java:83
                      (i32.store align=4
                        (get_local 9)
                        (i32.const 14))
                      ;; org/teavm/classlib/java/util/TArrays.java:83
                      (call $teavm_throwArrayIndexOutOfBoundsException))))))))
        ;; org/teavm/classlib/java/util/TArrays.java:83
        (set_local 2
          (i32.const 0)))
      ;; org/teavm/classlib/java/util/TArrays.java:83
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 9)
          (i32.const 4)))
      ;; org/teavm/classlib/java/util/TArrays.java:83
      (return
        (get_local 2))))

  ;; function #83
  (func $meth_ju_Arrays_copyOf_2 (type $type5)
    (local i32 i32 i32 i32 i32 i32 f32 i32)
    (block i32
      (set_local 9
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 2)))
      (block $block_4
        (block $block_2
          ;; org/teavm/classlib/java/util/TArrays.java:89
          (i32.store offset=4 align=4
            (get_local 9)
            (i32.const 0))
          ;; org/teavm/classlib/java/util/TArrays.java:89
          (i32.store offset=8 align=4
            (get_local 9)
            (i32.const 0))
          ;; org/teavm/classlib/java/util/TArrays.java:89
          (i32.store align=4
            (get_local 9)
            (i32.const 16))
          ;; org/teavm/classlib/java/util/TArrays.java:89
          (set_local 2
            (call $meth_otr_Allocator_allocateArray
              (i32.const 6168)
              (get_local 1)))
          (if
            ;; org/teavm/classlib/java/util/TArrays.java:89
            (i32.eq
              ;; org/teavm/classlib/java/util/TArrays.java:89
              (i32.load align=4
                (get_local 9))
              (i32.const 16))
            (then
              (if
                ;; org/teavm/classlib/java/util/TArrays.java:90
                (i32.eq
                  (get_local 0)
                  (i32.const 0))
                (then
                  ;; org/teavm/classlib/java/util/TArrays.java:90
                  (i32.store align=4
                    (get_local 9)
                    (i32.const 18))
                  ;; org/teavm/classlib/java/util/TArrays.java:90
                  (call $teavm_throwNullPointerException))
                (else
                  ;; org/teavm/classlib/java/util/TArrays.java:90
                  (set_local 3
                    (get_local 0))
                  ;; org/teavm/classlib/java/util/TArrays.java:90
                  (set_local 4
                    (i32.load align=4
                      (i32.add
                        (get_local 3)
                        (i32.const 8))))
                  ;; org/teavm/classlib/java/util/TArrays.java:90
                  (i32.store offset=4 align=4
                    (get_local 9)
                    (get_local 3))
                  ;; org/teavm/classlib/java/util/TArrays.java:90
                  (i32.store offset=8 align=4
                    (get_local 9)
                    (get_local 2))
                  ;; org/teavm/classlib/java/util/TArrays.java:90
                  (i32.store align=4
                    (get_local 9)
                    (i32.const 17))
                  ;; org/teavm/classlib/java/util/TArrays.java:90
                  (set_local 5
                    ;; org/teavm/classlib/java/util/TArrays.java:90
                    (call $meth_jl_Math_min
                      (get_local 1)
                      (get_local 4)))
                  (if
                    ;; org/teavm/classlib/java/util/TArrays.java:90
                    (i32.eq
                      ;; org/teavm/classlib/java/util/TArrays.java:90
                      (i32.load align=4
                        (get_local 9))
                      (i32.const 17))
                    (then
                      ;; org/teavm/classlib/java/util/TArrays.java:91
                      (set_local 6
                        (i32.const 0))
                      (block $block_1
                        (block $block_0
                          (loop $block_3
                            (br_if $block_0
                              ;; org/teavm/classlib/java/util/TArrays.java:91
                              (i32.ge_s
                                (get_local 6)
                                (get_local 5)))
                            ;; org/teavm/classlib/java/util/TArrays.java:92
                            (set_local 7
                              (get_local 2))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:92
                              (i32.lt_s
                                (get_local 6)
                                (i32.const 0))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:92
                                (br $block_1)))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:92
                              (i32.ge_s
                                (get_local 6)
                                (i32.load align=4
                                  (i32.add
                                    (get_local 3)
                                    (i32.const 8))))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:92
                                (br $block_1)))
                            ;; org/teavm/classlib/java/util/TArrays.java:92
                            (set_local 8
                              (f32.load align=4
                                (i32.add
                                  (i32.add
                                    (get_local 3)
                                    (i32.const 12))
                                  (i32.shl
                                    (get_local 6)
                                    (i32.const 2)))))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:92
                              (i32.ge_s
                                (get_local 6)
                                (i32.load align=4
                                  (i32.add
                                    (get_local 7)
                                    (i32.const 8))))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:92
                                (i32.store offset=4 align=4
                                  (get_local 9)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/util/TArrays.java:92
                                (i32.store offset=8 align=4
                                  (get_local 9)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/util/TArrays.java:92
                                (i32.store align=4
                                  (get_local 9)
                                  (i32.const 20))
                                ;; org/teavm/classlib/java/util/TArrays.java:92
                                (call $teavm_throwArrayIndexOutOfBoundsException)
                                ;; org/teavm/classlib/java/util/TArrays.java:92
                                (br $block_2)))
                            (f32.store align=4
                              (i32.add
                                (i32.add
                                  (get_local 7)
                                  (i32.const 12))
                                (i32.shl
                                  (get_local 6)
                                  (i32.const 2)))
                              (get_local 8))
                            ;; org/teavm/classlib/java/util/TArrays.java:91
                            (set_local 6
                              (i32.add
                                (get_local 6)
                                (i32.const 1)))
                            (br $block_3)))
                        ;; org/teavm/classlib/java/util/TArrays.java:94
                        (br $block_4))
                      ;; org/teavm/classlib/java/util/TArrays.java:92
                      (i32.store offset=4 align=4
                        (get_local 9)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/util/TArrays.java:92
                      (i32.store offset=8 align=4
                        (get_local 9)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/util/TArrays.java:92
                      (i32.store align=4
                        (get_local 9)
                        (i32.const 19))
                      ;; org/teavm/classlib/java/util/TArrays.java:92
                      (call $teavm_throwArrayIndexOutOfBoundsException))))))))
        ;; org/teavm/classlib/java/util/TArrays.java:92
        (set_local 2
          (i32.const 0)))
      ;; org/teavm/classlib/java/util/TArrays.java:92
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 9)
          (i32.const 4)))
      ;; org/teavm/classlib/java/util/TArrays.java:92
      (return
        (get_local 2))))

  ;; function #84
  (func $meth_ju_Arrays_copyOf_3 (type $type5)
    (local i32 i32 i32 i32 i32 i32 f64 i32)
    (block i32
      (set_local 9
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 2)))
      (block $block_4
        (block $block_2
          ;; org/teavm/classlib/java/util/TArrays.java:98
          (i32.store offset=4 align=4
            (get_local 9)
            (i32.const 0))
          ;; org/teavm/classlib/java/util/TArrays.java:98
          (i32.store offset=8 align=4
            (get_local 9)
            (i32.const 0))
          ;; org/teavm/classlib/java/util/TArrays.java:98
          (i32.store align=4
            (get_local 9)
            (i32.const 21))
          ;; org/teavm/classlib/java/util/TArrays.java:98
          (set_local 2
            (call $meth_otr_Allocator_allocateArray
              (i32.const 6432)
              (get_local 1)))
          (if
            ;; org/teavm/classlib/java/util/TArrays.java:98
            (i32.eq
              ;; org/teavm/classlib/java/util/TArrays.java:98
              (i32.load align=4
                (get_local 9))
              (i32.const 21))
            (then
              (if
                ;; org/teavm/classlib/java/util/TArrays.java:99
                (i32.eq
                  (get_local 0)
                  (i32.const 0))
                (then
                  ;; org/teavm/classlib/java/util/TArrays.java:99
                  (i32.store align=4
                    (get_local 9)
                    (i32.const 23))
                  ;; org/teavm/classlib/java/util/TArrays.java:99
                  (call $teavm_throwNullPointerException))
                (else
                  ;; org/teavm/classlib/java/util/TArrays.java:99
                  (set_local 3
                    (get_local 0))
                  ;; org/teavm/classlib/java/util/TArrays.java:99
                  (set_local 4
                    (i32.load align=4
                      (i32.add
                        (get_local 3)
                        (i32.const 8))))
                  ;; org/teavm/classlib/java/util/TArrays.java:99
                  (i32.store offset=4 align=4
                    (get_local 9)
                    (get_local 3))
                  ;; org/teavm/classlib/java/util/TArrays.java:99
                  (i32.store offset=8 align=4
                    (get_local 9)
                    (get_local 2))
                  ;; org/teavm/classlib/java/util/TArrays.java:99
                  (i32.store align=4
                    (get_local 9)
                    (i32.const 22))
                  ;; org/teavm/classlib/java/util/TArrays.java:99
                  (set_local 5
                    ;; org/teavm/classlib/java/util/TArrays.java:99
                    (call $meth_jl_Math_min
                      (get_local 1)
                      (get_local 4)))
                  (if
                    ;; org/teavm/classlib/java/util/TArrays.java:99
                    (i32.eq
                      ;; org/teavm/classlib/java/util/TArrays.java:99
                      (i32.load align=4
                        (get_local 9))
                      (i32.const 22))
                    (then
                      ;; org/teavm/classlib/java/util/TArrays.java:100
                      (set_local 6
                        (i32.const 0))
                      (block $block_1
                        (block $block_0
                          (loop $block_3
                            (br_if $block_0
                              ;; org/teavm/classlib/java/util/TArrays.java:100
                              (i32.ge_s
                                (get_local 6)
                                (get_local 5)))
                            ;; org/teavm/classlib/java/util/TArrays.java:101
                            (set_local 7
                              (get_local 2))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:101
                              (i32.lt_s
                                (get_local 6)
                                (i32.const 0))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:101
                                (br $block_1)))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:101
                              (i32.ge_s
                                (get_local 6)
                                (i32.load align=4
                                  (i32.add
                                    (get_local 3)
                                    (i32.const 8))))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:101
                                (br $block_1)))
                            ;; org/teavm/classlib/java/util/TArrays.java:101
                            (set_local 8
                              (f64.load align=8
                                (i32.add
                                  (i32.add
                                    (get_local 3)
                                    (i32.const 16))
                                  (i32.shl
                                    (get_local 6)
                                    (i32.const 3)))))
                            (if
                              ;; org/teavm/classlib/java/util/TArrays.java:101
                              (i32.ge_s
                                (get_local 6)
                                (i32.load align=4
                                  (i32.add
                                    (get_local 7)
                                    (i32.const 8))))
                              (then
                                ;; org/teavm/classlib/java/util/TArrays.java:101
                                (i32.store offset=4 align=4
                                  (get_local 9)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/util/TArrays.java:101
                                (i32.store offset=8 align=4
                                  (get_local 9)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/util/TArrays.java:101
                                (i32.store align=4
                                  (get_local 9)
                                  (i32.const 25))
                                ;; org/teavm/classlib/java/util/TArrays.java:101
                                (call $teavm_throwArrayIndexOutOfBoundsException)
                                ;; org/teavm/classlib/java/util/TArrays.java:101
                                (br $block_2)))
                            (f64.store align=8
                              (i32.add
                                (i32.add
                                  (get_local 7)
                                  (i32.const 16))
                                (i32.shl
                                  (get_local 6)
                                  (i32.const 3)))
                              (get_local 8))
                            ;; org/teavm/classlib/java/util/TArrays.java:100
                            (set_local 6
                              (i32.add
                                (get_local 6)
                                (i32.const 1)))
                            (br $block_3)))
                        ;; org/teavm/classlib/java/util/TArrays.java:103
                        (br $block_4))
                      ;; org/teavm/classlib/java/util/TArrays.java:101
                      (i32.store offset=4 align=4
                        (get_local 9)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/util/TArrays.java:101
                      (i32.store offset=8 align=4
                        (get_local 9)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/util/TArrays.java:101
                      (i32.store align=4
                        (get_local 9)
                        (i32.const 24))
                      ;; org/teavm/classlib/java/util/TArrays.java:101
                      (call $teavm_throwArrayIndexOutOfBoundsException))))))))
        ;; org/teavm/classlib/java/util/TArrays.java:101
        (set_local 2
          (i32.const 0)))
      ;; org/teavm/classlib/java/util/TArrays.java:101
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 9)
          (i32.const 4)))
      ;; org/teavm/classlib/java/util/TArrays.java:101
      (return
        (get_local 2))))

  ;; function #85
  (func $meth_ju_Arrays_copyOf_4 (type $type5)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32)
    (block i32
      (set_local 9
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 2)))
      (block $block_4
        (block $block_2
          (if
            ;; org/teavm/classlib/java/util/TArrays.java:117
            (i32.eq
              (get_local 0)
              (i32.const 0))
            (then
              ;; org/teavm/classlib/java/util/TArrays.java:117
              (i32.store offset=4 align=4
                (get_local 9)
                (i32.const 0))
              ;; org/teavm/classlib/java/util/TArrays.java:117
              (i32.store offset=8 align=4
                (get_local 9)
                (i32.const 0))
              ;; org/teavm/classlib/java/util/TArrays.java:117
              (i32.store align=4
                (get_local 9)
                (i32.const 27))
              ;; org/teavm/classlib/java/util/TArrays.java:117
              (call $teavm_throwNullPointerException))
            (else
              ;; org/teavm/classlib/java/util/TArrays.java:117
              (set_local 2
                (get_local 0))
              ;; org/teavm/classlib/java/util/TArrays.java:117
              (i32.store offset=4 align=4
                (get_local 9)
                (get_local 0))
              ;; org/teavm/classlib/java/util/TArrays.java:117
              (i32.store offset=8 align=4
                (get_local 9)
                (i32.const 0))
              ;; org/teavm/classlib/java/util/TArrays.java:117
              (i32.store align=4
                (get_local 9)
                (i32.const 26))
              ;; org/teavm/classlib/java/util/TArrays.java:117
              (set_local 3
                ;; org/teavm/classlib/java/util/TArrays.java:117
                (call $meth_jl_Object_getClass
                  (get_local 0)))
              (if
                ;; org/teavm/classlib/java/util/TArrays.java:117
                (i32.eq
                  ;; org/teavm/classlib/java/util/TArrays.java:117
                  (i32.load align=4
                    (get_local 9))
                  (i32.const 26))
                (then
                  (if
                    ;; org/teavm/classlib/java/util/TArrays.java:117
                    (i32.eq
                      (get_local 3)
                      (i32.const 0))
                    (then
                      ;; org/teavm/classlib/java/util/TArrays.java:117
                      (i32.store offset=4 align=4
                        (get_local 9)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/util/TArrays.java:117
                      (i32.store align=4
                        (get_local 9)
                        (i32.const 32))
                      ;; org/teavm/classlib/java/util/TArrays.java:117
                      (call $teavm_throwNullPointerException))
                    (else
                      ;; org/teavm/classlib/java/util/TArrays.java:117
                      (i32.store offset=8 align=4
                        (get_local 9)
                        (get_local 3))
                      ;; org/teavm/classlib/java/util/TArrays.java:117
                      (i32.store align=4
                        (get_local 9)
                        (i32.const 28))
                      ;; org/teavm/classlib/java/util/TArrays.java:117
                      (set_local 3
                        (block i32
                          (set_local 10
                            (get_local 3))
                          (call_indirect $type1
                            (i32.load align=4
                              (i32.add
                                (i32.shl
                                  (i32.load align=4
                                    (get_local 10))
                                  (i32.const 3))
                                (i32.const 96)))
                            (get_local 10))))
                      (if
                        ;; org/teavm/classlib/java/util/TArrays.java:117
                        (i32.eq
                          ;; org/teavm/classlib/java/util/TArrays.java:117
                          (i32.load align=4
                            (get_local 9))
                          (i32.const 28))
                        (then
                          ;; org/teavm/classlib/java/util/TArrays.java:117
                          (i32.store offset=8 align=4
                            (get_local 9)
                            (get_local 3))
                          ;; org/teavm/classlib/java/util/TArrays.java:117
                          (i32.store align=4
                            (get_local 9)
                            (i32.const 29))
                          ;; org/teavm/classlib/java/util/TArrays.java:117
                          (set_local 3
                            ;; org/teavm/classlib/java/util/TArrays.java:117
                            (call $meth_jlr_Array_newInstance
                              (get_local 3)
                              (get_local 1)))
                          (if
                            ;; org/teavm/classlib/java/util/TArrays.java:117
                            (i32.eq
                              ;; org/teavm/classlib/java/util/TArrays.java:117
                              (i32.load align=4
                                (get_local 9))
                              (i32.const 29))
                            (then
                              ;; org/teavm/classlib/java/util/TArrays.java:117
                              (i32.store offset=8 align=4
                                (get_local 9)
                                (get_local 3))
                              ;; org/teavm/classlib/java/util/TArrays.java:117
                              (i32.store align=4
                                (get_local 9)
                                (i32.const 30))
                              ;; org/teavm/classlib/java/util/TArrays.java:117
                              (set_local 4
                                (get_local 3))
                              (if
                                ;; org/teavm/classlib/java/util/TArrays.java:117
                                (i32.eq
                                  ;; org/teavm/classlib/java/util/TArrays.java:117
                                  (i32.load align=4
                                    (get_local 9))
                                  (i32.const 30))
                                (then
                                  ;; org/teavm/classlib/java/util/TArrays.java:118
                                  (set_local 5
                                    (i32.load align=4
                                      (i32.add
                                        (get_local 2)
                                        (i32.const 8))))
                                  ;; org/teavm/classlib/java/util/TArrays.java:118
                                  (i32.store align=4
                                    (get_local 9)
                                    (i32.const 31))
                                  ;; org/teavm/classlib/java/util/TArrays.java:118
                                  (set_local 6
                                    ;; org/teavm/classlib/java/util/TArrays.java:118
                                    (call $meth_jl_Math_min
                                      (get_local 1)
                                      (get_local 5)))
                                  (if
                                    ;; org/teavm/classlib/java/util/TArrays.java:118
                                    (i32.eq
                                      ;; org/teavm/classlib/java/util/TArrays.java:118
                                      (i32.load align=4
                                        (get_local 9))
                                      (i32.const 31))
                                    (then
                                      ;; org/teavm/classlib/java/util/TArrays.java:119
                                      (set_local 7
                                        (i32.const 0))
                                      (block $block_1
                                        (block $block_0
                                          (loop $block_3
                                            (br_if $block_0
                                              ;; org/teavm/classlib/java/util/TArrays.java:119
                                              (i32.ge_s
                                                (get_local 7)
                                                (get_local 6)))
                                            (if
                                              ;; org/teavm/classlib/java/util/TArrays.java:120
                                              (i32.lt_s
                                                (get_local 7)
                                                (i32.const 0))
                                              (then
                                                ;; org/teavm/classlib/java/util/TArrays.java:120
                                                (br $block_1)))
                                            (if
                                              ;; org/teavm/classlib/java/util/TArrays.java:120
                                              (i32.ge_s
                                                (get_local 7)
                                                (i32.load align=4
                                                  (i32.add
                                                    (get_local 2)
                                                    (i32.const 8))))
                                              (then
                                                ;; org/teavm/classlib/java/util/TArrays.java:120
                                                (br $block_1)))
                                            ;; org/teavm/classlib/java/util/TArrays.java:120
                                            (set_local 3
                                              (i32.load align=4
                                                (i32.add
                                                  (i32.add
                                                    (get_local 2)
                                                    (i32.const 12))
                                                  (i32.shl
                                                    (get_local 7)
                                                    (i32.const 2)))))
                                            (if
                                              ;; org/teavm/classlib/java/util/TArrays.java:120
                                              (i32.eq
                                                (get_local 4)
                                                (i32.const 0))
                                              (then
                                                ;; org/teavm/classlib/java/util/TArrays.java:120
                                                (i32.store offset=4 align=4
                                                  (get_local 9)
                                                  (i32.const 0))
                                                ;; org/teavm/classlib/java/util/TArrays.java:120
                                                (i32.store offset=8 align=4
                                                  (get_local 9)
                                                  (i32.const 0))
                                                ;; org/teavm/classlib/java/util/TArrays.java:120
                                                (i32.store align=4
                                                  (get_local 9)
                                                  (i32.const 34))
                                                ;; org/teavm/classlib/java/util/TArrays.java:120
                                                (call $teavm_throwNullPointerException)
                                                ;; org/teavm/classlib/java/util/TArrays.java:120
                                                (br $block_2)))
                                            ;; org/teavm/classlib/java/util/TArrays.java:120
                                            (set_local 8
                                              (get_local 4))
                                            (if
                                              ;; org/teavm/classlib/java/util/TArrays.java:120
                                              (i32.ge_s
                                                (get_local 7)
                                                (i32.load align=4
                                                  (i32.add
                                                    (get_local 8)
                                                    (i32.const 8))))
                                              (then
                                                ;; org/teavm/classlib/java/util/TArrays.java:120
                                                (i32.store offset=4 align=4
                                                  (get_local 9)
                                                  (i32.const 0))
                                                ;; org/teavm/classlib/java/util/TArrays.java:120
                                                (i32.store offset=8 align=4
                                                  (get_local 9)
                                                  (i32.const 0))
                                                ;; org/teavm/classlib/java/util/TArrays.java:120
                                                (i32.store align=4
                                                  (get_local 9)
                                                  (i32.const 35))
                                                ;; org/teavm/classlib/java/util/TArrays.java:120
                                                (call $teavm_throwArrayIndexOutOfBoundsException)
                                                ;; org/teavm/classlib/java/util/TArrays.java:120
                                                (br $block_2)))
                                            (i32.store8 align=1
                                              (i32.add
                                                (i32.load align=4
                                                  (i32.const 3992))
                                                (i32.div_s
                                                  (i32.sub
                                                    (get_local 8)
                                                    (i32.load align=4
                                                      (i32.const 3996)))
                                                  (i32.const 1024)))
                                              (i32.const 0))
                                            (i32.store align=4
                                              (i32.add
                                                (i32.add
                                                  (get_local 8)
                                                  (i32.const 12))
                                                (i32.shl
                                                  (get_local 7)
                                                  (i32.const 2)))
                                              (get_local 3))
                                            ;; org/teavm/classlib/java/util/TArrays.java:119
                                            (set_local 7
                                              (i32.add
                                                (get_local 7)
                                                (i32.const 1)))
                                            (br $block_3)))
                                        ;; org/teavm/classlib/java/util/TArrays.java:122
                                        (br $block_4))
                                      ;; org/teavm/classlib/java/util/TArrays.java:120
                                      (i32.store offset=4 align=4
                                        (get_local 9)
                                        (i32.const 0))
                                      ;; org/teavm/classlib/java/util/TArrays.java:120
                                      (i32.store offset=8 align=4
                                        (get_local 9)
                                        (i32.const 0))
                                      ;; org/teavm/classlib/java/util/TArrays.java:120
                                      (i32.store align=4
                                        (get_local 9)
                                        (i32.const 33))
                                      ;; org/teavm/classlib/java/util/TArrays.java:120
                                      (call $teavm_throwArrayIndexOutOfBoundsException))))))))))))))))
        ;; org/teavm/classlib/java/util/TArrays.java:120
        (set_local 4
          (i32.const 0)))
      ;; org/teavm/classlib/java/util/TArrays.java:120
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 9)
          (i32.const 4)))
      ;; org/teavm/classlib/java/util/TArrays.java:120
      (return
        (get_local 4))))

  ;; function #86
  (func $meth_jlr_Array_newInstance (type $type5)
    (local i32 i32 i32)
    (block i32
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      (block $block_0
        (if
          ;; org/teavm/classlib/java/lang/reflect/TArray.java:53
          (i32.eq
            (get_local 0)
            (i32.const 0))
          (then
            ;; org/teavm/classlib/java/lang/reflect/TArray.java:54
            (i32.store offset=4 align=4
              (get_local 3)
              (i32.const 0))
            ;; org/teavm/classlib/java/lang/reflect/TArray.java:54
            (i32.store align=4
              (get_local 3)
              (i32.const 36))
            ;; org/teavm/classlib/java/lang/reflect/TArray.java:54
            (set_local 2
              (call $meth_otr_Allocator_allocate
                (i32.const 1720)))
            (if
              ;; org/teavm/classlib/java/lang/reflect/TArray.java:54
              (i32.eq
                ;; org/teavm/classlib/java/lang/reflect/TArray.java:54
                (i32.load align=4
                  (get_local 3))
                (i32.const 36))
              (then
                ;; org/teavm/classlib/java/lang/reflect/TArray.java:54
                (i32.store offset=4 align=4
                  (get_local 3)
                  (get_local 2))
                ;; org/teavm/classlib/java/lang/reflect/TArray.java:54
                (i32.store align=4
                  (get_local 3)
                  (i32.const 37))
                ;; org/teavm/classlib/java/lang/reflect/TArray.java:54
                (call $meth_jl_NullPointerException__init_
                  (get_local 2))
                (if
                  ;; org/teavm/classlib/java/lang/reflect/TArray.java:54
                  (i32.eq
                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:54
                    (i32.load align=4
                      (get_local 3))
                    (i32.const 37))
                  (then
                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:54
                    (i32.store align=4
                      (get_local 3)
                      (i32.const 38))
                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:54
                    (call $meth_otr_ExceptionHandling_throwException
                      (get_local 2)))))))
          (else
            (if
              ;; org/teavm/classlib/java/lang/reflect/TArray.java:56
              (i32.eq
                (get_local 0)
                (i32.const 6568))
              (then
                ;; org/teavm/classlib/java/lang/reflect/TArray.java:57
                (i32.store offset=4 align=4
                  (get_local 3)
                  (i32.const 0))
                ;; org/teavm/classlib/java/lang/reflect/TArray.java:57
                (i32.store align=4
                  (get_local 3)
                  (i32.const 39))
                ;; org/teavm/classlib/java/lang/reflect/TArray.java:57
                (set_local 2
                  (call $meth_otr_Allocator_allocate
                    (i32.const 4496)))
                (if
                  ;; org/teavm/classlib/java/lang/reflect/TArray.java:57
                  (i32.eq
                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:57
                    (i32.load align=4
                      (get_local 3))
                    (i32.const 39))
                  (then
                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:57
                    (i32.store offset=4 align=4
                      (get_local 3)
                      (get_local 2))
                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:57
                    (i32.store align=4
                      (get_local 3)
                      (i32.const 40))
                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:57
                    (call $meth_jl_IllegalArgumentException__init_
                      (get_local 2))
                    (if
                      ;; org/teavm/classlib/java/lang/reflect/TArray.java:57
                      (i32.eq
                        ;; org/teavm/classlib/java/lang/reflect/TArray.java:57
                        (i32.load align=4
                          (get_local 3))
                        (i32.const 40))
                      (then
                        ;; org/teavm/classlib/java/lang/reflect/TArray.java:57
                        (i32.store align=4
                          (get_local 3)
                          (i32.const 41))
                        ;; org/teavm/classlib/java/lang/reflect/TArray.java:57
                        (call $meth_otr_ExceptionHandling_throwException
                          (get_local 2)))))))
              (else
                (if
                  ;; org/teavm/classlib/java/lang/reflect/TArray.java:59
                  (i32.lt_s
                    (get_local 1)
                    (i32.const 0))
                  (then
                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:60
                    (i32.store offset=4 align=4
                      (get_local 3)
                      (i32.const 0))
                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:60
                    (i32.store align=4
                      (get_local 3)
                      (i32.const 43))
                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:60
                    (set_local 2
                      (call $meth_otr_Allocator_allocate
                        (i32.const 4144)))
                    (if
                      ;; org/teavm/classlib/java/lang/reflect/TArray.java:60
                      (i32.eq
                        ;; org/teavm/classlib/java/lang/reflect/TArray.java:60
                        (i32.load align=4
                          (get_local 3))
                        (i32.const 43))
                      (then
                        ;; org/teavm/classlib/java/lang/reflect/TArray.java:60
                        (i32.store offset=4 align=4
                          (get_local 3)
                          (get_local 2))
                        ;; org/teavm/classlib/java/lang/reflect/TArray.java:60
                        (i32.store align=4
                          (get_local 3)
                          (i32.const 44))
                        ;; org/teavm/classlib/java/lang/reflect/TArray.java:60
                        (call $meth_jl_NegativeArraySizeException__init_
                          (get_local 2))
                        (if
                          ;; org/teavm/classlib/java/lang/reflect/TArray.java:60
                          (i32.eq
                            ;; org/teavm/classlib/java/lang/reflect/TArray.java:60
                            (i32.load align=4
                              (get_local 3))
                            (i32.const 44))
                          (then
                            ;; org/teavm/classlib/java/lang/reflect/TArray.java:60
                            (i32.store align=4
                              (get_local 3)
                              (i32.const 45))
                            ;; org/teavm/classlib/java/lang/reflect/TArray.java:60
                            (call $meth_otr_ExceptionHandling_throwException
                              (get_local 2)))))))
                  (else
                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                    (i32.store offset=4 align=4
                      (get_local 3)
                      (i32.const 0))
                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                    (i32.store align=4
                      (get_local 3)
                      (i32.const 42))
                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                    (set_local 2
                      (get_local 0))
                    (if
                      ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                      (i32.eq
                        ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                        (i32.load align=4
                          (get_local 3))
                        (i32.const 42))
                      (then
                        (if
                          ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                          (i32.eq
                            (get_local 2)
                            (i32.const 0))
                          (then
                            ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                            (i32.store align=4
                              (get_local 3)
                              (i32.const 48))
                            ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                            (call $teavm_throwNullPointerException))
                          (else
                            ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                            (i32.store offset=4 align=4
                              (get_local 3)
                              (get_local 2))
                            ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                            (i32.store align=4
                              (get_local 3)
                              (i32.const 46))
                            ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                            (set_local 2
                              (block i32
                                (set_local 4
                                  (get_local 2))
                                (call_indirect $type1
                                  (i32.load align=4
                                    (i32.add
                                      (i32.shl
                                        (i32.load align=4
                                          (get_local 4))
                                        (i32.const 3))
                                      (i32.const 100)))
                                  (get_local 4))))
                            (if
                              ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                              (i32.eq
                                ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                                (i32.load align=4
                                  (get_local 3))
                                (i32.const 46))
                              (then
                                ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                                (i32.store offset=4 align=4
                                  (get_local 3)
                                  (get_local 2))
                                ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                                (i32.store align=4
                                  (get_local 3)
                                  (i32.const 47))
                                ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                                (set_local 2
                                  ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                                  (call $meth_jlr_Array_newInstanceImpl
                                    (get_local 2)
                                    (get_local 1)))
                                (if
                                  ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                                  (i32.eq
                                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                                    (i32.load align=4
                                      (get_local 3))
                                    (i32.const 47))
                                  (then
                                    ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
                                    (br $block_0)))))))))))))))
        ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
        (set_local 2
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/reflect/TArray.java:62
      (return
        (get_local 2))))

  ;; function #87
  (func $meth_jlr_Array_newInstanceImpl (type $type5)
    (return
      (call $meth_jlr_Array_newInstanceLowLevel
        (get_local 0)
        (get_local 1))))

  ;; function #88
  (func $meth_jlr_Array_newInstanceLowLevel (type $type5)
    (local i32 i32)
    (block i32
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/reflect/TArray.java:72
      (set_local 2
        ;; org/teavm/classlib/java/lang/reflect/TArray.java:72
        (call $meth_otr_Allocator_allocateArray
          (i32.load offset=36 align=4
            (get_local 0))
          (get_local 1)))
      ;; org/teavm/classlib/java/lang/reflect/TArray.java:72
      (i32.store align=4
        (get_local 3)
        (i32.const 49))
      ;; org/teavm/classlib/java/lang/reflect/TArray.java:72
      (set_local 2
        (get_local 2))
      (if
        ;; org/teavm/classlib/java/lang/reflect/TArray.java:72
        (i32.ne
          ;; org/teavm/classlib/java/lang/reflect/TArray.java:72
          (i32.load align=4
            (get_local 3))
          (i32.const 49))
        (then
          ;; org/teavm/classlib/java/lang/reflect/TArray.java:72
          (set_local 2
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/reflect/TArray.java:72
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/reflect/TArray.java:72
      (return
        (get_local 2))))

  ;; function #89
  (func $meth_jl_System_currentTimeMillis (type $type11)
    (return
      (call $meth_jl_System_currentTimeMillisLowLevel)))

  ;; function #90
  (func $meth_jl_System_currentTimeMillisLowLevel (type $type11)
    (local i64 i32)
    (block i64
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TSystem.java:148
      (i32.store align=4
        (get_local 1)
        (i32.const 50))
      ;; org/teavm/classlib/java/lang/TSystem.java:148
      (set_local 0
        ;; org/teavm/classlib/java/lang/TSystem.java:148
        (call $meth_otbwr_WasmSupport_currentTimeMillis))
      (if
        ;; org/teavm/classlib/java/lang/TSystem.java:148
        (i32.ne
          ;; org/teavm/classlib/java/lang/TSystem.java:148
          (i32.load align=4
            (get_local 1))
          (i32.const 50))
        (then
          ;; org/teavm/classlib/java/lang/TSystem.java:148
          (set_local 0
            (i64.const 0))))
      ;; org/teavm/classlib/java/lang/TSystem.java:148
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TSystem.java:148
      (return
        (get_local 0))))

  ;; function #91
  (func $meth_otbwr_WasmSupport_currentTimeMillis (type $type11)
    (local f64 i64 i32)
    (block i64
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:33
      (i32.store align=4
        (get_local 2)
        (i32.const 51))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:33
      (set_local 0
        ;; org/teavm/backend/wasm/runtime/WasmSupport.java:33
        (call $currentTimeMillis))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:33
      (set_local 1
        (if i64
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:33
          (i32.eq
            ;; org/teavm/backend/wasm/runtime/WasmSupport.java:33
            (i32.load align=4
              (get_local 2))
            (i32.const 51))
          (then
            (i64.trunc_s/f64
              (get_local 0)))
          (else
            (i64.const 0))))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:33
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:33
      (return
        (get_local 1))))

  ;; function #92
  (func $meth_otbwr_WasmSupport_getArgs (type $type2)
    (local i32 i32)
    (block i32
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:55
      (i32.store align=4
        (get_local 1)
        (i32.const 52))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:55
      (set_local 0
        (call $meth_otr_Allocator_allocateArray
          (i32.const 6728)
          (i32.const 0)))
      (if
        ;; org/teavm/backend/wasm/runtime/WasmSupport.java:55
        (i32.ne
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:55
          (i32.load align=4
            (get_local 1))
          (i32.const 52))
        (then
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:55
          (set_local 0
            (i32.const 0))))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:55
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:55
      (return
        (get_local 0))))

  ;; function #93
  (func $meth_otbwr_WasmSupport_initClasses (type $type3)
    ;; org/teavm/backend/wasm/runtime/WasmSupport.java:65
    (return))

  ;; function #94
  (func $meth_otbwr_WasmSupport_runWithoutArgs (type $type3)
    (local i32 i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:68
      (i32.store offset=4 align=4
        (get_local 1)
        (i32.const 0))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:68
      (i32.store align=4
        (get_local 1)
        (i32.const 53))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:68
      (call $meth_otbwr_WasmSupport_initClasses)
      (if
        ;; org/teavm/backend/wasm/runtime/WasmSupport.java:68
        (i32.eq
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:68
          (i32.load align=4
            (get_local 1))
          (i32.const 53))
        (then
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
          (i32.store align=4
            (get_local 1)
            (i32.const 54))
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
          (set_local 0
            (call $meth_otr_Allocator_allocate
              (i32.const 2456)))
          (if
            ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
            (i32.eq
              ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
              (i32.load align=4
                (get_local 1))
              (i32.const 54))
            (then
              ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
              (i32.store offset=4 align=4
                (get_local 1)
                (get_local 0))
              ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
              (i32.store align=4
                (get_local 1)
                (i32.const 55))
              ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
              (call $meth_otbwr_WasmSupport_runWithoutArgs_lambda__14_0__init_
                (get_local 0))
              (if
                ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
                (i32.eq
                  ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
                  (i32.load align=4
                    (get_local 1))
                  (i32.const 55))
                (then
                  ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
                  (i32.store align=4
                    (get_local 1)
                    (i32.const 56))
                  ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
                  (call $meth_otr_Fiber_start
                    (get_local 0)
                    (i32.const 0))
                  (drop
                    (i32.load align=4
                      (get_local 1)))))))))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:70
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #95
  (func $meth_otbwr_WasmSupport_runWithArgs (type $type0)
    (local i32 i32)
    (block
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:73
      (i32.store offset=4 align=4
        (get_local 2)
        (i32.const 0))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:73
      (i32.store align=4
        (get_local 2)
        (i32.const 57))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:73
      (call $meth_otbwr_WasmSupport_initClasses)
      (if
        ;; org/teavm/backend/wasm/runtime/WasmSupport.java:73
        (i32.eq
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:73
          (i32.load align=4
            (get_local 2))
          (i32.const 57))
        (then
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
          (i32.store align=4
            (get_local 2)
            (i32.const 58))
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
          (set_local 1
            (call $meth_otr_Allocator_allocate
              (i32.const 3616)))
          (if
            ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
            (i32.eq
              ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
              (i32.load align=4
                (get_local 2))
              (i32.const 58))
            (then
              ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
              (i32.store offset=4 align=4
                (get_local 2)
                (get_local 1))
              ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
              (i32.store align=4
                (get_local 2)
                (i32.const 59))
              ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
              (call $meth_otbwr_WasmSupport_runWithArgs_lambda__15_0__init_
                (get_local 1)
                (get_local 0))
              (if
                ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
                (i32.eq
                  ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
                  (i32.load align=4
                    (get_local 2))
                  (i32.const 59))
                (then
                  ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
                  (i32.store align=4
                    (get_local 2)
                    (i32.const 60))
                  ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
                  (call $meth_otr_Fiber_start
                    (get_local 1)
                    (i32.const 0))
                  (drop
                    (i32.load align=4
                      (get_local 2)))))))))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:75
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))))

  ;; function #96
  (func $meth_otbwr_WasmSupport_lambda_runWithArgs_1 (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
      (i32.store align=4
        (get_local 1)
        (i32.const 61))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
      (call $meth_cbv_VisualizerRuntime_main
        (get_local 0))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #97
  (func $meth_otbwr_WasmSupport_lambda_runWithoutArgs_0 (type $type3)
    (local i32 i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
      (i32.store offset=4 align=4
        (get_local 1)
        (i32.const 0))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
      (i32.store align=4
        (get_local 1)
        (i32.const 62))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
      (set_local 0
        ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
        (call $meth_otbwr_WasmSupport_getArgs))
      (if
        ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
        (i32.eq
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
          (i32.load align=4
            (get_local 1))
          (i32.const 62))
        (then
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
          (i32.store offset=4 align=4
            (get_local 1)
            (get_local 0))
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
          (i32.store align=4
            (get_local 1)
            (i32.const 63))
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
          (call $meth_cbv_VisualizerRuntime_main
            (get_local 0))
          (drop
            (i32.load align=4
              (get_local 1)))))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #98
  (func $meth_otbw_WasmRuntime_compare_0 (type $type13)
    ;; org/teavm/backend/wasm/WasmRuntime.java:35
    (return
      (if i32
        (i64.gt_s
          (get_local 0)
          (get_local 1))
        (then
          (i32.const 1))
        (else
          (if i32
            (i64.ge_s
              (get_local 0)
              (get_local 1))
            (then
              (i32.const 0))
            (else
              (i32.const -1)))))))

  ;; function #99
  (func $meth_otbw_WasmRuntime_align (type $type5)
    (local i32)
    (block i32
      ;; org/teavm/backend/wasm/WasmRuntime.java:71
      (set_local 2
        (get_local 0))
      (if
        (i32.eq
          (get_local 2)
          (i32.const 0))
        (then
          ;; org/teavm/backend/wasm/WasmRuntime.java:73
          (return
            (get_local 0))))
      ;; org/teavm/backend/wasm/WasmRuntime.java:76
      (return
        ;; org/teavm/backend/wasm/WasmRuntime.java:75
        (i32.mul
          ;; org/teavm/backend/wasm/WasmRuntime.java:75
          (i32.add
            ;; org/teavm/backend/wasm/WasmRuntime.java:75
            (i32.div_s
              ;; org/teavm/backend/wasm/WasmRuntime.java:75
              (i32.sub
                (get_local 2)
                (i32.const 1))
              (get_local 1))
            (i32.const 1))
          (get_local 1)))))

  ;; function #100
  (func $meth_otbw_WasmRuntime_printString (type $type0)
    (block
      ;; org/teavm/backend/wasm/WasmRuntime.java:92
      (call $logString
        (get_local 0))))

  ;; function #101
  (func $meth_otbw_WasmRuntime_printInt (type $type0)
    (block
      ;; org/teavm/backend/wasm/WasmRuntime.java:96
      (call $logInt
        (get_local 0))))

  ;; function #102
  (func $meth_otbw_WasmRuntime_printOutOfMemory (type $type3)
    (block
      ;; org/teavm/backend/wasm/WasmRuntime.java:100
      (call $logOutOfMemory)))

  ;; function #103
  (func $meth_otbw_WasmRuntime_fillZero (type $type6)
    (block
      ;; org/teavm/backend/wasm/WasmRuntime.java:104
      (call $meth_otbw_WasmRuntime_fill
        (get_local 0)
        (i32.const 0)
        (get_local 1))))

  ;; function #104
  (func $meth_otbw_WasmRuntime_fill (type $type7)
    (local i32 i32 i32 i32 i32 i32 i32)
    (block
      (block $block_6
        ;; org/teavm/backend/wasm/WasmRuntime.java:108
        (set_local 3
          (i32.or
            ;; org/teavm/backend/wasm/WasmRuntime.java:108
            (i32.or
              ;; org/teavm/backend/wasm/WasmRuntime.java:108
              (i32.or
                ;; org/teavm/backend/wasm/WasmRuntime.java:108
                (i32.and
                  (get_local 1)
                  (i32.const -16777216))
                ;; org/teavm/backend/wasm/WasmRuntime.java:108
                (i32.and
                  (get_local 1)
                  (i32.const 16711680)))
              ;; org/teavm/backend/wasm/WasmRuntime.java:108
              (i32.and
                (get_local 1)
                (i32.const 65280)))
            ;; org/teavm/backend/wasm/WasmRuntime.java:108
            (i32.and
              (get_local 1)
              (i32.const 255))))
        ;; org/teavm/backend/wasm/WasmRuntime.java:109
        (set_local 4
          (get_local 0))
        ;; org/teavm/backend/wasm/WasmRuntime.java:111
        (set_local 5
          (i32.shl
            ;; org/teavm/backend/wasm/WasmRuntime.java:111
            (i32.shr_u
              (get_local 4)
              (i32.const 2))
            (i32.const 2)))
        ;; org/teavm/backend/wasm/WasmRuntime.java:112
        (set_local 6
          (get_local 5))
        (block $block_5
          (block $block_4
            (block $block_3
              (block $block_2
                (block $block_1
                  (block $block_0
                    (br_table $block_0 $block_1 $block_2 $block_3 $block_4
                      ;; org/teavm/backend/wasm/WasmRuntime.java:113
                      (i32.sub
                        (get_local 4)
                        (get_local 5))))
                  (br $block_5))
                (i32.store8 align=1
                  (i32.add
                    (get_local 6)
                    (i32.const 1))
                  (get_local 1))
                (i32.store8 align=1
                  (i32.add
                    (get_local 6)
                    (i32.const 2))
                  (get_local 1))
                (i32.store8 align=1
                  (i32.add
                    (get_local 6)
                    (i32.const 3))
                  (get_local 1))
                ;; org/teavm/backend/wasm/WasmRuntime.java:121
                (br $block_6))
              (i32.store8 align=1
                (i32.add
                  (get_local 6)
                  (i32.const 2))
                (get_local 1))
              (i32.store8 align=1
                (i32.add
                  (get_local 6)
                  (i32.const 3))
                (get_local 1))
              ;; org/teavm/backend/wasm/WasmRuntime.java:125
              (br $block_6))
            (i32.store8 align=1
              (i32.add
                (get_local 6)
                (i32.const 3))
              (get_local 1))
            ;; org/teavm/backend/wasm/WasmRuntime.java:127
            (br $block_6))
          ;; org/teavm/backend/wasm/WasmRuntime.java:113
          (br $block_6))
        (i32.store align=4
          (get_local 6)
          (get_local 3)))
      (block $block_13
        ;; org/teavm/backend/wasm/WasmRuntime.java:131
        (set_local 7
          (i32.add
            (get_local 4)
            (get_local 2)))
        ;; org/teavm/backend/wasm/WasmRuntime.java:132
        (set_local 8
          (i32.shl
            ;; org/teavm/backend/wasm/WasmRuntime.java:132
            (i32.shr_u
              (get_local 7)
              (i32.const 2))
            (i32.const 2)))
        ;; org/teavm/backend/wasm/WasmRuntime.java:133
        (set_local 9
          (get_local 8))
        (block $block_12
          (block $block_11
            (block $block_10
              (block $block_9
                (block $block_8
                  (block $block_7
                    (br_table $block_7 $block_8 $block_9 $block_10 $block_11
                      ;; org/teavm/backend/wasm/WasmRuntime.java:134
                      (i32.sub
                        (get_local 7)
                        (get_local 8))))
                  (br $block_12))
                (i32.store8 align=1
                  (get_local 9)
                  (get_local 1))
                ;; org/teavm/backend/wasm/WasmRuntime.java:139
                (br $block_13))
              (i32.store8 align=1
                (get_local 9)
                (get_local 1))
              (i32.store8 align=1
                (i32.add
                  (get_local 9)
                  (i32.const 1))
                (get_local 1))
              ;; org/teavm/backend/wasm/WasmRuntime.java:143
              (br $block_13))
            (i32.store8 align=1
              (get_local 9)
              (get_local 1))
            (i32.store8 align=1
              (i32.add
                (get_local 9)
                (i32.const 1))
              (get_local 1))
            (i32.store8 align=1
              (i32.add
                (get_local 9)
                (i32.const 2))
              (get_local 1))
            ;; org/teavm/backend/wasm/WasmRuntime.java:147
            (br $block_13))
          ;; org/teavm/backend/wasm/WasmRuntime.java:134
          (br $block_13)))
      ;; org/teavm/backend/wasm/WasmRuntime.java:151
      (set_local 6
        ;; org/teavm/backend/wasm/WasmRuntime.java:151
        (i32.add
          (get_local 5)
          (i32.const 4)))
      (block $block_14
        (loop $block_15
          (br_if $block_14
            ;; org/teavm/backend/wasm/WasmRuntime.java:151
            (i32.ge_s
              (get_local 6)
              (get_local 8)))
          (i32.store align=4
            (get_local 6)
            (get_local 3))
          ;; org/teavm/backend/wasm/WasmRuntime.java:151
          (set_local 6
            (i32.add
              (get_local 6)
              (i32.const 4)))
          (br $block_15)))))

  ;; function #105
  (func $meth_otbw_WasmRuntime_moveMemoryBlock (type $type7)
    (local i32 i32 i32 i32 i32 i32 i32)
    (block
      (if
        ;; org/teavm/backend/wasm/WasmRuntime.java:157
        (i32.lt_s
          (get_local 2)
          (i32.const 8))
        (then
          ;; org/teavm/backend/wasm/WasmRuntime.java:158
          (call $meth_otbw_WasmRuntime_slowMemoryMove
            (get_local 0)
            (get_local 1)
            (get_local 2))
          ;; org/teavm/backend/wasm/WasmRuntime.java:159
          (return)))
      ;; org/teavm/backend/wasm/WasmRuntime.java:161
      (set_local 3
        (i32.sub
          (get_local 0)
          (get_local 1)))
      (if
        (i32.eq
          (get_local 3)
          (i32.const 0))
        (then
          ;; org/teavm/backend/wasm/WasmRuntime.java:163
          (return)))
      (if
        ;; org/teavm/backend/wasm/WasmRuntime.java:165
        (i32.and
          (get_local 3)
          (i32.const 3))
        (then
          ;; org/teavm/backend/wasm/WasmRuntime.java:166
          (call $meth_otbw_WasmRuntime_slowMemoryMove
            (get_local 0)
            (get_local 1)
            (get_local 2))
          ;; org/teavm/backend/wasm/WasmRuntime.java:167
          (return)))
      (block $block_13
        ;; org/teavm/backend/wasm/WasmRuntime.java:170
        (set_local 4
          ;; org/teavm/backend/wasm/WasmRuntime.java:170
          (i32.shl
            ;; org/teavm/backend/wasm/WasmRuntime.java:170
            (i32.shr_u
              (get_local 0)
              (i32.const 2))
            (i32.const 2)))
        ;; org/teavm/backend/wasm/WasmRuntime.java:171
        (set_local 5
          ;; org/teavm/backend/wasm/WasmRuntime.java:171
          (i32.shl
            ;; org/teavm/backend/wasm/WasmRuntime.java:171
            (i32.shr_u
              (get_local 1)
              (i32.const 2))
            (i32.const 2)))
        ;; org/teavm/backend/wasm/WasmRuntime.java:173
        (set_local 6
          ;; org/teavm/backend/wasm/WasmRuntime.java:173
          (i32.shl
            ;; org/teavm/backend/wasm/WasmRuntime.java:173
            (i32.shr_u
              ;; org/teavm/backend/wasm/WasmRuntime.java:173
              (i32.add
                (get_local 0)
                (get_local 2))
              (i32.const 2))
            (i32.const 2)))
        ;; org/teavm/backend/wasm/WasmRuntime.java:174
        (set_local 7
          ;; org/teavm/backend/wasm/WasmRuntime.java:174
          (i32.shl
            ;; org/teavm/backend/wasm/WasmRuntime.java:174
            (i32.shr_u
              ;; org/teavm/backend/wasm/WasmRuntime.java:174
              (i32.add
                (get_local 1)
                (get_local 2))
              (i32.const 2))
            (i32.const 2)))
        (if
          ;; org/teavm/backend/wasm/WasmRuntime.java:176
          (i32.le_s
            (get_local 0)
            (get_local 1))
          (then
            (block $block_6
              (block $block_5
                (block $block_4
                  (block $block_3
                    (block $block_2
                      (block $block_1
                        (block $block_0
                          (br_table $block_0 $block_1 $block_2 $block_3 $block_4
                            ;; org/teavm/backend/wasm/WasmRuntime.java:217
                            (i32.sub
                              ;; org/teavm/backend/wasm/WasmRuntime.java:217
                              (i32.add
                                (get_local 0)
                                (get_local 2))
                              (get_local 6))))
                        (br $block_5))
                      (i32.store8 align=1
                        (get_local 7)
                        (i32.load8_s align=1
                          (get_local 6)))
                      ;; org/teavm/backend/wasm/WasmRuntime.java:222
                      (br $block_6))
                    (i32.store16 align=2
                      (get_local 7)
                      (i32.load16_s align=2
                        (get_local 6)))
                    ;; org/teavm/backend/wasm/WasmRuntime.java:225
                    (br $block_6))
                  (i32.store8 align=1
                    (i32.add
                      (get_local 7)
                      (i32.const 2))
                    (i32.load8_s align=1
                      (i32.add
                        (get_local 6)
                        (i32.const 2))))
                  (i32.store16 align=2
                    (get_local 7)
                    (i32.load16_s align=2
                      (get_local 6)))
                  ;; org/teavm/backend/wasm/WasmRuntime.java:228
                  (br $block_6))
                ;; org/teavm/backend/wasm/WasmRuntime.java:217
                (br $block_6)))
            (block $block_7
              (loop $block_8
                (br_if $block_7
                  ;; org/teavm/backend/wasm/WasmRuntime.java:232
                  (i32.le_s
                    (get_local 6)
                    (get_local 4)))
                ;; org/teavm/backend/wasm/WasmRuntime.java:233
                (set_local 6
                  (i32.add
                    (get_local 6)
                    (i32.const -4)))
                ;; org/teavm/backend/wasm/WasmRuntime.java:234
                (set_local 7
                  (i32.add
                    (get_local 7)
                    (i32.const -4)))
                (i32.store align=4
                  (get_local 7)
                  (i32.load align=4
                    (get_local 6)))
                (br $block_8)))
            (block $block_14
              (block $block_12
                (block $block_11
                  (block $block_10
                    (block $block_9
                      (br_table $block_9 $block_10 $block_11 $block_12
                        (i32.sub
                          ;; org/teavm/backend/wasm/WasmRuntime.java:238
                          (i32.sub
                            (get_local 0)
                            (get_local 4))
                          (i32.const 1))))
                    (i32.store16 align=2
                      (i32.add
                        (get_local 5)
                        (i32.const -2))
                      (i32.load16_s align=2
                        (i32.add
                          (get_local 4)
                          (i32.const -2))))
                    (i32.store8 align=1
                      (i32.add
                        (get_local 5)
                        (i32.const -3))
                      (i32.load8_s align=1
                        (i32.add
                          (get_local 4)
                          (i32.const -3))))
                    ;; org/teavm/backend/wasm/WasmRuntime.java:242
                    (br $block_13))
                  (br $block_14))
                (i32.store8 align=1
                  (i32.add
                    (get_local 5)
                    (i32.const -1))
                  (i32.load8_s align=1
                    (i32.add
                      (get_local 4)
                      (i32.const -1))))
                ;; org/teavm/backend/wasm/WasmRuntime.java:247
                (br $block_13))
              ;; org/teavm/backend/wasm/WasmRuntime.java:238
              (br $block_13))
            (i32.store16 align=2
              (i32.add
                (get_local 5)
                (i32.const -2))
              (i32.load16_s align=2
                (i32.add
                  (get_local 4)
                  (i32.const -2)))))
          (else
            (block $block_21
              (block $block_20
                (block $block_19
                  (block $block_18
                    (block $block_17
                      (block $block_16
                        (block $block_15
                          (br_table $block_15 $block_16 $block_17 $block_18 $block_19
                            ;; org/teavm/backend/wasm/WasmRuntime.java:177
                            (i32.sub
                              (get_local 0)
                              (get_local 4))))
                        (br $block_20))
                      (i32.store8 align=1
                        (i32.add
                          (get_local 5)
                          (i32.const 1))
                        (i32.load8_s align=1
                          (i32.add
                            (get_local 4)
                            (i32.const 1))))
                      (i32.store16 align=2
                        (i32.add
                          (get_local 5)
                          (i32.const 2))
                        (i32.load16_s align=2
                          (i32.add
                            (get_local 4)
                            (i32.const 2))))
                      ;; org/teavm/backend/wasm/WasmRuntime.java:184
                      (br $block_21))
                    (i32.store16 align=2
                      (i32.add
                        (get_local 5)
                        (i32.const 2))
                      (i32.load16_s align=2
                        (i32.add
                          (get_local 4)
                          (i32.const 2))))
                    ;; org/teavm/backend/wasm/WasmRuntime.java:187
                    (br $block_21))
                  (i32.store8 align=1
                    (i32.add
                      (get_local 5)
                      (i32.const 3))
                    (i32.load8_s align=1
                      (i32.add
                        (get_local 4)
                        (i32.const 3))))
                  ;; org/teavm/backend/wasm/WasmRuntime.java:189
                  (br $block_21))
                ;; org/teavm/backend/wasm/WasmRuntime.java:177
                (br $block_21))
              (i32.store align=4
                (get_local 5)
                (i32.load align=4
                  (get_local 4))))
            ;; org/teavm/backend/wasm/WasmRuntime.java:193
            (set_local 8
              (i32.add
                (get_local 4)
                (i32.const 4)))
            ;; org/teavm/backend/wasm/WasmRuntime.java:194
            (set_local 9
              (i32.add
                (get_local 5)
                (i32.const 4)))
            (block $block_22
              (loop $block_23
                (br_if $block_22
                  ;; org/teavm/backend/wasm/WasmRuntime.java:196
                  (i32.ge_s
                    (get_local 8)
                    (get_local 6)))
                (i32.store align=4
                  (get_local 9)
                  (i32.load align=4
                    (get_local 8)))
                ;; org/teavm/backend/wasm/WasmRuntime.java:198
                (set_local 8
                  (i32.add
                    (get_local 8)
                    (i32.const 4)))
                ;; org/teavm/backend/wasm/WasmRuntime.java:199
                (set_local 9
                  (i32.add
                    (get_local 9)
                    (i32.const 4)))
                (br $block_23)))
            (block $block_30
              (block $block_29
                (block $block_28
                  (block $block_27
                    (block $block_26
                      (block $block_25
                        (block $block_24
                          (br_table $block_24 $block_25 $block_26 $block_27 $block_28
                            ;; org/teavm/backend/wasm/WasmRuntime.java:202
                            (i32.sub
                              ;; org/teavm/backend/wasm/WasmRuntime.java:202
                              (i32.add
                                (get_local 0)
                                (get_local 2))
                              (get_local 6))))
                        (br $block_29))
                      (i32.store8 align=1
                        (get_local 7)
                        (i32.load8_s align=1
                          (get_local 6)))
                      ;; org/teavm/backend/wasm/WasmRuntime.java:207
                      (br $block_30))
                    (i32.store16 align=2
                      (get_local 7)
                      (i32.load16_s align=2
                        (get_local 6)))
                    ;; org/teavm/backend/wasm/WasmRuntime.java:210
                    (br $block_30))
                  (i32.store16 align=2
                    (get_local 7)
                    (i32.load16_s align=2
                      (get_local 6)))
                  (i32.store8 align=1
                    (i32.add
                      (get_local 7)
                      (i32.const 2))
                    (i32.load8_s align=1
                      (i32.add
                        (get_local 6)
                        (i32.const 2))))
                  ;; org/teavm/backend/wasm/WasmRuntime.java:213
                  (br $block_30))
                ;; org/teavm/backend/wasm/WasmRuntime.java:202
                (br $block_30))))))))

  ;; function #106
  (func $meth_otbw_WasmRuntime_slowMemoryMove (type $type7)
    (local i32 i32 i32)
    (block
      (block $block_0
        (if
          ;; org/teavm/backend/wasm/WasmRuntime.java:254
          (i32.gt_s
            (get_local 0)
            (get_local 1))
          (then
            (loop $block_1
              ;; org/teavm/backend/wasm/WasmRuntime.java:255
              (set_local 3
                (i32.add
                  (get_local 2)
                  (i32.const -1)))
              (if
                ;; org/teavm/backend/wasm/WasmRuntime.java:255
                (i32.le_s
                  (get_local 2)
                  (i32.const 0))
                (then
                  ;; org/teavm/backend/wasm/WasmRuntime.java:255
                  (br $block_0)))
              (i32.store8 align=1
                (get_local 1)
                (i32.load8_s align=1
                  (get_local 0)))
              ;; org/teavm/backend/wasm/WasmRuntime.java:257
              (set_local 1
                (i32.add
                  (get_local 1)
                  (i32.const 1)))
              ;; org/teavm/backend/wasm/WasmRuntime.java:258
              (set_local 0
                (i32.add
                  (get_local 0)
                  (i32.const 1)))
              ;; org/teavm/backend/wasm/WasmRuntime.java:258
              (set_local 2
                (get_local 3))
              (br $block_1))))
        ;; org/teavm/backend/wasm/WasmRuntime.java:261
        (set_local 4
          (i32.add
            (get_local 0)
            (get_local 2)))
        ;; org/teavm/backend/wasm/WasmRuntime.java:262
        (set_local 5
          (i32.add
            (get_local 1)
            (get_local 2)))
        (loop $block_2
          ;; org/teavm/backend/wasm/WasmRuntime.java:263
          (set_local 3
            (i32.add
              (get_local 2)
              (i32.const -1)))
          (if
            ;; org/teavm/backend/wasm/WasmRuntime.java:263
            (i32.le_s
              (get_local 2)
              (i32.const 0))
            (then
              ;; org/teavm/backend/wasm/WasmRuntime.java:263
              (br $block_0)))
          ;; org/teavm/backend/wasm/WasmRuntime.java:264
          (set_local 5
            (i32.add
              (get_local 5)
              (i32.const -1)))
          ;; org/teavm/backend/wasm/WasmRuntime.java:265
          (set_local 4
            (i32.add
              (get_local 4)
              (i32.const -1)))
          (i32.store8 align=1
            (get_local 5)
            (i32.load8_s align=1
              (get_local 4)))
          ;; org/teavm/backend/wasm/WasmRuntime.java:266
          (set_local 2
            (get_local 3))
          (br $block_2)))))

  ;; function #107
  (func $meth_otbw_WasmRuntime_allocStack (type $type1)
    (local i32 i32)
    (block i32
      ;; org/teavm/backend/wasm/WasmRuntime.java:273
      (set_local 1
        (i32.add
          (i32.load align=4
            ;; org/teavm/backend/wasm/WasmRuntime.java:272
            (i32.const 4016))
          (i32.const 4)))
      ;; org/teavm/backend/wasm/WasmRuntime.java:274
      (set_local 2
        (i32.add
          (get_local 1)
          ;; org/teavm/backend/wasm/WasmRuntime.java:274
          (i32.add
            ;; org/teavm/backend/wasm/WasmRuntime.java:274
            (i32.shl
              (get_local 0)
              (i32.const 2))
            (i32.const 4))))
      (i32.store align=4
        (get_local 2)
        (get_local 0))
      ;; org/teavm/backend/wasm/WasmRuntime.java:276
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmRuntime.java:276
        (i32.const 4016)
        (get_local 2))
      ;; org/teavm/backend/wasm/WasmRuntime.java:277
      (return
        (get_local 1))))

  ;; function #108
  (func $meth_otbw_WasmRuntime_getStackTop (type $type2)
    ;; org/teavm/backend/wasm/WasmRuntime.java:281
    (return
      (if i32
        ;; org/teavm/backend/wasm/WasmRuntime.java:281
        (i32.eq
          (i32.load align=4
            ;; org/teavm/backend/wasm/WasmRuntime.java:281
            (i32.const 4016))
          (i32.load align=4
            ;; org/teavm/backend/wasm/WasmRuntime.java:281
            (i32.const 4012)))
        (then
          (i32.const 0))
        (else
          (i32.load align=4
            (i32.const 4016))))))

  ;; function #109
  (func $meth_otbw_WasmRuntime_getNextStackFrame (type $type1)
    (local i32)
    (block i32
      ;; org/teavm/backend/wasm/WasmRuntime.java:286
      (set_local 1
        (i32.add
          (get_local 0)
          ;; org/teavm/backend/wasm/WasmRuntime.java:286
          (i32.mul
            ;; org/teavm/backend/wasm/WasmRuntime.java:286
            (i32.sub
              (i32.const 0)
              ;; org/teavm/backend/wasm/WasmRuntime.java:285
              (i32.add
                (i32.load align=4
                  (get_local 0))
                (i32.const 2)))
            (i32.const 4))))
      (if
        ;; org/teavm/backend/wasm/WasmRuntime.java:287
        (i32.eq
          (get_local 1)
          (i32.load align=4
            ;; org/teavm/backend/wasm/WasmRuntime.java:287
            (i32.const 4012)))
        (then
          ;; org/teavm/backend/wasm/WasmRuntime.java:288
          (set_local 1
            (i32.const 0))))
      ;; org/teavm/backend/wasm/WasmRuntime.java:290
      (return
        (get_local 1))))

  ;; function #110
  (func $meth_otbw_WasmRuntime_getStackRootCount (type $type1)
    ;; org/teavm/backend/wasm/WasmRuntime.java:294
    (return
      (i32.load align=4
        (get_local 0))))

  ;; function #111
  (func $meth_otbw_WasmRuntime_getStackRootPointer (type $type1)
    ;; org/teavm/backend/wasm/WasmRuntime.java:299
    (return
      (i32.add
        (get_local 0)
        ;; org/teavm/backend/wasm/WasmRuntime.java:299
        (i32.mul
          ;; org/teavm/backend/wasm/WasmRuntime.java:299
          (i32.sub
            (i32.const 0)
            (i32.load align=4
              (get_local 0)))
          (i32.const 4)))))

  ;; function #112
  (func $meth_otbw_WasmRuntime_getExceptionHandlerPtr (type $type1)
    ;; org/teavm/backend/wasm/WasmRuntime.java:304
    (return
      (i32.add
        (get_local 0)
        ;; org/teavm/backend/wasm/WasmRuntime.java:304
        (i32.sub
          ;; org/teavm/backend/wasm/WasmRuntime.java:304
          (i32.mul
            ;; org/teavm/backend/wasm/WasmRuntime.java:304
            (i32.sub
              (i32.const 0)
              (i32.load align=4
                (get_local 0)))
            (i32.const 4))
          (i32.const 4)))))

  ;; function #113
  (func $meth_otbw_WasmRuntime_getCallSiteId (type $type1)
    ;; org/teavm/backend/wasm/WasmRuntime.java:308
    (return
      (i32.load align=4
        ;; org/teavm/backend/wasm/WasmRuntime.java:308
        (call $meth_otbw_WasmRuntime_getExceptionHandlerPtr
          (get_local 0)))))

  ;; function #114
  (func $meth_otbw_WasmRuntime_setExceptionHandlerId (type $type6)
    (block
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmRuntime.java:312
        (call $meth_otbw_WasmRuntime_getExceptionHandlerPtr
          (get_local 0))
        (get_local 1))))

  ;; function #115
  (func $meth_jl_NullPointerException__init_ (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TNullPointerException.java:26
      (i32.store align=4
        (get_local 1)
        (i32.const 64))
      ;; org/teavm/classlib/java/lang/TNullPointerException.java:26
      (call $meth_jl_RuntimeException__init_
        (get_local 0))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/classlib/java/lang/TNullPointerException.java:27
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #116
  (func $meth_jl_Character_forDigit (type $type5)
    (local i32 i32)
    (block i32
      (block $block_0
        (set_local 3
          (call $meth_otbw_WasmRuntime_allocStack
            (i32.const 0)))
        (if
          (i32.eq
            (i32.and
              (i32.load align=4
                (i32.const 2004))
              (i32.const 1))
            (i32.const 0))
          (then
            (i32.store align=4
              (get_local 3)
              (i32.const 65))
            (call $initclass_jl_Character)
            (if
              (i32.ne
                (i32.load align=4
                  (get_local 3))
                (i32.const 65))
              (then
                (set_local 2
                  (i32.const 0))
                (br $block_0)))))
        (if
          ;; org/teavm/classlib/java/lang/TCharacter.java:352
          (block $block_1 i32
            (drop
              (br_if $block_1
                ;; org/teavm/classlib/java/lang/TCharacter.java:352
                (i32.const 0)
                ;; org/teavm/classlib/java/lang/TCharacter.java:352
                (i32.lt_s
                  (get_local 1)
                  (i32.const 2))))
            ;; org/teavm/classlib/java/lang/TCharacter.java:352
            (block $block_2 i32
              (drop
                (br_if $block_2
                  ;; org/teavm/classlib/java/lang/TCharacter.java:352
                  (i32.const 0)
                  ;; org/teavm/classlib/java/lang/TCharacter.java:352
                  (i32.gt_s
                    (get_local 1)
                    (i32.const 36))))
              ;; org/teavm/classlib/java/lang/TCharacter.java:352
              (i32.lt_s
                (get_local 0)
                (get_local 1))))
          (then
            ;; org/teavm/classlib/java/lang/TCharacter.java:355
            (set_local 2
              (if i32
                ;; org/teavm/classlib/java/lang/TCharacter.java:355
                (i32.lt_s
                  (get_local 0)
                  (i32.const 10))
                (then
                  (i32.shr_u
                    (i32.shl
                      ;; org/teavm/classlib/java/lang/TCharacter.java:355
                      (i32.add
                        (i32.const 48)
                        (get_local 0))
                      (i32.const 16))
                    (i32.const 16)))
                (else
                  (i32.shr_u
                    (i32.shl
                      ;; org/teavm/classlib/java/lang/TCharacter.java:355
                      (i32.sub
                        ;; org/teavm/classlib/java/lang/TCharacter.java:355
                        (i32.add
                          (i32.const 97)
                          (get_local 0))
                        (i32.const 10))
                      (i32.const 16))
                    (i32.const 16))))))
          (else
            ;; org/teavm/classlib/java/lang/TCharacter.java:353
            (set_local 2
              (i32.const 0)))))
      ;; org/teavm/classlib/java/lang/TCharacter.java:355
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TCharacter.java:355
      (return
        (get_local 2))))

  ;; function #117
  (func $meth_jl_Character__clinit_ (type $type3)
    (local i32 i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TCharacter.java:26
      (i32.store align=4
        ;; org/teavm/classlib/java/lang/TCharacter.java:26
        (i32.const 1832)
        (i32.const 5272))
      ;; org/teavm/classlib/java/lang/TCharacter.java:94
      (i32.store align=4
        (get_local 1)
        (i32.const 66))
      ;; org/teavm/classlib/java/lang/TCharacter.java:94
      (set_local 0
        (call $meth_otr_Allocator_allocateArray
          (i32.const 6904)
          (i32.const 128)))
      (if
        ;; org/teavm/classlib/java/lang/TCharacter.java:94
        (i32.eq
          ;; org/teavm/classlib/java/lang/TCharacter.java:94
          (i32.load align=4
            (get_local 1))
          (i32.const 66))
        (then
          ;; org/teavm/classlib/java/lang/TCharacter.java:94
          (i32.store align=4
            ;; org/teavm/classlib/java/lang/TCharacter.java:94
            (i32.const 1940)
            (get_local 0))))
      ;; org/teavm/classlib/java/lang/TCharacter.java:94
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #118
  (func $meth_jl_Thread__init_ (type $type6)
    (local i32 i32)
    (block
      (block $block_1
        (block $block_0
          (set_local 3
            (call $meth_otbw_WasmRuntime_allocStack
              (i32.const 0)))
          (if
            (i32.eq
              (i32.and
                (i32.load align=4
                  (i32.const 2140))
                (i32.const 1))
              (i32.const 0))
            (then
              (i32.store align=4
                (get_local 3)
                (i32.const 68))
              (call $initclass_jl_Thread)
              (if
                (i32.ne
                  (i32.load align=4
                    (get_local 3))
                  (i32.const 68))
                (then
                  (br $block_0)))))
          ;; org/teavm/classlib/java/lang/TThread.java:51
          (set_local 2
            (i32.const 0))
          ;; org/teavm/classlib/java/lang/TThread.java:51
          (i32.store align=4
            (get_local 3)
            (i32.const 67))
          ;; org/teavm/classlib/java/lang/TThread.java:51
          (call $meth_jl_Thread__init__0
            (get_local 0)
            (get_local 2)
            (get_local 1))
          (if
            ;; org/teavm/classlib/java/lang/TThread.java:51
            (i32.eq
              ;; org/teavm/classlib/java/lang/TThread.java:51
              (i32.load align=4
                (get_local 3))
              (i32.const 67))
            (then
              ;; org/teavm/classlib/java/lang/TThread.java:52
              (br $block_1)))))
      ;; org/teavm/classlib/java/lang/TThread.java:52
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))))

  ;; function #119
  (func $meth_jl_Thread__init__0 (type $type7)
    (local i32 i32 i32)
    (block
      (block $block_1
        (block $block_0
          (set_local 5
            (call $meth_otbw_WasmRuntime_allocStack
              (i32.const 1)))
          (if
            (i32.eq
              (i32.and
                (i32.load align=4
                  (i32.const 2140))
                (i32.const 1))
              (i32.const 0))
            (then
              (i32.store offset=4 align=4
                (get_local 5)
                (i32.const 0))
              (i32.store align=4
                (get_local 5)
                (i32.const 72))
              (call $initclass_jl_Thread)
              (if
                (i32.ne
                  (i32.load align=4
                    (get_local 5))
                  (i32.const 72))
                (then
                  (br $block_0)))))
          ;; org/teavm/classlib/java/lang/TThread.java:58
          (i32.store offset=4 align=4
            (get_local 5)
            (i32.const 0))
          ;; org/teavm/classlib/java/lang/TThread.java:58
          (i32.store align=4
            (get_local 5)
            (i32.const 69))
          ;; org/teavm/classlib/java/lang/TThread.java:58
          (call $meth_jl_Object__init_
            (get_local 0))
          (if
            ;; org/teavm/classlib/java/lang/TThread.java:58
            (i32.eq
              ;; org/teavm/classlib/java/lang/TThread.java:58
              (i32.load align=4
                (get_local 5))
              (i32.const 69))
            (then
              ;; org/teavm/classlib/java/lang/TThread.java:38
              (i32.store align=4
                (get_local 5)
                (i32.const 70))
              ;; org/teavm/classlib/java/lang/TThread.java:38
              (set_local 3
                (call $meth_otr_Allocator_allocate
                  (i32.const 352)))
              (if
                ;; org/teavm/classlib/java/lang/TThread.java:38
                (i32.eq
                  ;; org/teavm/classlib/java/lang/TThread.java:38
                  (i32.load align=4
                    (get_local 5))
                  (i32.const 70))
                (then
                  ;; org/teavm/classlib/java/lang/TThread.java:38
                  (i32.store offset=4 align=4
                    (get_local 5)
                    (get_local 3))
                  ;; org/teavm/classlib/java/lang/TThread.java:38
                  (i32.store align=4
                    (get_local 5)
                    (i32.const 71))
                  ;; org/teavm/classlib/java/lang/TThread.java:38
                  (call $meth_jl_Object__init_
                    (get_local 3))
                  (if
                    ;; org/teavm/classlib/java/lang/TThread.java:38
                    (i32.eq
                      ;; org/teavm/classlib/java/lang/TThread.java:38
                      (i32.load align=4
                        (get_local 5))
                      (i32.const 71))
                    (then
                      (i32.store8 align=1
                        (i32.add
                          (i32.load align=4
                            (i32.const 3992))
                          (i32.div_s
                            (i32.sub
                              (get_local 0)
                              (i32.load align=4
                                (i32.const 3996)))
                            (i32.const 1024)))
                        (i32.const 0))
                      ;; org/teavm/classlib/java/lang/TThread.java:38
                      (i32.store offset=44 align=4
                        (get_local 0)
                        (get_local 3))
                      ;; org/teavm/classlib/java/lang/TThread.java:43
                      (i32.store8 offset=60 align=1
                        (get_local 0)
                        (i32.const 1))
                      ;; org/teavm/classlib/java/lang/TThread.java:59
                      (i32.store offset=56 align=4
                        (get_local 0)
                        (get_local 2))
                      ;; org/teavm/classlib/java/lang/TThread.java:60
                      (i32.store offset=64 align=4
                        (get_local 0)
                        (get_local 1))
                      ;; org/teavm/classlib/java/lang/TThread.java:61
                      (set_local 4
                        (i32.load align=4
                          (i32.const 2100)))
                      ;; org/teavm/classlib/java/lang/TThread.java:61
                      (i32.store align=4
                        ;; org/teavm/classlib/java/lang/TThread.java:61
                        (i32.const 2100)
                        ;; org/teavm/classlib/java/lang/TThread.java:61
                        (i32.add
                          (get_local 4)
                          (i32.const 1)))
                      ;; org/teavm/classlib/java/lang/TThread.java:61
                      (i64.store offset=16 align=8
                        (get_local 0)
                        ;; org/teavm/classlib/java/lang/TThread.java:61
                        (i64.extend_s/i32
                          (get_local 4)))
                      ;; org/teavm/classlib/java/lang/TThread.java:62
                      (br $block_1)))))))))
      ;; org/teavm/classlib/java/lang/TThread.java:62
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 5)
          (i32.const 4)))))

  ;; function #120
  (func $meth_jl_Thread__clinit_ (type $type3)
    (local i32 i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      ;; org/teavm/classlib/java/lang/TThread.java:27
      (i32.store offset=4 align=4
        (get_local 1)
        (i32.const 0))
      ;; org/teavm/classlib/java/lang/TThread.java:27
      (i32.store align=4
        (get_local 1)
        (i32.const 76))
      ;; org/teavm/classlib/java/lang/TThread.java:27
      (set_local 0
        (call $meth_otr_Allocator_allocate
          (i32.const 2128)))
      (if
        ;; org/teavm/classlib/java/lang/TThread.java:27
        (i32.eq
          ;; org/teavm/classlib/java/lang/TThread.java:27
          (i32.load align=4
            (get_local 1))
          (i32.const 76))
        (then
          ;; org/teavm/classlib/java/lang/TThread.java:27
          (i32.store offset=4 align=4
            (get_local 1)
            (get_local 0))
          ;; org/teavm/classlib/java/lang/TThread.java:27
          (i32.store align=4
            (get_local 1)
            (i32.const 77))
          ;; org/teavm/classlib/java/lang/TThread.java:27
          (call $meth_jl_Thread__init_
            (get_local 0)
            (i32.const 7004))
          (if
            ;; org/teavm/classlib/java/lang/TThread.java:27
            (i32.eq
              ;; org/teavm/classlib/java/lang/TThread.java:27
              (i32.load align=4
                (get_local 1))
              (i32.const 77))
            (then
              ;; org/teavm/classlib/java/lang/TThread.java:27
              (i32.store align=4
                ;; org/teavm/classlib/java/lang/TThread.java:27
                (i32.const 2092)
                (get_local 0))
              ;; org/teavm/classlib/java/lang/TThread.java:28
              (i32.store align=4
                ;; org/teavm/classlib/java/lang/TThread.java:28
                (i32.const 2096)
                (i32.load align=4
                  ;; org/teavm/classlib/java/lang/TThread.java:28
                  (i32.const 2092)))
              ;; org/teavm/classlib/java/lang/TThread.java:29
              (i32.store align=4
                ;; org/teavm/classlib/java/lang/TThread.java:29
                (i32.const 2100)
                (i32.const 1))
              ;; org/teavm/classlib/java/lang/TThread.java:30
              (i32.store align=4
                ;; org/teavm/classlib/java/lang/TThread.java:30
                (i32.const 2104)
                (i32.const 1))
              ;; org/teavm/classlib/java/lang/TThread.java:31
              (i32.store offset=4 align=4
                (get_local 1)
                (i32.const 0))
              ;; org/teavm/classlib/java/lang/TThread.java:31
              (i32.store align=4
                (get_local 1)
                (i32.const 78))
              ;; org/teavm/classlib/java/lang/TThread.java:31
              (set_local 0
                (call $meth_otr_Allocator_allocate
                  (i32.const 2232)))
              (if
                ;; org/teavm/classlib/java/lang/TThread.java:31
                (i32.eq
                  ;; org/teavm/classlib/java/lang/TThread.java:31
                  (i32.load align=4
                    (get_local 1))
                  (i32.const 78))
                (then
                  ;; org/teavm/classlib/java/lang/TThread.java:31
                  (i32.store offset=4 align=4
                    (get_local 1)
                    (get_local 0))
                  ;; org/teavm/classlib/java/lang/TThread.java:31
                  (i32.store align=4
                    (get_local 1)
                    (i32.const 79))
                  ;; org/teavm/classlib/java/lang/TThread.java:31
                  (call $meth_jl_DefaultUncaughtExceptionHandler__init_
                    (get_local 0))
                  (if
                    ;; org/teavm/classlib/java/lang/TThread.java:31
                    (i32.eq
                      ;; org/teavm/classlib/java/lang/TThread.java:31
                      (i32.load align=4
                        (get_local 1))
                      (i32.const 79))
                    (then
                      ;; org/teavm/classlib/java/lang/TThread.java:31
                      (i32.store align=4
                        ;; org/teavm/classlib/java/lang/TThread.java:31
                        (i32.const 2108)
                        (get_local 0))))))))))
      ;; org/teavm/classlib/java/lang/TThread.java:31
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #121
  (func $meth_jl_DefaultUncaughtExceptionHandler__init_ (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TDefaultUncaughtExceptionHandler.java:20
      (i32.store align=4
        (get_local 1)
        (i32.const 80))
      ;; org/teavm/classlib/java/lang/TDefaultUncaughtExceptionHandler.java:20
      (call $meth_jl_Object__init_
        (get_local 0))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/classlib/java/lang/TDefaultUncaughtExceptionHandler.java:20
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #122
  (func $meth_jl_Math_min (type $type5)
    (block i32
      (if
        ;; org/teavm/classlib/java/lang/TMath.java:178
        (i32.lt_s
          (get_local 0)
          (get_local 1))
        (then
          ;; org/teavm/classlib/java/lang/TMath.java:178
          (set_local 1
            (get_local 0))))
      ;; org/teavm/classlib/java/lang/TMath.java:178
      (return
        (get_local 1))))

  ;; function #123
  (func $meth_jl_Math_max (type $type5)
    (block i32
      (if
        ;; org/teavm/classlib/java/lang/TMath.java:182
        (i32.gt_s
          (get_local 0)
          (get_local 1))
        (then
          ;; org/teavm/classlib/java/lang/TMath.java:182
          (set_local 1
            (get_local 0))))
      ;; org/teavm/classlib/java/lang/TMath.java:182
      (return
        (get_local 1))))

  ;; function #124
  (func $meth_jl_Math_max_0 (type $type10)
    (block i64
      (if
        ;; org/teavm/classlib/java/lang/TMath.java:190
        (i64.gt_s
          (get_local 0)
          (get_local 1))
        (then
          ;; org/teavm/classlib/java/lang/TMath.java:190
          (set_local 1
            (get_local 0))))
      ;; org/teavm/classlib/java/lang/TMath.java:190
      (return
        (get_local 1))))

  ;; function #125
  (func $meth_otbwr_WasmSupport_runWithoutArgs_lambda__14_0__init_ (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
      (i32.store align=4
        (get_local 1)
        (i32.const 81))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
      (call $meth_jl_Object__init_
        (get_local 0))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #126
  (func $meth_otbwr_WasmSupport_runWithoutArgs_lambda__14_0_run (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
      (i32.store align=4
        (get_local 1)
        (i32.const 82))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
      (call $meth_otbwr_WasmSupport_lambda_runWithoutArgs_0)
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:69
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #127
  (func $meth_jl_StringIndexOutOfBoundsException__init_ (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringIndexOutOfBoundsException.java:22
      (i32.store align=4
        (get_local 1)
        (i32.const 83))
      ;; org/teavm/classlib/java/lang/TStringIndexOutOfBoundsException.java:22
      (call $meth_jl_IndexOutOfBoundsException__init_
        (get_local 0))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/classlib/java/lang/TStringIndexOutOfBoundsException.java:23
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #128
  (func $meth_jl_Exception__init_ (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TException.java:22
      (i32.store align=4
        (get_local 1)
        (i32.const 84))
      ;; org/teavm/classlib/java/lang/TException.java:22
      (call $meth_jl_Throwable__init_
        (get_local 0))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/classlib/java/lang/TException.java:23
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #129
  (func $meth_jl_StringBuilder__init_ (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:24
      (i32.store align=4
        (get_local 1)
        (i32.const 85))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:24
      (call $meth_jl_AbstractStringBuilder__init_
        (get_local 0))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:25
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #130
  (func $meth_jl_StringBuilder_append_0 (type $type5)
    (local i32)
    (block i32
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:114
      (i32.store align=4
        (get_local 2)
        (i32.const 86))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:114
      (drop
        (call $meth_jl_AbstractStringBuilder_append_0
          (get_local 0)
          (get_local 1)))
      (if
        ;; org/teavm/classlib/java/lang/TStringBuilder.java:114
        (i32.ne
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:114
          (i32.load align=4
            (get_local 2))
          (i32.const 86))
        (then
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:115
          (set_local 0
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:115
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:115
      (return
        (get_local 0))))

  ;; function #131
  (func $meth_jl_StringBuilder_append (type $type5)
    (local i32)
    (block i32
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:42
      (i32.store align=4
        (get_local 2)
        (i32.const 87))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:42
      (drop
        (call $meth_jl_AbstractStringBuilder_append_1
          (get_local 0)
          (get_local 1)))
      (if
        ;; org/teavm/classlib/java/lang/TStringBuilder.java:42
        (i32.ne
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:42
          (i32.load align=4
            (get_local 2))
          (i32.const 87))
        (then
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:43
          (set_local 0
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:43
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:43
      (return
        (get_local 0))))

  ;; function #132
  (func $meth_jl_StringBuilder_append_1 (type $type5)
    (local i32)
    (block i32
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:48
      (i32.store align=4
        (get_local 2)
        (i32.const 88))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:48
      (drop
        (call $meth_jl_AbstractStringBuilder_append_2
          (get_local 0)
          (get_local 1)))
      (if
        ;; org/teavm/classlib/java/lang/TStringBuilder.java:48
        (i32.ne
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:48
          (i32.load align=4
            (get_local 2))
          (i32.const 88))
        (then
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:49
          (set_local 0
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:49
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:49
      (return
        (get_local 0))))

  ;; function #133
  (func $meth_jl_StringBuilder_append_2 (type $type5)
    (local i32)
    (block i32
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:72
      (i32.store align=4
        (get_local 2)
        (i32.const 89))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:72
      (drop
        (call $meth_jl_AbstractStringBuilder_append_3
          (get_local 0)
          (get_local 1)))
      (if
        ;; org/teavm/classlib/java/lang/TStringBuilder.java:72
        (i32.ne
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:72
          (i32.load align=4
            (get_local 2))
          (i32.const 89))
        (then
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:73
          (set_local 0
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:73
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:73
      (return
        (get_local 0))))

  ;; function #134
  (func $meth_jl_StringBuilder_insert_2 (type $type14)
    (local i32)
    (block i32
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:168
      (i32.store align=4
        (get_local 3)
        (i32.const 90))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:168
      (drop
        (call $meth_jl_AbstractStringBuilder_insert_0
          (get_local 0)
          (get_local 1)
          (get_local 2)))
      (if
        ;; org/teavm/classlib/java/lang/TStringBuilder.java:168
        (i32.ne
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:168
          (i32.load align=4
            (get_local 3))
          (i32.const 90))
        (then
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:169
          (set_local 0
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:169
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:169
      (return
        (get_local 0))))

  ;; function #135
  (func $meth_jl_StringBuilder_insert_3 (type $type14)
    (local i32)
    (block i32
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:186
      (i32.store align=4
        (get_local 3)
        (i32.const 91))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:186
      (drop
        (call $meth_jl_AbstractStringBuilder_insert
          (get_local 0)
          (get_local 1)
          (get_local 2)))
      (if
        ;; org/teavm/classlib/java/lang/TStringBuilder.java:186
        (i32.ne
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:186
          (i32.load align=4
            (get_local 3))
          (i32.const 91))
        (then
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:187
          (set_local 0
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:187
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:187
      (return
        (get_local 0))))

  ;; function #136
  (func $meth_jl_StringBuilder_insert_4 (type $type14)
    (local i32)
    (block i32
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:210
      (i32.store align=4
        (get_local 3)
        (i32.const 92))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:210
      (drop
        (call $meth_jl_AbstractStringBuilder_insert_1
          (get_local 0)
          (get_local 1)
          (get_local 2)))
      (if
        ;; org/teavm/classlib/java/lang/TStringBuilder.java:210
        (i32.ne
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:210
          (i32.load align=4
            (get_local 3))
          (i32.const 92))
        (then
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:211
          (set_local 0
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:211
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:211
      (return
        (get_local 0))))

  ;; function #137
  (func $meth_jl_StringBuilder_setLength (type $type6)
    (local i32)
    (block
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (i32.store align=4
        (get_local 2)
        (i32.const 93))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (call $meth_jl_AbstractStringBuilder_setLength
        (get_local 0)
        (get_local 1))
      (drop
        (i32.load align=4
          (get_local 2)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))))

  ;; function #138
  (func $meth_jl_StringBuilder_toString (type $type1)
    (local i32 i32)
    (block i32
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (i32.store align=4
        (get_local 2)
        (i32.const 94))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (set_local 1
        ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
        (call $meth_jl_AbstractStringBuilder_toString
          (get_local 0)))
      (if
        ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
        (i32.ne
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
          (i32.load align=4
            (get_local 2))
          (i32.const 94))
        (then
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
          (set_local 1
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (return
        (get_local 1))))

  ;; function #139
  (func $meth_jl_StringBuilder_ensureCapacity (type $type6)
    (local i32)
    (block
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (i32.store align=4
        (get_local 2)
        (i32.const 95))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (call $meth_jl_AbstractStringBuilder_ensureCapacity
        (get_local 0)
        (get_local 1))
      (drop
        (i32.load align=4
          (get_local 2)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))))

  ;; function #140
  (func $meth_jl_StringBuilder_insert_0 (type $type14)
    (local i32 i32)
    (block i32
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (i32.store align=4
        (get_local 3)
        (i32.const 96))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (set_local 2
        (block i32
          (set_local 4
            (get_local 0))
          (call_indirect $type14
            (i32.load align=4
              (i32.add
                (i32.shl
                  (i32.load align=4
                    (get_local 4))
                  (i32.const 3))
                (i32.const 140)))
            (get_local 4)
            (get_local 1)
            (get_local 2))))
      (if
        ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
        (i32.ne
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
          (i32.load align=4
            (get_local 3))
          (i32.const 96))
        (then
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
          (set_local 2
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (return
        (get_local 2))))

  ;; function #141
  (func $meth_jl_StringBuilder_insert (type $type14)
    (local i32 i32 i32)
    (block i32
      (set_local 4
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (i32.store align=4
        (get_local 4)
        (i32.const 97))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (set_local 3
        (block i32
          (set_local 5
            (get_local 0))
          (call_indirect $type14
            (i32.load align=4
              (i32.add
                (i32.shl
                  (i32.load align=4
                    (get_local 5))
                  (i32.const 3))
                (i32.const 144)))
            (get_local 5)
            (get_local 1)
            (get_local 2))))
      (if
        ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
        (i32.ne
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
          (i32.load align=4
            (get_local 4))
          (i32.const 97))
        (then
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
          (set_local 3
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 4)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (return
        (get_local 3))))

  ;; function #142
  (func $meth_jl_StringBuilder_insert_1 (type $type14)
    (local i32 i32)
    (block i32
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (i32.store align=4
        (get_local 3)
        (i32.const 98))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (set_local 2
        (block i32
          (set_local 4
            (get_local 0))
          (call_indirect $type14
            (i32.load align=4
              (i32.add
                (i32.shl
                  (i32.load align=4
                    (get_local 4))
                  (i32.const 3))
                (i32.const 148)))
            (get_local 4)
            (get_local 1)
            (get_local 2))))
      (if
        ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
        (i32.ne
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
          (i32.load align=4
            (get_local 3))
          (i32.const 98))
        (then
          ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
          (set_local 2
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TStringBuilder.java:18
      (return
        (get_local 2))))

  ;; function #143
  (func $meth_jl_Throwable__init_ (type $type0)
    (local i32 i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TThrowable.java:59
      (i32.store8 offset=16 align=1
        (get_local 0)
        (i32.const 1))
      ;; org/teavm/classlib/java/lang/TThrowable.java:60
      (i32.store8 offset=17 align=1
        (get_local 0)
        (i32.const 1))
      ;; org/teavm/classlib/java/lang/TThrowable.java:61
      (i32.store align=4
        (get_local 1)
        (i32.const 99))
      ;; org/teavm/classlib/java/lang/TThrowable.java:61
      (drop
        (block i32
          (set_local 2
            (get_local 0))
          (call_indirect $type1
            (i32.load align=4
              (i32.add
                (i32.shl
                  (i32.load align=4
                    (get_local 2))
                  (i32.const 3))
                (i32.const 96)))
            (get_local 2))))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/classlib/java/lang/TThrowable.java:62
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #144
  (func $meth_jl_Throwable_fillInStackTrace (type $type1)
    (local i32 i32)
    (block i32
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      (block $block_0
        ;; org/teavm/classlib/java/lang/TThrowable.java:106
        (i32.store offset=4 align=4
          (get_local 2)
          (i32.const 0))
        ;; org/teavm/classlib/java/lang/TThrowable.java:106
        (i32.store align=4
          (get_local 2)
          (i32.const 100))
        ;; org/teavm/classlib/java/lang/TThrowable.java:106
        (set_local 1
          ;; org/teavm/classlib/java/lang/TThrowable.java:106
          (call $meth_otr_ExceptionHandling_fillStackTrace))
        (if
          ;; org/teavm/classlib/java/lang/TThrowable.java:106
          (i32.eq
            ;; org/teavm/classlib/java/lang/TThrowable.java:106
            (i32.load align=4
              (get_local 2))
            (i32.const 100))
          (then
            ;; org/teavm/classlib/java/lang/TThrowable.java:106
            (i32.store offset=4 align=4
              (get_local 2)
              (get_local 1))
            ;; org/teavm/classlib/java/lang/TThrowable.java:106
            (i32.store align=4
              (get_local 2)
              (i32.const 101))
            ;; org/teavm/classlib/java/lang/TThrowable.java:106
            (set_local 1
              (get_local 1))
            (if
              ;; org/teavm/classlib/java/lang/TThrowable.java:106
              (i32.eq
                ;; org/teavm/classlib/java/lang/TThrowable.java:106
                (i32.load align=4
                  (get_local 2))
                (i32.const 101))
              (then
                (i32.store8 align=1
                  (i32.add
                    (i32.load align=4
                      (i32.const 3992))
                    (i32.div_s
                      (i32.sub
                        (get_local 0)
                        (i32.load align=4
                          (i32.const 3996)))
                      (i32.const 1024)))
                  (i32.const 0))
                ;; org/teavm/classlib/java/lang/TThrowable.java:106
                (i32.store offset=24 align=4
                  (get_local 0)
                  (get_local 1))
                ;; org/teavm/classlib/java/lang/TThrowable.java:108
                (br $block_0)))))
        ;; org/teavm/classlib/java/lang/TThrowable.java:106
        (set_local 0
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TThrowable.java:108
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TThrowable.java:108
      (return
        (get_local 0))))

  ;; function #145
  (func $meth_otp_Platform_getArrayItem (type $type1)
    ;; org/teavm/platform/Platform.java:240
    (return
      (i32.load offset=32 align=4
        (get_local 0))))

  ;; function #146
  (func $meth_jl_AbstractStringBuilder__init_ (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:40
      (i32.store align=4
        (get_local 1)
        (i32.const 102))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:40
      (call $meth_jl_AbstractStringBuilder__init__0
        (get_local 0)
        (i32.const 16))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:41
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #147
  (func $meth_jl_AbstractStringBuilder__init__0 (type $type6)
    (local i32 i32)
    (block
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:43
      (i32.store align=4
        (get_local 3)
        (i32.const 103))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:43
      (call $meth_jl_Object__init_
        (get_local 0))
      (if
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:43
        (i32.eq
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:43
          (i32.load align=4
            (get_local 3))
          (i32.const 103))
        (then
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:44
          (i32.store align=4
            (get_local 3)
            (i32.const 104))
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:44
          (set_local 2
            (call $meth_otr_Allocator_allocateArray
              (i32.const 5392)
              (get_local 1)))
          (if
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:44
            (i32.eq
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:44
              (i32.load align=4
                (get_local 3))
              (i32.const 104))
            (then
              (i32.store8 align=1
                (i32.add
                  (i32.load align=4
                    (i32.const 3992))
                  (i32.div_s
                    (i32.sub
                      (get_local 0)
                      (i32.load align=4
                        (i32.const 3996)))
                    (i32.const 1024)))
                (i32.const 0))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:44
              (i32.store offset=8 align=4
                (get_local 0)
                (get_local 2))))))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:45
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))))

  ;; function #148
  (func $meth_jl_AbstractStringBuilder_append_0 (type $type5)
    (local i32 i32 i32 i32)
    (block i32
      (set_local 4
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:504
      (set_local 2
        (i32.load offset=12 align=4
          (get_local 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:504
      (i32.store align=4
        (get_local 4)
        (i32.const 105))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:504
      (set_local 3
        (block i32
          (set_local 5
            (get_local 0))
          (call_indirect $type14
            (i32.load align=4
              (i32.add
                (i32.shl
                  (i32.load align=4
                    (get_local 5))
                  (i32.const 3))
                (i32.const 100)))
            (get_local 5)
            (get_local 2)
            (get_local 1))))
      (if
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:504
        (i32.ne
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:504
          (i32.load align=4
            (get_local 4))
          (i32.const 105))
        (then
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:504
          (set_local 3
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:504
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 4)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:504
      (return
        (get_local 3))))

  ;; function #149
  (func $meth_jl_AbstractStringBuilder_append_1 (type $type5)
    (local i32 i32 i32 i32)
    (block i32
      (set_local 4
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:64
      (set_local 2
        (i32.load offset=12 align=4
          (get_local 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:64
      (i32.store align=4
        (get_local 4)
        (i32.const 106))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:64
      (set_local 3
        (block i32
          (set_local 5
            (get_local 0))
          (call_indirect $type14
            (i32.load align=4
              (i32.add
                (i32.shl
                  (i32.load align=4
                    (get_local 5))
                  (i32.const 3))
                (i32.const 112)))
            (get_local 5)
            (get_local 2)
            (get_local 1))))
      (if
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:64
        (i32.ne
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:64
          (i32.load align=4
            (get_local 4))
          (i32.const 106))
        (then
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:64
          (set_local 3
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:64
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 4)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:64
      (return
        (get_local 3))))

  ;; function #150
  (func $meth_jl_AbstractStringBuilder_insert_1 (type $type14)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32)
    (block i32
      (set_local 10
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 2)))
      (block $block_2
        (block $block_1
          (if
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:68
            (i32.eq
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:68
              (block $block_0 i32
                (drop
                  (br_if $block_0
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:68
                    (i32.const 0)
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:68
                    (i32.lt_s
                      (get_local 1)
                      (i32.const 0))))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:68
                (i32.le_s
                  (get_local 1)
                  (i32.load offset=12 align=4
                    (get_local 0))))
              (i32.const 0))
            (then
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:69
              (i32.store offset=4 align=4
                (get_local 10)
                (i32.const 0))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:69
              (i32.store offset=8 align=4
                (get_local 10)
                (i32.const 0))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:69
              (i32.store align=4
                (get_local 10)
                (i32.const 107))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:69
              (set_local 3
                (call $meth_otr_Allocator_allocate
                  (i32.const 2672)))
              (if
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:69
                (i32.eq
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:69
                  (i32.load align=4
                    (get_local 10))
                  (i32.const 107))
                (then
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:69
                  (i32.store offset=4 align=4
                    (get_local 10)
                    (get_local 3))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:69
                  (i32.store align=4
                    (get_local 10)
                    (i32.const 108))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:69
                  (call $meth_jl_StringIndexOutOfBoundsException__init_
                    (get_local 3))
                  (if
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:69
                    (i32.eq
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:69
                      (i32.load align=4
                        (get_local 10))
                      (i32.const 108))
                    (then
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:69
                      (i32.store align=4
                        (get_local 10)
                        (i32.const 109))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:69
                      (call $meth_otr_ExceptionHandling_throwException
                        (get_local 3)))))))
            (else
              (if
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:71
                (i32.eq
                  (get_local 2)
                  (i32.const 0))
                (then
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:72
                  (set_local 2
                    (i32.const 7216)))
                (else
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:73
                  (i32.store offset=4 align=4
                    (get_local 10)
                    (i32.const 0))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:73
                  (i32.store offset=8 align=4
                    (get_local 10)
                    (i32.const 0))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:73
                  (i32.store align=4
                    (get_local 10)
                    (i32.const 110))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:73
                  (set_local 4
                    (block i32
                      (set_local 11
                        (get_local 2))
                      (call_indirect $type1
                        (i32.load align=4
                          (i32.add
                            (i32.shl
                              (i32.load align=4
                                (get_local 11))
                              (i32.const 3))
                            (i32.const 104)))
                        (get_local 11))))
                  (if
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:73
                    (i32.ne
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:73
                      (i32.load align=4
                        (get_local 10))
                      (i32.const 110))
                    (then
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:73
                      (br $block_1)))
                  (if
                    (get_local 4)
                    (then
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:74
                      (br $block_2)))))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:76
              (set_local 4
                (i32.load offset=12 align=4
                  (get_local 0)))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:76
              (i32.store offset=4 align=4
                (get_local 10)
                (get_local 2))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:76
              (i32.store offset=8 align=4
                (get_local 10)
                (i32.const 0))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:76
              (i32.store align=4
                (get_local 10)
                (i32.const 111))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:76
              (set_local 5
                (block i32
                  (set_local 11
                    (get_local 2))
                  (call_indirect $type1
                    (i32.load align=4
                      (i32.add
                        (i32.shl
                          (i32.load align=4
                            (get_local 11))
                          (i32.const 3))
                        (i32.const 96)))
                    (get_local 11))))
              (if
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:76
                (i32.eq
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:76
                  (i32.load align=4
                    (get_local 10))
                  (i32.const 111))
                (then
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:76
                  (set_local 4
                    (i32.add
                      (get_local 4)
                      (get_local 5)))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:76
                  (i32.store align=4
                    (get_local 10)
                    (i32.const 112))
                  (block
                    (set_local 11
                      (get_local 0))
                    (call_indirect $type6
                      (i32.load align=4
                        (i32.add
                          (i32.shl
                            (i32.load align=4
                              (get_local 11))
                            (i32.const 3))
                          (i32.const 104)))
                      (get_local 11)
                      (get_local 4)))
                  (if
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:76
                    (i32.eq
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:76
                      (i32.load align=4
                        (get_local 10))
                      (i32.const 112))
                    (then
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:77
                      (set_local 6
                        (i32.sub
                          (i32.load offset=12 align=4
                            (get_local 0))
                          (i32.const 1)))
                      (block $block_6
                        (block $block_7
                          (loop $block_8
                            (if
                              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:77
                              (i32.lt_s
                                (get_local 6)
                                (get_local 1))
                              (then
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:80
                                (set_local 4
                                  (i32.load offset=12 align=4
                                    (get_local 0)))
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:80
                                (i32.store align=4
                                  (get_local 10)
                                  (i32.const 113))
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:80
                                (set_local 5
                                  (block i32
                                    (set_local 11
                                      (get_local 2))
                                    (call_indirect $type1
                                      (i32.load align=4
                                        (i32.add
                                          (i32.shl
                                            (i32.load align=4
                                              (get_local 11))
                                            (i32.const 3))
                                          (i32.const 96)))
                                      (get_local 11))))
                                (if
                                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:80
                                  (i32.ne
                                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:80
                                    (i32.load align=4
                                      (get_local 10))
                                    (i32.const 113))
                                  (then
                                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:80
                                    (br $block_1)))
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:80
                                (i32.store offset=12 align=4
                                  (get_local 0)
                                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:80
                                  (i32.add
                                    (get_local 4)
                                    (get_local 5)))
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:82
                                (set_local 6
                                  (i32.const 0))
                                (block $block_4
                                  (block $block_3
                                    (loop $block_5
                                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:82
                                      (i32.store align=4
                                        (get_local 10)
                                        (i32.const 116))
                                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:82
                                      (set_local 4
                                        (block i32
                                          (set_local 11
                                            (get_local 2))
                                          (call_indirect $type1
                                            (i32.load align=4
                                              (i32.add
                                                (i32.shl
                                                  (i32.load align=4
                                                    (get_local 11))
                                                  (i32.const 3))
                                                (i32.const 96)))
                                            (get_local 11))))
                                      (if
                                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:82
                                        (i32.ne
                                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:82
                                          (i32.load align=4
                                            (get_local 10))
                                          (i32.const 116))
                                        (then
                                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:82
                                          (br $block_1)))
                                      (if
                                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:82
                                        (i32.ge_s
                                          (get_local 6)
                                          (get_local 4))
                                        (then
                                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:82
                                          (br $block_3)))
                                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                      (set_local 7
                                        (i32.load offset=8 align=4
                                          (get_local 0)))
                                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                      (set_local 4
                                        (i32.add
                                          (get_local 1)
                                          (i32.const 1)))
                                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                      (i32.store offset=8 align=4
                                        (get_local 10)
                                        (get_local 7))
                                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                      (i32.store align=4
                                        (get_local 10)
                                        (i32.const 115))
                                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                      (set_local 5
                                        (block i32
                                          (set_local 11
                                            (get_local 2))
                                          (call_indirect $type5
                                            (i32.load align=4
                                              (i32.add
                                                (i32.shl
                                                  (i32.load align=4
                                                    (get_local 11))
                                                  (i32.const 3))
                                                (i32.const 100)))
                                            (get_local 11)
                                            (get_local 6))))
                                      (if
                                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                        (i32.ne
                                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                          (i32.load align=4
                                            (get_local 10))
                                          (i32.const 115))
                                        (then
                                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                          (br $block_1)))
                                      (if
                                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                        (i32.eq
                                          (get_local 7)
                                          (i32.const 0))
                                        (then
                                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                          (i32.store offset=4 align=4
                                            (get_local 10)
                                            (i32.const 0))
                                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                          (i32.store offset=8 align=4
                                            (get_local 10)
                                            (i32.const 0))
                                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                          (i32.store align=4
                                            (get_local 10)
                                            (i32.const 121))
                                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                          (call $teavm_throwNullPointerException)
                                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                          (br $block_1)))
                                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                      (set_local 7
                                        (get_local 7))
                                      (if
                                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                        (i32.lt_s
                                          (get_local 1)
                                          (i32.const 0))
                                        (then
                                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                          (br $block_4)))
                                      (if
                                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                        (i32.ge_s
                                          (get_local 1)
                                          (i32.load align=4
                                            (i32.add
                                              (get_local 7)
                                              (i32.const 8))))
                                        (then
                                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                          (br $block_4)))
                                      (i32.store16 align=2
                                        (i32.add
                                          (i32.add
                                            (get_local 7)
                                            (i32.const 12))
                                          (i32.shl
                                            (get_local 1)
                                            (i32.const 1)))
                                        (get_local 5))
                                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:82
                                      (set_local 6
                                        (i32.add
                                          (get_local 6)
                                          (i32.const 1)))
                                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:82
                                      (set_local 1
                                        (get_local 4))
                                      (br $block_5)))
                                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:85
                                  (br $block_2))
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                (i32.store offset=4 align=4
                                  (get_local 10)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                (i32.store offset=8 align=4
                                  (get_local 10)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                (i32.store align=4
                                  (get_local 10)
                                  (i32.const 122))
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                (call $teavm_throwArrayIndexOutOfBoundsException)
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
                                (br $block_1)))
                            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                            (set_local 7
                              (i32.load offset=8 align=4
                                (get_local 0)))
                            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                            (i32.store offset=8 align=4
                              (get_local 10)
                              (get_local 7))
                            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                            (i32.store align=4
                              (get_local 10)
                              (i32.const 114))
                            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                            (set_local 8
                              (block i32
                                (set_local 11
                                  (get_local 2))
                                (call_indirect $type1
                                  (i32.load align=4
                                    (i32.add
                                      (i32.shl
                                        (i32.load align=4
                                          (get_local 11))
                                        (i32.const 3))
                                      (i32.const 96)))
                                  (get_local 11))))
                            (if
                              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                              (i32.ne
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (i32.load align=4
                                  (get_local 10))
                                (i32.const 114))
                              (then
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (br $block_1)))
                            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                            (set_local 5
                              (i32.add
                                (get_local 6)
                                (get_local 8)))
                            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                            (set_local 9
                              (i32.load offset=8 align=4
                                (get_local 0)))
                            (if
                              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                              (i32.eq
                                (get_local 9)
                                (i32.const 0))
                              (then
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (i32.store offset=4 align=4
                                  (get_local 10)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (i32.store offset=8 align=4
                                  (get_local 10)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (i32.store align=4
                                  (get_local 10)
                                  (i32.const 117))
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (call $teavm_throwNullPointerException)
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (br $block_1)))
                            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                            (set_local 9
                              (get_local 9))
                            (if
                              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                              (i32.lt_s
                                (get_local 6)
                                (i32.const 0))
                              (then
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (br $block_6)))
                            (if
                              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                              (i32.ge_s
                                (get_local 6)
                                (i32.load align=4
                                  (i32.add
                                    (get_local 9)
                                    (i32.const 8))))
                              (then
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (br $block_6)))
                            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                            (set_local 8
                              (i32.load16_u align=2
                                (i32.add
                                  (i32.add
                                    (get_local 9)
                                    (i32.const 12))
                                  (i32.shl
                                    (get_local 6)
                                    (i32.const 1)))))
                            (if
                              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                              (i32.eq
                                (get_local 7)
                                (i32.const 0))
                              (then
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (i32.store offset=4 align=4
                                  (get_local 10)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (i32.store offset=8 align=4
                                  (get_local 10)
                                  (i32.const 0))
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (i32.store align=4
                                  (get_local 10)
                                  (i32.const 119))
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (call $teavm_throwNullPointerException)
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (br $block_1)))
                            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                            (set_local 7
                              (get_local 7))
                            (if
                              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                              (i32.lt_s
                                (get_local 5)
                                (i32.const 0))
                              (then
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (br $block_7)))
                            (if
                              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                              (i32.ge_s
                                (get_local 5)
                                (i32.load align=4
                                  (i32.add
                                    (get_local 7)
                                    (i32.const 8))))
                              (then
                                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                                (br $block_7)))
                            (i32.store16 align=2
                              (i32.add
                                (i32.add
                                  (get_local 7)
                                  (i32.const 12))
                                (i32.shl
                                  (get_local 5)
                                  (i32.const 1)))
                              (get_local 8))
                            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:77
                            (set_local 6
                              (i32.add
                                (get_local 6)
                                (i32.const -1)))
                            (br $block_8)))
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                        (i32.store offset=4 align=4
                          (get_local 10)
                          (i32.const 0))
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                        (i32.store offset=8 align=4
                          (get_local 10)
                          (i32.const 0))
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                        (i32.store align=4
                          (get_local 10)
                          (i32.const 120))
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                        (call $teavm_throwArrayIndexOutOfBoundsException)
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                        (br $block_1))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                      (i32.store offset=4 align=4
                        (get_local 10)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                      (i32.store offset=8 align=4
                        (get_local 10)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                      (i32.store align=4
                        (get_local 10)
                        (i32.const 118))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:78
                      (call $teavm_throwArrayIndexOutOfBoundsException))))))))
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
        (set_local 0
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 10)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:83
      (return
        (get_local 0))))

  ;; function #151
  (func $meth_jl_AbstractStringBuilder_append_2 (type $type5)
    (local i32 i32 i32)
    (block i32
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:89
      (i32.store align=4
        (get_local 3)
        (i32.const 123))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:89
      (set_local 2
        (block i32
          (set_local 4
            (get_local 0))
          (call_indirect $type14
            (i32.load align=4
              (i32.add
                (i32.shl
                  (i32.load align=4
                    (get_local 4))
                  (i32.const 3))
                (i32.const 108)))
            (get_local 4)
            (get_local 1)
            (i32.const 10))))
      (if
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:89
        (i32.ne
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:89
          (i32.load align=4
            (get_local 3))
          (i32.const 123))
        (then
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:89
          (set_local 2
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:89
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:89
      (return
        (get_local 2))))

  ;; function #152
  (func $meth_jl_AbstractStringBuilder_append (type $type14)
    (local i32 i32 i32 i32)
    (block i32
      (set_local 5
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:97
      (set_local 3
        (i32.load offset=12 align=4
          (get_local 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:97
      (i32.store align=4
        (get_local 5)
        (i32.const 124))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:97
      (set_local 4
        (block i32
          (set_local 6
            (get_local 0))
          (call_indirect $type15
            (i32.load align=4
              (i32.add
                (i32.shl
                  (i32.load align=4
                    (get_local 6))
                  (i32.const 3))
                (i32.const 116)))
            (get_local 6)
            (get_local 3)
            (get_local 1)
            (get_local 2))))
      (if
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:97
        (i32.ne
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:97
          (i32.load align=4
            (get_local 5))
          (i32.const 124))
        (then
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:97
          (set_local 4
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:97
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 5)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:97
      (return
        (get_local 4))))

  ;; function #153
  (func $meth_jl_AbstractStringBuilder_insert_2 (type $type15)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    (block i32
      (set_local 13
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:101
      (set_local 4
        (i32.const 1))
      (if
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:102
        (i32.lt_s
          (get_local 2)
          (i32.const 0))
        (then
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:103
          (set_local 4
            (i32.const 0))
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:104
          (set_local 2
            (i32.sub
              (i32.const 0)
              (get_local 2)))))
      (block $block_10
        (block $block_0
          (block $block_8
            (block $block_3
              (if
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:106
                (i32.lt_s
                  (get_local 2)
                  (get_local 3))
                (then
                  (if
                    (get_local 4)
                    (then
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:111
                      (set_local 5
                        (i32.add
                          (get_local 1)
                          (i32.const 1)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:111
                      (i32.store offset=4 align=4
                        (get_local 13)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:111
                      (i32.store align=4
                        (get_local 13)
                        (i32.const 125))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:111
                      (call $meth_jl_AbstractStringBuilder_insertSpace
                        (get_local 0)
                        (get_local 1)
                        (get_local 5))
                      (if
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:111
                        (i32.ne
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:111
                          (i32.load align=4
                            (get_local 13))
                          (i32.const 125))
                        (then
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:111
                          (br $block_0)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:111
                      (set_local 5
                        (get_local 1)))
                    (else
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:108
                      (set_local 5
                        (i32.add
                          (get_local 1)
                          (i32.const 2)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:108
                      (i32.store offset=4 align=4
                        (get_local 13)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:108
                      (i32.store align=4
                        (get_local 13)
                        (i32.const 126))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:108
                      (call $meth_jl_AbstractStringBuilder_insertSpace
                        (get_local 0)
                        (get_local 1)
                        (get_local 5))
                      (if
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:108
                        (i32.ne
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:108
                          (i32.load align=4
                            (get_local 13))
                          (i32.const 126))
                        (then
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:108
                          (br $block_0)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:109
                      (set_local 6
                        (i32.load offset=8 align=4
                          (get_local 0)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:109
                      (set_local 5
                        (i32.add
                          (get_local 1)
                          (i32.const 1)))
                      (if
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:109
                        (i32.eq
                          (get_local 6)
                          (i32.const 0))
                        (then
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:109
                          (i32.store align=4
                            (get_local 13)
                            (i32.const 130))
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:109
                          (call $teavm_throwNullPointerException)
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:109
                          (br $block_0)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:109
                      (set_local 6
                        (get_local 6))
                      (if
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:109
                        (block $block_1 i32
                          (drop
                            (br_if $block_1
                              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:109
                              (i32.const 0)
                              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:109
                              (i32.lt_s
                                (get_local 1)
                                (i32.const 0))))
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:109
                          (i32.lt_s
                            (get_local 1)
                            (i32.load align=4
                              (i32.add
                                (get_local 6)
                                (i32.const 8)))))
                        (then
                          (i32.store16 align=2
                            (i32.add
                              (i32.add
                                (get_local 6)
                                (i32.const 12))
                              (i32.shl
                                (get_local 1)
                                (i32.const 1)))
                            (i32.const 45)))
                        (else
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:109
                          (i32.store align=4
                            (get_local 13)
                            (i32.const 131))
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:109
                          (call $teavm_throwArrayIndexOutOfBoundsException)
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:109
                          (br $block_0)))))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                  (set_local 6
                    (i32.load offset=8 align=4
                      (get_local 0)))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                  (i32.store offset=4 align=4
                    (get_local 13)
                    (get_local 6))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                  (i32.store align=4
                    (get_local 13)
                    (i32.const 127))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                  (set_local 7
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                    (call $meth_jl_Character_forDigit
                      (get_local 2)
                      (get_local 3)))
                  (if
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                    (i32.ne
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                      (i32.load align=4
                        (get_local 13))
                      (i32.const 127))
                    (then
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                      (br $block_0)))
                  (if
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                    (i32.eq
                      (get_local 6)
                      (i32.const 0))
                    (then
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                      (i32.store offset=4 align=4
                        (get_local 13)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                      (i32.store align=4
                        (get_local 13)
                        (i32.const 132))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                      (call $teavm_throwNullPointerException)
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                      (br $block_0)))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                  (set_local 6
                    (get_local 6))
                  (if
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                    (block $block_2 i32
                      (drop
                        (br_if $block_2
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                          (i32.const 0)
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                          (i32.lt_s
                            (get_local 5)
                            (i32.const 0))))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                      (i32.lt_s
                        (get_local 5)
                        (i32.load align=4
                          (i32.add
                            (get_local 6)
                            (i32.const 8)))))
                    (then
                      (i32.store16 align=2
                        (i32.add
                          (i32.add
                            (get_local 6)
                            (i32.const 12))
                          (i32.shl
                            (get_local 5)
                            (i32.const 1)))
                        (get_local 7))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                      (br $block_3)))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                  (i32.store offset=4 align=4
                    (get_local 13)
                    (i32.const 0))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                  (i32.store align=4
                    (get_local 13)
                    (i32.const 133))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                  (call $teavm_throwArrayIndexOutOfBoundsException)
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:113
                  (br $block_0)))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:115
              (set_local 8
                (i32.const 1))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:116
              (set_local 9
                (i32.const 1))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:117
              (set_local 10
                (i32.div_s
                  (i32.const 2147483647)
                  (get_local 3)))
              (block $block_4
                (block $block_5
                  (loop $block_6
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:118
                    (set_local 11
                      (i32.mul
                        (get_local 8)
                        (get_local 3)))
                    (if
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:118
                      (i32.gt_s
                        (get_local 11)
                        (get_local 2))
                      (then
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:122
                        (set_local 11
                          (get_local 8))
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:118
                        (br $block_4)))
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:120
                    (set_local 9
                      (i32.add
                        (get_local 9)
                        (i32.const 1)))
                    (if
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:121
                      (i32.gt_s
                        (get_local 11)
                        (get_local 10))
                      (then
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:121
                        (br $block_5)))
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:121
                    (set_local 8
                      (get_local 11))
                    (br $block_6))))
              (if
                (i32.eq
                  (get_local 4)
                  (i32.const 0))
                (then
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:126
                  (set_local 9
                    (i32.add
                      (get_local 9)
                      (i32.const 1)))))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:128
              (set_local 7
                (i32.add
                  (get_local 1)
                  (get_local 9)))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:128
              (i32.store offset=4 align=4
                (get_local 13)
                (i32.const 0))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:128
              (i32.store align=4
                (get_local 13)
                (i32.const 128))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:128
              (call $meth_jl_AbstractStringBuilder_insertSpace
                (get_local 0)
                (get_local 1)
                (get_local 7))
              (if
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:128
                (i32.ne
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:128
                  (i32.load align=4
                    (get_local 13))
                  (i32.const 128))
                (then
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:128
                  (br $block_0)))
              (if
                (get_local 4)
                (then
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:129
                  (set_local 5
                    (get_local 1)))
                (else
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:130
                  (set_local 6
                    (i32.load offset=8 align=4
                      (get_local 0)))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:130
                  (set_local 5
                    (i32.add
                      (get_local 1)
                      (i32.const 1)))
                  (if
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:130
                    (i32.eq
                      (get_local 6)
                      (i32.const 0))
                    (then
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:130
                      (i32.store align=4
                        (get_local 13)
                        (i32.const 134))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:130
                      (call $teavm_throwNullPointerException)
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:130
                      (br $block_0)))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:130
                  (set_local 6
                    (get_local 6))
                  (if
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:130
                    (block $block_7 i32
                      (drop
                        (br_if $block_7
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:130
                          (i32.const 0)
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:130
                          (i32.lt_s
                            (get_local 1)
                            (i32.const 0))))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:130
                      (i32.lt_s
                        (get_local 1)
                        (i32.load align=4
                          (i32.add
                            (get_local 6)
                            (i32.const 8)))))
                    (then
                      (i32.store16 align=2
                        (i32.add
                          (i32.add
                            (get_local 6)
                            (i32.const 12))
                          (i32.shl
                            (get_local 1)
                            (i32.const 1)))
                        (i32.const 45)))
                    (else
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:130
                      (i32.store align=4
                        (get_local 13)
                        (i32.const 135))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:130
                      (call $teavm_throwArrayIndexOutOfBoundsException)
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:130
                      (br $block_0)))))
              (loop $block_9
                (if
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:132
                  (i32.le_s
                    (get_local 11)
                    (i32.const 0))
                  (then
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:132
                    (br $block_3)))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                (set_local 6
                  (i32.load offset=8 align=4
                    (get_local 0)))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                (set_local 7
                  (i32.add
                    (get_local 5)
                    (i32.const 1)))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                (set_local 12
                  (i32.div_s
                    (get_local 2)
                    (get_local 11)))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                (i32.store offset=4 align=4
                  (get_local 13)
                  (get_local 6))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                (i32.store align=4
                  (get_local 13)
                  (i32.const 129))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                (set_local 12
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                  (call $meth_jl_Character_forDigit
                    (get_local 12)
                    (get_local 3)))
                (if
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                  (i32.ne
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                    (i32.load align=4
                      (get_local 13))
                    (i32.const 129))
                  (then
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                    (br $block_0)))
                (if
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                  (i32.eq
                    (get_local 6)
                    (i32.const 0))
                  (then
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                    (i32.store offset=4 align=4
                      (get_local 13)
                      (i32.const 0))
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                    (i32.store align=4
                      (get_local 13)
                      (i32.const 136))
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                    (call $teavm_throwNullPointerException)
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                    (br $block_0)))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                (set_local 6
                  (get_local 6))
                (if
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                  (i32.lt_s
                    (get_local 5)
                    (i32.const 0))
                  (then
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                    (br $block_8)))
                (if
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                  (i32.ge_s
                    (get_local 5)
                    (i32.load align=4
                      (i32.add
                        (get_local 6)
                        (i32.const 8))))
                  (then
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
                    (br $block_8)))
                (i32.store16 align=2
                  (i32.add
                    (i32.add
                      (get_local 6)
                      (i32.const 12))
                    (i32.shl
                      (get_local 5)
                      (i32.const 1)))
                  (get_local 12))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:134
                (set_local 2
                  (i32.rem_s
                    (get_local 2)
                    (get_local 11)))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:135
                (set_local 11
                  (i32.div_s
                    (get_local 11)
                    (get_local 3)))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:135
                (set_local 5
                  (get_local 7))
                (br $block_9)))
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:138
            (br $block_10))
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
          (i32.store offset=4 align=4
            (get_local 13)
            (i32.const 0))
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
          (i32.store align=4
            (get_local 13)
            (i32.const 137))
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
          (call $teavm_throwArrayIndexOutOfBoundsException))
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
        (set_local 0
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 13)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:133
      (return
        (get_local 0))))

  ;; function #154
  (func $meth_jl_AbstractStringBuilder_append_3 (type $type5)
    (local i32 i32 i32 i32)
    (block i32
      (set_local 4
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:484
      (set_local 2
        (i32.load offset=12 align=4
          (get_local 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:484
      (i32.store align=4
        (get_local 4)
        (i32.const 138))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:484
      (set_local 3
        (block i32
          (set_local 5
            (get_local 0))
          (call_indirect $type14
            (i32.load align=4
              (i32.add
                (i32.shl
                  (i32.load align=4
                    (get_local 5))
                  (i32.const 3))
                (i32.const 96)))
            (get_local 5)
            (get_local 2)
            (get_local 1))))
      (if
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:484
        (i32.ne
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:484
          (i32.load align=4
            (get_local 4))
          (i32.const 138))
        (then
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:484
          (set_local 3
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:484
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 4)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:484
      (return
        (get_local 3))))

  ;; function #155
  (func $meth_jl_AbstractStringBuilder_insert (type $type14)
    (local i32 i32 i32)
    (block i32
      (set_local 5
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (block $block_1
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:488
        (set_local 3
          (i32.add
            (get_local 1)
            (i32.const 1)))
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:488
        (i32.store align=4
          (get_local 5)
          (i32.const 139))
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:488
        (call $meth_jl_AbstractStringBuilder_insertSpace
          (get_local 0)
          (get_local 1)
          (get_local 3))
        (if
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:488
          (i32.eq
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:488
            (i32.load align=4
              (get_local 5))
            (i32.const 139))
          (then
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:489
            (set_local 4
              (i32.load offset=8 align=4
                (get_local 0)))
            (if
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:489
              (i32.eq
                (get_local 4)
                (i32.const 0))
              (then
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:489
                (i32.store align=4
                  (get_local 5)
                  (i32.const 140))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:489
                (call $teavm_throwNullPointerException))
              (else
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:489
                (set_local 4
                  (get_local 4))
                (if
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:489
                  (block $block_0 i32
                    (drop
                      (br_if $block_0
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:489
                        (i32.const 0)
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:489
                        (i32.lt_s
                          (get_local 1)
                          (i32.const 0))))
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:489
                    (i32.lt_s
                      (get_local 1)
                      (i32.load align=4
                        (i32.add
                          (get_local 4)
                          (i32.const 8)))))
                  (then
                    (i32.store16 align=2
                      (i32.add
                        (i32.add
                          (get_local 4)
                          (i32.const 12))
                        (i32.shl
                          (get_local 1)
                          (i32.const 1)))
                      (get_local 2))
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:490
                    (br $block_1)))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:489
                (i32.store align=4
                  (get_local 5)
                  (i32.const 141))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:489
                (call $teavm_throwArrayIndexOutOfBoundsException)))))
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:489
        (set_local 0
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:489
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 5)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:489
      (return
        (get_local 0))))

  ;; function #156
  (func $meth_jl_AbstractStringBuilder_insert_0 (type $type14)
    (local i32 i32 i32)
    (block i32
      (set_local 4
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      (block $block_1
        (block $block_0
          (if
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
            (i32.eq
              (get_local 2)
              (i32.const 0))
            (then
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
              (set_local 3
                (i32.const 7216)))
            (else
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
              (i32.store offset=4 align=4
                (get_local 4)
                (i32.const 0))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
              (i32.store align=4
                (get_local 4)
                (i32.const 142))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
              (set_local 3
                (block i32
                  (set_local 5
                    (get_local 2))
                  (call_indirect $type1
                    (i32.load align=4
                      (i32.add
                        (i32.shl
                          (i32.load align=4
                            (get_local 5))
                          (i32.const 3))
                        (i32.const 88)))
                    (get_local 5))))
              (if
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
                (i32.ne
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
                  (i32.load align=4
                    (get_local 4))
                  (i32.const 142))
                (then
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
                  (br $block_0)))))
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
          (i32.store offset=4 align=4
            (get_local 4)
            (get_local 3))
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
          (i32.store align=4
            (get_local 4)
            (i32.const 143))
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
          (set_local 3
            (block i32
              (set_local 5
                (get_local 0))
              (call_indirect $type14
                (i32.load align=4
                  (i32.add
                    (i32.shl
                      (i32.load align=4
                        (get_local 5))
                      (i32.const 3))
                    (i32.const 112)))
                (get_local 5)
                (get_local 1)
                (get_local 3))))
          (if
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
            (i32.eq
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
              (i32.load align=4
                (get_local 4))
              (i32.const 143))
            (then
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
              (br $block_1))))
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
        (set_local 3
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 4)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:508
      (return
        (get_local 3))))

  ;; function #157
  (func $meth_jl_AbstractStringBuilder_ensureCapacity (type $type6)
    (local i32 i32 i32 i32)
    (block
      (set_local 5
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      (block $block_0
        (block $block_1
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:520
          (set_local 2
            (i32.load offset=8 align=4
              (get_local 0)))
          (if
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:520
            (i32.eq
              (get_local 2)
              (i32.const 0))
            (then
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:520
              (i32.store offset=4 align=4
                (get_local 5)
                (i32.const 0))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:520
              (i32.store align=4
                (get_local 5)
                (i32.const 145))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:520
              (call $teavm_throwNullPointerException))
            (else
              (if
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:520
                (i32.ge_s
                  (i32.load align=4
                    (i32.add
                      (get_local 2)
                      (i32.const 8)))
                  (get_local 1))
                (then
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:521
                  (br $block_0)))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:523
              (set_local 2
                (i32.load offset=8 align=4
                  (get_local 0)))
              (if
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:523
                (i32.eq
                  (get_local 2)
                  (i32.const 0))
                (then
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:523
                  (i32.store offset=4 align=4
                    (get_local 5)
                    (i32.const 0))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:523
                  (i32.store align=4
                    (get_local 5)
                    (i32.const 146))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:523
                  (call $teavm_throwNullPointerException))
                (else
                  (if
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:523
                    (i32.ge_s
                      (i32.load align=4
                        (i32.add
                          (get_local 2)
                          (i32.const 8)))
                      (i32.const 1073741823))
                    (then
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:525
                      (set_local 3
                        (i32.const 2147483647)))
                    (else
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                      (set_local 2
                        (i32.load offset=8 align=4
                          (get_local 0)))
                      (if
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                        (i32.eq
                          (get_local 2)
                          (i32.const 0))
                        (then
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                          (i32.store offset=4 align=4
                            (get_local 5)
                            (i32.const 0))
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                          (i32.store align=4
                            (get_local 5)
                            (i32.const 149))
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                          (call $teavm_throwNullPointerException)
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                          (br $block_1)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                      (set_local 4
                        (i32.mul
                          (i32.load align=4
                            (i32.add
                              (get_local 2)
                              (i32.const 8)))
                          (i32.const 2)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                      (i32.store offset=4 align=4
                        (get_local 5)
                        (i32.const 0))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                      (i32.store align=4
                        (get_local 5)
                        (i32.const 147))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                      (set_local 4
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                        (call $meth_jl_Math_max
                          (get_local 4)
                          (i32.const 5)))
                      (if
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                        (i32.ne
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                          (i32.load align=4
                            (get_local 5))
                          (i32.const 147))
                        (then
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                          (br $block_1)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                      (i32.store align=4
                        (get_local 5)
                        (i32.const 148))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                      (set_local 3
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                        (call $meth_jl_Math_max
                          (get_local 1)
                          (get_local 4)))
                      (if
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                        (i32.ne
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                          (i32.load align=4
                            (get_local 5))
                          (i32.const 148))
                        (then
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:524
                          (br $block_1)))))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:526
                  (set_local 2
                    (i32.load offset=8 align=4
                      (get_local 0)))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:526
                  (i32.store offset=4 align=4
                    (get_local 5)
                    (get_local 2))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:526
                  (i32.store align=4
                    (get_local 5)
                    (i32.const 144))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:526
                  (set_local 2
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:526
                    (call $meth_ju_Arrays_copyOf
                      (get_local 2)
                      (get_local 3)))
                  (if
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:526
                    (i32.eq
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:526
                      (i32.load align=4
                        (get_local 5))
                      (i32.const 144))
                    (then
                      (i32.store8 align=1
                        (i32.add
                          (i32.load align=4
                            (i32.const 3992))
                          (i32.div_s
                            (i32.sub
                              (get_local 0)
                              (i32.load align=4
                                (i32.const 3996)))
                            (i32.const 1024)))
                        (i32.const 0))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:526
                      (i32.store offset=8 align=4
                        (get_local 0)
                        (get_local 2))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:527
                      (br $block_0)))))))))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:527
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 5)
          (i32.const 4)))))

  ;; function #158
  (func $meth_jl_AbstractStringBuilder_toString (type $type1)
    (local i32 i32 i32 i32)
    (block i32
      (set_local 4
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 2)))
      (block $block_0
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
        (i32.store offset=4 align=4
          (get_local 4)
          (i32.const 0))
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
        (i32.store offset=8 align=4
          (get_local 4)
          (i32.const 0))
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
        (i32.store align=4
          (get_local 4)
          (i32.const 150))
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
        (set_local 1
          (call $meth_otr_Allocator_allocate
            (i32.const 3840)))
        (if
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
          (i32.eq
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
            (i32.load align=4
              (get_local 4))
            (i32.const 150))
          (then
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
            (set_local 2
              (i32.load offset=8 align=4
                (get_local 0)))
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
            (set_local 3
              (i32.load offset=12 align=4
                (get_local 0)))
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
            (i32.store offset=4 align=4
              (get_local 4)
              (get_local 1))
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
            (i32.store offset=8 align=4
              (get_local 4)
              (get_local 2))
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
            (i32.store align=4
              (get_local 4)
              (i32.const 151))
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
            (call $meth_jl_String__init__0
              (get_local 1)
              (get_local 2)
              (i32.const 0)
              (get_local 3))
            (if
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
              (i32.eq
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
                (i32.load align=4
                  (get_local 4))
                (i32.const 151))
              (then
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
                (br $block_0)))))
        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
        (set_local 1
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 4)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:541
      (return
        (get_local 1))))

  ;; function #159
  (func $meth_jl_AbstractStringBuilder_setLength (type $type6)
    (block
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:620
      (i32.store offset=12 align=4
        (get_local 0)
        (get_local 1))))

  ;; function #160
  (func $meth_jl_AbstractStringBuilder_insertSpace (type $type7)
    (local i32 i32 i32 i32 i32 i32 i32 i32)
    (block
      (set_local 9
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (block $block_5
        (block $block_1
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:663
          (set_local 3
            (i32.sub
              (i32.load offset=12 align=4
                (get_local 0))
              (get_local 1)))
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:664
          (set_local 4
            (i32.sub
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:664
              (i32.add
                (i32.load offset=12 align=4
                  (get_local 0))
                (get_local 2))
              (get_local 1)))
          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:664
          (i32.store align=4
            (get_local 9)
            (i32.const 152))
          (block
            (set_local 10
              (get_local 0))
            (call_indirect $type6
              (i32.load align=4
                (i32.add
                  (i32.shl
                    (i32.load align=4
                      (get_local 10))
                    (i32.const 3))
                  (i32.const 104)))
              (get_local 10)
              (get_local 4)))
          (if
            ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:664
            (i32.eq
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:664
              (i32.load align=4
                (get_local 9))
              (i32.const 152))
            (then
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:665
              (set_local 5
                (i32.sub
                  (get_local 3)
                  (i32.const 1)))
              (block $block_2
                (block $block_3
                  (block $block_0
                    (loop $block_4
                      (br_if $block_0
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:665
                        (i32.lt_s
                          (get_local 5)
                          (i32.const 0)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                      (set_local 6
                        (i32.load offset=8 align=4
                          (get_local 0)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                      (set_local 4
                        (i32.add
                          (get_local 2)
                          (get_local 5)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                      (set_local 7
                        (i32.load offset=8 align=4
                          (get_local 0)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                      (set_local 8
                        (i32.add
                          (get_local 1)
                          (get_local 5)))
                      (if
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                        (i32.eq
                          (get_local 7)
                          (i32.const 0))
                        (then
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                          (i32.store align=4
                            (get_local 9)
                            (i32.const 153))
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                          (call $teavm_throwNullPointerException)
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                          (br $block_1)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                      (set_local 7
                        (get_local 7))
                      (if
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                        (i32.lt_s
                          (get_local 8)
                          (i32.const 0))
                        (then
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                          (br $block_2)))
                      (if
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                        (i32.ge_s
                          (get_local 8)
                          (i32.load align=4
                            (i32.add
                              (get_local 7)
                              (i32.const 8))))
                        (then
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                          (br $block_2)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                      (set_local 8
                        (i32.load16_u align=2
                          (i32.add
                            (i32.add
                              (get_local 7)
                              (i32.const 12))
                            (i32.shl
                              (get_local 8)
                              (i32.const 1)))))
                      (if
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                        (i32.eq
                          (get_local 6)
                          (i32.const 0))
                        (then
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                          (i32.store align=4
                            (get_local 9)
                            (i32.const 155))
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                          (call $teavm_throwNullPointerException)
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                          (br $block_1)))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                      (set_local 6
                        (get_local 6))
                      (if
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                        (i32.lt_s
                          (get_local 4)
                          (i32.const 0))
                        (then
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                          (br $block_3)))
                      (if
                        ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                        (i32.ge_s
                          (get_local 4)
                          (i32.load align=4
                            (i32.add
                              (get_local 6)
                              (i32.const 8))))
                        (then
                          ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                          (br $block_3)))
                      (i32.store16 align=2
                        (i32.add
                          (i32.add
                            (get_local 6)
                            (i32.const 12))
                          (i32.shl
                            (get_local 4)
                            (i32.const 1)))
                        (get_local 8))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:665
                      (set_local 5
                        (i32.add
                          (get_local 5)
                          (i32.const -1)))
                      (br $block_4)))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:668
                  (i32.store offset=12 align=4
                    (get_local 0)
                    ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:668
                    (i32.add
                      (i32.load offset=12 align=4
                        (get_local 0))
                      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:668
                      (i32.sub
                        (get_local 2)
                        (get_local 1))))
                  ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:669
                  (br $block_5))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                (i32.store align=4
                  (get_local 9)
                  (i32.const 156))
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                (call $teavm_throwArrayIndexOutOfBoundsException)
                ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
                (br $block_1))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
              (i32.store align=4
                (get_local 9)
                (i32.const 154))
              ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
              (call $teavm_throwArrayIndexOutOfBoundsException)))))
      ;; org/teavm/classlib/java/lang/TAbstractStringBuilder.java:666
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 9)
          (i32.const 4)))))

  ;; function #161
  (func $meth_otr_ExceptionHandling_printStack (type $type3)
    (local i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/ExceptionHandling.java:45
      (set_local 0
        (call $meth_otbw_WasmRuntime_getStackTop))
      (block $block_0
        (loop $block_5
          (br_if $block_0
            ;; org/teavm/runtime/ExceptionHandling.java:46
            (i32.eq
              (get_local 0)
              (i32.const 0)))
          (block $block_1
            ;; org/teavm/runtime/ExceptionHandling.java:47
            (set_local 1
              (call $meth_otbw_WasmRuntime_getCallSiteId
                (get_local 0)))
            (if
              (i32.const 0)
              (then
                (call $meth_otbw_WasmRuntime_printString
                  (i32.const 7252))
                (call $meth_otbw_WasmRuntime_printInt
                  (get_local 1))
                (call $meth_otbw_WasmRuntime_printString
                  (i32.const 7364)))
              (else
                ;; org/teavm/runtime/ExceptionHandling.java:54
                (set_local 2
                  (i32.load offset=4 align=4
                    (i32.add
                      ;; org/teavm/runtime/ExceptionHandling.java:53
                      (i32.const 9292)
                      (i32.mul
                        (get_local 1)
                        (i32.const 8)))))
                (loop $block_4
                  (if
                    ;; org/teavm/runtime/ExceptionHandling.java:55
                    (i32.eq
                      (get_local 2)
                      (i32.const 0))
                    (then
                      ;; org/teavm/runtime/ExceptionHandling.java:55
                      (br $block_1)))
                  ;; org/teavm/runtime/ExceptionHandling.java:56
                  (set_local 3
                    (i32.load align=4
                      (get_local 2)))
                  (if
                    ;; org/teavm/runtime/ExceptionHandling.java:58
                    (i32.ne
                      (get_local 3)
                      (i32.const 0))
                    (then
                      (call $meth_otbw_WasmRuntime_printString
                        (i32.const 7396))
                      (if
                        ;; org/teavm/runtime/ExceptionHandling.java:60
                        (block $block_2 i32
                          (drop
                            (br_if $block_2
                              ;; org/teavm/runtime/ExceptionHandling.java:60
                              (i32.const 0)
                              ;; org/teavm/runtime/ExceptionHandling.java:60
                              (i32.eq
                                (i32.load offset=4 align=4
                                  (get_local 3))
                                (i32.const 0))))
                          ;; org/teavm/runtime/ExceptionHandling.java:60
                          (i32.ne
                            (i32.load offset=8 align=4
                              (get_local 3))
                            (i32.const 0)))
                        (then
                          (call $meth_otbw_WasmRuntime_printString
                            (i32.load align=4
                              (i32.load offset=4 align=4
                                (get_local 3))))
                          (call $meth_otbw_WasmRuntime_printString
                            (i32.const 7432))
                          (call $meth_otbw_WasmRuntime_printString
                            (i32.load align=4
                              (i32.load offset=8 align=4
                                (get_local 3)))))
                        (else
                          (call $meth_otbw_WasmRuntime_printString
                            (i32.const 7464))))
                      (call $meth_otbw_WasmRuntime_printString
                        (i32.const 7524))
                      (if
                        ;; org/teavm/runtime/ExceptionHandling.java:68
                        (block $block_3 i32
                          (drop
                            (br_if $block_3
                              ;; org/teavm/runtime/ExceptionHandling.java:68
                              (i32.const 0)
                              ;; org/teavm/runtime/ExceptionHandling.java:68
                              (i32.eq
                                (i32.load align=4
                                  (get_local 3))
                                (i32.const 0))))
                          ;; org/teavm/runtime/ExceptionHandling.java:68
                          (i32.ge_s
                            (i32.load offset=4 align=4
                              (get_local 2))
                            (i32.const 0)))
                        (then
                          (call $meth_otbw_WasmRuntime_printString
                            (i32.load align=4
                              (i32.load align=4
                                (get_local 3))))
                          (call $meth_otbw_WasmRuntime_printString
                            (i32.const 7556))
                          (call $meth_otbw_WasmRuntime_printInt
                            (i32.load offset=4 align=4
                              (get_local 2)))))
                      (call $meth_otbw_WasmRuntime_printString
                        (i32.const 7364))))
                  ;; org/teavm/runtime/ExceptionHandling.java:76
                  (set_local 2
                    (i32.load offset=8 align=4
                      (get_local 2)))
                  (br $block_4)))))
          ;; org/teavm/runtime/ExceptionHandling.java:79
          (set_local 0
            (call $meth_otbw_WasmRuntime_getNextStackFrame
              (get_local 0)))
          (br $block_5)))))

  ;; function #162
  (func $teavm_catchException (export "teavm_catchException") (type $type2)
    (local i32)
    (block i32
      ;; org/teavm/runtime/ExceptionHandling.java:88
      (set_local 0
        (i32.load align=4
          (i32.const 3396)))
      ;; org/teavm/runtime/ExceptionHandling.java:89
      (i32.store align=4
        ;; org/teavm/runtime/ExceptionHandling.java:89
        (i32.const 3396)
        (i32.const 0))
      ;; org/teavm/runtime/ExceptionHandling.java:90
      (return
        (get_local 0))))

  ;; function #163
  (func $meth_otr_ExceptionHandling_throwException (type $type0)
    (local i32 i32 i32 i32 i32 i32)
    (block
      ;; org/teavm/runtime/ExceptionHandling.java:95
      (i32.store align=4
        ;; org/teavm/runtime/ExceptionHandling.java:95
        (i32.const 3396)
        (get_local 0))
      ;; org/teavm/runtime/ExceptionHandling.java:98
      (set_local 1
        ;; org/teavm/runtime/ExceptionHandling.java:98
        (call $meth_otr_RuntimeClass_getClass
          (get_local 0)))
      ;; org/teavm/runtime/ExceptionHandling.java:100
      (set_local 2
        (call $meth_otbw_WasmRuntime_getStackTop))
      ;; org/teavm/runtime/ExceptionHandling.java:101
      (set_local 3
        (i32.const 0))
      (block $block_5
        (block $block_2
          (block $block_0
            (loop $block_4
              (br_if $block_0
                ;; org/teavm/runtime/ExceptionHandling.java:102
                (i32.eq
                  (get_local 2)
                  (i32.const 0)))
              ;; org/teavm/runtime/ExceptionHandling.java:103
              (set_local 4
                (call $meth_otbw_WasmRuntime_getCallSiteId
                  (get_local 2)))
              (if
                ;; org/teavm/runtime/ExceptionHandling.java:104
                (i32.ge_s
                  (get_local 4)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/ExceptionHandling.java:106
                  (set_local 5
                    (i32.load align=4
                      (i32.add
                        ;; org/teavm/runtime/ExceptionHandling.java:105
                        (i32.const 9292)
                        (i32.mul
                          (get_local 4)
                          (i32.const 8)))))
                  (block $block_1
                    (loop $block_3
                      (br_if $block_1
                        ;; org/teavm/runtime/ExceptionHandling.java:108
                        (i32.eq
                          (get_local 5)
                          (i32.const 0)))
                      (if
                        ;; org/teavm/runtime/ExceptionHandling.java:109
                        (i32.eq
                          (i32.load offset=4 align=4
                            (get_local 5))
                          (i32.const 0))
                        (then
                          ;; org/teavm/runtime/ExceptionHandling.java:109
                          (br $block_2)))
                      (if
                        (call_indirect $type1
                          (i32.load offset=48 align=4
                            (i32.load offset=4 align=4
                              (get_local 5)))
                          (get_local 1))
                        (then
                          ;; org/teavm/runtime/ExceptionHandling.java:109
                          (br $block_2)))
                      ;; org/teavm/runtime/ExceptionHandling.java:116
                      (set_local 5
                        (i32.load offset=8 align=4
                          (get_local 5)))
                      (br $block_3)))
                  (if
                    (i32.eq
                      (i32.const 0)
                      (i32.const 0))
                    (then
                      (call $meth_otbw_WasmRuntime_setExceptionHandlerId
                        (get_local 2)
                        ;; org/teavm/runtime/ExceptionHandling.java:120
                        (i32.sub
                          (get_local 4)
                          (i32.const 1)))))))
              ;; org/teavm/runtime/ExceptionHandling.java:123
              (set_local 2
                (call $meth_otbw_WasmRuntime_getNextStackFrame
                  (get_local 2)))
              (br $block_4)))
          ;; org/teavm/runtime/ExceptionHandling.java:102
          (br $block_5))
        ;; org/teavm/runtime/ExceptionHandling.java:110
        (set_local 3
          (i32.load align=4
            (get_local 5)))
        (if
          (i32.eq
            (i32.const 0)
            (i32.const 0))
          (then
            (call $meth_otbw_WasmRuntime_setExceptionHandlerId
              (get_local 2)
              (get_local 3)))))
      (if
        ;; org/teavm/runtime/ExceptionHandling.java:126
        (i32.eq
          (get_local 2)
          (i32.const 0))
        (then
          ;; org/teavm/runtime/ExceptionHandling.java:127
          (set_local 6
            (call $meth_otbw_WasmRuntime_getStackTop))
          (block $block_6
            (loop $block_7
              (br_if $block_6
                ;; org/teavm/runtime/ExceptionHandling.java:128
                (i32.eq
                  (get_local 6)
                  (i32.const 0)))
              ;; org/teavm/runtime/ExceptionHandling.java:129
              (set_local 4
                (call $meth_otbw_WasmRuntime_getCallSiteId
                  (get_local 6)))
              (if
                ;; org/teavm/runtime/ExceptionHandling.java:130
                (i32.ge_s
                  (get_local 4)
                  (i32.const 0))
                (then
                  (call $meth_otbw_WasmRuntime_setExceptionHandlerId
                    (get_local 6)
                    ;; org/teavm/runtime/ExceptionHandling.java:131
                    (i32.add
                      (get_local 4)
                      (i32.const 1)))))
              ;; org/teavm/runtime/ExceptionHandling.java:133
              (set_local 6
                (call $meth_otbw_WasmRuntime_getNextStackFrame
                  (get_local 6)))
              (br $block_7)))
          ;; org/teavm/runtime/ExceptionHandling.java:135
          (call $meth_otr_ExceptionHandling_printStack)
          (unreachable))
        (else
          (if
            (i32.const 0)
            (then
              (unreachable)))))))

  ;; function #164
  (func $teavm_throwNullPointerException (export "teavm_throwNullPointerException") (type $type3)
    (local i32)
    (block
      ;; org/teavm/runtime/ExceptionHandling.java:150
      (call $meth_otr_ExceptionHandling_throwException
        (block i32
          (set_local 0
            ;; org/teavm/runtime/ExceptionHandling.java:150
            (call $meth_otr_Allocator_allocate
              (i32.const 1720)))
          (call $meth_jl_NullPointerException__init_
            (get_local 0))
          (get_local 0)))))

  ;; function #165
  (func $teavm_throwArrayIndexOutOfBoundsException (export "teavm_throwArrayIndexOutOfBoundsException") (type $type3)
    (local i32)
    (block
      ;; org/teavm/runtime/ExceptionHandling.java:156
      (call $meth_otr_ExceptionHandling_throwException
        (block i32
          (set_local 0
            ;; org/teavm/runtime/ExceptionHandling.java:156
            (call $meth_otr_Allocator_allocate
              (i32.const 4384)))
          (call $meth_jl_ArrayIndexOutOfBoundsException__init_
            (get_local 0))
          (get_local 0)))))

  ;; function #166
  (func $meth_otr_ExceptionHandling_callStackSize (type $type2)
    (local i32 i32 i32 i32)
    (block i32
      ;; org/teavm/runtime/ExceptionHandling.java:161
      (set_local 0
        (call $meth_otbw_WasmRuntime_getStackTop))
      ;; org/teavm/runtime/ExceptionHandling.java:162
      (set_local 1
        (i32.const 0))
      (block $block_0
        (loop $block_4
          (br_if $block_0
            ;; org/teavm/runtime/ExceptionHandling.java:163
            (i32.eq
              (get_local 0)
              (i32.const 0)))
          ;; org/teavm/runtime/ExceptionHandling.java:164
          (set_local 2
            (call $meth_otbw_WasmRuntime_getCallSiteId
              (get_local 0)))
          (if
            ;; org/teavm/runtime/ExceptionHandling.java:165
            (i32.ge_s
              (get_local 2)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/ExceptionHandling.java:167
              (set_local 3
                (i32.load offset=4 align=4
                  (i32.add
                    ;; org/teavm/runtime/ExceptionHandling.java:166
                    (i32.const 9292)
                    (i32.mul
                      (get_local 2)
                      (i32.const 8)))))
              (if
                ;; org/teavm/runtime/ExceptionHandling.java:168
                (block $block_1 i32
                  (drop
                    (br_if $block_1
                      ;; org/teavm/runtime/ExceptionHandling.java:168
                      (i32.const 0)
                      (i32.ne
                        (i32.const 0)
                        (i32.const 0))))
                  ;; org/teavm/runtime/ExceptionHandling.java:168
                  (i32.ne
                    (get_local 3)
                    (i32.const 0)))
                (then
                  (block $block_2
                    (loop $block_3
                      (br_if $block_2
                        ;; org/teavm/runtime/ExceptionHandling.java:171
                        (i32.eq
                          (get_local 3)
                          (i32.const 0)))
                      ;; org/teavm/runtime/ExceptionHandling.java:172
                      (set_local 1
                        (i32.add
                          (get_local 1)
                          (i32.const 1)))
                      ;; org/teavm/runtime/ExceptionHandling.java:173
                      (set_local 3
                        (i32.load offset=8 align=4
                          (get_local 3)))
                      (br $block_3))))
                (else
                  ;; org/teavm/runtime/ExceptionHandling.java:169
                  (set_local 1
                    (i32.add
                      (get_local 1)
                      (i32.const 1)))))))
          ;; org/teavm/runtime/ExceptionHandling.java:178
          (set_local 0
            (call $meth_otbw_WasmRuntime_getNextStackFrame
              (get_local 0)))
          (br $block_4)))
      ;; org/teavm/runtime/ExceptionHandling.java:180
      (return
        (get_local 1))))

  ;; function #167
  (func $meth_otr_ExceptionHandling_fillStackTrace (type $type2)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    (block i32
      ;; org/teavm/runtime/ExceptionHandling.java:185
      (set_local 0
        (call $meth_otbw_WasmRuntime_getStackTop))
      ;; org/teavm/runtime/ExceptionHandling.java:186
      (set_local 1
        ;; org/teavm/runtime/ExceptionHandling.java:186
        (call $meth_otr_ExceptionHandling_callStackSize))
      ;; org/teavm/runtime/ExceptionHandling.java:188
      (set_local 12
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      ;; org/teavm/runtime/ExceptionHandling.java:189
      (i32.store offset=4 align=4
        (get_local 12)
        (i32.const 0))
      ;; org/teavm/runtime/ExceptionHandling.java:190
      (set_local 2
        (call $meth_otr_Allocator_allocateArray
          (i32.const 7680)
          (get_local 1)))
      ;; org/teavm/runtime/ExceptionHandling.java:191
      (i32.store offset=4 align=4
        (get_local 12)
        (get_local 2))
      ;; org/teavm/runtime/ExceptionHandling.java:193
      (set_local 3
        (i32.const 0))
      (block $block_7
        (block $block_1
          (block $block_2
            (block $block_4
              (block $block_0
                (loop $block_6
                  (br_if $block_0
                    ;; org/teavm/runtime/ExceptionHandling.java:194
                    (i32.eq
                      (get_local 0)
                      (i32.const 0)))
                  ;; org/teavm/runtime/ExceptionHandling.java:195
                  (set_local 4
                    (call $meth_otbw_WasmRuntime_getCallSiteId
                      (get_local 0)))
                  (if
                    ;; org/teavm/runtime/ExceptionHandling.java:196
                    (i32.ge_s
                      (get_local 4)
                      (i32.const 0))
                    (then
                      ;; org/teavm/runtime/ExceptionHandling.java:198
                      (set_local 5
                        (i32.load offset=4 align=4
                          (i32.add
                            ;; org/teavm/runtime/ExceptionHandling.java:197
                            (i32.const 9292)
                            (i32.mul
                              (get_local 4)
                              (i32.const 8)))))
                      (if
                        (i32.const 0)
                        (then
                          ;; org/teavm/runtime/ExceptionHandling.java:200
                          (set_local 6
                            (get_local 2))
                          ;; org/teavm/runtime/ExceptionHandling.java:200
                          (set_local 7
                            (i32.add
                              (get_local 3)
                              (i32.const 1)))
                          ;; org/teavm/runtime/ExceptionHandling.java:200
                          (set_local 8
                            (block i32
                              (set_local 13
                                ;; org/teavm/runtime/ExceptionHandling.java:200
                                (call $meth_otr_Allocator_allocate
                                  (i32.const 3728)))
                              (call $meth_jl_StackTraceElement__init_
                                (get_local 13)
                                (i32.const 7780)
                                (i32.const 7828)
                                (i32.const 7876)
                                (get_local 4))
                              (get_local 13)))
                          (if
                            ;; org/teavm/runtime/ExceptionHandling.java:200
                            (i32.lt_s
                              (get_local 3)
                              (i32.const 0))
                            (then
                              ;; org/teavm/runtime/ExceptionHandling.java:200
                              (br $block_1)))
                          (if
                            ;; org/teavm/runtime/ExceptionHandling.java:200
                            (i32.ge_s
                              (get_local 3)
                              (i32.load align=4
                                (i32.add
                                  (get_local 6)
                                  (i32.const 8))))
                            (then
                              ;; org/teavm/runtime/ExceptionHandling.java:200
                              (br $block_1)))
                          (i32.store8 align=1
                            (i32.add
                              (i32.load align=4
                                (i32.const 3992))
                              (i32.div_s
                                (i32.sub
                                  (get_local 6)
                                  (i32.load align=4
                                    (i32.const 3996)))
                                (i32.const 1024)))
                            (i32.const 0))
                          (i32.store align=4
                            (i32.add
                              (i32.add
                                (get_local 6)
                                (i32.const 12))
                              (i32.shl
                                (get_local 3)
                                (i32.const 2)))
                            (get_local 8))
                          ;; org/teavm/runtime/ExceptionHandling.java:200
                          (set_local 3
                            (get_local 7)))
                        (else
                          (if
                            ;; org/teavm/runtime/ExceptionHandling.java:201
                            (i32.eq
                              (get_local 5)
                              (i32.const 0))
                            (then
                              ;; org/teavm/runtime/ExceptionHandling.java:202
                              (set_local 6
                                (get_local 2))
                              ;; org/teavm/runtime/ExceptionHandling.java:202
                              (set_local 7
                                (i32.add
                                  (get_local 3)
                                  (i32.const 1)))
                              ;; org/teavm/runtime/ExceptionHandling.java:202
                              (set_local 9
                                (block i32
                                  (set_local 13
                                    ;; org/teavm/runtime/ExceptionHandling.java:202
                                    (call $meth_otr_Allocator_allocate
                                      (i32.const 3728)))
                                  (call $meth_jl_StackTraceElement__init_
                                    (get_local 13)
                                    (i32.const 7936)
                                    (i32.const 7936)
                                    (i32.const 0)
                                    (i32.const -1))
                                  (get_local 13)))
                              (if
                                ;; org/teavm/runtime/ExceptionHandling.java:202
                                (i32.lt_s
                                  (get_local 3)
                                  (i32.const 0))
                                (then
                                  ;; org/teavm/runtime/ExceptionHandling.java:202
                                  (br $block_2)))
                              (if
                                ;; org/teavm/runtime/ExceptionHandling.java:202
                                (i32.ge_s
                                  (get_local 3)
                                  (i32.load align=4
                                    (i32.add
                                      (get_local 6)
                                      (i32.const 8))))
                                (then
                                  ;; org/teavm/runtime/ExceptionHandling.java:202
                                  (br $block_2)))
                              (i32.store8 align=1
                                (i32.add
                                  (i32.load align=4
                                    (i32.const 3992))
                                  (i32.div_s
                                    (i32.sub
                                      (get_local 6)
                                      (i32.load align=4
                                        (i32.const 3996)))
                                    (i32.const 1024)))
                                (i32.const 0))
                              (i32.store align=4
                                (i32.add
                                  (i32.add
                                    (get_local 6)
                                    (i32.const 12))
                                  (i32.shl
                                    (get_local 3)
                                    (i32.const 2)))
                                (get_local 9))
                              ;; org/teavm/runtime/ExceptionHandling.java:202
                              (set_local 3
                                (get_local 7)))
                            (else
                              (block $block_3
                                (loop $block_5
                                  (br_if $block_3
                                    ;; org/teavm/runtime/ExceptionHandling.java:204
                                    (i32.eq
                                      (get_local 5)
                                      (i32.const 0)))
                                  ;; org/teavm/runtime/ExceptionHandling.java:205
                                  (set_local 10
                                    (i32.load align=4
                                      (get_local 5)))
                                  ;; org/teavm/runtime/ExceptionHandling.java:207
                                  (set_local 11
                                    (if i32
                                      ;; org/teavm/runtime/ExceptionHandling.java:207
                                      (i32.eq
                                        (get_local 10)
                                        (i32.const 0))
                                      (then
                                        (block i32
                                          (set_local 13
                                            ;; org/teavm/runtime/ExceptionHandling.java:214
                                            (call $meth_otr_Allocator_allocate
                                              (i32.const 3728)))
                                          (call $meth_jl_StackTraceElement__init_
                                            (get_local 13)
                                            (i32.const 7936)
                                            (i32.const 7936)
                                            (i32.const 0)
                                            (i32.load offset=4 align=4
                                              (get_local 5)))
                                          (get_local 13)))
                                      (else
                                        (block i32
                                          (set_local 13
                                            ;; org/teavm/runtime/ExceptionHandling.java:211
                                            (call $meth_otr_Allocator_allocate
                                              (i32.const 3728)))
                                          (call $meth_jl_StackTraceElement__init_
                                            (get_local 13)
                                            (if i32
                                              ;; org/teavm/runtime/ExceptionHandling.java:209
                                              (i32.eq
                                                (i32.load offset=4 align=4
                                                  (get_local 10))
                                                (i32.const 0))
                                              (then
                                                (i32.const 7936))
                                              (else
                                                (i32.load align=4
                                                  (i32.load offset=4 align=4
                                                    (get_local 10)))))
                                            (if i32
                                              ;; org/teavm/runtime/ExceptionHandling.java:210
                                              (i32.eq
                                                (i32.load offset=8 align=4
                                                  (get_local 10))
                                                (i32.const 0))
                                              (then
                                                (i32.const 7936))
                                              (else
                                                (i32.load align=4
                                                  (i32.load offset=8 align=4
                                                    (get_local 10)))))
                                            (if i32
                                              ;; org/teavm/runtime/ExceptionHandling.java:211
                                              (i32.eq
                                                (i32.load align=4
                                                  (get_local 10))
                                                (i32.const 0))
                                              (then
                                                (i32.const 0))
                                              (else
                                                (i32.load align=4
                                                  (i32.load align=4
                                                    (get_local 10)))))
                                            (i32.load offset=4 align=4
                                              (get_local 5)))
                                          (get_local 13)))))
                                  ;; org/teavm/runtime/ExceptionHandling.java:216
                                  (set_local 6
                                    (get_local 2))
                                  ;; org/teavm/runtime/ExceptionHandling.java:216
                                  (set_local 7
                                    (i32.add
                                      (get_local 3)
                                      (i32.const 1)))
                                  (if
                                    ;; org/teavm/runtime/ExceptionHandling.java:216
                                    (i32.lt_s
                                      (get_local 3)
                                      (i32.const 0))
                                    (then
                                      ;; org/teavm/runtime/ExceptionHandling.java:216
                                      (br $block_4)))
                                  (if
                                    ;; org/teavm/runtime/ExceptionHandling.java:216
                                    (i32.ge_s
                                      (get_local 3)
                                      (i32.load align=4
                                        (i32.add
                                          (get_local 6)
                                          (i32.const 8))))
                                    (then
                                      ;; org/teavm/runtime/ExceptionHandling.java:216
                                      (br $block_4)))
                                  (i32.store8 align=1
                                    (i32.add
                                      (i32.load align=4
                                        (i32.const 3992))
                                      (i32.div_s
                                        (i32.sub
                                          (get_local 6)
                                          (i32.load align=4
                                            (i32.const 3996)))
                                        (i32.const 1024)))
                                    (i32.const 0))
                                  (i32.store align=4
                                    (i32.add
                                      (i32.add
                                        (get_local 6)
                                        (i32.const 12))
                                      (i32.shl
                                        (get_local 3)
                                        (i32.const 2)))
                                    (get_local 11))
                                  ;; org/teavm/runtime/ExceptionHandling.java:217
                                  (set_local 5
                                    (i32.load offset=8 align=4
                                      (get_local 5)))
                                  ;; org/teavm/runtime/ExceptionHandling.java:217
                                  (set_local 3
                                    (get_local 7))
                                  (br $block_5)))))))))
                  ;; org/teavm/runtime/ExceptionHandling.java:221
                  (set_local 0
                    (call $meth_otbw_WasmRuntime_getNextStackFrame
                      (get_local 0)))
                  (br $block_6)))
              ;; org/teavm/runtime/ExceptionHandling.java:223
              (i32.store align=4
                (i32.const 4016)
                (i32.sub
                  (get_local 12)
                  (i32.const 4)))
              ;; org/teavm/runtime/ExceptionHandling.java:225
              (return
                (get_local 2)))
            ;; org/teavm/runtime/ExceptionHandling.java:216
            (call $teavm_throwArrayIndexOutOfBoundsException)
            ;; org/teavm/runtime/ExceptionHandling.java:216
            (br $block_7))
          ;; org/teavm/runtime/ExceptionHandling.java:202
          (call $teavm_throwArrayIndexOutOfBoundsException)
          ;; org/teavm/runtime/ExceptionHandling.java:202
          (br $block_7))
        ;; org/teavm/runtime/ExceptionHandling.java:200
        (call $teavm_throwArrayIndexOutOfBoundsException))
      ;; org/teavm/runtime/ExceptionHandling.java:200
      (return
        (i32.const 0))))

  ;; function #168
  (func $meth_otr_MarkQueue_init (type $type3)
    (block
      ;; org/teavm/runtime/MarkQueue.java:33
      (i32.store align=4
        ;; org/teavm/runtime/MarkQueue.java:33
        (i32.const 3500)
        (i32.const 0))
      ;; org/teavm/runtime/MarkQueue.java:34
      (i32.store align=4
        ;; org/teavm/runtime/MarkQueue.java:34
        (i32.const 3504)
        (i32.const 0))
      ;; org/teavm/runtime/MarkQueue.java:35
      (i32.store align=4
        ;; org/teavm/runtime/MarkQueue.java:35
        (i32.const 3508)
        ;; org/teavm/runtime/MarkQueue.java:35
        (i32.div_s
          (i32.load align=4
            (i32.const 3976))
          (i32.const 4)))))

  ;; function #169
  (func $meth_otr_MarkQueue_enqueue (type $type0)
    (local i32)
    (block
      (i32.store align=4
        (i32.add
          (i32.load align=4
            (i32.const 3972))
          ;; org/teavm/runtime/MarkQueue.java:39
          (i32.mul
            (i32.const 4)
            (i32.load align=4
              ;; org/teavm/runtime/MarkQueue.java:39
              (i32.const 3504))))
        ;; org/teavm/runtime/MarkQueue.java:39
        (call $meth_otr_MarkQueue_pack
          (get_local 0)))
      ;; org/teavm/runtime/MarkQueue.java:40
      (set_local 1
        (i32.add
          (i32.load align=4
            ;; org/teavm/runtime/MarkQueue.java:40
            (i32.const 3504))
          (i32.const 1)))
      ;; org/teavm/runtime/MarkQueue.java:40
      (i32.store align=4
        ;; org/teavm/runtime/MarkQueue.java:40
        (i32.const 3504)
        (get_local 1))
      (if
        ;; org/teavm/runtime/MarkQueue.java:40
        (i32.ge_s
          (get_local 1)
          (i32.load align=4
            ;; org/teavm/runtime/MarkQueue.java:40
            (i32.const 3508)))
        (then
          ;; org/teavm/runtime/MarkQueue.java:41
          (i32.store align=4
            ;; org/teavm/runtime/MarkQueue.java:41
            (i32.const 3504)
            (i32.const 0))))
      (if
        ;; org/teavm/runtime/MarkQueue.java:43
        (i32.eq
          (i32.load align=4
            ;; org/teavm/runtime/MarkQueue.java:43
            (i32.const 3504))
          (i32.load align=4
            ;; org/teavm/runtime/MarkQueue.java:43
            (i32.const 3500)))
        (then
          ;; org/teavm/runtime/MarkQueue.java:44
          (call $meth_otr_ExceptionHandling_printStack)
          (block
            (call $meth_otbw_WasmRuntime_printOutOfMemory)
            (unreachable))))))

  ;; function #170
  (func $meth_otr_MarkQueue_dequeue (type $type2)
    (local i32 i32)
    (block i32
      ;; org/teavm/runtime/MarkQueue.java:50
      (set_local 0
        ;; org/teavm/runtime/MarkQueue.java:50
        (call $meth_otr_MarkQueue_unpack
          (i32.load align=4
            (i32.add
              (i32.load align=4
                (i32.const 3972))
              ;; org/teavm/runtime/MarkQueue.java:50
              (i32.mul
                (i32.const 4)
                (i32.load align=4
                  ;; org/teavm/runtime/MarkQueue.java:50
                  (i32.const 3500)))))))
      ;; org/teavm/runtime/MarkQueue.java:51
      (set_local 1
        (i32.add
          (i32.load align=4
            ;; org/teavm/runtime/MarkQueue.java:51
            (i32.const 3500))
          (i32.const 1)))
      ;; org/teavm/runtime/MarkQueue.java:51
      (i32.store align=4
        ;; org/teavm/runtime/MarkQueue.java:51
        (i32.const 3500)
        (get_local 1))
      (if
        ;; org/teavm/runtime/MarkQueue.java:51
        (i32.ge_s
          (get_local 1)
          (i32.load align=4
            ;; org/teavm/runtime/MarkQueue.java:51
            (i32.const 3508)))
        (then
          ;; org/teavm/runtime/MarkQueue.java:52
          (i32.store align=4
            ;; org/teavm/runtime/MarkQueue.java:52
            (i32.const 3500)
            (i32.const 0))))
      ;; org/teavm/runtime/MarkQueue.java:54
      (return
        (get_local 0))))

  ;; function #171
  (func $meth_otr_MarkQueue_pack (type $type1)
    ;; org/teavm/runtime/MarkQueue.java:58
    (return
      ;; org/teavm/runtime/MarkQueue.java:58
      (i32.wrap/i64
        ;; org/teavm/runtime/MarkQueue.java:58
        (i64.shr_u
          ;; org/teavm/runtime/MarkQueue.java:58
          (i64.sub
            (i64.extend_u/i32
              (get_local 0))
            (i64.extend_u/i32
              (i32.load align=4
                (i32.const 3996))))
          (i64.extend_u/i32
            (i32.const 2))))))

  ;; function #172
  (func $meth_otr_MarkQueue_unpack (type $type1)
    ;; org/teavm/runtime/MarkQueue.java:62
    (return
      (i32.add
        (i32.load align=4
          (i32.const 3996))
        (i32.wrap/i64
          ;; org/teavm/runtime/MarkQueue.java:62
          (i64.shl
            ;; org/teavm/runtime/MarkQueue.java:62
            (i64.extend_s/i32
              (get_local 0))
            (i64.extend_u/i32
              (i32.const 2)))))))

  ;; function #173
  (func $meth_otr_MarkQueue_isEmpty (type $type2)
    ;; org/teavm/runtime/MarkQueue.java:66
    (return
      (if i32
        ;; org/teavm/runtime/MarkQueue.java:66
        (i32.ne
          (i32.load align=4
            ;; org/teavm/runtime/MarkQueue.java:66
            (i32.const 3500))
          (i32.load align=4
            ;; org/teavm/runtime/MarkQueue.java:66
            (i32.const 3504)))
        (then
          (i32.const 0))
        (else
          (i32.const 1)))))

  ;; function #174
  (func $meth_otbwr_WasmSupport_runWithArgs_lambda__15_0__init_ (type $type6)
    (local i32)
    (block
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
      (i32.store align=4
        (get_local 2)
        (i32.const 157))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
      (call $meth_jl_Object__init_
        (get_local 0))
      (if
        ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
        (i32.eq
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
          (i32.load align=4
            (get_local 2))
          (i32.const 157))
        (then
          (i32.store8 align=1
            (i32.add
              (i32.load align=4
                (i32.const 3992))
              (i32.div_s
                (i32.sub
                  (get_local 0)
                  (i32.load align=4
                    (i32.const 3996)))
                (i32.const 1024)))
            (i32.const 0))
          ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
          (i32.store offset=8 align=4
            (get_local 0)
            (get_local 1))))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))))

  ;; function #175
  (func $meth_otbwr_WasmSupport_runWithArgs_lambda__15_0_run (type $type0)
    (local i32 i32)
    (block
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
      (set_local 1
        (i32.load offset=8 align=4
          (get_local 0)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
      (i32.store offset=4 align=4
        (get_local 2)
        (get_local 1))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
      (i32.store align=4
        (get_local 2)
        (i32.const 158))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
      (call $meth_otbwr_WasmSupport_lambda_runWithArgs_1
        (get_local 1))
      (drop
        (i32.load align=4
          (get_local 2)))
      ;; org/teavm/backend/wasm/runtime/WasmSupport.java:74
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))))

  ;; function #176
  (func $meth_jl_StackTraceElement__init_ (type $type16)
    (local i32 i32)
    (block
      (set_local 6
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      ;; org/teavm/classlib/java/lang/TStackTraceElement.java:28
      (i32.store offset=4 align=4
        (get_local 6)
        (i32.const 0))
      ;; org/teavm/classlib/java/lang/TStackTraceElement.java:28
      (i32.store align=4
        (get_local 6)
        (i32.const 159))
      ;; org/teavm/classlib/java/lang/TStackTraceElement.java:28
      (call $meth_jl_Object__init_
        (get_local 0))
      (if
        ;; org/teavm/classlib/java/lang/TStackTraceElement.java:28
        (i32.eq
          ;; org/teavm/classlib/java/lang/TStackTraceElement.java:28
          (i32.load align=4
            (get_local 6))
          (i32.const 159))
        (then
          (if
            ;; org/teavm/classlib/java/lang/TStackTraceElement.java:29
            (block $block_0 i32
              (drop
                (br_if $block_0
                  ;; org/teavm/classlib/java/lang/TStackTraceElement.java:29
                  (i32.const 0)
                  ;; org/teavm/classlib/java/lang/TStackTraceElement.java:29
                  (i32.eq
                    (get_local 1)
                    (i32.const 0))))
              ;; org/teavm/classlib/java/lang/TStackTraceElement.java:29
              (i32.ne
                (get_local 2)
                (i32.const 0)))
            (then
              (i32.store8 align=1
                (i32.add
                  (i32.load align=4
                    (i32.const 3992))
                  (i32.div_s
                    (i32.sub
                      (get_local 0)
                      (i32.load align=4
                        (i32.const 3996)))
                    (i32.const 1024)))
                (i32.const 0))
              ;; org/teavm/classlib/java/lang/TStackTraceElement.java:32
              (i32.store offset=8 align=4
                (get_local 0)
                (get_local 1))
              ;; org/teavm/classlib/java/lang/TStackTraceElement.java:33
              (i32.store offset=12 align=4
                (get_local 0)
                (get_local 2))
              ;; org/teavm/classlib/java/lang/TStackTraceElement.java:34
              (i32.store offset=16 align=4
                (get_local 0)
                (get_local 3))
              ;; org/teavm/classlib/java/lang/TStackTraceElement.java:35
              (i32.store offset=20 align=4
                (get_local 0)
                (get_local 4)))
            (else
              ;; org/teavm/classlib/java/lang/TStackTraceElement.java:30
              (i32.store align=4
                (get_local 6)
                (i32.const 160))
              ;; org/teavm/classlib/java/lang/TStackTraceElement.java:30
              (set_local 5
                (call $meth_otr_Allocator_allocate
                  (i32.const 1720)))
              (if
                ;; org/teavm/classlib/java/lang/TStackTraceElement.java:30
                (i32.eq
                  ;; org/teavm/classlib/java/lang/TStackTraceElement.java:30
                  (i32.load align=4
                    (get_local 6))
                  (i32.const 160))
                (then
                  ;; org/teavm/classlib/java/lang/TStackTraceElement.java:30
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (get_local 5))
                  ;; org/teavm/classlib/java/lang/TStackTraceElement.java:30
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 161))
                  ;; org/teavm/classlib/java/lang/TStackTraceElement.java:30
                  (call $meth_jl_NullPointerException__init_
                    (get_local 5))
                  (if
                    ;; org/teavm/classlib/java/lang/TStackTraceElement.java:30
                    (i32.eq
                      ;; org/teavm/classlib/java/lang/TStackTraceElement.java:30
                      (i32.load align=4
                        (get_local 6))
                      (i32.const 161))
                    (then
                      ;; org/teavm/classlib/java/lang/TStackTraceElement.java:30
                      (i32.store align=4
                        (get_local 6)
                        (i32.const 162))
                      ;; org/teavm/classlib/java/lang/TStackTraceElement.java:30
                      (call $meth_otr_ExceptionHandling_throwException
                        (get_local 5))))))))))
      ;; org/teavm/classlib/java/lang/TStackTraceElement.java:30
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 6)
          (i32.const 4)))))

  ;; function #177
  (func $meth_jl_String__init__0 (type $type17)
    (local i32 i32 i32 i32 i32)
    (block
      (block $block_5
        (block $block_0
          (set_local 8
            (call $meth_otbw_WasmRuntime_allocStack
              (i32.const 0)))
          (if
            (i32.eq
              (i32.and
                (i32.load align=4
                  (i32.const 3852))
                (i32.const 1))
              (i32.const 0))
            (then
              (i32.store align=4
                (get_local 8)
                (i32.const 172))
              (call $initclass_jl_String)
              (if
                (i32.ne
                  (i32.load align=4
                    (get_local 8))
                  (i32.const 172))
                (then
                  (br $block_0)))))
          ;; org/teavm/classlib/java/lang/TString.java:55
          (i32.store align=4
            (get_local 8)
            (i32.const 170))
          ;; org/teavm/classlib/java/lang/TString.java:55
          (call $meth_jl_Object__init_
            (get_local 0))
          (if
            ;; org/teavm/classlib/java/lang/TString.java:55
            (i32.eq
              ;; org/teavm/classlib/java/lang/TString.java:55
              (i32.load align=4
                (get_local 8))
              (i32.const 170))
            (then
              ;; org/teavm/classlib/java/lang/TString.java:56
              (i32.store align=4
                (get_local 8)
                (i32.const 171))
              ;; org/teavm/classlib/java/lang/TString.java:56
              (set_local 4
                (call $meth_otr_Allocator_allocateArray
                  (i32.const 5392)
                  (get_local 3)))
              (if
                ;; org/teavm/classlib/java/lang/TString.java:56
                (i32.eq
                  ;; org/teavm/classlib/java/lang/TString.java:56
                  (i32.load align=4
                    (get_local 8))
                  (i32.const 171))
                (then
                  (i32.store8 align=1
                    (i32.add
                      (i32.load align=4
                        (i32.const 3992))
                      (i32.div_s
                        (i32.sub
                          (get_local 0)
                          (i32.load align=4
                            (i32.const 3996)))
                        (i32.const 1024)))
                    (i32.const 0))
                  ;; org/teavm/classlib/java/lang/TString.java:56
                  (i32.store offset=8 align=4
                    (get_local 0)
                    (get_local 4))
                  ;; org/teavm/classlib/java/lang/TString.java:57
                  (set_local 5
                    (i32.const 0))
                  (block $block_2
                    (block $block_3
                      (block $block_1
                        (loop $block_4
                          (br_if $block_1
                            ;; org/teavm/classlib/java/lang/TString.java:57
                            (i32.ge_s
                              (get_local 5)
                              (get_local 3)))
                          ;; org/teavm/classlib/java/lang/TString.java:58
                          (set_local 4
                            (i32.load offset=8 align=4
                              (get_local 0)))
                          ;; org/teavm/classlib/java/lang/TString.java:58
                          (set_local 6
                            (i32.add
                              (get_local 5)
                              (get_local 2)))
                          (if
                            ;; org/teavm/classlib/java/lang/TString.java:58
                            (i32.eq
                              (get_local 1)
                              (i32.const 0))
                            (then
                              ;; org/teavm/classlib/java/lang/TString.java:58
                              (i32.store align=4
                                (get_local 8)
                                (i32.const 173))
                              ;; org/teavm/classlib/java/lang/TString.java:58
                              (call $teavm_throwNullPointerException)
                              ;; org/teavm/classlib/java/lang/TString.java:58
                              (br $block_0)))
                          ;; org/teavm/classlib/java/lang/TString.java:58
                          (set_local 7
                            (get_local 1))
                          (if
                            ;; org/teavm/classlib/java/lang/TString.java:58
                            (i32.lt_s
                              (get_local 6)
                              (i32.const 0))
                            (then
                              ;; org/teavm/classlib/java/lang/TString.java:58
                              (br $block_2)))
                          (if
                            ;; org/teavm/classlib/java/lang/TString.java:58
                            (i32.ge_s
                              (get_local 6)
                              (i32.load align=4
                                (i32.add
                                  (get_local 7)
                                  (i32.const 8))))
                            (then
                              ;; org/teavm/classlib/java/lang/TString.java:58
                              (br $block_2)))
                          ;; org/teavm/classlib/java/lang/TString.java:58
                          (set_local 6
                            (i32.load16_u align=2
                              (i32.add
                                (i32.add
                                  (get_local 7)
                                  (i32.const 12))
                                (i32.shl
                                  (get_local 6)
                                  (i32.const 1)))))
                          (if
                            ;; org/teavm/classlib/java/lang/TString.java:58
                            (i32.eq
                              (get_local 4)
                              (i32.const 0))
                            (then
                              ;; org/teavm/classlib/java/lang/TString.java:58
                              (i32.store align=4
                                (get_local 8)
                                (i32.const 175))
                              ;; org/teavm/classlib/java/lang/TString.java:58
                              (call $teavm_throwNullPointerException)
                              ;; org/teavm/classlib/java/lang/TString.java:58
                              (br $block_0)))
                          ;; org/teavm/classlib/java/lang/TString.java:58
                          (set_local 4
                            (get_local 4))
                          (if
                            ;; org/teavm/classlib/java/lang/TString.java:58
                            (i32.lt_s
                              (get_local 5)
                              (i32.const 0))
                            (then
                              ;; org/teavm/classlib/java/lang/TString.java:58
                              (br $block_3)))
                          (if
                            ;; org/teavm/classlib/java/lang/TString.java:58
                            (i32.ge_s
                              (get_local 5)
                              (i32.load align=4
                                (i32.add
                                  (get_local 4)
                                  (i32.const 8))))
                            (then
                              ;; org/teavm/classlib/java/lang/TString.java:58
                              (br $block_3)))
                          (i32.store16 align=2
                            (i32.add
                              (i32.add
                                (get_local 4)
                                (i32.const 12))
                              (i32.shl
                                (get_local 5)
                                (i32.const 1)))
                            (get_local 6))
                          ;; org/teavm/classlib/java/lang/TString.java:57
                          (set_local 5
                            (i32.add
                              (get_local 5)
                              (i32.const 1)))
                          (br $block_4)))
                      ;; org/teavm/classlib/java/lang/TString.java:60
                      (br $block_5))
                    ;; org/teavm/classlib/java/lang/TString.java:58
                    (i32.store align=4
                      (get_local 8)
                      (i32.const 176))
                    ;; org/teavm/classlib/java/lang/TString.java:58
                    (call $teavm_throwArrayIndexOutOfBoundsException)
                    ;; org/teavm/classlib/java/lang/TString.java:58
                    (br $block_0))
                  ;; org/teavm/classlib/java/lang/TString.java:58
                  (i32.store align=4
                    (get_local 8)
                    (i32.const 174))
                  ;; org/teavm/classlib/java/lang/TString.java:58
                  (call $teavm_throwArrayIndexOutOfBoundsException)))))))
      ;; org/teavm/classlib/java/lang/TString.java:58
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 8)
          (i32.const 4)))))

  ;; function #178
  (func $meth_jl_String__init__1 (type $type6)
    (local i32 i32)
    (block
      (block $block_1
        (block $block_0
          (set_local 3
            (call $meth_otbw_WasmRuntime_allocStack
              (i32.const 0)))
          (if
            (i32.eq
              (i32.and
                (i32.load align=4
                  (i32.const 3852))
                (i32.const 1))
              (i32.const 0))
            (then
              (i32.store align=4
                (get_local 3)
                (i32.const 179))
              (call $initclass_jl_String)
              (if
                (i32.ne
                  (i32.load align=4
                    (get_local 3))
                  (i32.const 179))
                (then
                  (br $block_0)))))
          ;; org/teavm/classlib/java/lang/TString.java:117
          (i32.store align=4
            (get_local 3)
            (i32.const 177))
          ;; org/teavm/classlib/java/lang/TString.java:117
          (call $meth_jl_Object__init_
            (get_local 0))
          (if
            ;; org/teavm/classlib/java/lang/TString.java:117
            (i32.eq
              ;; org/teavm/classlib/java/lang/TString.java:117
              (i32.load align=4
                (get_local 3))
              (i32.const 177))
            (then
              ;; org/teavm/classlib/java/lang/TString.java:118
              (i32.store align=4
                (get_local 3)
                (i32.const 178))
              ;; org/teavm/classlib/java/lang/TString.java:118
              (set_local 2
                (call $meth_otr_Allocator_allocateArray
                  (i32.const 5392)
                  (get_local 1)))
              (if
                ;; org/teavm/classlib/java/lang/TString.java:118
                (i32.eq
                  ;; org/teavm/classlib/java/lang/TString.java:118
                  (i32.load align=4
                    (get_local 3))
                  (i32.const 178))
                (then
                  (i32.store8 align=1
                    (i32.add
                      (i32.load align=4
                        (i32.const 3992))
                      (i32.div_s
                        (i32.sub
                          (get_local 0)
                          (i32.load align=4
                            (i32.const 3996)))
                        (i32.const 1024)))
                    (i32.const 0))
                  ;; org/teavm/classlib/java/lang/TString.java:118
                  (i32.store offset=8 align=4
                    (get_local 0)
                    (get_local 2))
                  ;; org/teavm/classlib/java/lang/TString.java:119
                  (br $block_1)))))))
      ;; org/teavm/classlib/java/lang/TString.java:119
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))))

  ;; function #179
  (func $meth_jl_String_allocate (type $type1)
    (local i32 i32)
    (block i32
      (block $block_1
        (block $block_0
          (set_local 2
            (call $meth_otbw_WasmRuntime_allocStack
              (i32.const 1)))
          (if
            (i32.eq
              (i32.and
                (i32.load align=4
                  (i32.const 3852))
                (i32.const 1))
              (i32.const 0))
            (then
              (i32.store offset=4 align=4
                (get_local 2)
                (i32.const 0))
              (i32.store align=4
                (get_local 2)
                (i32.const 182))
              (call $initclass_jl_String)
              (if
                (i32.ne
                  (i32.load align=4
                    (get_local 2))
                  (i32.const 182))
                (then
                  (br $block_0)))))
          ;; org/teavm/classlib/java/lang/TString.java:122
          (i32.store offset=4 align=4
            (get_local 2)
            (i32.const 0))
          ;; org/teavm/classlib/java/lang/TString.java:122
          (i32.store align=4
            (get_local 2)
            (i32.const 180))
          ;; org/teavm/classlib/java/lang/TString.java:122
          (set_local 1
            (call $meth_otr_Allocator_allocate
              (i32.const 3840)))
          (if
            ;; org/teavm/classlib/java/lang/TString.java:122
            (i32.eq
              ;; org/teavm/classlib/java/lang/TString.java:122
              (i32.load align=4
                (get_local 2))
              (i32.const 180))
            (then
              ;; org/teavm/classlib/java/lang/TString.java:122
              (i32.store offset=4 align=4
                (get_local 2)
                (get_local 1))
              ;; org/teavm/classlib/java/lang/TString.java:122
              (i32.store align=4
                (get_local 2)
                (i32.const 181))
              ;; org/teavm/classlib/java/lang/TString.java:122
              (call $meth_jl_String__init__1
                (get_local 1)
                (get_local 0))
              (if
                ;; org/teavm/classlib/java/lang/TString.java:122
                (i32.eq
                  ;; org/teavm/classlib/java/lang/TString.java:122
                  (i32.load align=4
                    (get_local 2))
                  (i32.const 181))
                (then
                  ;; org/teavm/classlib/java/lang/TString.java:122
                  (br $block_1))))))
        ;; org/teavm/classlib/java/lang/TString.java:122
        (set_local 1
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TString.java:122
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TString.java:122
      (return
        (get_local 1))))

  ;; function #180
  (func $meth_jl_String_charAt (type $type5)
    (local i32 i32 i32 i32)
    (block i32
      (set_local 5
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      (block $block_3
        (block $block_0
          (block $block_1
            (if
              ;; org/teavm/classlib/java/lang/TString.java:127
              (i32.ge_s
                (get_local 1)
                (i32.const 0))
              (then
                ;; org/teavm/classlib/java/lang/TString.java:127
                (set_local 2
                  (i32.load offset=8 align=4
                    (get_local 0)))
                (if
                  ;; org/teavm/classlib/java/lang/TString.java:127
                  (i32.eq
                    (get_local 2)
                    (i32.const 0))
                  (then
                    ;; org/teavm/classlib/java/lang/TString.java:127
                    (i32.store offset=4 align=4
                      (get_local 5)
                      (i32.const 0))
                    ;; org/teavm/classlib/java/lang/TString.java:127
                    (i32.store align=4
                      (get_local 5)
                      (i32.const 186))
                    ;; org/teavm/classlib/java/lang/TString.java:127
                    (call $teavm_throwNullPointerException)
                    ;; org/teavm/classlib/java/lang/TString.java:127
                    (br $block_0)))
                (if
                  ;; org/teavm/classlib/java/lang/TString.java:127
                  (i32.lt_s
                    (get_local 1)
                    (i32.load align=4
                      (i32.add
                        (get_local 2)
                        (i32.const 8))))
                  (then
                    ;; org/teavm/classlib/java/lang/TString.java:127
                    (br $block_1)))))
            ;; org/teavm/classlib/java/lang/TString.java:128
            (i32.store offset=4 align=4
              (get_local 5)
              (i32.const 0))
            ;; org/teavm/classlib/java/lang/TString.java:128
            (i32.store align=4
              (get_local 5)
              (i32.const 183))
            ;; org/teavm/classlib/java/lang/TString.java:128
            (set_local 3
              (call $meth_otr_Allocator_allocate
                (i32.const 2672)))
            (if
              ;; org/teavm/classlib/java/lang/TString.java:128
              (i32.ne
                ;; org/teavm/classlib/java/lang/TString.java:128
                (i32.load align=4
                  (get_local 5))
                (i32.const 183))
              (then
                ;; org/teavm/classlib/java/lang/TString.java:128
                (br $block_0)))
            ;; org/teavm/classlib/java/lang/TString.java:128
            (i32.store offset=4 align=4
              (get_local 5)
              (get_local 3))
            ;; org/teavm/classlib/java/lang/TString.java:128
            (i32.store align=4
              (get_local 5)
              (i32.const 184))
            ;; org/teavm/classlib/java/lang/TString.java:128
            (call $meth_jl_StringIndexOutOfBoundsException__init_
              (get_local 3))
            (if
              ;; org/teavm/classlib/java/lang/TString.java:128
              (i32.ne
                ;; org/teavm/classlib/java/lang/TString.java:128
                (i32.load align=4
                  (get_local 5))
                (i32.const 184))
              (then
                ;; org/teavm/classlib/java/lang/TString.java:128
                (br $block_0)))
            ;; org/teavm/classlib/java/lang/TString.java:128
            (i32.store align=4
              (get_local 5)
              (i32.const 185))
            ;; org/teavm/classlib/java/lang/TString.java:128
            (call $meth_otr_ExceptionHandling_throwException
              (get_local 3))
            ;; org/teavm/classlib/java/lang/TString.java:128
            (br $block_0))
          ;; org/teavm/classlib/java/lang/TString.java:130
          (set_local 2
            (i32.load offset=8 align=4
              (get_local 0)))
          (if
            ;; org/teavm/classlib/java/lang/TString.java:130
            (i32.eq
              (get_local 2)
              (i32.const 0))
            (then
              ;; org/teavm/classlib/java/lang/TString.java:130
              (i32.store offset=4 align=4
                (get_local 5)
                (i32.const 0))
              ;; org/teavm/classlib/java/lang/TString.java:130
              (i32.store align=4
                (get_local 5)
                (i32.const 187))
              ;; org/teavm/classlib/java/lang/TString.java:130
              (call $teavm_throwNullPointerException))
            (else
              ;; org/teavm/classlib/java/lang/TString.java:130
              (set_local 2
                (get_local 2))
              (if
                ;; org/teavm/classlib/java/lang/TString.java:130
                (block $block_2 i32
                  (drop
                    (br_if $block_2
                      ;; org/teavm/classlib/java/lang/TString.java:130
                      (i32.const 0)
                      ;; org/teavm/classlib/java/lang/TString.java:130
                      (i32.lt_s
                        (get_local 1)
                        (i32.const 0))))
                  ;; org/teavm/classlib/java/lang/TString.java:130
                  (i32.lt_s
                    (get_local 1)
                    (i32.load align=4
                      (i32.add
                        (get_local 2)
                        (i32.const 8)))))
                (then
                  ;; org/teavm/classlib/java/lang/TString.java:130
                  (set_local 4
                    (i32.load16_u align=2
                      (i32.add
                        (i32.add
                          (get_local 2)
                          (i32.const 12))
                        (i32.shl
                          (get_local 1)
                          (i32.const 1)))))
                  ;; org/teavm/classlib/java/lang/TString.java:130
                  (br $block_3)))
              ;; org/teavm/classlib/java/lang/TString.java:130
              (i32.store offset=4 align=4
                (get_local 5)
                (i32.const 0))
              ;; org/teavm/classlib/java/lang/TString.java:130
              (i32.store align=4
                (get_local 5)
                (i32.const 188))
              ;; org/teavm/classlib/java/lang/TString.java:130
              (call $teavm_throwArrayIndexOutOfBoundsException))))
        ;; org/teavm/classlib/java/lang/TString.java:130
        (set_local 4
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TString.java:130
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 5)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TString.java:130
      (return
        (get_local 4))))

  ;; function #181
  (func $meth_jl_String_length (type $type1)
    (local i32 i32 i32)
    (block i32
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TString.java:151
      (set_local 1
        (i32.load offset=8 align=4
          (get_local 0)))
      (if
        ;; org/teavm/classlib/java/lang/TString.java:151
        (i32.ne
          (get_local 1)
          (i32.const 0))
        (then
          ;; org/teavm/classlib/java/lang/TString.java:151
          (set_local 2
            (i32.load align=4
              (i32.add
                (get_local 1)
                (i32.const 8)))))
        (else
          ;; org/teavm/classlib/java/lang/TString.java:151
          (i32.store align=4
            (get_local 3)
            (i32.const 189))
          ;; org/teavm/classlib/java/lang/TString.java:151
          (call $teavm_throwNullPointerException)
          ;; org/teavm/classlib/java/lang/TString.java:151
          (set_local 2
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TString.java:151
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TString.java:151
      (return
        (get_local 2))))

  ;; function #182
  (func $meth_jl_String_isEmpty (type $type1)
    (local i32 i32 i32)
    (block i32
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TString.java:155
      (set_local 1
        (i32.load offset=8 align=4
          (get_local 0)))
      (if
        ;; org/teavm/classlib/java/lang/TString.java:155
        (i32.eq
          (get_local 1)
          (i32.const 0))
        (then
          ;; org/teavm/classlib/java/lang/TString.java:155
          (i32.store align=4
            (get_local 3)
            (i32.const 190))
          ;; org/teavm/classlib/java/lang/TString.java:155
          (call $teavm_throwNullPointerException)
          ;; org/teavm/classlib/java/lang/TString.java:155
          (set_local 2
            (i32.const 0)))
        (else
          ;; org/teavm/classlib/java/lang/TString.java:155
          (set_local 2
            (if i32
              (i32.load align=4
                (i32.add
                  (get_local 1)
                  (i32.const 8)))
              (then
                (i32.const 0))
              (else
                (i32.const 1))))))
      ;; org/teavm/classlib/java/lang/TString.java:155
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TString.java:155
      (return
        (get_local 2))))

  ;; function #183
  (func $meth_jl_String__clinit_ (type $type3)
    (local i32 i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      ;; org/teavm/classlib/java/lang/TString.java:36
      (i32.store offset=4 align=4
        (get_local 1)
        (i32.const 0))
      ;; org/teavm/classlib/java/lang/TString.java:36
      (i32.store align=4
        (get_local 1)
        (i32.const 191))
      ;; org/teavm/classlib/java/lang/TString.java:36
      (set_local 0
        (call $meth_otr_Allocator_allocate
          (i32.const 4904)))
      (if
        ;; org/teavm/classlib/java/lang/TString.java:36
        (i32.eq
          ;; org/teavm/classlib/java/lang/TString.java:36
          (i32.load align=4
            (get_local 1))
          (i32.const 191))
        (then
          ;; org/teavm/classlib/java/lang/TString.java:36
          (i32.store offset=4 align=4
            (get_local 1)
            (get_local 0))
          ;; org/teavm/classlib/java/lang/TString.java:36
          (i32.store align=4
            (get_local 1)
            (i32.const 192))
          ;; org/teavm/classlib/java/lang/TString.java:36
          (call $meth_jl_String__clinit__lambda__84_0__init_
            (get_local 0))
          (if
            ;; org/teavm/classlib/java/lang/TString.java:36
            (i32.eq
              ;; org/teavm/classlib/java/lang/TString.java:36
              (i32.load align=4
                (get_local 1))
              (i32.const 192))
            (then
              ;; org/teavm/classlib/java/lang/TString.java:36
              (i32.store align=4
                ;; org/teavm/classlib/java/lang/TString.java:36
                (i32.const 3828)
                (get_local 0))))))
      ;; org/teavm/classlib/java/lang/TString.java:36
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #184
  (func $meth_otbw_WasmHeap_calculateStorageSize (type $type1)
    ;; org/teavm/backend/wasm/WasmHeap.java:53
    (return
      ;; org/teavm/backend/wasm/WasmHeap.java:53
      (i32.div_s
        (get_local 0)
        (i32.const 16))))

  ;; function #185
  (func $meth_otbw_WasmHeap_calculateRegionsCount (type $type5)
    ;; org/teavm/backend/wasm/WasmHeap.java:57
    (return
      ;; org/teavm/backend/wasm/WasmHeap.java:57
      (i32.add
        ;; org/teavm/backend/wasm/WasmHeap.java:57
        (i32.div_s
          (get_local 0)
          (get_local 1))
        (i32.const 1))))

  ;; function #186
  (func $meth_otbw_WasmHeap_calculateRegionsSize (type $type1)
    ;; org/teavm/backend/wasm/WasmHeap.java:61
    (return
      ;; org/teavm/backend/wasm/WasmHeap.java:61
      (i32.mul
        (get_local 0)
        (i32.const 2))))

  ;; function #187
  (func $meth_otbw_WasmHeap_initHeap (type $type16)
    (block
      (drop
        (i32.const 0))
      ;; org/teavm/backend/wasm/WasmHeap.java:72
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:72
        (i32.const 4024)
        ;; org/teavm/backend/wasm/WasmHeap.java:72
        (call $meth_otbw_WasmRuntime_align
          (get_local 0)
          (i32.const 16)))
      ;; org/teavm/backend/wasm/WasmHeap.java:73
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:73
        (i32.const 4028)
        (get_local 4))
      ;; org/teavm/backend/wasm/WasmHeap.java:74
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:74
        (i32.const 4016)
        ;; org/teavm/backend/wasm/WasmHeap.java:74
        (call $meth_otbw_WasmRuntime_align
          (i32.add
            (i32.load align=4
              ;; org/teavm/backend/wasm/WasmHeap.java:74
              (i32.const 4024))
            (get_local 4))
          (i32.const 16)))
      ;; org/teavm/backend/wasm/WasmHeap.java:75
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:75
        (i32.const 4012)
        (i32.load align=4
          ;; org/teavm/backend/wasm/WasmHeap.java:75
          (i32.const 4016)))
      ;; org/teavm/backend/wasm/WasmHeap.java:76
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:76
        (i32.const 3996)
        ;; org/teavm/backend/wasm/WasmHeap.java:76
        (call $meth_otbw_WasmRuntime_align
          (i32.add
            (i32.load align=4
              ;; org/teavm/backend/wasm/WasmHeap.java:76
              (i32.const 4012))
            (get_local 3))
          (i32.const 16)))
      ;; org/teavm/backend/wasm/WasmHeap.java:77
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:77
        (i32.const 4008)
        ;; org/teavm/backend/wasm/WasmHeap.java:77
        (call $meth_otbw_WasmRuntime_align
          (get_local 0)
          (i32.const 65536)))
      ;; org/teavm/backend/wasm/WasmHeap.java:78
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:78
        (i32.const 3964)
        (get_local 1))
      ;; org/teavm/backend/wasm/WasmHeap.java:79
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:79
        (i32.const 3968)
        (get_local 2))
      ;; org/teavm/backend/wasm/WasmHeap.java:80
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:80
        (i32.const 4020)
        (get_local 3))
      ;; org/teavm/backend/wasm/WasmHeap.java:81
      (call $meth_otbw_WasmHeap_resizeHeap
        (get_local 1))))

  ;; function #188
  (func $meth_otbw_WasmHeap_resizeHeap (type $type0)
    (local i32 i32 i32 i32 i32 i32 i32)
    (block
      (if
        ;; org/teavm/backend/wasm/WasmHeap.java:85
        (i32.le_s
          (get_local 0)
          (i32.load align=4
            ;; org/teavm/backend/wasm/WasmHeap.java:85
            (i32.const 4000)))
        (then
          ;; org/teavm/backend/wasm/WasmHeap.java:86
          (return)))
      ;; org/teavm/backend/wasm/WasmHeap.java:89
      (set_local 1
        ;; org/teavm/backend/wasm/WasmHeap.java:89
        (call $meth_otbw_WasmHeap_calculateStorageSize
          (get_local 0)))
      ;; org/teavm/backend/wasm/WasmHeap.java:90
      (set_local 2
        ;; org/teavm/backend/wasm/WasmHeap.java:90
        (call $meth_otbw_WasmHeap_calculateRegionsCount
          (get_local 0)
          (i32.load align=4
            ;; org/teavm/backend/wasm/WasmHeap.java:90
            (i32.const 4004))))
      ;; org/teavm/backend/wasm/WasmHeap.java:91
      (set_local 3
        ;; org/teavm/backend/wasm/WasmHeap.java:91
        (call $meth_otbw_WasmHeap_calculateRegionsSize
          (get_local 2)))
      ;; org/teavm/backend/wasm/WasmHeap.java:93
      (set_local 4
        ;; org/teavm/backend/wasm/WasmHeap.java:93
        (call $meth_otbw_WasmRuntime_align
          (i32.add
            (i32.load align=4
              ;; org/teavm/backend/wasm/WasmHeap.java:93
              (i32.const 3996))
            (get_local 0))
          (i32.const 16)))
      ;; org/teavm/backend/wasm/WasmHeap.java:94
      (set_local 5
        ;; org/teavm/backend/wasm/WasmHeap.java:94
        (call $meth_otbw_WasmRuntime_align
          (i32.add
            (get_local 4)
            (get_local 3))
          (i32.const 16)))
      ;; org/teavm/backend/wasm/WasmHeap.java:95
      (set_local 6
        ;; org/teavm/backend/wasm/WasmHeap.java:95
        (call $meth_otbw_WasmRuntime_align
          (i32.add
            (get_local 5)
            (get_local 2))
          (i32.const 16)))
      ;; org/teavm/backend/wasm/WasmHeap.java:96
      (set_local 7
        ;; org/teavm/backend/wasm/WasmHeap.java:96
        (call $meth_otbw_WasmRuntime_align
          (i32.add
            (get_local 6)
            (get_local 1))
          (i32.const 65536)))
      (if
        ;; org/teavm/backend/wasm/WasmHeap.java:97
        (i32.ne
          (get_local 7)
          (i32.load align=4
            ;; org/teavm/backend/wasm/WasmHeap.java:97
            (i32.const 4008)))
        (then
          ;; org/teavm/backend/wasm/WasmHeap.java:98
          (drop
            (memory.grow
              ;; org/teavm/backend/wasm/WasmHeap.java:98
              (i32.div_s
                ;; org/teavm/backend/wasm/WasmHeap.java:98
                (i32.wrap/i64
                  ;; org/teavm/backend/wasm/WasmHeap.java:98
                  (i64.sub
                    (i64.extend_u/i32
                      (get_local 7))
                    (i64.extend_u/i32
                      (i32.load align=4
                        ;; org/teavm/backend/wasm/WasmHeap.java:98
                        (i32.const 4008)))))
                (i32.const 65536))))
          ;; org/teavm/backend/wasm/WasmHeap.java:99
          (i32.store align=4
            ;; org/teavm/backend/wasm/WasmHeap.java:99
            (i32.const 4008)
            (get_local 7))))
      (if
        ;; org/teavm/backend/wasm/WasmHeap.java:101
        (i32.gt_s
          (i32.load align=4
            ;; org/teavm/backend/wasm/WasmHeap.java:101
            (i32.const 3976))
          (i32.const 0))
        (then
          ;; org/teavm/backend/wasm/WasmHeap.java:102
          (call $meth_otbw_WasmRuntime_moveMemoryBlock
            (i32.load align=4
              ;; org/teavm/backend/wasm/WasmHeap.java:102
              (i32.const 3972))
            (get_local 6)
            (i32.load align=4
              ;; org/teavm/backend/wasm/WasmHeap.java:102
              (i32.const 3976)))))
      (if
        ;; org/teavm/backend/wasm/WasmHeap.java:104
        (i32.gt_s
          (i32.load align=4
            ;; org/teavm/backend/wasm/WasmHeap.java:104
            (i32.const 3988))
          (i32.const 0))
        (then
          ;; org/teavm/backend/wasm/WasmHeap.java:105
          (call $meth_otbw_WasmRuntime_moveMemoryBlock
            (i32.load align=4
              ;; org/teavm/backend/wasm/WasmHeap.java:105
              (i32.const 3992))
            (get_local 5)
            (i32.load align=4
              ;; org/teavm/backend/wasm/WasmHeap.java:105
              (i32.const 3984)))
          ;; org/teavm/backend/wasm/WasmHeap.java:106
          (call $meth_otbw_WasmRuntime_moveMemoryBlock
            (i32.load align=4
              ;; org/teavm/backend/wasm/WasmHeap.java:106
              (i32.const 3980))
            (get_local 4)
            (i32.load align=4
              ;; org/teavm/backend/wasm/WasmHeap.java:106
              (i32.const 3988)))))
      ;; org/teavm/backend/wasm/WasmHeap.java:109
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:109
        (i32.const 3972)
        (get_local 6))
      ;; org/teavm/backend/wasm/WasmHeap.java:110
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:110
        (i32.const 3980)
        (get_local 4))
      ;; org/teavm/backend/wasm/WasmHeap.java:111
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:111
        (i32.const 3992)
        (get_local 5))
      ;; org/teavm/backend/wasm/WasmHeap.java:112
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:112
        (i32.const 3976)
        (get_local 1))
      ;; org/teavm/backend/wasm/WasmHeap.java:113
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:113
        (i32.const 3984)
        (get_local 2))
      ;; org/teavm/backend/wasm/WasmHeap.java:114
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:114
        (i32.const 3988)
        (get_local 3))
      ;; org/teavm/backend/wasm/WasmHeap.java:115
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:115
        (i32.const 4000)
        (get_local 0))))

  ;; function #189
  (func $meth_otbw_WasmHeap__clinit_ (type $type3)
    (block
      ;; org/teavm/backend/wasm/WasmHeap.java:41
      (i32.store align=4
        ;; org/teavm/backend/wasm/WasmHeap.java:41
        (i32.const 4004)
        (i32.const 1024))))

  ;; function #190
  (func $meth_jl_NegativeArraySizeException__init_ (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TNegativeArraySizeException.java:22
      (i32.store align=4
        (get_local 1)
        (i32.const 193))
      ;; org/teavm/classlib/java/lang/TNegativeArraySizeException.java:22
      (call $meth_jl_RuntimeException__init_
        (get_local 0))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/classlib/java/lang/TNegativeArraySizeException.java:23
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #191
  (func $meth_cbv_VisualizerRuntime_main (type $type0)
    (local i32)
    (block
      (block $block_1
        (block $block_0
          (set_local 1
            (call $meth_otbw_WasmRuntime_allocStack
              (i32.const 0)))
          (if
            (i32.eq
              (i32.and
                (i32.load align=4
                  (i32.const 4284))
                (i32.const 1))
              (i32.const 0))
            (then
              (i32.store align=4
                (get_local 1)
                (i32.const 195))
              (call $initclass_cbv_VisualizerRuntime)
              (if
                (i32.ne
                  (i32.load align=4
                    (get_local 1))
                  (i32.const 195))
                (then
                  (br $block_0)))))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:33
          (i32.store align=4
            (get_local 1)
            (i32.const 194))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:33
          (call $initialize)
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:33
            (i32.eq
              ;; com/babuhub/visualizer/VisualizerRuntime.java:33
              (i32.load align=4
                (get_local 1))
              (i32.const 194))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:34
              (br $block_1)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:34
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #192
  (func $initialize (export "initialize") (type $type3)
    (local i32 i32 i32)
    (block
      (block $block_1
        (block $block_0
          (set_local 1
            (call $meth_otbw_WasmRuntime_allocStack
              (i32.const 1)))
          (if
            (i32.eq
              (i32.and
                (i32.load align=4
                  (i32.const 4284))
                (i32.const 1))
              (i32.const 0))
            (then
              (i32.store offset=4 align=4
                (get_local 1)
                (i32.const 0))
              (i32.store align=4
                (get_local 1)
                (i32.const 196))
              (call $initclass_cbv_VisualizerRuntime)
              (if
                (i32.ne
                  (i32.load align=4
                    (get_local 1))
                  (i32.const 196))
                (then
                  (br $block_0)))))
          (if
            (i32.load8_s align=1
              ;; com/babuhub/visualizer/VisualizerRuntime.java:41
              (i32.const 4244))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:42
              (br $block_1)))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:45
          (i32.store8 align=1
            ;; com/babuhub/visualizer/VisualizerRuntime.java:45
            (i32.const 4244)
            (i32.const 1))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:46
          (i32.store align=4
            ;; com/babuhub/visualizer/VisualizerRuntime.java:46
            (i32.const 4248)
            (i32.const 0))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:47
          (i32.store align=4
            ;; com/babuhub/visualizer/VisualizerRuntime.java:47
            (i32.const 4252)
            (i32.const 0))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:48
          (set_local 0
            (i32.load align=4
              (i32.const 4256)))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:48
            (i32.eq
              (get_local 0)
              (i32.const 0))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:48
              (i32.store offset=4 align=4
                (get_local 1)
                (i32.const 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:48
              (i32.store align=4
                (get_local 1)
                (i32.const 198))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:48
              (call $teavm_throwNullPointerException))
            (else
              ;; com/babuhub/visualizer/VisualizerRuntime.java:48
              (i32.store offset=4 align=4
                (get_local 1)
                (get_local 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:48
              (i32.store align=4
                (get_local 1)
                (i32.const 197))
              (block
                (set_local 2
                  (get_local 0))
                (call_indirect $type6
                  (i32.load align=4
                    (i32.add
                      (i32.shl
                        (i32.load align=4
                          (get_local 2))
                        (i32.const 3))
                      (i32.const 136)))
                  (get_local 2)
                  (i32.const 0)))
              (if
                ;; com/babuhub/visualizer/VisualizerRuntime.java:48
                (i32.eq
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:48
                  (i32.load align=4
                    (get_local 1))
                  (i32.const 197))
                (then
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:49
                  (i32.store align=4
                    ;; com/babuhub/visualizer/VisualizerRuntime.java:49
                    (i32.const 4260)
                    (i32.const 0))
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:50
                  (br $block_1)))))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:50
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #193
  (func $ping (export "ping") (type $type2)
    (local i32 i32)
    (block i32
      (block $block_0
        (set_local 1
          (call $meth_otbw_WasmRuntime_allocStack
            (i32.const 0)))
        (if
          (i32.eq
            (i32.and
              (i32.load align=4
                (i32.const 4284))
              (i32.const 1))
            (i32.const 0))
          (then
            (i32.store align=4
              (get_local 1)
              (i32.const 199))
            (call $initclass_cbv_VisualizerRuntime)
            (if
              (i32.ne
                (i32.load align=4
                  (get_local 1))
                (i32.const 199))
              (then
                ;; com/babuhub/visualizer/VisualizerRuntime.java:57
                (set_local 0
                  (i32.const 0))
                ;; com/babuhub/visualizer/VisualizerRuntime.java:57
                (br $block_0)))))
        ;; com/babuhub/visualizer/VisualizerRuntime.java:57
        (set_local 0
          (i32.const 7964)))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:57
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:57
      (return
        (get_local 0))))

  ;; function #194
  (func $acceptCode (export "acceptCode") (type $type1)
    (local i32 i32)
    (block i32
      (block $block_1
        (block $block_0
          (set_local 2
            (call $meth_otbw_WasmRuntime_allocStack
              (i32.const 0)))
          (if
            (i32.eq
              (i32.and
                (i32.load align=4
                  (i32.const 4284))
                (i32.const 1))
              (i32.const 0))
            (then
              (i32.store align=4
                (get_local 2)
                (i32.const 202))
              (call $initclass_cbv_VisualizerRuntime)
              (if
                (i32.ne
                  (i32.load align=4
                    (get_local 2))
                  (i32.const 202))
                (then
                  (br $block_0)))))
          (if
            (i32.eq
              (i32.load8_s align=1
                ;; com/babuhub/visualizer/VisualizerRuntime.java:65
                (i32.const 4244))
              (i32.const 0))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:66
              (i32.store align=4
                (get_local 2)
                (i32.const 201))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:66
              (call $initialize)
              (if
                ;; com/babuhub/visualizer/VisualizerRuntime.java:66
                (i32.ne
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:66
                  (i32.load align=4
                    (get_local 2))
                  (i32.const 201))
                (then
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:66
                  (br $block_0)))))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:69
          (i32.store align=4
            (get_local 2)
            (i32.const 200))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:69
          (call $reset)
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:69
            (i32.eq
              ;; com/babuhub/visualizer/VisualizerRuntime.java:69
              (i32.load align=4
                (get_local 2))
              (i32.const 200))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:70
              (set_local 1
                (i32.const 1))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:70
              (br $block_1))))
        ;; com/babuhub/visualizer/VisualizerRuntime.java:70
        (set_local 1
          (i32.const 0)))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:70
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:70
      (return
        (get_local 1))))

  ;; function #195
  (func $invokeMain (export "invokeMain") (type $type2)
    (local i32 i32)
    (block i32
      (block $block_0
        (set_local 1
          (call $meth_otbw_WasmRuntime_allocStack
            (i32.const 0)))
        (if
          (i32.eq
            (i32.and
              (i32.load align=4
                (i32.const 4284))
              (i32.const 1))
            (i32.const 0))
          (then
            (i32.store align=4
              (get_local 1)
              (i32.const 203))
            (call $initclass_cbv_VisualizerRuntime)
            (if
              (i32.ne
                (i32.load align=4
                  (get_local 1))
                (i32.const 203))
              (then
                (set_local 0
                  (i32.const 0))
                (br $block_0)))))
        (if
          (i32.load8_s align=1
            ;; com/babuhub/visualizer/VisualizerRuntime.java:78
            (i32.const 4244))
          (then
            ;; com/babuhub/visualizer/VisualizerRuntime.java:82
            (set_local 0
              (i32.const 0)))
          (else
            ;; com/babuhub/visualizer/VisualizerRuntime.java:79
            (set_local 0
              (i32.const -1)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:79
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:79
      (return
        (get_local 0))))

  ;; function #196
  (func $trackStep (export "trackStep") (type $type0)
    (local i32)
    (block
      (block $block_0
        (set_local 1
          (call $meth_otbw_WasmRuntime_allocStack
            (i32.const 0)))
        (if
          (i32.eq
            (i32.and
              (i32.load align=4
                (i32.const 4284))
              (i32.const 1))
            (i32.const 0))
          (then
            (i32.store align=4
              (get_local 1)
              (i32.const 204))
            (call $initclass_cbv_VisualizerRuntime)
            (if
              (i32.ne
                (i32.load align=4
                  (get_local 1))
                (i32.const 204))
              (then
                (br $block_0)))))
        ;; com/babuhub/visualizer/VisualizerRuntime.java:90
        (i32.store align=4
          ;; com/babuhub/visualizer/VisualizerRuntime.java:90
          (i32.const 4252)
          (get_local 0))
        ;; com/babuhub/visualizer/VisualizerRuntime.java:91
        (i32.store align=4
          ;; com/babuhub/visualizer/VisualizerRuntime.java:91
          (i32.const 4248)
          ;; com/babuhub/visualizer/VisualizerRuntime.java:91
          (i32.add
            (i32.load align=4
              ;; com/babuhub/visualizer/VisualizerRuntime.java:91
              (i32.const 4248))
            (i32.const 1))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:92
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #197
  (func $captureOutput (export "captureOutput") (type $type0)
    (local i32 i32 i32)
    (block
      (block $block_1
        (block $block_0
          (set_local 2
            (call $meth_otbw_WasmRuntime_allocStack
              (i32.const 1)))
          (if
            (i32.eq
              (i32.and
                (i32.load align=4
                  (i32.const 4284))
                (i32.const 1))
              (i32.const 0))
            (then
              (i32.store offset=4 align=4
                (get_local 2)
                (i32.const 0))
              (i32.store align=4
                (get_local 2)
                (i32.const 205))
              (call $initclass_cbv_VisualizerRuntime)
              (if
                (i32.ne
                  (i32.load align=4
                    (get_local 2))
                  (i32.const 205))
                (then
                  (br $block_0)))))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:99
            (i32.ne
              (get_local 0)
              (i32.const 0))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:100
              (set_local 1
                (i32.load align=4
                  (i32.const 4256)))
              (if
                ;; com/babuhub/visualizer/VisualizerRuntime.java:100
                (i32.eq
                  (get_local 1)
                  (i32.const 0))
                (then
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:100
                  (i32.store offset=4 align=4
                    (get_local 2)
                    (i32.const 0))
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:100
                  (i32.store align=4
                    (get_local 2)
                    (i32.const 207))
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:100
                  (call $teavm_throwNullPointerException)
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:100
                  (br $block_0)))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:100
              (i32.store offset=4 align=4
                (get_local 2)
                (get_local 1))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:100
              (i32.store align=4
                (get_local 2)
                (i32.const 206))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:100
              (drop
                (block i32
                  (set_local 3
                    (get_local 1))
                  (call_indirect $type5
                    (i32.load align=4
                      (i32.add
                        (i32.shl
                          (i32.load align=4
                            (get_local 3))
                          (i32.const 3))
                        (i32.const 152)))
                    (get_local 3)
                    (get_local 0))))
              (if
                ;; com/babuhub/visualizer/VisualizerRuntime.java:100
                (i32.ne
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:100
                  (i32.load align=4
                    (get_local 2))
                  (i32.const 206))
                (then
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:100
                  (br $block_0)))))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:102
          (br $block_1)))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:102
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))))

  ;; function #198
  (func $trackVariable (export "trackVariable") (type $type7)
    (local i32)
    (block
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 3)
            (i32.const 208))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 3)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:110
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))))

  ;; function #199
  (func $trackMethodEntry (export "trackMethodEntry") (type $type7)
    (local i32)
    (block
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 3)
            (i32.const 209))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 3)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:118
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))))

  ;; function #200
  (func $trackMethodExit (export "trackMethodExit") (type $type7)
    (local i32)
    (block
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 3)
            (i32.const 210))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 3)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:126
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))))

  ;; function #201
  (func $trackObjectCreation (export "trackObjectCreation") (type $type6)
    (local i32)
    (block
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 2)
            (i32.const 211))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 2)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:134
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))))

  ;; function #202
  (func $trackObjectCreated (export "trackObjectCreated") (type $type7)
    (local i32)
    (block
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 3)
            (i32.const 212))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 3)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:149
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))))

  ;; function #203
  (func $trackFieldWrite (export "trackFieldWrite") (type $type7)
    (local i32)
    (block
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 3)
            (i32.const 213))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 3)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:162
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))))

  ;; function #204
  (func $trackArrayCreate (export "trackArrayCreate") (type $type7)
    (local i32)
    (block
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 3)
            (i32.const 214))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 3)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:175
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))))

  ;; function #205
  (func $trackCollectionEvent (export "trackCollectionEvent") (type $type17)
    (local i32)
    (block
      (set_local 4
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 4)
            (i32.const 215))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 4)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:189
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 4)
          (i32.const 4)))))

  ;; function #206
  (func $trackMethodReturn (export "trackMethodReturn") (type $type6)
    (local i32)
    (block
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 2)
            (i32.const 216))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 2)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:201
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))))

  ;; function #207
  (func $trackExceptionThrown (export "trackExceptionThrown") (type $type7)
    (local i32)
    (block
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 3)
            (i32.const 217))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 3)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:214
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))))

  ;; function #208
  (func $trackTryCatchEnter (export "trackTryCatchEnter") (type $type6)
    (local i32)
    (block
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 2)
            (i32.const 218))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 2)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:226
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))))

  ;; function #209
  (func $trackFinallyEnter (export "trackFinallyEnter") (type $type6)
    (local i32)
    (block
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 2)
            (i32.const 219))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 2)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:238
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))))

  ;; function #210
  (func $trackStaticInitStart (export "trackStaticInitStart") (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 1)
            (i32.const 220))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 1)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:249
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #211
  (func $trackStaticInitEnd (export "trackStaticInitEnd") (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 1)
            (i32.const 221))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 1)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:260
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #212
  (func $trackThisReference (export "trackThisReference") (type $type6)
    (local i32)
    (block
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (if
        (i32.eq
          (i32.and
            (i32.load align=4
              (i32.const 4284))
            (i32.const 1))
          (i32.const 0))
        (then
          (i32.store align=4
            (get_local 2)
            (i32.const 222))
          (call $initclass_cbv_VisualizerRuntime)
          (drop
            (i32.load align=4
              (get_local 2)))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:272
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))))

  ;; function #213
  (func $generateObjectId (export "generateObjectId") (type $type1)
    (local i32 i32 i32 i32 i32)
    (block i32
      (block $block_1
        (block $block_0
          (set_local 5
            (call $meth_otbw_WasmRuntime_allocStack
              (i32.const 2)))
          (if
            (i32.eq
              (i32.and
                (i32.load align=4
                  (i32.const 4284))
                (i32.const 1))
              (i32.const 0))
            (then
              (i32.store offset=4 align=4
                (get_local 5)
                (i32.const 0))
              (i32.store offset=8 align=4
                (get_local 5)
                (i32.const 0))
              (i32.store align=4
                (get_local 5)
                (i32.const 226))
              (call $initclass_cbv_VisualizerRuntime)
              (if
                (i32.ne
                  (i32.load align=4
                    (get_local 5))
                  (i32.const 226))
                (then
                  (br $block_0)))))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:282
          (i32.store align=4
            ;; com/babuhub/visualizer/VisualizerRuntime.java:282
            (i32.const 4260)
            ;; com/babuhub/visualizer/VisualizerRuntime.java:282
            (i32.add
              (i32.load align=4
                ;; com/babuhub/visualizer/VisualizerRuntime.java:282
                (i32.const 4260))
              (i32.const 1)))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (set_local 1
            (i32.load align=4
              (i32.const 4260)))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (set_local 2
            (i32.load align=4
              (i32.const 4248)))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store offset=4 align=4
            (get_local 5)
            (i32.const 0))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store offset=8 align=4
            (get_local 5)
            (i32.const 0))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store align=4
            (get_local 5)
            (i32.const 223))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (set_local 3
            (call $meth_otr_Allocator_allocate
              (i32.const 2920)))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (i32.ne
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.load align=4
                (get_local 5))
              (i32.const 223))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (br $block_0)))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store offset=4 align=4
            (get_local 5)
            (get_local 3))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store align=4
            (get_local 5)
            (i32.const 224))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (call $meth_jl_StringBuilder__init_
            (get_local 3))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (i32.ne
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.load align=4
                (get_local 5))
              (i32.const 224))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (br $block_0)))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store align=4
            (get_local 5)
            (i32.const 225))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (set_local 4
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (call $meth_jl_StringBuilder_append_0
              (get_local 3)
              (get_local 0)))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (i32.ne
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.load align=4
                (get_local 5))
              (i32.const 225))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (br $block_0)))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (i32.eq
              (get_local 4)
              (i32.const 0))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.store offset=4 align=4
                (get_local 5)
                (i32.const 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.store align=4
                (get_local 5)
                (i32.const 228))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (call $teavm_throwNullPointerException)
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (br $block_0)))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store offset=8 align=4
            (get_local 5)
            (get_local 4))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store align=4
            (get_local 5)
            (i32.const 227))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (set_local 4
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (call $meth_jl_StringBuilder_append_2
              (get_local 4)
              (i32.const 95)))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (i32.ne
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.load align=4
                (get_local 5))
              (i32.const 227))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (br $block_0)))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (i32.eq
              (get_local 4)
              (i32.const 0))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.store offset=4 align=4
                (get_local 5)
                (i32.const 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.store offset=8 align=4
                (get_local 5)
                (i32.const 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.store align=4
                (get_local 5)
                (i32.const 230))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (call $teavm_throwNullPointerException)
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (br $block_0)))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store offset=8 align=4
            (get_local 5)
            (get_local 4))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store align=4
            (get_local 5)
            (i32.const 229))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (set_local 4
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (call $meth_jl_StringBuilder_append_1
              (get_local 4)
              (get_local 1)))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (i32.ne
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.load align=4
                (get_local 5))
              (i32.const 229))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (br $block_0)))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (i32.eq
              (get_local 4)
              (i32.const 0))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.store offset=4 align=4
                (get_local 5)
                (i32.const 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.store offset=8 align=4
                (get_local 5)
                (i32.const 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.store align=4
                (get_local 5)
                (i32.const 232))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (call $teavm_throwNullPointerException)
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (br $block_0)))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store offset=8 align=4
            (get_local 5)
            (get_local 4))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store align=4
            (get_local 5)
            (i32.const 231))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (set_local 4
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (call $meth_jl_StringBuilder_append_2
              (get_local 4)
              (i32.const 95)))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (i32.ne
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.load align=4
                (get_local 5))
              (i32.const 231))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (br $block_0)))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (i32.eq
              (get_local 4)
              (i32.const 0))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.store offset=4 align=4
                (get_local 5)
                (i32.const 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.store offset=8 align=4
                (get_local 5)
                (i32.const 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.store align=4
                (get_local 5)
                (i32.const 235))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (call $teavm_throwNullPointerException)
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (br $block_0)))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store offset=8 align=4
            (get_local 5)
            (get_local 4))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store align=4
            (get_local 5)
            (i32.const 233))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (drop
            (call $meth_jl_StringBuilder_append_1
              (get_local 4)
              (get_local 2)))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (i32.ne
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.load align=4
                (get_local 5))
              (i32.const 233))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (br $block_0)))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store offset=8 align=4
            (get_local 5)
            (i32.const 0))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (i32.store align=4
            (get_local 5)
            (i32.const 234))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (set_local 3
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (call $meth_jl_StringBuilder_toString
              (get_local 3)))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:283
            (i32.ne
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (i32.load align=4
                (get_local 5))
              (i32.const 234))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:283
              (br $block_0)))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:283
          (br $block_1))
        ;; com/babuhub/visualizer/VisualizerRuntime.java:283
        (set_local 3
          (i32.const 0)))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:283
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 5)
          (i32.const 4)))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:283
      (return
        (get_local 3))))

  ;; function #214
  (func $getCurrentStep (export "getCurrentStep") (type $type2)
    (local i32 i32)
    (block i32
      (block $block_0
        (set_local 1
          (call $meth_otbw_WasmRuntime_allocStack
            (i32.const 0)))
        (if
          (i32.eq
            (i32.and
              (i32.load align=4
                (i32.const 4284))
              (i32.const 1))
            (i32.const 0))
          (then
            (i32.store align=4
              (get_local 1)
              (i32.const 236))
            (call $initclass_cbv_VisualizerRuntime)
            (if
              (i32.ne
                (i32.load align=4
                  (get_local 1))
                (i32.const 236))
              (then
                ;; com/babuhub/visualizer/VisualizerRuntime.java:291
                (set_local 0
                  (i32.const 0))
                ;; com/babuhub/visualizer/VisualizerRuntime.java:291
                (br $block_0)))))
        ;; com/babuhub/visualizer/VisualizerRuntime.java:291
        (set_local 0
          (i32.load align=4
            (i32.const 4248))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:291
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:291
      (return
        (get_local 0))))

  ;; function #215
  (func $getCurrentLine (export "getCurrentLine") (type $type2)
    (local i32 i32)
    (block i32
      (block $block_0
        (set_local 1
          (call $meth_otbw_WasmRuntime_allocStack
            (i32.const 0)))
        (if
          (i32.eq
            (i32.and
              (i32.load align=4
                (i32.const 4284))
              (i32.const 1))
            (i32.const 0))
          (then
            (i32.store align=4
              (get_local 1)
              (i32.const 237))
            (call $initclass_cbv_VisualizerRuntime)
            (if
              (i32.ne
                (i32.load align=4
                  (get_local 1))
                (i32.const 237))
              (then
                ;; com/babuhub/visualizer/VisualizerRuntime.java:299
                (set_local 0
                  (i32.const 0))
                ;; com/babuhub/visualizer/VisualizerRuntime.java:299
                (br $block_0)))))
        ;; com/babuhub/visualizer/VisualizerRuntime.java:299
        (set_local 0
          (i32.load align=4
            (i32.const 4252))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:299
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:299
      (return
        (get_local 0))))

  ;; function #216
  (func $getOutput (export "getOutput") (type $type2)
    (local i32 i32 i32)
    (block i32
      (block $block_1
        (block $block_0
          (set_local 1
            (call $meth_otbw_WasmRuntime_allocStack
              (i32.const 1)))
          (if
            (i32.eq
              (i32.and
                (i32.load align=4
                  (i32.const 4284))
                (i32.const 1))
              (i32.const 0))
            (then
              (i32.store offset=4 align=4
                (get_local 1)
                (i32.const 0))
              (i32.store align=4
                (get_local 1)
                (i32.const 238))
              (call $initclass_cbv_VisualizerRuntime)
              (if
                (i32.ne
                  (i32.load align=4
                    (get_local 1))
                  (i32.const 238))
                (then
                  (br $block_0)))))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:307
          (set_local 0
            (i32.load align=4
              (i32.const 4256)))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:307
            (i32.eq
              (get_local 0)
              (i32.const 0))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:307
              (i32.store offset=4 align=4
                (get_local 1)
                (i32.const 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:307
              (i32.store align=4
                (get_local 1)
                (i32.const 240))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:307
              (call $teavm_throwNullPointerException))
            (else
              ;; com/babuhub/visualizer/VisualizerRuntime.java:307
              (i32.store offset=4 align=4
                (get_local 1)
                (get_local 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:307
              (i32.store align=4
                (get_local 1)
                (i32.const 239))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:307
              (set_local 0
                (block i32
                  (set_local 2
                    (get_local 0))
                  (call_indirect $type1
                    (i32.load align=4
                      (i32.add
                        (i32.shl
                          (i32.load align=4
                            (get_local 2))
                          (i32.const 3))
                        (i32.const 88)))
                    (get_local 2))))
              (if
                ;; com/babuhub/visualizer/VisualizerRuntime.java:307
                (i32.eq
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:307
                  (i32.load align=4
                    (get_local 1))
                  (i32.const 239))
                (then
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:307
                  (br $block_1))))))
        ;; com/babuhub/visualizer/VisualizerRuntime.java:307
        (set_local 0
          (i32.const 0)))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:307
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:307
      (return
        (get_local 0))))

  ;; function #217
  (func $reset (export "reset") (type $type3)
    (local i32 i32 i32)
    (block
      (block $block_1
        (block $block_0
          (set_local 1
            (call $meth_otbw_WasmRuntime_allocStack
              (i32.const 1)))
          (if
            (i32.eq
              (i32.and
                (i32.load align=4
                  (i32.const 4284))
                (i32.const 1))
              (i32.const 0))
            (then
              (i32.store offset=4 align=4
                (get_local 1)
                (i32.const 0))
              (i32.store align=4
                (get_local 1)
                (i32.const 241))
              (call $initclass_cbv_VisualizerRuntime)
              (if
                (i32.ne
                  (i32.load align=4
                    (get_local 1))
                  (i32.const 241))
                (then
                  (br $block_0)))))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:315
          (i32.store align=4
            ;; com/babuhub/visualizer/VisualizerRuntime.java:315
            (i32.const 4248)
            (i32.const 0))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:316
          (i32.store align=4
            ;; com/babuhub/visualizer/VisualizerRuntime.java:316
            (i32.const 4252)
            (i32.const 0))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:317
          (set_local 0
            (i32.load align=4
              (i32.const 4256)))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:317
            (i32.eq
              (get_local 0)
              (i32.const 0))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:317
              (i32.store offset=4 align=4
                (get_local 1)
                (i32.const 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:317
              (i32.store align=4
                (get_local 1)
                (i32.const 243))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:317
              (call $teavm_throwNullPointerException))
            (else
              ;; com/babuhub/visualizer/VisualizerRuntime.java:317
              (i32.store offset=4 align=4
                (get_local 1)
                (get_local 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:317
              (i32.store align=4
                (get_local 1)
                (i32.const 242))
              (block
                (set_local 2
                  (get_local 0))
                (call_indirect $type6
                  (i32.load align=4
                    (i32.add
                      (i32.shl
                        (i32.load align=4
                          (get_local 2))
                        (i32.const 3))
                      (i32.const 136)))
                  (get_local 2)
                  (i32.const 0)))
              (if
                ;; com/babuhub/visualizer/VisualizerRuntime.java:317
                (i32.eq
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:317
                  (i32.load align=4
                    (get_local 1))
                  (i32.const 242))
                (then
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:318
                  (i32.store align=4
                    ;; com/babuhub/visualizer/VisualizerRuntime.java:318
                    (i32.const 4260)
                    (i32.const 0))
                  ;; com/babuhub/visualizer/VisualizerRuntime.java:319
                  (br $block_1)))))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:319
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #218
  (func $isInitialized (export "isInitialized") (type $type2)
    (local i32 i32)
    (block i32
      (block $block_0
        (set_local 1
          (call $meth_otbw_WasmRuntime_allocStack
            (i32.const 0)))
        (if
          (i32.eq
            (i32.and
              (i32.load align=4
                (i32.const 4284))
              (i32.const 1))
            (i32.const 0))
          (then
            (i32.store align=4
              (get_local 1)
              (i32.const 244))
            (call $initclass_cbv_VisualizerRuntime)
            (if
              (i32.ne
                (i32.load align=4
                  (get_local 1))
                (i32.const 244))
              (then
                ;; com/babuhub/visualizer/VisualizerRuntime.java:326
                (set_local 0
                  (i32.const 0))
                ;; com/babuhub/visualizer/VisualizerRuntime.java:326
                (br $block_0)))))
        ;; com/babuhub/visualizer/VisualizerRuntime.java:326
        (set_local 0
          (i32.load8_s align=1
            (i32.const 4244))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:326
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:326
      (return
        (get_local 0))))

  ;; function #219
  (func $meth_cbv_VisualizerRuntime__clinit_ (type $type3)
    (local i32 i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:16
      (i32.store8 align=1
        ;; com/babuhub/visualizer/VisualizerRuntime.java:16
        (i32.const 4244)
        (i32.const 0))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:17
      (i32.store align=4
        ;; com/babuhub/visualizer/VisualizerRuntime.java:17
        (i32.const 4248)
        (i32.const 0))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:18
      (i32.store align=4
        ;; com/babuhub/visualizer/VisualizerRuntime.java:18
        (i32.const 4252)
        (i32.const 0))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:19
      (i32.store offset=4 align=4
        (get_local 1)
        (i32.const 0))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:19
      (i32.store align=4
        (get_local 1)
        (i32.const 245))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:19
      (set_local 0
        (call $meth_otr_Allocator_allocate
          (i32.const 2920)))
      (if
        ;; com/babuhub/visualizer/VisualizerRuntime.java:19
        (i32.eq
          ;; com/babuhub/visualizer/VisualizerRuntime.java:19
          (i32.load align=4
            (get_local 1))
          (i32.const 245))
        (then
          ;; com/babuhub/visualizer/VisualizerRuntime.java:19
          (i32.store offset=4 align=4
            (get_local 1)
            (get_local 0))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:19
          (i32.store align=4
            (get_local 1)
            (i32.const 246))
          ;; com/babuhub/visualizer/VisualizerRuntime.java:19
          (call $meth_jl_StringBuilder__init_
            (get_local 0))
          (if
            ;; com/babuhub/visualizer/VisualizerRuntime.java:19
            (i32.eq
              ;; com/babuhub/visualizer/VisualizerRuntime.java:19
              (i32.load align=4
                (get_local 1))
              (i32.const 246))
            (then
              ;; com/babuhub/visualizer/VisualizerRuntime.java:19
              (i32.store align=4
                ;; com/babuhub/visualizer/VisualizerRuntime.java:19
                (i32.const 4256)
                (get_local 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:20
              (i32.store align=4
                ;; com/babuhub/visualizer/VisualizerRuntime.java:20
                (i32.const 4260)
                (i32.const 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:23
              (i32.store align=4
                ;; com/babuhub/visualizer/VisualizerRuntime.java:23
                (i32.const 4264)
                (i32.const 0))
              ;; com/babuhub/visualizer/VisualizerRuntime.java:24
              (i32.store align=4
                ;; com/babuhub/visualizer/VisualizerRuntime.java:24
                (i32.const 4268)
                (i32.const 0))))))
      ;; com/babuhub/visualizer/VisualizerRuntime.java:24
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #220
  (func $meth_jl_RuntimeException__init_ (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TRuntimeException.java:25
      (i32.store align=4
        (get_local 1)
        (i32.const 247))
      ;; org/teavm/classlib/java/lang/TRuntimeException.java:25
      (call $meth_jl_Exception__init_
        (get_local 0))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/classlib/java/lang/TRuntimeException.java:26
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #221
  (func $meth_jl_ArrayIndexOutOfBoundsException__init_ (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TArrayIndexOutOfBoundsException.java:22
      (i32.store align=4
        (get_local 1)
        (i32.const 248))
      ;; org/teavm/classlib/java/lang/TArrayIndexOutOfBoundsException.java:22
      (call $meth_jl_IndexOutOfBoundsException__init_
        (get_local 0))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/classlib/java/lang/TArrayIndexOutOfBoundsException.java:23
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #222
  (func $meth_jl_IllegalArgumentException__init_ (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TIllegalArgumentException.java:22
      (i32.store align=4
        (get_local 1)
        (i32.const 249))
      ;; org/teavm/classlib/java/lang/TIllegalArgumentException.java:22
      (call $meth_jl_RuntimeException__init_
        (get_local 0))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/classlib/java/lang/TIllegalArgumentException.java:23
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #223
  (func $teavm_processQueue (export "teavm_processQueue") (type $type11)
    (local i64 i32 i32 i64 i64 i32 i32 i32)
    (block i64
      (set_local 6
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 2)))
      (block $block_1
        (if
          (i32.eq
            (i32.load align=4
              ;; org/teavm/runtime/EventQueue.java:76
              (i32.const 4600))
            (i32.const 0))
          (then
            ;; org/teavm/runtime/EventQueue.java:77
            (set_local 0
              (i64.const -1)))
          (else
            (block $block_0
              ;; org/teavm/runtime/EventQueue.java:80
              (set_local 1
                (i32.load align=4
                  (i32.const 4596)))
              (if
                ;; org/teavm/runtime/EventQueue.java:80
                (i32.eq
                  (get_local 1)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/EventQueue.java:80
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (i32.const 0))
                  ;; org/teavm/runtime/EventQueue.java:80
                  (i32.store offset=8 align=4
                    (get_local 6)
                    (i32.const 0))
                  ;; org/teavm/runtime/EventQueue.java:80
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 252))
                  ;; org/teavm/runtime/EventQueue.java:80
                  (call $teavm_throwNullPointerException)
                  ;; org/teavm/runtime/EventQueue.java:80
                  (br $block_0)))
              ;; org/teavm/runtime/EventQueue.java:80
              (set_local 1
                (get_local 1))
              (if
                ;; org/teavm/runtime/EventQueue.java:80
                (i32.ge_s
                  (i32.const 0)
                  (i32.load align=4
                    (i32.add
                      (get_local 1)
                      (i32.const 8))))
                (then
                  ;; org/teavm/runtime/EventQueue.java:80
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (i32.const 0))
                  ;; org/teavm/runtime/EventQueue.java:80
                  (i32.store offset=8 align=4
                    (get_local 6)
                    (i32.const 0))
                  ;; org/teavm/runtime/EventQueue.java:80
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 254))
                  ;; org/teavm/runtime/EventQueue.java:80
                  (call $teavm_throwArrayIndexOutOfBoundsException)
                  ;; org/teavm/runtime/EventQueue.java:80
                  (br $block_0)))
              ;; org/teavm/runtime/EventQueue.java:80
              (set_local 2
                (i32.load align=4
                  (i32.add
                    (i32.add
                      (get_local 1)
                      (i32.const 12))
                    (i32.shl
                      (i32.const 0)
                      (i32.const 2)))))
              ;; org/teavm/runtime/EventQueue.java:81
              (i32.store offset=4 align=4
                (get_local 6)
                (get_local 2))
              ;; org/teavm/runtime/EventQueue.java:81
              (i32.store offset=8 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/EventQueue.java:81
              (i32.store align=4
                (get_local 6)
                (i32.const 253))
              ;; org/teavm/runtime/EventQueue.java:81
              (set_local 3
                ;; org/teavm/runtime/EventQueue.java:81
                (call $meth_jl_System_currentTimeMillis))
              (if
                ;; org/teavm/runtime/EventQueue.java:81
                (i32.ne
                  ;; org/teavm/runtime/EventQueue.java:81
                  (i32.load align=4
                    (get_local 6))
                  (i32.const 253))
                (then
                  ;; org/teavm/runtime/EventQueue.java:81
                  (br $block_0)))
              (if
                ;; org/teavm/runtime/EventQueue.java:82
                (i32.eq
                  (get_local 2)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/EventQueue.java:82
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (i32.const 0))
                  ;; org/teavm/runtime/EventQueue.java:82
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 256))
                  ;; org/teavm/runtime/EventQueue.java:82
                  (call $teavm_throwNullPointerException)
                  ;; org/teavm/runtime/EventQueue.java:82
                  (br $block_0)))
              ;; org/teavm/runtime/EventQueue.java:82
              (set_local 4
                (i64.load offset=16 align=8
                  (get_local 2)))
              ;; org/teavm/runtime/EventQueue.java:82
              (i32.store align=4
                (get_local 6)
                (i32.const 255))
              ;; org/teavm/runtime/EventQueue.java:82
              (set_local 0
                ;; org/teavm/runtime/EventQueue.java:82
                (call $meth_jl_System_currentTimeMillis))
              (if
                ;; org/teavm/runtime/EventQueue.java:82
                (i32.ne
                  ;; org/teavm/runtime/EventQueue.java:82
                  (i32.load align=4
                    (get_local 6))
                  (i32.const 255))
                (then
                  ;; org/teavm/runtime/EventQueue.java:82
                  (br $block_0)))
              (if
                ;; org/teavm/runtime/EventQueue.java:82
                (i64.gt_s
                  (get_local 4)
                  (get_local 0))
                (then
                  ;; org/teavm/runtime/EventQueue.java:90
                  (set_local 0
                    (i64.sub
                      (i64.load offset=16 align=8
                        (get_local 2))
                      (get_local 3)))
                  ;; org/teavm/runtime/EventQueue.java:90
                  (br $block_1)))
              ;; org/teavm/runtime/EventQueue.java:83
              (i32.store align=4
                (get_local 6)
                (i32.const 250))
              ;; org/teavm/runtime/EventQueue.java:83
              (call $meth_otr_EventQueue_remove
                (i32.const 0))
              (if
                ;; org/teavm/runtime/EventQueue.java:83
                (i32.ne
                  ;; org/teavm/runtime/EventQueue.java:83
                  (i32.load align=4
                    (get_local 6))
                  (i32.const 250))
                (then
                  ;; org/teavm/runtime/EventQueue.java:83
                  (br $block_0)))
              ;; org/teavm/runtime/EventQueue.java:84
              (set_local 5
                (i32.load offset=12 align=4
                  (get_local 2)))
              (if
                ;; org/teavm/runtime/EventQueue.java:84
                (i32.eq
                  (get_local 5)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/EventQueue.java:84
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (i32.const 0))
                  ;; org/teavm/runtime/EventQueue.java:84
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 258))
                  ;; org/teavm/runtime/EventQueue.java:84
                  (call $teavm_throwNullPointerException)
                  ;; org/teavm/runtime/EventQueue.java:84
                  (br $block_0)))
              ;; org/teavm/runtime/EventQueue.java:84
              (i32.store offset=8 align=4
                (get_local 6)
                (get_local 5))
              ;; org/teavm/runtime/EventQueue.java:84
              (i32.store align=4
                (get_local 6)
                (i32.const 257))
              (unreachable)
              (if
                ;; org/teavm/runtime/EventQueue.java:84
                (i32.ne
                  ;; org/teavm/runtime/EventQueue.java:84
                  (i32.load align=4
                    (get_local 6))
                  (i32.const 257))
                (then
                  ;; org/teavm/runtime/EventQueue.java:84
                  (br $block_0)))
              (if
                (i32.eq
                  (i32.load align=4
                    ;; org/teavm/runtime/EventQueue.java:85
                    (i32.const 4600))
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/EventQueue.java:86
                  (set_local 0
                    (i64.const -1))
                  ;; org/teavm/runtime/EventQueue.java:86
                  (br $block_1)))
              ;; org/teavm/runtime/EventQueue.java:88
              (set_local 4
                (i64.sub
                  (i64.load offset=16 align=8
                    (get_local 2))
                  (get_local 3)))
              ;; org/teavm/runtime/EventQueue.java:88
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/EventQueue.java:88
              (i32.store offset=8 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/EventQueue.java:88
              (i32.store align=4
                (get_local 6)
                (i32.const 251))
              ;; org/teavm/runtime/EventQueue.java:88
              (set_local 0
                ;; org/teavm/runtime/EventQueue.java:88
                (call $meth_jl_Math_max_0
                  (i64.const 0)
                  (get_local 4)))
              (if
                ;; org/teavm/runtime/EventQueue.java:88
                (i32.ne
                  ;; org/teavm/runtime/EventQueue.java:88
                  (i32.load align=4
                    (get_local 6))
                  (i32.const 251))
                (then
                  ;; org/teavm/runtime/EventQueue.java:88
                  (br $block_0)))
              ;; org/teavm/runtime/EventQueue.java:88
              (br $block_1))
            ;; org/teavm/runtime/EventQueue.java:88
            (set_local 0
              (i64.const 0)))))
      ;; org/teavm/runtime/EventQueue.java:88
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 6)
          (i32.const 4)))
      ;; org/teavm/runtime/EventQueue.java:88
      (return
        (get_local 0))))

  ;; function #224
  (func $teavm_stopped (export "teavm_stopped") (type $type2)
    ;; org/teavm/runtime/EventQueue.java:96
    (return
      (i32.load8_s align=1
        ;; org/teavm/runtime/EventQueue.java:96
        (i32.const 4604))))

  ;; function #225
  (func $meth_otr_EventQueue_stop (type $type3)
    (block
      ;; org/teavm/runtime/EventQueue.java:100
      (i32.store8 align=1
        ;; org/teavm/runtime/EventQueue.java:100
        (i32.const 4604)
        (i32.const 1))))

  ;; function #226
  (func $meth_otr_EventQueue_remove (type $type0)
    (local i32 i32 i32 i32 i32)
    (block
      (set_local 5
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (block $block_5
        (block $block_0
          (block $block_3
            ;; org/teavm/runtime/EventQueue.java:116
            (i32.store align=4
              ;; org/teavm/runtime/EventQueue.java:116
              (i32.const 4600)
              ;; org/teavm/runtime/EventQueue.java:116
              (i32.sub
                (i32.load align=4
                  ;; org/teavm/runtime/EventQueue.java:116
                  (i32.const 4600))
                (i32.const 1)))
            (if
              ;; org/teavm/runtime/EventQueue.java:117
              (i32.lt_s
                (get_local 0)
                (i32.load align=4
                  ;; org/teavm/runtime/EventQueue.java:117
                  (i32.const 4600)))
              (then
                ;; org/teavm/runtime/EventQueue.java:118
                (set_local 1
                  (i32.load align=4
                    (i32.const 4596)))
                ;; org/teavm/runtime/EventQueue.java:118
                (set_local 2
                  (i32.load align=4
                    (i32.const 4596)))
                ;; org/teavm/runtime/EventQueue.java:118
                (set_local 3
                  (i32.load align=4
                    (i32.const 4600)))
                (if
                  ;; org/teavm/runtime/EventQueue.java:118
                  (i32.eq
                    (get_local 2)
                    (i32.const 0))
                  (then
                    ;; org/teavm/runtime/EventQueue.java:118
                    (i32.store align=4
                      (get_local 5)
                      (i32.const 261))
                    ;; org/teavm/runtime/EventQueue.java:118
                    (call $teavm_throwNullPointerException)
                    ;; org/teavm/runtime/EventQueue.java:118
                    (br $block_0)))
                ;; org/teavm/runtime/EventQueue.java:118
                (set_local 2
                  (get_local 2))
                (if
                  ;; org/teavm/runtime/EventQueue.java:118
                  (block $block_1 i32
                    (drop
                      (br_if $block_1
                        ;; org/teavm/runtime/EventQueue.java:118
                        (i32.const 0)
                        ;; org/teavm/runtime/EventQueue.java:118
                        (i32.lt_s
                          (get_local 3)
                          (i32.const 0))))
                    ;; org/teavm/runtime/EventQueue.java:118
                    (i32.lt_s
                      (get_local 3)
                      (i32.load align=4
                        (i32.add
                          (get_local 2)
                          (i32.const 8)))))
                  (then
                    ;; org/teavm/runtime/EventQueue.java:118
                    (set_local 4
                      (i32.load align=4
                        (i32.add
                          (i32.add
                            (get_local 2)
                            (i32.const 12))
                          (i32.shl
                            (get_local 3)
                            (i32.const 2)))))
                    (if
                      ;; org/teavm/runtime/EventQueue.java:118
                      (i32.eq
                        (get_local 1)
                        (i32.const 0))
                      (then
                        ;; org/teavm/runtime/EventQueue.java:118
                        (i32.store align=4
                          (get_local 5)
                          (i32.const 263))
                        ;; org/teavm/runtime/EventQueue.java:118
                        (call $teavm_throwNullPointerException)
                        ;; org/teavm/runtime/EventQueue.java:118
                        (br $block_0)))
                    ;; org/teavm/runtime/EventQueue.java:118
                    (set_local 1
                      (get_local 1))
                    (if
                      ;; org/teavm/runtime/EventQueue.java:118
                      (block $block_2 i32
                        (drop
                          (br_if $block_2
                            ;; org/teavm/runtime/EventQueue.java:118
                            (i32.const 0)
                            ;; org/teavm/runtime/EventQueue.java:118
                            (i32.lt_s
                              (get_local 0)
                              (i32.const 0))))
                        ;; org/teavm/runtime/EventQueue.java:118
                        (i32.lt_s
                          (get_local 0)
                          (i32.load align=4
                            (i32.add
                              (get_local 1)
                              (i32.const 8)))))
                      (then
                        (i32.store8 align=1
                          (i32.add
                            (i32.load align=4
                              (i32.const 3992))
                            (i32.div_s
                              (i32.sub
                                (get_local 1)
                                (i32.load align=4
                                  (i32.const 3996)))
                              (i32.const 1024)))
                          (i32.const 0))
                        (i32.store align=4
                          (i32.add
                            (i32.add
                              (get_local 1)
                              (i32.const 12))
                            (i32.shl
                              (get_local 0)
                              (i32.const 2)))
                          (get_local 4))
                        ;; org/teavm/runtime/EventQueue.java:119
                        (i32.store align=4
                          (get_local 5)
                          (i32.const 264))
                        ;; org/teavm/runtime/EventQueue.java:119
                        (call $meth_otr_EventQueue_update
                          (get_local 0))
                        (if
                          ;; org/teavm/runtime/EventQueue.java:119
                          (i32.eq
                            ;; org/teavm/runtime/EventQueue.java:119
                            (i32.load align=4
                              (get_local 5))
                            (i32.const 264))
                          (then
                            ;; org/teavm/runtime/EventQueue.java:119
                            (br $block_3))
                          (else
                            ;; org/teavm/runtime/EventQueue.java:119
                            (br $block_0)))))
                    ;; org/teavm/runtime/EventQueue.java:118
                    (i32.store align=4
                      (get_local 5)
                      (i32.const 265))
                    ;; org/teavm/runtime/EventQueue.java:118
                    (call $teavm_throwArrayIndexOutOfBoundsException)
                    ;; org/teavm/runtime/EventQueue.java:118
                    (br $block_0)))
                ;; org/teavm/runtime/EventQueue.java:118
                (i32.store align=4
                  (get_local 5)
                  (i32.const 262))
                ;; org/teavm/runtime/EventQueue.java:118
                (call $teavm_throwArrayIndexOutOfBoundsException)
                ;; org/teavm/runtime/EventQueue.java:118
                (br $block_0))))
          ;; org/teavm/runtime/EventQueue.java:121
          (set_local 1
            (i32.load align=4
              (i32.const 4596)))
          ;; org/teavm/runtime/EventQueue.java:121
          (set_local 3
            (i32.load align=4
              (i32.const 4600)))
          ;; org/teavm/runtime/EventQueue.java:121
          (set_local 4
            (i32.const 0))
          (if
            ;; org/teavm/runtime/EventQueue.java:121
            (i32.eq
              (get_local 1)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/EventQueue.java:121
              (i32.store align=4
                (get_local 5)
                (i32.const 259))
              ;; org/teavm/runtime/EventQueue.java:121
              (call $teavm_throwNullPointerException))
            (else
              ;; org/teavm/runtime/EventQueue.java:121
              (set_local 1
                (get_local 1))
              (if
                ;; org/teavm/runtime/EventQueue.java:121
                (block $block_4 i32
                  (drop
                    (br_if $block_4
                      ;; org/teavm/runtime/EventQueue.java:121
                      (i32.const 0)
                      ;; org/teavm/runtime/EventQueue.java:121
                      (i32.lt_s
                        (get_local 3)
                        (i32.const 0))))
                  ;; org/teavm/runtime/EventQueue.java:121
                  (i32.lt_s
                    (get_local 3)
                    (i32.load align=4
                      (i32.add
                        (get_local 1)
                        (i32.const 8)))))
                (then
                  (i32.store align=4
                    (i32.add
                      (i32.add
                        (get_local 1)
                        (i32.const 12))
                      (i32.shl
                        (get_local 3)
                        (i32.const 2)))
                    (get_local 4))
                  ;; org/teavm/runtime/EventQueue.java:122
                  (br $block_5)))
              ;; org/teavm/runtime/EventQueue.java:121
              (i32.store align=4
                (get_local 5)
                (i32.const 260))
              ;; org/teavm/runtime/EventQueue.java:121
              (call $teavm_throwArrayIndexOutOfBoundsException)))))
      ;; org/teavm/runtime/EventQueue.java:121
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 5)
          (i32.const 4)))))

  ;; function #227
  (func $meth_otr_EventQueue_update (type $type0)
    (local i32 i32 i32 i32 i32 i64 i32 i32)
    (block
      (set_local 8
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      (block $block_9
        (block $block_2
          ;; org/teavm/runtime/EventQueue.java:125
          (set_local 1
            (i32.load align=4
              (i32.const 4596)))
          (if
            ;; org/teavm/runtime/EventQueue.java:125
            (i32.eq
              (get_local 1)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/EventQueue.java:125
              (i32.store align=4
                (get_local 8)
                (i32.const 266))
              ;; org/teavm/runtime/EventQueue.java:125
              (call $teavm_throwNullPointerException))
            (else
              ;; org/teavm/runtime/EventQueue.java:125
              (set_local 1
                (get_local 1))
              (if
                ;; org/teavm/runtime/EventQueue.java:125
                (block $block_0 i32
                  (drop
                    (br_if $block_0
                      ;; org/teavm/runtime/EventQueue.java:125
                      (i32.const 0)
                      ;; org/teavm/runtime/EventQueue.java:125
                      (i32.lt_s
                        (get_local 0)
                        (i32.const 0))))
                  ;; org/teavm/runtime/EventQueue.java:125
                  (i32.lt_s
                    (get_local 0)
                    (i32.load align=4
                      (i32.add
                        (get_local 1)
                        (i32.const 8)))))
                (then
                  ;; org/teavm/runtime/EventQueue.java:125
                  (set_local 2
                    (i32.load align=4
                      (i32.add
                        (i32.add
                          (get_local 1)
                          (i32.const 12))
                        (i32.shl
                          (get_local 0)
                          (i32.const 2)))))
                  (block $block_1
                    (block $block_3
                      (block $block_4
                        (block $block_5
                          (block $block_6
                            (loop $block_7
                              ;; org/teavm/runtime/EventQueue.java:127
                              (set_local 3
                                (i32.add
                                  ;; org/teavm/runtime/EventQueue.java:127
                                  (i32.mul
                                    (get_local 0)
                                    (i32.const 2))
                                  (i32.const 1)))
                              ;; org/teavm/runtime/EventQueue.java:128
                              (set_local 4
                                (i32.add
                                  (get_local 3)
                                  (i32.const 1)))
                              (if
                                ;; org/teavm/runtime/EventQueue.java:130
                                (i32.ge_s
                                  (get_local 3)
                                  (i32.load align=4
                                    ;; org/teavm/runtime/EventQueue.java:130
                                    (i32.const 4600)))
                                (then
                                  ;; org/teavm/runtime/EventQueue.java:131
                                  (br $block_1)))
                              (if
                                ;; org/teavm/runtime/EventQueue.java:132
                                (i32.ge_s
                                  (get_local 4)
                                  (i32.load align=4
                                    ;; org/teavm/runtime/EventQueue.java:132
                                    (i32.const 4600)))
                                (then
                                  ;; org/teavm/runtime/EventQueue.java:132
                                  (set_local 4
                                    (get_local 3)))
                                (else
                                  ;; org/teavm/runtime/EventQueue.java:132
                                  (set_local 1
                                    (i32.load align=4
                                      (i32.const 4596)))
                                  (if
                                    ;; org/teavm/runtime/EventQueue.java:132
                                    (i32.eq
                                      (get_local 1)
                                      (i32.const 0))
                                    (then
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (i32.store align=4
                                        (get_local 8)
                                        (i32.const 270))
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (call $teavm_throwNullPointerException)
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (br $block_2)))
                                  ;; org/teavm/runtime/EventQueue.java:132
                                  (set_local 1
                                    (get_local 1))
                                  (if
                                    ;; org/teavm/runtime/EventQueue.java:132
                                    (i32.lt_s
                                      (get_local 3)
                                      (i32.const 0))
                                    (then
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (br $block_3)))
                                  (if
                                    ;; org/teavm/runtime/EventQueue.java:132
                                    (i32.ge_s
                                      (get_local 3)
                                      (i32.load align=4
                                        (i32.add
                                          (get_local 1)
                                          (i32.const 8))))
                                    (then
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (br $block_3)))
                                  ;; org/teavm/runtime/EventQueue.java:132
                                  (set_local 5
                                    (i32.load align=4
                                      (i32.add
                                        (i32.add
                                          (get_local 1)
                                          (i32.const 12))
                                        (i32.shl
                                          (get_local 3)
                                          (i32.const 2)))))
                                  (if
                                    ;; org/teavm/runtime/EventQueue.java:132
                                    (i32.eq
                                      (get_local 5)
                                      (i32.const 0))
                                    (then
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (i32.store align=4
                                        (get_local 8)
                                        (i32.const 272))
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (call $teavm_throwNullPointerException)
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (br $block_2)))
                                  ;; org/teavm/runtime/EventQueue.java:132
                                  (set_local 6
                                    (i64.load offset=16 align=8
                                      (get_local 5)))
                                  ;; org/teavm/runtime/EventQueue.java:132
                                  (set_local 1
                                    (i32.load align=4
                                      (i32.const 4596)))
                                  (if
                                    ;; org/teavm/runtime/EventQueue.java:132
                                    (i32.eq
                                      (get_local 1)
                                      (i32.const 0))
                                    (then
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (i32.store align=4
                                        (get_local 8)
                                        (i32.const 273))
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (call $teavm_throwNullPointerException)
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (br $block_2)))
                                  ;; org/teavm/runtime/EventQueue.java:132
                                  (set_local 1
                                    (get_local 1))
                                  (if
                                    ;; org/teavm/runtime/EventQueue.java:132
                                    (i32.lt_s
                                      (get_local 4)
                                      (i32.const 0))
                                    (then
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (br $block_4)))
                                  (if
                                    ;; org/teavm/runtime/EventQueue.java:132
                                    (i32.ge_s
                                      (get_local 4)
                                      (i32.load align=4
                                        (i32.add
                                          (get_local 1)
                                          (i32.const 8))))
                                    (then
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (br $block_4)))
                                  ;; org/teavm/runtime/EventQueue.java:132
                                  (set_local 5
                                    (i32.load align=4
                                      (i32.add
                                        (i32.add
                                          (get_local 1)
                                          (i32.const 12))
                                        (i32.shl
                                          (get_local 4)
                                          (i32.const 2)))))
                                  (if
                                    ;; org/teavm/runtime/EventQueue.java:132
                                    (i32.eq
                                      (get_local 5)
                                      (i32.const 0))
                                    (then
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (i32.store align=4
                                        (get_local 8)
                                        (i32.const 275))
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (call $teavm_throwNullPointerException)
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (br $block_2)))
                                  (if
                                    ;; org/teavm/runtime/EventQueue.java:132
                                    (i64.lt_s
                                      (get_local 6)
                                      (i64.load offset=16 align=8
                                        (get_local 5)))
                                    (then
                                      ;; org/teavm/runtime/EventQueue.java:132
                                      (set_local 4
                                        (get_local 3))))))
                              (if
                                ;; org/teavm/runtime/EventQueue.java:137
                                (i32.eq
                                  (get_local 2)
                                  (i32.const 0))
                                (then
                                  ;; org/teavm/runtime/EventQueue.java:137
                                  (i32.store align=4
                                    (get_local 8)
                                    (i32.const 276))
                                  ;; org/teavm/runtime/EventQueue.java:137
                                  (call $teavm_throwNullPointerException)
                                  ;; org/teavm/runtime/EventQueue.java:137
                                  (br $block_2)))
                              ;; org/teavm/runtime/EventQueue.java:137
                              (set_local 6
                                (i64.load offset=16 align=8
                                  (get_local 2)))
                              ;; org/teavm/runtime/EventQueue.java:137
                              (set_local 1
                                (i32.load align=4
                                  (i32.const 4596)))
                              (if
                                ;; org/teavm/runtime/EventQueue.java:137
                                (i32.eq
                                  (get_local 1)
                                  (i32.const 0))
                                (then
                                  ;; org/teavm/runtime/EventQueue.java:137
                                  (i32.store align=4
                                    (get_local 8)
                                    (i32.const 277))
                                  ;; org/teavm/runtime/EventQueue.java:137
                                  (call $teavm_throwNullPointerException)
                                  ;; org/teavm/runtime/EventQueue.java:137
                                  (br $block_2)))
                              ;; org/teavm/runtime/EventQueue.java:137
                              (set_local 1
                                (get_local 1))
                              (if
                                ;; org/teavm/runtime/EventQueue.java:137
                                (i32.lt_s
                                  (get_local 4)
                                  (i32.const 0))
                                (then
                                  ;; org/teavm/runtime/EventQueue.java:137
                                  (br $block_5)))
                              (if
                                ;; org/teavm/runtime/EventQueue.java:137
                                (i32.ge_s
                                  (get_local 4)
                                  (i32.load align=4
                                    (i32.add
                                      (get_local 1)
                                      (i32.const 8))))
                                (then
                                  ;; org/teavm/runtime/EventQueue.java:137
                                  (br $block_5)))
                              ;; org/teavm/runtime/EventQueue.java:137
                              (set_local 5
                                (i32.load align=4
                                  (i32.add
                                    (i32.add
                                      (get_local 1)
                                      (i32.const 12))
                                    (i32.shl
                                      (get_local 4)
                                      (i32.const 2)))))
                              (if
                                ;; org/teavm/runtime/EventQueue.java:137
                                (i32.eq
                                  (get_local 5)
                                  (i32.const 0))
                                (then
                                  ;; org/teavm/runtime/EventQueue.java:137
                                  (i32.store align=4
                                    (get_local 8)
                                    (i32.const 279))
                                  ;; org/teavm/runtime/EventQueue.java:137
                                  (call $teavm_throwNullPointerException)
                                  ;; org/teavm/runtime/EventQueue.java:137
                                  (br $block_2)))
                              (if
                                ;; org/teavm/runtime/EventQueue.java:137
                                (i64.le_s
                                  (get_local 6)
                                  (i64.load offset=16 align=8
                                    (get_local 5)))
                                (then
                                  ;; org/teavm/runtime/EventQueue.java:138
                                  (br $block_1)))
                              ;; org/teavm/runtime/EventQueue.java:140
                              (set_local 1
                                (i32.load align=4
                                  (i32.const 4596)))
                              ;; org/teavm/runtime/EventQueue.java:140
                              (set_local 7
                                (i32.load align=4
                                  (i32.const 4596)))
                              (if
                                ;; org/teavm/runtime/EventQueue.java:140
                                (i32.eq
                                  (get_local 7)
                                  (i32.const 0))
                                (then
                                  ;; org/teavm/runtime/EventQueue.java:140
                                  (i32.store align=4
                                    (get_local 8)
                                    (i32.const 280))
                                  ;; org/teavm/runtime/EventQueue.java:140
                                  (call $teavm_throwNullPointerException)
                                  ;; org/teavm/runtime/EventQueue.java:140
                                  (br $block_2)))
                              ;; org/teavm/runtime/EventQueue.java:140
                              (set_local 7
                                (get_local 7))
                              (if
                                ;; org/teavm/runtime/EventQueue.java:140
                                (i32.ge_s
                                  (get_local 4)
                                  (i32.load align=4
                                    (i32.add
                                      (get_local 7)
                                      (i32.const 8))))
                                (then
                                  ;; org/teavm/runtime/EventQueue.java:140
                                  (i32.store align=4
                                    (get_local 8)
                                    (i32.const 281))
                                  ;; org/teavm/runtime/EventQueue.java:140
                                  (call $teavm_throwArrayIndexOutOfBoundsException)
                                  ;; org/teavm/runtime/EventQueue.java:140
                                  (br $block_2)))
                              ;; org/teavm/runtime/EventQueue.java:140
                              (set_local 5
                                (i32.load align=4
                                  (i32.add
                                    (i32.add
                                      (get_local 7)
                                      (i32.const 12))
                                    (i32.shl
                                      (get_local 4)
                                      (i32.const 2)))))
                              (if
                                ;; org/teavm/runtime/EventQueue.java:140
                                (i32.eq
                                  (get_local 1)
                                  (i32.const 0))
                                (then
                                  ;; org/teavm/runtime/EventQueue.java:140
                                  (i32.store align=4
                                    (get_local 8)
                                    (i32.const 282))
                                  ;; org/teavm/runtime/EventQueue.java:140
                                  (call $teavm_throwNullPointerException)
                                  ;; org/teavm/runtime/EventQueue.java:140
                                  (br $block_2)))
                              ;; org/teavm/runtime/EventQueue.java:140
                              (set_local 1
                                (get_local 1))
                              (if
                                ;; org/teavm/runtime/EventQueue.java:140
                                (i32.lt_s
                                  (get_local 0)
                                  (i32.const 0))
                                (then
                                  ;; org/teavm/runtime/EventQueue.java:140
                                  (br $block_6)))
                              (if
                                ;; org/teavm/runtime/EventQueue.java:140
                                (i32.ge_s
                                  (get_local 0)
                                  (i32.load align=4
                                    (i32.add
                                      (get_local 1)
                                      (i32.const 8))))
                                (then
                                  ;; org/teavm/runtime/EventQueue.java:140
                                  (br $block_6)))
                              (i32.store8 align=1
                                (i32.add
                                  (i32.load align=4
                                    (i32.const 3992))
                                  (i32.div_s
                                    (i32.sub
                                      (get_local 1)
                                      (i32.load align=4
                                        (i32.const 3996)))
                                    (i32.const 1024)))
                                (i32.const 0))
                              (i32.store align=4
                                (i32.add
                                  (i32.add
                                    (get_local 1)
                                    (i32.const 12))
                                  (i32.shl
                                    (get_local 0)
                                    (i32.const 2)))
                                (get_local 5))
                              ;; org/teavm/runtime/EventQueue.java:140
                              (set_local 0
                                (get_local 4))
                              (br $block_7)))
                          ;; org/teavm/runtime/EventQueue.java:140
                          (i32.store align=4
                            (get_local 8)
                            (i32.const 283))
                          ;; org/teavm/runtime/EventQueue.java:140
                          (call $teavm_throwArrayIndexOutOfBoundsException)
                          ;; org/teavm/runtime/EventQueue.java:140
                          (br $block_2))
                        ;; org/teavm/runtime/EventQueue.java:137
                        (i32.store align=4
                          (get_local 8)
                          (i32.const 278))
                        ;; org/teavm/runtime/EventQueue.java:137
                        (call $teavm_throwArrayIndexOutOfBoundsException)
                        ;; org/teavm/runtime/EventQueue.java:137
                        (br $block_2))
                      ;; org/teavm/runtime/EventQueue.java:132
                      (i32.store align=4
                        (get_local 8)
                        (i32.const 274))
                      ;; org/teavm/runtime/EventQueue.java:132
                      (call $teavm_throwArrayIndexOutOfBoundsException)
                      ;; org/teavm/runtime/EventQueue.java:132
                      (br $block_2))
                    ;; org/teavm/runtime/EventQueue.java:132
                    (i32.store align=4
                      (get_local 8)
                      (i32.const 271))
                    ;; org/teavm/runtime/EventQueue.java:132
                    (call $teavm_throwArrayIndexOutOfBoundsException)
                    ;; org/teavm/runtime/EventQueue.java:132
                    (br $block_2))
                  ;; org/teavm/runtime/EventQueue.java:143
                  (set_local 1
                    (i32.load align=4
                      (i32.const 4596)))
                  (if
                    ;; org/teavm/runtime/EventQueue.java:143
                    (i32.eq
                      (get_local 1)
                      (i32.const 0))
                    (then
                      ;; org/teavm/runtime/EventQueue.java:143
                      (i32.store align=4
                        (get_local 8)
                        (i32.const 268))
                      ;; org/teavm/runtime/EventQueue.java:143
                      (call $teavm_throwNullPointerException))
                    (else
                      ;; org/teavm/runtime/EventQueue.java:143
                      (set_local 1
                        (get_local 1))
                      (if
                        ;; org/teavm/runtime/EventQueue.java:143
                        (block $block_8 i32
                          (drop
                            (br_if $block_8
                              ;; org/teavm/runtime/EventQueue.java:143
                              (i32.const 0)
                              ;; org/teavm/runtime/EventQueue.java:143
                              (i32.lt_s
                                (get_local 0)
                                (i32.const 0))))
                          ;; org/teavm/runtime/EventQueue.java:143
                          (i32.lt_s
                            (get_local 0)
                            (i32.load align=4
                              (i32.add
                                (get_local 1)
                                (i32.const 8)))))
                        (then
                          (i32.store8 align=1
                            (i32.add
                              (i32.load align=4
                                (i32.const 3992))
                              (i32.div_s
                                (i32.sub
                                  (get_local 1)
                                  (i32.load align=4
                                    (i32.const 3996)))
                                (i32.const 1024)))
                            (i32.const 0))
                          (i32.store align=4
                            (i32.add
                              (i32.add
                                (get_local 1)
                                (i32.const 12))
                              (i32.shl
                                (get_local 0)
                                (i32.const 2)))
                            (get_local 2))
                          ;; org/teavm/runtime/EventQueue.java:144
                          (br $block_9)))
                      ;; org/teavm/runtime/EventQueue.java:143
                      (i32.store align=4
                        (get_local 8)
                        (i32.const 269))
                      ;; org/teavm/runtime/EventQueue.java:143
                      (call $teavm_throwArrayIndexOutOfBoundsException))))
                (else
                  ;; org/teavm/runtime/EventQueue.java:125
                  (i32.store align=4
                    (get_local 8)
                    (i32.const 267))
                  ;; org/teavm/runtime/EventQueue.java:125
                  (call $teavm_throwArrayIndexOutOfBoundsException)))))))
      ;; org/teavm/runtime/EventQueue.java:143
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 8)
          (i32.const 4)))))

  ;; function #228
  (func $meth_otr_EventQueue__clinit_ (type $type3)
    (local i32 i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/runtime/EventQueue.java:26
      (i32.store align=4
        (get_local 1)
        (i32.const 284))
      ;; org/teavm/runtime/EventQueue.java:26
      (set_local 0
        (call $meth_otr_Allocator_allocateArray
          (i32.const 8304)
          (i32.const 16)))
      (if
        ;; org/teavm/runtime/EventQueue.java:26
        (i32.eq
          ;; org/teavm/runtime/EventQueue.java:26
          (i32.load align=4
            (get_local 1))
          (i32.const 284))
        (then
          ;; org/teavm/runtime/EventQueue.java:26
          (i32.store align=4
            ;; org/teavm/runtime/EventQueue.java:26
            (i32.const 4596)
            (get_local 0))))
      ;; org/teavm/runtime/EventQueue.java:26
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #229
  (func $meth_otr_Fiber__init_ (type $type7)
    (local i32)
    (block
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/runtime/Fiber.java:49
      (i32.store align=4
        (get_local 3)
        (i32.const 285))
      ;; org/teavm/runtime/Fiber.java:49
      (call $meth_jl_Object__init_
        (get_local 0))
      (if
        ;; org/teavm/runtime/Fiber.java:49
        (i32.eq
          ;; org/teavm/runtime/Fiber.java:49
          (i32.load align=4
            (get_local 3))
          (i32.const 285))
        (then
          (i32.store8 align=1
            (i32.add
              (i32.load align=4
                (i32.const 3992))
              (i32.div_s
                (i32.sub
                  (get_local 0)
                  (i32.load align=4
                    (i32.const 3996)))
                (i32.const 1024)))
            (i32.const 0))
          ;; org/teavm/runtime/Fiber.java:50
          (i32.store offset=52 align=4
            (get_local 0)
            (get_local 1))
          ;; org/teavm/runtime/Fiber.java:51
          (i32.store8 offset=64 align=1
            (get_local 0)
            (get_local 2))))
      ;; org/teavm/runtime/Fiber.java:52
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))))

  ;; function #230
  (func $meth_otr_Fiber_push (type $type6)
    (local i32 i32 i32 i32 i32)
    (block
      (set_local 6
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      (block $block_2
        (block $block_0
          (if
            ;; org/teavm/runtime/Fiber.java:55
            (i32.eq
              (i32.load offset=8 align=4
                (get_local 0))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/Fiber.java:56
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:56
              (i32.store align=4
                (get_local 6)
                (i32.const 286))
              ;; org/teavm/runtime/Fiber.java:56
              (set_local 2
                (call $meth_otr_Allocator_allocateArray
                  (i32.const 5648)
                  (i32.const 4)))
              (if
                ;; org/teavm/runtime/Fiber.java:56
                (i32.ne
                  ;; org/teavm/runtime/Fiber.java:56
                  (i32.load align=4
                    (get_local 6))
                  (i32.const 286))
                (then
                  ;; org/teavm/runtime/Fiber.java:56
                  (br $block_0)))
              (i32.store8 align=1
                (i32.add
                  (i32.load align=4
                    (i32.const 3992))
                  (i32.div_s
                    (i32.sub
                      (get_local 0)
                      (i32.load align=4
                        (i32.const 3996)))
                    (i32.const 1024)))
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:56
              (i32.store offset=8 align=4
                (get_local 0)
                (get_local 2)))
            (else
              ;; org/teavm/runtime/Fiber.java:57
              (set_local 3
                (i32.add
                  (i32.load offset=12 align=4
                    (get_local 0))
                  (i32.const 1)))
              ;; org/teavm/runtime/Fiber.java:57
              (set_local 2
                (i32.load offset=8 align=4
                  (get_local 0)))
              (if
                ;; org/teavm/runtime/Fiber.java:57
                (i32.eq
                  (get_local 2)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/Fiber.java:57
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (i32.const 0))
                  ;; org/teavm/runtime/Fiber.java:57
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 287))
                  ;; org/teavm/runtime/Fiber.java:57
                  (call $teavm_throwNullPointerException)
                  ;; org/teavm/runtime/Fiber.java:57
                  (br $block_0)))
              (if
                ;; org/teavm/runtime/Fiber.java:57
                (i32.eq
                  (get_local 3)
                  (i32.load align=4
                    (i32.add
                      (get_local 2)
                      (i32.const 8))))
                (then
                  ;; org/teavm/runtime/Fiber.java:58
                  (set_local 2
                    (i32.load offset=8 align=4
                      (get_local 0)))
                  ;; org/teavm/runtime/Fiber.java:58
                  (set_local 4
                    (i32.load offset=8 align=4
                      (get_local 0)))
                  (if
                    ;; org/teavm/runtime/Fiber.java:58
                    (i32.eq
                      (get_local 4)
                      (i32.const 0))
                    (then
                      ;; org/teavm/runtime/Fiber.java:58
                      (i32.store offset=4 align=4
                        (get_local 6)
                        (i32.const 0))
                      ;; org/teavm/runtime/Fiber.java:58
                      (i32.store align=4
                        (get_local 6)
                        (i32.const 291))
                      ;; org/teavm/runtime/Fiber.java:58
                      (call $teavm_throwNullPointerException)
                      ;; org/teavm/runtime/Fiber.java:58
                      (br $block_0)))
                  ;; org/teavm/runtime/Fiber.java:58
                  (set_local 3
                    (i32.div_s
                      ;; org/teavm/runtime/Fiber.java:58
                      (i32.mul
                        (i32.load align=4
                          (i32.add
                            (get_local 4)
                            (i32.const 8)))
                        (i32.const 3))
                      (i32.const 2)))
                  ;; org/teavm/runtime/Fiber.java:58
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (get_local 2))
                  ;; org/teavm/runtime/Fiber.java:58
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 290))
                  ;; org/teavm/runtime/Fiber.java:58
                  (set_local 2
                    ;; org/teavm/runtime/Fiber.java:58
                    (call $meth_ju_Arrays_copyOf_0
                      (get_local 2)
                      (get_local 3)))
                  (if
                    ;; org/teavm/runtime/Fiber.java:58
                    (i32.ne
                      ;; org/teavm/runtime/Fiber.java:58
                      (i32.load align=4
                        (get_local 6))
                      (i32.const 290))
                    (then
                      ;; org/teavm/runtime/Fiber.java:58
                      (br $block_0)))
                  (i32.store8 align=1
                    (i32.add
                      (i32.load align=4
                        (i32.const 3992))
                      (i32.div_s
                        (i32.sub
                          (get_local 0)
                          (i32.load align=4
                            (i32.const 3996)))
                        (i32.const 1024)))
                    (i32.const 0))
                  ;; org/teavm/runtime/Fiber.java:58
                  (i32.store offset=8 align=4
                    (get_local 0)
                    (get_local 2))))))
          ;; org/teavm/runtime/Fiber.java:60
          (set_local 2
            (i32.load offset=8 align=4
              (get_local 0)))
          ;; org/teavm/runtime/Fiber.java:60
          (set_local 5
            (i32.load offset=12 align=4
              (get_local 0)))
          ;; org/teavm/runtime/Fiber.java:60
          (i32.store offset=12 align=4
            (get_local 0)
            ;; org/teavm/runtime/Fiber.java:60
            (i32.add
              (get_local 5)
              (i32.const 1)))
          (if
            ;; org/teavm/runtime/Fiber.java:60
            (i32.eq
              (get_local 2)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/Fiber.java:60
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:60
              (i32.store align=4
                (get_local 6)
                (i32.const 288))
              ;; org/teavm/runtime/Fiber.java:60
              (call $teavm_throwNullPointerException))
            (else
              ;; org/teavm/runtime/Fiber.java:60
              (set_local 2
                (get_local 2))
              (if
                ;; org/teavm/runtime/Fiber.java:60
                (block $block_1 i32
                  (drop
                    (br_if $block_1
                      ;; org/teavm/runtime/Fiber.java:60
                      (i32.const 0)
                      ;; org/teavm/runtime/Fiber.java:60
                      (i32.lt_s
                        (get_local 5)
                        (i32.const 0))))
                  ;; org/teavm/runtime/Fiber.java:60
                  (i32.lt_s
                    (get_local 5)
                    (i32.load align=4
                      (i32.add
                        (get_local 2)
                        (i32.const 8)))))
                (then
                  (i32.store align=4
                    (i32.add
                      (i32.add
                        (get_local 2)
                        (i32.const 12))
                      (i32.shl
                        (get_local 5)
                        (i32.const 2)))
                    (get_local 1))
                  ;; org/teavm/runtime/Fiber.java:61
                  (br $block_2)))
              ;; org/teavm/runtime/Fiber.java:60
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:60
              (i32.store align=4
                (get_local 6)
                (i32.const 289))
              ;; org/teavm/runtime/Fiber.java:60
              (call $teavm_throwArrayIndexOutOfBoundsException)))))
      ;; org/teavm/runtime/Fiber.java:60
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 6)
          (i32.const 4)))))

  ;; function #231
  (func $meth_otr_Fiber_push_0 (type $type18)
    (local i32 i32 i32 i32 i32)
    (block
      (set_local 6
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      (block $block_2
        (block $block_0
          (if
            ;; org/teavm/runtime/Fiber.java:64
            (i32.eq
              (i32.load offset=16 align=4
                (get_local 0))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/Fiber.java:65
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:65
              (i32.store align=4
                (get_local 6)
                (i32.const 292))
              ;; org/teavm/runtime/Fiber.java:65
              (set_local 2
                (call $meth_otr_Allocator_allocateArray
                  (i32.const 5904)
                  (i32.const 4)))
              (if
                ;; org/teavm/runtime/Fiber.java:65
                (i32.ne
                  ;; org/teavm/runtime/Fiber.java:65
                  (i32.load align=4
                    (get_local 6))
                  (i32.const 292))
                (then
                  ;; org/teavm/runtime/Fiber.java:65
                  (br $block_0)))
              (i32.store8 align=1
                (i32.add
                  (i32.load align=4
                    (i32.const 3992))
                  (i32.div_s
                    (i32.sub
                      (get_local 0)
                      (i32.load align=4
                        (i32.const 3996)))
                    (i32.const 1024)))
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:65
              (i32.store offset=16 align=4
                (get_local 0)
                (get_local 2)))
            (else
              ;; org/teavm/runtime/Fiber.java:66
              (set_local 3
                (i32.add
                  (i32.load offset=20 align=4
                    (get_local 0))
                  (i32.const 1)))
              ;; org/teavm/runtime/Fiber.java:66
              (set_local 2
                (i32.load offset=16 align=4
                  (get_local 0)))
              (if
                ;; org/teavm/runtime/Fiber.java:66
                (i32.eq
                  (get_local 2)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/Fiber.java:66
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (i32.const 0))
                  ;; org/teavm/runtime/Fiber.java:66
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 293))
                  ;; org/teavm/runtime/Fiber.java:66
                  (call $teavm_throwNullPointerException)
                  ;; org/teavm/runtime/Fiber.java:66
                  (br $block_0)))
              (if
                ;; org/teavm/runtime/Fiber.java:66
                (i32.eq
                  (get_local 3)
                  (i32.load align=4
                    (i32.add
                      (get_local 2)
                      (i32.const 8))))
                (then
                  ;; org/teavm/runtime/Fiber.java:67
                  (set_local 2
                    (i32.load offset=16 align=4
                      (get_local 0)))
                  ;; org/teavm/runtime/Fiber.java:67
                  (set_local 4
                    (i32.load offset=16 align=4
                      (get_local 0)))
                  (if
                    ;; org/teavm/runtime/Fiber.java:67
                    (i32.eq
                      (get_local 4)
                      (i32.const 0))
                    (then
                      ;; org/teavm/runtime/Fiber.java:67
                      (i32.store offset=4 align=4
                        (get_local 6)
                        (i32.const 0))
                      ;; org/teavm/runtime/Fiber.java:67
                      (i32.store align=4
                        (get_local 6)
                        (i32.const 297))
                      ;; org/teavm/runtime/Fiber.java:67
                      (call $teavm_throwNullPointerException)
                      ;; org/teavm/runtime/Fiber.java:67
                      (br $block_0)))
                  ;; org/teavm/runtime/Fiber.java:67
                  (set_local 3
                    (i32.div_s
                      ;; org/teavm/runtime/Fiber.java:67
                      (i32.mul
                        (i32.load align=4
                          (i32.add
                            (get_local 4)
                            (i32.const 8)))
                        (i32.const 3))
                      (i32.const 2)))
                  ;; org/teavm/runtime/Fiber.java:67
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (get_local 2))
                  ;; org/teavm/runtime/Fiber.java:67
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 296))
                  ;; org/teavm/runtime/Fiber.java:67
                  (set_local 2
                    ;; org/teavm/runtime/Fiber.java:67
                    (call $meth_ju_Arrays_copyOf_1
                      (get_local 2)
                      (get_local 3)))
                  (if
                    ;; org/teavm/runtime/Fiber.java:67
                    (i32.ne
                      ;; org/teavm/runtime/Fiber.java:67
                      (i32.load align=4
                        (get_local 6))
                      (i32.const 296))
                    (then
                      ;; org/teavm/runtime/Fiber.java:67
                      (br $block_0)))
                  (i32.store8 align=1
                    (i32.add
                      (i32.load align=4
                        (i32.const 3992))
                      (i32.div_s
                        (i32.sub
                          (get_local 0)
                          (i32.load align=4
                            (i32.const 3996)))
                        (i32.const 1024)))
                    (i32.const 0))
                  ;; org/teavm/runtime/Fiber.java:67
                  (i32.store offset=16 align=4
                    (get_local 0)
                    (get_local 2))))))
          ;; org/teavm/runtime/Fiber.java:69
          (set_local 2
            (i32.load offset=16 align=4
              (get_local 0)))
          ;; org/teavm/runtime/Fiber.java:69
          (set_local 5
            (i32.load offset=20 align=4
              (get_local 0)))
          ;; org/teavm/runtime/Fiber.java:69
          (i32.store offset=20 align=4
            (get_local 0)
            ;; org/teavm/runtime/Fiber.java:69
            (i32.add
              (get_local 5)
              (i32.const 1)))
          (if
            ;; org/teavm/runtime/Fiber.java:69
            (i32.eq
              (get_local 2)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/Fiber.java:69
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:69
              (i32.store align=4
                (get_local 6)
                (i32.const 294))
              ;; org/teavm/runtime/Fiber.java:69
              (call $teavm_throwNullPointerException))
            (else
              ;; org/teavm/runtime/Fiber.java:69
              (set_local 2
                (get_local 2))
              (if
                ;; org/teavm/runtime/Fiber.java:69
                (block $block_1 i32
                  (drop
                    (br_if $block_1
                      ;; org/teavm/runtime/Fiber.java:69
                      (i32.const 0)
                      ;; org/teavm/runtime/Fiber.java:69
                      (i32.lt_s
                        (get_local 5)
                        (i32.const 0))))
                  ;; org/teavm/runtime/Fiber.java:69
                  (i32.lt_s
                    (get_local 5)
                    (i32.load align=4
                      (i32.add
                        (get_local 2)
                        (i32.const 8)))))
                (then
                  (i64.store align=8
                    (i32.add
                      (i32.add
                        (get_local 2)
                        (i32.const 16))
                      (i32.shl
                        (get_local 5)
                        (i32.const 3)))
                    (get_local 1))
                  ;; org/teavm/runtime/Fiber.java:70
                  (br $block_2)))
              ;; org/teavm/runtime/Fiber.java:69
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:69
              (i32.store align=4
                (get_local 6)
                (i32.const 295))
              ;; org/teavm/runtime/Fiber.java:69
              (call $teavm_throwArrayIndexOutOfBoundsException)))))
      ;; org/teavm/runtime/Fiber.java:69
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 6)
          (i32.const 4)))))

  ;; function #232
  (func $meth_otr_Fiber_push_1 (type $type19)
    (local i32 i32 i32 i32 i32)
    (block
      (set_local 6
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      (block $block_2
        (block $block_0
          (if
            ;; org/teavm/runtime/Fiber.java:73
            (i32.eq
              (i32.load offset=24 align=4
                (get_local 0))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/Fiber.java:74
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:74
              (i32.store align=4
                (get_local 6)
                (i32.const 298))
              ;; org/teavm/runtime/Fiber.java:74
              (set_local 2
                (call $meth_otr_Allocator_allocateArray
                  (i32.const 6168)
                  (i32.const 4)))
              (if
                ;; org/teavm/runtime/Fiber.java:74
                (i32.ne
                  ;; org/teavm/runtime/Fiber.java:74
                  (i32.load align=4
                    (get_local 6))
                  (i32.const 298))
                (then
                  ;; org/teavm/runtime/Fiber.java:74
                  (br $block_0)))
              (i32.store8 align=1
                (i32.add
                  (i32.load align=4
                    (i32.const 3992))
                  (i32.div_s
                    (i32.sub
                      (get_local 0)
                      (i32.load align=4
                        (i32.const 3996)))
                    (i32.const 1024)))
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:74
              (i32.store offset=24 align=4
                (get_local 0)
                (get_local 2)))
            (else
              ;; org/teavm/runtime/Fiber.java:75
              (set_local 3
                (i32.add
                  (i32.load offset=28 align=4
                    (get_local 0))
                  (i32.const 1)))
              ;; org/teavm/runtime/Fiber.java:75
              (set_local 2
                (i32.load offset=24 align=4
                  (get_local 0)))
              (if
                ;; org/teavm/runtime/Fiber.java:75
                (i32.eq
                  (get_local 2)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/Fiber.java:75
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (i32.const 0))
                  ;; org/teavm/runtime/Fiber.java:75
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 299))
                  ;; org/teavm/runtime/Fiber.java:75
                  (call $teavm_throwNullPointerException)
                  ;; org/teavm/runtime/Fiber.java:75
                  (br $block_0)))
              (if
                ;; org/teavm/runtime/Fiber.java:75
                (i32.eq
                  (get_local 3)
                  (i32.load align=4
                    (i32.add
                      (get_local 2)
                      (i32.const 8))))
                (then
                  ;; org/teavm/runtime/Fiber.java:76
                  (set_local 2
                    (i32.load offset=24 align=4
                      (get_local 0)))
                  ;; org/teavm/runtime/Fiber.java:76
                  (set_local 4
                    (i32.load offset=24 align=4
                      (get_local 0)))
                  (if
                    ;; org/teavm/runtime/Fiber.java:76
                    (i32.eq
                      (get_local 4)
                      (i32.const 0))
                    (then
                      ;; org/teavm/runtime/Fiber.java:76
                      (i32.store offset=4 align=4
                        (get_local 6)
                        (i32.const 0))
                      ;; org/teavm/runtime/Fiber.java:76
                      (i32.store align=4
                        (get_local 6)
                        (i32.const 303))
                      ;; org/teavm/runtime/Fiber.java:76
                      (call $teavm_throwNullPointerException)
                      ;; org/teavm/runtime/Fiber.java:76
                      (br $block_0)))
                  ;; org/teavm/runtime/Fiber.java:76
                  (set_local 3
                    (i32.div_s
                      ;; org/teavm/runtime/Fiber.java:76
                      (i32.mul
                        (i32.load align=4
                          (i32.add
                            (get_local 4)
                            (i32.const 8)))
                        (i32.const 3))
                      (i32.const 2)))
                  ;; org/teavm/runtime/Fiber.java:76
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (get_local 2))
                  ;; org/teavm/runtime/Fiber.java:76
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 302))
                  ;; org/teavm/runtime/Fiber.java:76
                  (set_local 2
                    ;; org/teavm/runtime/Fiber.java:76
                    (call $meth_ju_Arrays_copyOf_2
                      (get_local 2)
                      (get_local 3)))
                  (if
                    ;; org/teavm/runtime/Fiber.java:76
                    (i32.ne
                      ;; org/teavm/runtime/Fiber.java:76
                      (i32.load align=4
                        (get_local 6))
                      (i32.const 302))
                    (then
                      ;; org/teavm/runtime/Fiber.java:76
                      (br $block_0)))
                  (i32.store8 align=1
                    (i32.add
                      (i32.load align=4
                        (i32.const 3992))
                      (i32.div_s
                        (i32.sub
                          (get_local 0)
                          (i32.load align=4
                            (i32.const 3996)))
                        (i32.const 1024)))
                    (i32.const 0))
                  ;; org/teavm/runtime/Fiber.java:76
                  (i32.store offset=24 align=4
                    (get_local 0)
                    (get_local 2))))))
          ;; org/teavm/runtime/Fiber.java:78
          (set_local 2
            (i32.load offset=24 align=4
              (get_local 0)))
          ;; org/teavm/runtime/Fiber.java:78
          (set_local 5
            (i32.load offset=28 align=4
              (get_local 0)))
          ;; org/teavm/runtime/Fiber.java:78
          (i32.store offset=28 align=4
            (get_local 0)
            ;; org/teavm/runtime/Fiber.java:78
            (i32.add
              (get_local 5)
              (i32.const 1)))
          (if
            ;; org/teavm/runtime/Fiber.java:78
            (i32.eq
              (get_local 2)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/Fiber.java:78
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:78
              (i32.store align=4
                (get_local 6)
                (i32.const 300))
              ;; org/teavm/runtime/Fiber.java:78
              (call $teavm_throwNullPointerException))
            (else
              ;; org/teavm/runtime/Fiber.java:78
              (set_local 2
                (get_local 2))
              (if
                ;; org/teavm/runtime/Fiber.java:78
                (block $block_1 i32
                  (drop
                    (br_if $block_1
                      ;; org/teavm/runtime/Fiber.java:78
                      (i32.const 0)
                      ;; org/teavm/runtime/Fiber.java:78
                      (i32.lt_s
                        (get_local 5)
                        (i32.const 0))))
                  ;; org/teavm/runtime/Fiber.java:78
                  (i32.lt_s
                    (get_local 5)
                    (i32.load align=4
                      (i32.add
                        (get_local 2)
                        (i32.const 8)))))
                (then
                  (f32.store align=4
                    (i32.add
                      (i32.add
                        (get_local 2)
                        (i32.const 12))
                      (i32.shl
                        (get_local 5)
                        (i32.const 2)))
                    (get_local 1))
                  ;; org/teavm/runtime/Fiber.java:79
                  (br $block_2)))
              ;; org/teavm/runtime/Fiber.java:78
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:78
              (i32.store align=4
                (get_local 6)
                (i32.const 301))
              ;; org/teavm/runtime/Fiber.java:78
              (call $teavm_throwArrayIndexOutOfBoundsException)))))
      ;; org/teavm/runtime/Fiber.java:78
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 6)
          (i32.const 4)))))

  ;; function #233
  (func $meth_otr_Fiber_push_2 (type $type20)
    (local i32 i32 i32 i32 i32)
    (block
      (set_local 6
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      (block $block_2
        (block $block_0
          (if
            ;; org/teavm/runtime/Fiber.java:82
            (i32.eq
              (i32.load offset=32 align=4
                (get_local 0))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/Fiber.java:83
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:83
              (i32.store align=4
                (get_local 6)
                (i32.const 304))
              ;; org/teavm/runtime/Fiber.java:83
              (set_local 2
                (call $meth_otr_Allocator_allocateArray
                  (i32.const 6432)
                  (i32.const 4)))
              (if
                ;; org/teavm/runtime/Fiber.java:83
                (i32.ne
                  ;; org/teavm/runtime/Fiber.java:83
                  (i32.load align=4
                    (get_local 6))
                  (i32.const 304))
                (then
                  ;; org/teavm/runtime/Fiber.java:83
                  (br $block_0)))
              (i32.store8 align=1
                (i32.add
                  (i32.load align=4
                    (i32.const 3992))
                  (i32.div_s
                    (i32.sub
                      (get_local 0)
                      (i32.load align=4
                        (i32.const 3996)))
                    (i32.const 1024)))
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:83
              (i32.store offset=32 align=4
                (get_local 0)
                (get_local 2)))
            (else
              ;; org/teavm/runtime/Fiber.java:84
              (set_local 3
                (i32.add
                  (i32.load offset=36 align=4
                    (get_local 0))
                  (i32.const 1)))
              ;; org/teavm/runtime/Fiber.java:84
              (set_local 2
                (i32.load offset=32 align=4
                  (get_local 0)))
              (if
                ;; org/teavm/runtime/Fiber.java:84
                (i32.eq
                  (get_local 2)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/Fiber.java:84
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (i32.const 0))
                  ;; org/teavm/runtime/Fiber.java:84
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 305))
                  ;; org/teavm/runtime/Fiber.java:84
                  (call $teavm_throwNullPointerException)
                  ;; org/teavm/runtime/Fiber.java:84
                  (br $block_0)))
              (if
                ;; org/teavm/runtime/Fiber.java:84
                (i32.eq
                  (get_local 3)
                  (i32.load align=4
                    (i32.add
                      (get_local 2)
                      (i32.const 8))))
                (then
                  ;; org/teavm/runtime/Fiber.java:85
                  (set_local 2
                    (i32.load offset=32 align=4
                      (get_local 0)))
                  ;; org/teavm/runtime/Fiber.java:85
                  (set_local 4
                    (i32.load offset=32 align=4
                      (get_local 0)))
                  (if
                    ;; org/teavm/runtime/Fiber.java:85
                    (i32.eq
                      (get_local 4)
                      (i32.const 0))
                    (then
                      ;; org/teavm/runtime/Fiber.java:85
                      (i32.store offset=4 align=4
                        (get_local 6)
                        (i32.const 0))
                      ;; org/teavm/runtime/Fiber.java:85
                      (i32.store align=4
                        (get_local 6)
                        (i32.const 309))
                      ;; org/teavm/runtime/Fiber.java:85
                      (call $teavm_throwNullPointerException)
                      ;; org/teavm/runtime/Fiber.java:85
                      (br $block_0)))
                  ;; org/teavm/runtime/Fiber.java:85
                  (set_local 3
                    (i32.div_s
                      ;; org/teavm/runtime/Fiber.java:85
                      (i32.mul
                        (i32.load align=4
                          (i32.add
                            (get_local 4)
                            (i32.const 8)))
                        (i32.const 3))
                      (i32.const 2)))
                  ;; org/teavm/runtime/Fiber.java:85
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (get_local 2))
                  ;; org/teavm/runtime/Fiber.java:85
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 308))
                  ;; org/teavm/runtime/Fiber.java:85
                  (set_local 2
                    ;; org/teavm/runtime/Fiber.java:85
                    (call $meth_ju_Arrays_copyOf_3
                      (get_local 2)
                      (get_local 3)))
                  (if
                    ;; org/teavm/runtime/Fiber.java:85
                    (i32.ne
                      ;; org/teavm/runtime/Fiber.java:85
                      (i32.load align=4
                        (get_local 6))
                      (i32.const 308))
                    (then
                      ;; org/teavm/runtime/Fiber.java:85
                      (br $block_0)))
                  (i32.store8 align=1
                    (i32.add
                      (i32.load align=4
                        (i32.const 3992))
                      (i32.div_s
                        (i32.sub
                          (get_local 0)
                          (i32.load align=4
                            (i32.const 3996)))
                        (i32.const 1024)))
                    (i32.const 0))
                  ;; org/teavm/runtime/Fiber.java:85
                  (i32.store offset=32 align=4
                    (get_local 0)
                    (get_local 2))))))
          ;; org/teavm/runtime/Fiber.java:87
          (set_local 2
            (i32.load offset=32 align=4
              (get_local 0)))
          ;; org/teavm/runtime/Fiber.java:87
          (set_local 5
            (i32.load offset=36 align=4
              (get_local 0)))
          ;; org/teavm/runtime/Fiber.java:87
          (i32.store offset=36 align=4
            (get_local 0)
            ;; org/teavm/runtime/Fiber.java:87
            (i32.add
              (get_local 5)
              (i32.const 1)))
          (if
            ;; org/teavm/runtime/Fiber.java:87
            (i32.eq
              (get_local 2)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/Fiber.java:87
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:87
              (i32.store align=4
                (get_local 6)
                (i32.const 306))
              ;; org/teavm/runtime/Fiber.java:87
              (call $teavm_throwNullPointerException))
            (else
              ;; org/teavm/runtime/Fiber.java:87
              (set_local 2
                (get_local 2))
              (if
                ;; org/teavm/runtime/Fiber.java:87
                (block $block_1 i32
                  (drop
                    (br_if $block_1
                      ;; org/teavm/runtime/Fiber.java:87
                      (i32.const 0)
                      ;; org/teavm/runtime/Fiber.java:87
                      (i32.lt_s
                        (get_local 5)
                        (i32.const 0))))
                  ;; org/teavm/runtime/Fiber.java:87
                  (i32.lt_s
                    (get_local 5)
                    (i32.load align=4
                      (i32.add
                        (get_local 2)
                        (i32.const 8)))))
                (then
                  (f64.store align=8
                    (i32.add
                      (i32.add
                        (get_local 2)
                        (i32.const 16))
                      (i32.shl
                        (get_local 5)
                        (i32.const 3)))
                    (get_local 1))
                  ;; org/teavm/runtime/Fiber.java:88
                  (br $block_2)))
              ;; org/teavm/runtime/Fiber.java:87
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:87
              (i32.store align=4
                (get_local 6)
                (i32.const 307))
              ;; org/teavm/runtime/Fiber.java:87
              (call $teavm_throwArrayIndexOutOfBoundsException)))))
      ;; org/teavm/runtime/Fiber.java:87
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 6)
          (i32.const 4)))))

  ;; function #234
  (func $meth_otr_Fiber_push_3 (type $type6)
    (local i32 i32 i32 i32 i32)
    (block
      (set_local 6
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      (block $block_2
        (block $block_0
          (if
            ;; org/teavm/runtime/Fiber.java:91
            (i32.eq
              (i32.load offset=40 align=4
                (get_local 0))
              (i32.const 0))
            (then
              ;; org/teavm/runtime/Fiber.java:92
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:92
              (i32.store align=4
                (get_local 6)
                (i32.const 310))
              ;; org/teavm/runtime/Fiber.java:92
              (set_local 2
                (call $meth_otr_Allocator_allocateArray
                  (i32.const 8472)
                  (i32.const 4)))
              (if
                ;; org/teavm/runtime/Fiber.java:92
                (i32.ne
                  ;; org/teavm/runtime/Fiber.java:92
                  (i32.load align=4
                    (get_local 6))
                  (i32.const 310))
                (then
                  ;; org/teavm/runtime/Fiber.java:92
                  (br $block_0)))
              (i32.store8 align=1
                (i32.add
                  (i32.load align=4
                    (i32.const 3992))
                  (i32.div_s
                    (i32.sub
                      (get_local 0)
                      (i32.load align=4
                        (i32.const 3996)))
                    (i32.const 1024)))
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:92
              (i32.store offset=40 align=4
                (get_local 0)
                (get_local 2)))
            (else
              ;; org/teavm/runtime/Fiber.java:93
              (set_local 3
                (i32.add
                  (i32.load offset=44 align=4
                    (get_local 0))
                  (i32.const 1)))
              ;; org/teavm/runtime/Fiber.java:93
              (set_local 2
                (i32.load offset=40 align=4
                  (get_local 0)))
              (if
                ;; org/teavm/runtime/Fiber.java:93
                (i32.eq
                  (get_local 2)
                  (i32.const 0))
                (then
                  ;; org/teavm/runtime/Fiber.java:93
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (i32.const 0))
                  ;; org/teavm/runtime/Fiber.java:93
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 311))
                  ;; org/teavm/runtime/Fiber.java:93
                  (call $teavm_throwNullPointerException)
                  ;; org/teavm/runtime/Fiber.java:93
                  (br $block_0)))
              (if
                ;; org/teavm/runtime/Fiber.java:93
                (i32.eq
                  (get_local 3)
                  (i32.load align=4
                    (i32.add
                      (get_local 2)
                      (i32.const 8))))
                (then
                  ;; org/teavm/runtime/Fiber.java:94
                  (set_local 2
                    (i32.load offset=40 align=4
                      (get_local 0)))
                  ;; org/teavm/runtime/Fiber.java:94
                  (set_local 4
                    (i32.load offset=40 align=4
                      (get_local 0)))
                  (if
                    ;; org/teavm/runtime/Fiber.java:94
                    (i32.eq
                      (get_local 4)
                      (i32.const 0))
                    (then
                      ;; org/teavm/runtime/Fiber.java:94
                      (i32.store offset=4 align=4
                        (get_local 6)
                        (i32.const 0))
                      ;; org/teavm/runtime/Fiber.java:94
                      (i32.store align=4
                        (get_local 6)
                        (i32.const 315))
                      ;; org/teavm/runtime/Fiber.java:94
                      (call $teavm_throwNullPointerException)
                      ;; org/teavm/runtime/Fiber.java:94
                      (br $block_0)))
                  ;; org/teavm/runtime/Fiber.java:94
                  (set_local 3
                    (i32.div_s
                      ;; org/teavm/runtime/Fiber.java:94
                      (i32.mul
                        (i32.load align=4
                          (i32.add
                            (get_local 4)
                            (i32.const 8)))
                        (i32.const 3))
                      (i32.const 2)))
                  ;; org/teavm/runtime/Fiber.java:94
                  (i32.store offset=4 align=4
                    (get_local 6)
                    (get_local 2))
                  ;; org/teavm/runtime/Fiber.java:94
                  (i32.store align=4
                    (get_local 6)
                    (i32.const 314))
                  ;; org/teavm/runtime/Fiber.java:94
                  (set_local 2
                    ;; org/teavm/runtime/Fiber.java:94
                    (call $meth_ju_Arrays_copyOf_4
                      (get_local 2)
                      (get_local 3)))
                  (if
                    ;; org/teavm/runtime/Fiber.java:94
                    (i32.ne
                      ;; org/teavm/runtime/Fiber.java:94
                      (i32.load align=4
                        (get_local 6))
                      (i32.const 314))
                    (then
                      ;; org/teavm/runtime/Fiber.java:94
                      (br $block_0)))
                  (i32.store8 align=1
                    (i32.add
                      (i32.load align=4
                        (i32.const 3992))
                      (i32.div_s
                        (i32.sub
                          (get_local 0)
                          (i32.load align=4
                            (i32.const 3996)))
                        (i32.const 1024)))
                    (i32.const 0))
                  ;; org/teavm/runtime/Fiber.java:94
                  (i32.store offset=40 align=4
                    (get_local 0)
                    (get_local 2))))))
          ;; org/teavm/runtime/Fiber.java:96
          (set_local 2
            (i32.load offset=40 align=4
              (get_local 0)))
          ;; org/teavm/runtime/Fiber.java:96
          (set_local 5
            (i32.load offset=44 align=4
              (get_local 0)))
          ;; org/teavm/runtime/Fiber.java:96
          (i32.store offset=44 align=4
            (get_local 0)
            ;; org/teavm/runtime/Fiber.java:96
            (i32.add
              (get_local 5)
              (i32.const 1)))
          (if
            ;; org/teavm/runtime/Fiber.java:96
            (i32.eq
              (get_local 2)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/Fiber.java:96
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:96
              (i32.store align=4
                (get_local 6)
                (i32.const 312))
              ;; org/teavm/runtime/Fiber.java:96
              (call $teavm_throwNullPointerException))
            (else
              ;; org/teavm/runtime/Fiber.java:96
              (set_local 2
                (get_local 2))
              (if
                ;; org/teavm/runtime/Fiber.java:96
                (block $block_1 i32
                  (drop
                    (br_if $block_1
                      ;; org/teavm/runtime/Fiber.java:96
                      (i32.const 0)
                      ;; org/teavm/runtime/Fiber.java:96
                      (i32.lt_s
                        (get_local 5)
                        (i32.const 0))))
                  ;; org/teavm/runtime/Fiber.java:96
                  (i32.lt_s
                    (get_local 5)
                    (i32.load align=4
                      (i32.add
                        (get_local 2)
                        (i32.const 8)))))
                (then
                  (i32.store8 align=1
                    (i32.add
                      (i32.load align=4
                        (i32.const 3992))
                      (i32.div_s
                        (i32.sub
                          (get_local 2)
                          (i32.load align=4
                            (i32.const 3996)))
                        (i32.const 1024)))
                    (i32.const 0))
                  (i32.store align=4
                    (i32.add
                      (i32.add
                        (get_local 2)
                        (i32.const 12))
                      (i32.shl
                        (get_local 5)
                        (i32.const 2)))
                    (get_local 1))
                  ;; org/teavm/runtime/Fiber.java:97
                  (br $block_2)))
              ;; org/teavm/runtime/Fiber.java:96
              (i32.store offset=4 align=4
                (get_local 6)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:96
              (i32.store align=4
                (get_local 6)
                (i32.const 313))
              ;; org/teavm/runtime/Fiber.java:96
              (call $teavm_throwArrayIndexOutOfBoundsException)))))
      ;; org/teavm/runtime/Fiber.java:96
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 6)
          (i32.const 4)))))

  ;; function #235
  (func $meth_otr_Fiber_popInt (type $type1)
    (local i32 i32)
    (block i32
      ;; org/teavm/runtime/Fiber.java:101
      (set_local 1
        (i32.load offset=8 align=4
          (get_local 0)))
      ;; org/teavm/runtime/Fiber.java:101
      (set_local 2
        (i32.sub
          (i32.load offset=12 align=4
            (get_local 0))
          (i32.const 1)))
      ;; org/teavm/runtime/Fiber.java:101
      (i32.store offset=12 align=4
        (get_local 0)
        (get_local 2))
      (if
        ;; org/teavm/runtime/Fiber.java:101
        (block $block_0 i32
          (drop
            (br_if $block_0
              ;; org/teavm/runtime/Fiber.java:101
              (i32.const 0)
              ;; org/teavm/runtime/Fiber.java:101
              (i32.lt_s
                (get_local 2)
                (i32.const 0))))
          ;; org/teavm/runtime/Fiber.java:101
          (i32.lt_s
            (get_local 2)
            (i32.load align=4
              (i32.add
                (get_local 1)
                (i32.const 8)))))
        (then
          ;; org/teavm/runtime/Fiber.java:101
          (return
            (i32.load align=4
              (i32.add
                (i32.add
                  (get_local 1)
                  (i32.const 12))
                (i32.shl
                  (get_local 2)
                  (i32.const 2)))))))
      ;; org/teavm/runtime/Fiber.java:101
      (call $teavm_throwArrayIndexOutOfBoundsException)
      ;; org/teavm/runtime/Fiber.java:101
      (return
        (i32.const 0))))

  ;; function #236
  (func $meth_otr_Fiber_popLong (type $type4)
    (local i32 i32)
    (block i64
      ;; org/teavm/runtime/Fiber.java:106
      (set_local 1
        (i32.load offset=16 align=4
          (get_local 0)))
      ;; org/teavm/runtime/Fiber.java:106
      (set_local 2
        (i32.sub
          (i32.load offset=20 align=4
            (get_local 0))
          (i32.const 1)))
      ;; org/teavm/runtime/Fiber.java:106
      (i32.store offset=20 align=4
        (get_local 0)
        (get_local 2))
      (if
        ;; org/teavm/runtime/Fiber.java:106
        (block $block_0 i32
          (drop
            (br_if $block_0
              ;; org/teavm/runtime/Fiber.java:106
              (i32.const 0)
              ;; org/teavm/runtime/Fiber.java:106
              (i32.lt_s
                (get_local 2)
                (i32.const 0))))
          ;; org/teavm/runtime/Fiber.java:106
          (i32.lt_s
            (get_local 2)
            (i32.load align=4
              (i32.add
                (get_local 1)
                (i32.const 8)))))
        (then
          ;; org/teavm/runtime/Fiber.java:106
          (return
            (i64.load align=8
              (i32.add
                (i32.add
                  (get_local 1)
                  (i32.const 16))
                (i32.shl
                  (get_local 2)
                  (i32.const 3)))))))
      ;; org/teavm/runtime/Fiber.java:106
      (call $teavm_throwArrayIndexOutOfBoundsException)
      ;; org/teavm/runtime/Fiber.java:106
      (return
        (i64.const 0))))

  ;; function #237
  (func $meth_otr_Fiber_popFloat (type $type21)
    (local i32 i32)
    (block f32
      ;; org/teavm/runtime/Fiber.java:111
      (set_local 1
        (i32.load offset=24 align=4
          (get_local 0)))
      ;; org/teavm/runtime/Fiber.java:111
      (set_local 2
        (i32.sub
          (i32.load offset=28 align=4
            (get_local 0))
          (i32.const 1)))
      ;; org/teavm/runtime/Fiber.java:111
      (i32.store offset=28 align=4
        (get_local 0)
        (get_local 2))
      (if
        ;; org/teavm/runtime/Fiber.java:111
        (block $block_0 i32
          (drop
            (br_if $block_0
              ;; org/teavm/runtime/Fiber.java:111
              (i32.const 0)
              ;; org/teavm/runtime/Fiber.java:111
              (i32.lt_s
                (get_local 2)
                (i32.const 0))))
          ;; org/teavm/runtime/Fiber.java:111
          (i32.lt_s
            (get_local 2)
            (i32.load align=4
              (i32.add
                (get_local 1)
                (i32.const 8)))))
        (then
          ;; org/teavm/runtime/Fiber.java:111
          (return
            (f32.load align=4
              (i32.add
                (i32.add
                  (get_local 1)
                  (i32.const 12))
                (i32.shl
                  (get_local 2)
                  (i32.const 2)))))))
      ;; org/teavm/runtime/Fiber.java:111
      (call $teavm_throwArrayIndexOutOfBoundsException)
      ;; org/teavm/runtime/Fiber.java:111
      (return
        (f32.const 0x0.0p0))))

  ;; function #238
  (func $meth_otr_Fiber_popDouble (type $type22)
    (local i32 i32)
    (block f64
      ;; org/teavm/runtime/Fiber.java:116
      (set_local 1
        (i32.load offset=32 align=4
          (get_local 0)))
      ;; org/teavm/runtime/Fiber.java:116
      (set_local 2
        (i32.sub
          (i32.load offset=36 align=4
            (get_local 0))
          (i32.const 1)))
      ;; org/teavm/runtime/Fiber.java:116
      (i32.store offset=36 align=4
        (get_local 0)
        (get_local 2))
      (if
        ;; org/teavm/runtime/Fiber.java:116
        (block $block_0 i32
          (drop
            (br_if $block_0
              ;; org/teavm/runtime/Fiber.java:116
              (i32.const 0)
              ;; org/teavm/runtime/Fiber.java:116
              (i32.lt_s
                (get_local 2)
                (i32.const 0))))
          ;; org/teavm/runtime/Fiber.java:116
          (i32.lt_s
            (get_local 2)
            (i32.load align=4
              (i32.add
                (get_local 1)
                (i32.const 8)))))
        (then
          ;; org/teavm/runtime/Fiber.java:116
          (return
            (f64.load align=8
              (i32.add
                (i32.add
                  (get_local 1)
                  (i32.const 16))
                (i32.shl
                  (get_local 2)
                  (i32.const 3)))))))
      ;; org/teavm/runtime/Fiber.java:116
      (call $teavm_throwArrayIndexOutOfBoundsException)
      ;; org/teavm/runtime/Fiber.java:116
      (return
        (f64.const 0x0.0p0))))

  ;; function #239
  (func $meth_otr_Fiber_popObject (type $type1)
    (local i32 i32 i32 i32)
    (block i32
      ;; org/teavm/runtime/Fiber.java:121
      (set_local 1
        (i32.load offset=40 align=4
          (get_local 0)))
      ;; org/teavm/runtime/Fiber.java:121
      (set_local 2
        (i32.sub
          (i32.load offset=44 align=4
            (get_local 0))
          (i32.const 1)))
      ;; org/teavm/runtime/Fiber.java:121
      (i32.store offset=44 align=4
        (get_local 0)
        (get_local 2))
      (if
        ;; org/teavm/runtime/Fiber.java:121
        (block $block_0 i32
          (drop
            (br_if $block_0
              ;; org/teavm/runtime/Fiber.java:121
              (i32.const 0)
              ;; org/teavm/runtime/Fiber.java:121
              (i32.lt_s
                (get_local 2)
                (i32.const 0))))
          ;; org/teavm/runtime/Fiber.java:121
          (i32.lt_s
            (get_local 2)
            (i32.load align=4
              (i32.add
                (get_local 1)
                (i32.const 8)))))
        (then
          ;; org/teavm/runtime/Fiber.java:121
          (set_local 3
            (i32.load align=4
              (i32.add
                (i32.add
                  (get_local 1)
                  (i32.const 12))
                (i32.shl
                  (get_local 2)
                  (i32.const 2)))))
          ;; org/teavm/runtime/Fiber.java:122
          (set_local 1
            (i32.load offset=40 align=4
              (get_local 0)))
          ;; org/teavm/runtime/Fiber.java:122
          (set_local 2
            (i32.load offset=44 align=4
              (get_local 0)))
          ;; org/teavm/runtime/Fiber.java:122
          (set_local 4
            (i32.const 0))
          (if
            ;; org/teavm/runtime/Fiber.java:122
            (block $block_1 i32
              (drop
                (br_if $block_1
                  ;; org/teavm/runtime/Fiber.java:122
                  (i32.const 0)
                  ;; org/teavm/runtime/Fiber.java:122
                  (i32.lt_s
                    (get_local 2)
                    (i32.const 0))))
              ;; org/teavm/runtime/Fiber.java:122
              (i32.lt_s
                (get_local 2)
                (i32.load align=4
                  (i32.add
                    (get_local 1)
                    (i32.const 8)))))
            (then
              (i32.store align=4
                (i32.add
                  (i32.add
                    (get_local 1)
                    (i32.const 12))
                  (i32.shl
                    (get_local 2)
                    (i32.const 2)))
                (get_local 4))
              ;; org/teavm/runtime/Fiber.java:123
              (return
                (get_local 3))))
          ;; org/teavm/runtime/Fiber.java:122
          (call $teavm_throwArrayIndexOutOfBoundsException))
        (else
          ;; org/teavm/runtime/Fiber.java:121
          (call $teavm_throwArrayIndexOutOfBoundsException)))
      ;; org/teavm/runtime/Fiber.java:122
      (return
        (i32.const 0))))

  ;; function #240
  (func $meth_otr_Fiber_isSuspending (type $type1)
    ;; org/teavm/runtime/Fiber.java:133
    (return
      (if i32
        ;; org/teavm/runtime/Fiber.java:133
        (i32.ne
          (i32.load offset=48 align=4
            (get_local 0))
          (i32.const 1))
        (then
          (i32.const 0))
        (else
          (i32.const 1)))))

  ;; function #241
  (func $meth_otr_Fiber_isResuming (type $type1)
    ;; org/teavm/runtime/Fiber.java:138
    (return
      (if i32
        ;; org/teavm/runtime/Fiber.java:138
        (i32.ne
          (i32.load offset=48 align=4
            (get_local 0))
          (i32.const 2))
        (then
          (i32.const 0))
        (else
          (i32.const 1)))))

  ;; function #242
  (func $meth_otr_Fiber_start (type $type6)
    (local i32 i32)
    (block
      (set_local 3
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      ;; org/teavm/runtime/Fiber.java:253
      (i32.store offset=4 align=4
        (get_local 3)
        (i32.const 0))
      ;; org/teavm/runtime/Fiber.java:253
      (i32.store align=4
        (get_local 3)
        (i32.const 316))
      ;; org/teavm/runtime/Fiber.java:253
      (set_local 2
        (call $meth_otr_Allocator_allocate
          (i32.const 4760)))
      (if
        ;; org/teavm/runtime/Fiber.java:253
        (i32.eq
          ;; org/teavm/runtime/Fiber.java:253
          (i32.load align=4
            (get_local 3))
          (i32.const 316))
        (then
          ;; org/teavm/runtime/Fiber.java:253
          (i32.store offset=4 align=4
            (get_local 3)
            (get_local 2))
          ;; org/teavm/runtime/Fiber.java:253
          (i32.store align=4
            (get_local 3)
            (i32.const 317))
          ;; org/teavm/runtime/Fiber.java:253
          (call $meth_otr_Fiber__init_
            (get_local 2)
            (get_local 0)
            (get_local 1))
          (if
            ;; org/teavm/runtime/Fiber.java:253
            (i32.eq
              ;; org/teavm/runtime/Fiber.java:253
              (i32.load align=4
                (get_local 3))
              (i32.const 317))
            (then
              ;; org/teavm/runtime/Fiber.java:253
              (i32.store align=4
                (get_local 3)
                (i32.const 318))
              ;; org/teavm/runtime/Fiber.java:253
              (call $meth_otr_Fiber_start_0
                (get_local 2))
              (drop
                (i32.load align=4
                  (get_local 3)))))))
      ;; org/teavm/runtime/Fiber.java:254
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 3)
          (i32.const 4)))))

  ;; function #243
  (func $meth_otr_Fiber_start_0 (type $type0)
    (local i32 i32 i32 i32 i32)
    (block
      (set_local 4
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 2)))
      (block $block_2
        (block $block_1
          ;; org/teavm/runtime/Fiber.java:263
          (set_local 1
            (i32.load align=4
              (i32.const 4732)))
          ;; org/teavm/runtime/Fiber.java:264
          (i32.store align=4
            ;; org/teavm/runtime/Fiber.java:264
            (i32.const 4732)
            (get_local 0))
          ;; org/teavm/runtime/Fiber.java:265
          (set_local 2
            (i32.load offset=52 align=4
              (get_local 0)))
          (if
            ;; org/teavm/runtime/Fiber.java:265
            (i32.eq
              (get_local 2)
              (i32.const 0))
            (then
              ;; org/teavm/runtime/Fiber.java:265
              (i32.store offset=4 align=4
                (get_local 4)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:265
              (i32.store offset=8 align=4
                (get_local 4)
                (i32.const 0))
              ;; org/teavm/runtime/Fiber.java:265
              (i32.store align=4
                (get_local 4)
                (i32.const 321))
              ;; org/teavm/runtime/Fiber.java:265
              (call $teavm_throwNullPointerException))
            (else
              ;; org/teavm/runtime/Fiber.java:265
              (i32.store offset=4 align=4
                (get_local 4)
                (get_local 1))
              ;; org/teavm/runtime/Fiber.java:265
              (i32.store offset=8 align=4
                (get_local 4)
                (get_local 2))
              ;; org/teavm/runtime/Fiber.java:265
              (i32.store align=4
                (get_local 4)
                (i32.const 320))
              (block
                (set_local 5
                  (get_local 2))
                (call_indirect $type0
                  (i32.load align=4
                    (i32.add
                      (i32.shl
                        (i32.load align=4
                          (get_local 5))
                        (i32.const 3))
                      (i32.const 96)))
                  (get_local 5)))
              (if
                ;; org/teavm/runtime/Fiber.java:265
                (i32.eq
                  ;; org/teavm/runtime/Fiber.java:265
                  (i32.load align=4
                    (get_local 4))
                  (i32.const 320))
                (then
                  ;; org/teavm/runtime/Fiber.java:266
                  (i32.store align=4
                    ;; org/teavm/runtime/Fiber.java:266
                    (i32.const 4732)
                    (get_local 1))
                  (if
                    ;; org/teavm/runtime/Fiber.java:267
                    (block $block_0 i32
                      (drop
                        (br_if $block_0
                          ;; org/teavm/runtime/Fiber.java:267
                          (i32.const 0)
                          (i32.ne
                            (block i32
                              (set_local 5
                                (get_local 0))
                              (call_indirect $type1
                                (i32.load align=4
                                  (i32.add
                                    (i32.shl
                                      (i32.load align=4
                                        (get_local 5))
                                      (i32.const 3))
                                    (i32.const 96)))
                                (get_local 5)))
                            (i32.const 0))))
                      (i32.eq
                        (i32.load8_s offset=64 align=1
                          (get_local 0))
                        (i32.const 0)))
                    (then
                      ;; org/teavm/runtime/Fiber.java:267
                      (set_local 3
                        (i32.sub
                          (i32.load align=4
                            ;; org/teavm/runtime/Fiber.java:267
                            (i32.const 4728))
                          (i32.const 1)))
                      ;; org/teavm/runtime/Fiber.java:267
                      (i32.store align=4
                        ;; org/teavm/runtime/Fiber.java:267
                        (i32.const 4728)
                        (get_local 3))
                      (if
                        (i32.eq
                          (get_local 3)
                          (i32.const 0))
                        (then
                          ;; org/teavm/runtime/Fiber.java:268
                          (i32.store offset=4 align=4
                            (get_local 4)
                            (i32.const 0))
                          ;; org/teavm/runtime/Fiber.java:268
                          (i32.store offset=8 align=4
                            (get_local 4)
                            (i32.const 0))
                          ;; org/teavm/runtime/Fiber.java:268
                          (i32.store align=4
                            (get_local 4)
                            (i32.const 319))
                          ;; org/teavm/runtime/Fiber.java:268
                          (call $meth_otr_EventQueue_stop)
                          (if
                            ;; org/teavm/runtime/Fiber.java:268
                            (i32.ne
                              ;; org/teavm/runtime/Fiber.java:268
                              (i32.load align=4
                                (get_local 4))
                              (i32.const 319))
                            (then
                              ;; org/teavm/runtime/Fiber.java:268
                              (br $block_1)))))))
                  ;; org/teavm/runtime/Fiber.java:270
                  (br $block_2)))))))
      ;; org/teavm/runtime/Fiber.java:270
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 4)
          (i32.const 4)))))

  ;; function #244
  (func $meth_otr_Fiber__clinit_ (type $type3)
    (block
      ;; org/teavm/runtime/Fiber.java:28
      (i32.store align=4
        ;; org/teavm/runtime/Fiber.java:28
        (i32.const 4728)
        (i32.const 1))))

  ;; function #245
  (func $meth_jl_String__clinit__lambda__84_0__init_ (type $type0)
    (local i32)
    (block
      (set_local 1
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 0)))
      ;; org/teavm/classlib/java/lang/TString.java:36
      (i32.store align=4
        (get_local 1)
        (i32.const 322))
      ;; org/teavm/classlib/java/lang/TString.java:36
      (call $meth_jl_Object__init_
        (get_local 0))
      (drop
        (i32.load align=4
          (get_local 1)))
      ;; org/teavm/classlib/java/lang/TString.java:36
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 1)
          (i32.const 4)))))

  ;; function #246
  (func $meth_jl_Object__init_ (type $type0)
    ;; org/teavm/classlib/java/lang/TObject.java:217
    (return))

  ;; function #247
  (func $meth_jl_Object_getClass (type $type1)
    (local i32 i32)
    (block i32
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      ;; org/teavm/classlib/java/lang/TObject.java:221
      (set_local 1
        (i32.shl
          (i32.load align=4
            (get_local 0))
          (i32.const 3)))
      ;; org/teavm/classlib/java/lang/TObject.java:221
      (i32.store offset=4 align=4
        (get_local 2)
        (get_local 1))
      ;; org/teavm/classlib/java/lang/TObject.java:221
      (i32.store align=4
        (get_local 2)
        (i32.const 323))
      ;; org/teavm/classlib/java/lang/TObject.java:221
      (set_local 1
        (get_local 1))
      (if
        ;; org/teavm/classlib/java/lang/TObject.java:221
        (i32.ne
          ;; org/teavm/classlib/java/lang/TObject.java:221
          (i32.load align=4
            (get_local 2))
          (i32.const 323))
        (then
          ;; org/teavm/classlib/java/lang/TObject.java:221
          (set_local 1
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TObject.java:221
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TObject.java:221
      (return
        (get_local 1))))

  ;; function #248
  (func $meth_jl_Class_getPlatformClass (type $type1)
    ;; org/teavm/classlib/java/lang/TClass.java:93
    (return
      (get_local 0)))

  ;; function #249
  (func $meth_jl_Class_getComponentType (type $type1)
    (local i32 i32)
    (block i32
      (set_local 2
        (call $meth_otbw_WasmRuntime_allocStack
          (i32.const 1)))
      ;; org/teavm/classlib/java/lang/TClass.java:297
      (set_local 1
        ;; org/teavm/classlib/java/lang/TClass.java:297
        (call $meth_otp_Platform_getArrayItem
          (get_local 0)))
      ;; org/teavm/classlib/java/lang/TClass.java:297
      (i32.store offset=4 align=4
        (get_local 2)
        (get_local 1))
      ;; org/teavm/classlib/java/lang/TClass.java:297
      (i32.store align=4
        (get_local 2)
        (i32.const 328))
      ;; org/teavm/classlib/java/lang/TClass.java:297
      (set_local 1
        (get_local 1))
      (if
        ;; org/teavm/classlib/java/lang/TClass.java:297
        (i32.ne
          ;; org/teavm/classlib/java/lang/TClass.java:297
          (i32.load align=4
            (get_local 2))
          (i32.const 328))
        (then
          ;; org/teavm/classlib/java/lang/TClass.java:297
          (set_local 1
            (i32.const 0))))
      ;; org/teavm/classlib/java/lang/TClass.java:297
      (i32.store align=4
        (i32.const 4016)
        (i32.sub
          (get_local 2)
          (i32.const 4)))
      ;; org/teavm/classlib/java/lang/TClass.java:297
      (return
        (get_local 1))))

  ;; function #250
  (func $meth_otr_Allocator_allocate (type $type1)
    (local i32)
    (block i32
      ;; org/teavm/runtime/Allocator.java:30
      (set_local 1
        ;; org/teavm/runtime/Allocator.java:30
        (call $meth_otr_GC_alloc
          (i32.load offset=8 align=4
            (get_local 0))))
      (call $meth_otbw_WasmRuntime_fillZero
        (get_local 1)
        (i32.load offset=8 align=4
          (get_local 0)))
      ;; org/teavm/runtime/Allocator.java:32
      (i32.store align=4
        (get_local 1)
        (i32.shr_u
          (get_local 0)
          (i32.const 3)))
      ;; org/teavm/runtime/Allocator.java:33
      (return
        (get_local 1))))

  ;; function #251
  (func $meth_otr_Allocator_allocateArray (type $type5)
    (local i32 i32 i32 i32)
    (block i32
      ;; org/teavm/runtime/Allocator.java:37
      (set_local 2
        (if i32
          ;; org/teavm/runtime/Allocator.java:37
          (i32.eq
            ;; org/teavm/runtime/Allocator.java:37
            (i32.and
              (i32.load offset=12 align=4
                (i32.load offset=32 align=4
                  (get_local 0)))
              (i32.const 2))
            (i32.const 0))
          (then
            (i32.const 4))
          (else
            (i32.load offset=8 align=4
              (i32.load offset=32 align=4
                (get_local 0))))))
      ;; org/teavm/runtime/Allocator.java:40
      (set_local 3
        (call $meth_otbw_WasmRuntime_align
          ;; org/teavm/runtime/Allocator.java:39
          (i32.add
            (call $meth_otbw_WasmRuntime_align
              (i32.const 12)
              (get_local 2))
            ;; org/teavm/runtime/Allocator.java:39
            (i32.mul
              (get_local 2)
              (get_local 1)))
          (i32.const 4)))
      ;; org/teavm/runtime/Allocator.java:41
      (set_local 4
        ;; org/teavm/runtime/Allocator.java:41
        (call $meth_otr_GC_alloc
          (get_local 3)))
      (call $meth_otbw_WasmRuntime_fillZero
        (get_local 4)
        (get_local 3))
      ;; org/teavm/runtime/Allocator.java:44
      (set_local 5
        (get_local 4))
      ;; org/teavm/runtime/Allocator.java:45
      (i32.store align=4
        (get_local 5)
        (i32.shr_u
          (get_local 0)
          (i32.const 3)))
      ;; org/teavm/runtime/Allocator.java:46
      (i32.store offset=8 align=4
        (get_local 5)
        (get_local 1))
      ;; org/teavm/runtime/Allocator.java:48
      (return
        (get_local 4))))

  ;; function #252
  (func $teavm_allocateString (export "teavm_allocateString") (type $type1)
    (call $meth_jl_String_allocate
      (get_local 0))
    (return
      (call $meth_jl_String_allocate
        (get_local 0))))

  ;; function #253
  (func $teavm_stringData (export "teavm_stringData") (type $type1)
    (return
      (i32.load offset=8 align=4
        (get_local 0))))

  ;; function #254
  (func $teavm_allocateObjectArray (export "teavm_allocateObjectArray") (type $type1)
    (return
      (call $meth_otr_Allocator_allocateArray
        (i32.const 8472)
        (get_local 0))))

  ;; function #255
  (func $teavm_allocateStringArray (export "teavm_allocateStringArray") (type $type1)
    (return
      (call $meth_otr_Allocator_allocateArray
        (i32.const 6728)
        (get_local 0))))

  ;; function #256
  (func $teavm_allocateByteArray (export "teavm_allocateByteArray") (type $type1)
    (return
      (call $meth_otr_Allocator_allocateArray
        (i32.const 8928)
        (get_local 0))))

  ;; function #257
  (func $teavm_allocateShortArray (export "teavm_allocateShortArray") (type $type1)
    (return
      (call $meth_otr_Allocator_allocateArray
        (i32.const 9192)
        (get_local 0))))

  ;; function #258
  (func $teavm_allocateCharArray (export "teavm_allocateCharArray") (type $type1)
    (return
      (call $meth_otr_Allocator_allocateArray
        (i32.const 5392)
        (get_local 0))))

  ;; function #259
  (func $teavm_allocateIntArray (export "teavm_allocateIntArray") (type $type1)
    (return
      (call $meth_otr_Allocator_allocateArray
        (i32.const 5648)
        (get_local 0))))

  ;; function #260
  (func $teavm_allocateLongArray (export "teavm_allocateLongArray") (type $type1)
    (return
      (call $meth_otr_Allocator_allocateArray
        (i32.const 5904)
        (get_local 0))))

  ;; function #261
  (func $teavm_allocateFloatArray (export "teavm_allocateFloatArray") (type $type1)
    (return
      (call $meth_otr_Allocator_allocateArray
        (i32.const 6168)
        (get_local 0))))

  ;; function #262
  (func $teavm_allocateDoubleArray (export "teavm_allocateDoubleArray") (type $type1)
    (return
      (call $meth_otr_Allocator_allocateArray
        (i32.const 6432)
        (get_local 0))))

  ;; function #263
  (func $teavm_objectArrayData (export "teavm_objectArrayData") (type $type1)
    (return
      (i32.add
        (get_local 0)
        (i32.const 12))))

  ;; function #264
  (func $teavm_byteArrayData (export "teavm_byteArrayData") (type $type1)
    (return
      (i32.add
        (get_local 0)
        (i32.const 12))))

  ;; function #265
  (func $teavm_shortArrayData (export "teavm_shortArrayData") (type $type1)
    (return
      (i32.add
        (get_local 0)
        (i32.const 12))))

  ;; function #266
  (func $teavm_charArrayData (export "teavm_charArrayData") (type $type1)
    (return
      (i32.add
        (get_local 0)
        (i32.const 12))))

  ;; function #267
  (func $teavm_intArrayData (export "teavm_intArrayData") (type $type1)
    (return
      (i32.add
        (get_local 0)
        (i32.const 12))))

  ;; function #268
  (func $teavm_longArrayData (export "teavm_longArrayData") (type $type1)
    (return
      (i32.add
        (get_local 0)
        (i32.const 16))))

  ;; function #269
  (func $teavm_floatArrayData (export "teavm_floatArrayData") (type $type1)
    (return
      (i32.add
        (get_local 0)
        (i32.const 12))))

  ;; function #270
  (func $teavm_doubleArrayData (export "teavm_doubleArrayData") (type $type1)
    (return
      (i32.add
        (get_local 0)
        (i32.const 16))))

  ;; function #271
  (func $teavm_arrayLength (export "teavm_arrayLength") (type $type1)
    (return
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 8)))))

  ;; function #272
  (func $supertypeof_jl_IndexOutOfBoundsException (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 34))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 40))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #273
  (func $supertypeof_jl_RuntimeException (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 33))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 47))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #274
  (func $supertypeof_jl_Exception (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 32))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 48))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #275
  (func $supertypeof_jl_Throwable (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 31))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 49))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #276
  (func $supertypeof_jl_Object (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 0))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 118))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #277
  (func $supertypeof_otr_GC (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 1))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 3))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #278
  (func $supertypeof_ju_Arrays (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 3))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 5))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #279
  (func $supertypeof_jlr_Array (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 5))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 7))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #280
  (func $supertypeof_otr_Console (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 7))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 9))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #281
  (func $supertypeof_jl_System (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 9))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 11))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #282
  (func $supertypeof_otbwr_WasmSupport (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 13))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 15))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #283
  (func $supertypeof_otbw_WasmRuntime (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 15))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 17))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #284
  (func $supertypeof_jl_NullPointerException (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 40))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 42))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #285
  (func $supertypeof_jl_Character (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 17))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 19))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #286
  (func $supertypeof_jl_Thread (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 19))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 21))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #287
  (func $supertypeof_jl_DefaultUncaughtExceptionHandler (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 21))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 23))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #288
  (func $supertypeof_jl_Math (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 23))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 25))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #289
  (func $supertypeof_otbwr_WasmSupport_runWithoutArgs_lambda__14_0 (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 25))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 27))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #290
  (func $supertypeof_otr_ShadowStack (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 27))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 29))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #291
  (func $supertypeof_jl_StringIndexOutOfBoundsException (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 35))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 37))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #292
  (func $supertypeof_jl_StringBuilder (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 90))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 92))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #293
  (func $supertypeof_jl_AbstractStringBuilder (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 89))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 93))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #294
  (func $supertypeof_otr_Mutator (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 49))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 51))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #295
  (func $supertypeof_otr_MemoryTrace (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 51))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 53))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #296
  (func $supertypeof_otp_Platform (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 87))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 89))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #297
  (func $supertypeof_otr_ExceptionHandling (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 93))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 95))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #298
  (func $supertypeof_otr_MarkQueue (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 95))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 97))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #299
  (func $supertypeof_otbwr_WasmSupport_runWithArgs_lambda__15_0 (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 97))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 99))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #300
  (func $supertypeof_jl_StackTraceElement (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 99))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 101))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #301
  (func $supertypeof_jl_String (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 101))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 103))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #302
  (func $supertypeof_otbw_WasmHeap (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 103))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 105))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #303
  (func $supertypeof_jl_NegativeArraySizeException (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 42))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 44))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #304
  (func $supertypeof_cbv_VisualizerRuntime (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 105))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 107))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #305
  (func $supertypeof_jl_ArrayIndexOutOfBoundsException (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 37))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 39))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #306
  (func $supertypeof_jl_IllegalArgumentException (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 44))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 46))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #307
  (func $supertypeof_otr_EventQueue (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 107))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 109))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #308
  (func $supertypeof_otr_Fiber (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 109))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 111))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #309
  (func $supertypeof_jl_String__clinit__lambda__84_0 (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 111))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 113))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #310
  (func $supertypeof_jl_Class (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 113))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 115))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #311
  (func $supertypeof_otr_Allocator (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 115))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 117))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #312
  (func $supertypeof_Arr_C (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 32))))
    (return
      (if i32
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          (i32.const 0))
        (else
          (call $supertypeof_C
            (get_local 0))))))

  ;; function #313
  (func $supertypeof_C (type $type1)
    (return
      (i32.eq
        (get_local 0)
        (i32.const 5272))))

  ;; function #314
  (func $supertypeof_Arr_I (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 32))))
    (return
      (if i32
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          (i32.const 0))
        (else
          (call $supertypeof_I
            (get_local 0))))))

  ;; function #315
  (func $supertypeof_I (type $type1)
    (return
      (i32.eq
        (get_local 0)
        (i32.const 5528))))

  ;; function #316
  (func $supertypeof_Arr_J (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 32))))
    (return
      (if i32
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          (i32.const 0))
        (else
          (call $supertypeof_J
            (get_local 0))))))

  ;; function #317
  (func $supertypeof_J (type $type1)
    (return
      (i32.eq
        (get_local 0)
        (i32.const 5784))))

  ;; function #318
  (func $supertypeof_Arr_F (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 32))))
    (return
      (if i32
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          (i32.const 0))
        (else
          (call $supertypeof_F
            (get_local 0))))))

  ;; function #319
  (func $supertypeof_F (type $type1)
    (return
      (i32.eq
        (get_local 0)
        (i32.const 6048))))

  ;; function #320
  (func $supertypeof_Arr_D (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 32))))
    (return
      (if i32
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          (i32.const 0))
        (else
          (call $supertypeof_D
            (get_local 0))))))

  ;; function #321
  (func $supertypeof_D (type $type1)
    (return
      (i32.eq
        (get_local 0)
        (i32.const 6312))))

  ;; function #322
  (func $supertypeof_V (type $type1)
    (return
      (i32.eq
        (get_local 0)
        (i32.const 6568))))

  ;; function #323
  (func $supertypeof_Arr_jl_String (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 32))))
    (return
      (if i32
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          (i32.const 0))
        (else
          (call $supertypeof_jl_String
            (get_local 0))))))

  ;; function #324
  (func $supertypeof_Arr_jl_Character (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 32))))
    (return
      (if i32
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          (i32.const 0))
        (else
          (call $supertypeof_jl_Character
            (get_local 0))))))

  ;; function #325
  (func $supertypeof_otp_PlatformClassMetadata (type $type1)
    (return
      (i32.const 0)))

  ;; function #326
  (func $supertypeof_otp_PlatformClass (type $type1)
    (return
      (i32.const 0)))

  ;; function #327
  (func $supertypeof_Arr_jl_StackTraceElement (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 32))))
    (return
      (if i32
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          (i32.const 0))
        (else
          (call $supertypeof_jl_StackTraceElement
            (get_local 0))))))

  ;; function #328
  (func $supertypeof_otr_EventQueue_Node (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 11))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 13))
      (then
        (return
          (i32.const 0))))
    (return
      (i32.const 1)))

  ;; function #329
  (func $supertypeof_otr_EventQueue_Event (type $type1)
    (return
      (i32.const 0)))

  ;; function #330
  (func $supertypeof_Arr_otr_EventQueue_Node (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 32))))
    (return
      (if i32
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          (i32.const 0))
        (else
          (call $supertypeof_otr_EventQueue_Node
            (get_local 0))))))

  ;; function #331
  (func $supertypeof_Arr_jl_Object (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 32))))
    (return
      (if i32
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          (i32.const 0))
        (else
          (call $supertypeof_jl_Object
            (get_local 0))))))

  ;; function #332
  (func $supertypeof_otr_Fiber_FiberRunner (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 16))))
    (if
      (i32.lt_s
        (get_local 0)
        (i32.const 25))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.ge_s
        (get_local 0)
        (i32.const 99))
      (then
        (return
          (i32.const 0))))
    (if
      (i32.gt_s
        (get_local 0)
        (i32.const 27))
      (then
        (if
          (i32.lt_s
            (get_local 0)
            (i32.const 97))
          (then
            (return
              (i32.const 0))))))
    (return
      (i32.const 1)))

  ;; function #333
  (func $supertypeof_otp_PlatformObject (type $type1)
    (return
      (i32.const 0)))

  ;; function #334
  (func $supertypeof_Arr_B (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 32))))
    (return
      (if i32
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          (i32.const 0))
        (else
          (call $supertypeof_B
            (get_local 0))))))

  ;; function #335
  (func $supertypeof_B (type $type1)
    (return
      (i32.eq
        (get_local 0)
        (i32.const 8808))))

  ;; function #336
  (func $supertypeof_Arr_S (type $type1)
    (set_local 0
      (i32.load align=4
        (i32.add
          (get_local 0)
          (i32.const 32))))
    (return
      (if i32
        (i32.eq
          (get_local 0)
          (i32.const 0))
        (then
          (i32.const 0))
        (else
          (call $supertypeof_S
            (get_local 0))))))

  ;; function #337
  (func $supertypeof_S (type $type1)
    (return
      (i32.eq
        (get_local 0)
        (i32.const 9072))))

  ;; function #338
  (func $teavm_javaHeapAddress (export "teavm_javaHeapAddress") (type $type2)
    (return
      (i32.load align=4
        (i32.const 3996))))

  ;; function #339
  (func $teavm_availableBytes (export "teavm_availableBytes") (type $type2)
    (return
      (i32.load align=4
        (i32.const 4000))))

  ;; function #340
  (func $teavm_regionsAddress (export "teavm_regionsAddress") (type $type2)
    (return
      (i32.load align=4
        (i32.const 3980))))

  ;; function #341
  (func $teavm_regionSize (export "teavm_regionSize") (type $type2)
    (return
      (i32.const 1024)))

  ;; function #342
  (func $initclass_otr_GC (type $type3)
    (block $block_0
      (br_if $block_0
        (i32.and
          (i32.load align=4
            (i32.const 980))
          (i32.const 1)))
      (i32.store align=4
        (i32.const 980)
        (i32.or
          (i32.load align=4
            (i32.const 980))
          (i32.const 1)))
      (call $meth_otr_GC__clinit_)))

  ;; function #343
  (func $initclass_jl_Character (type $type3)
    (block $block_0
      (br_if $block_0
        (i32.and
          (i32.load align=4
            (i32.const 2004))
          (i32.const 1)))
      (i32.store align=4
        (i32.const 2004)
        (i32.or
          (i32.load align=4
            (i32.const 2004))
          (i32.const 1)))
      (call $meth_jl_Character__clinit_)))

  ;; function #344
  (func $initclass_jl_Thread (type $type3)
    (block $block_0
      (br_if $block_0
        (i32.and
          (i32.load align=4
            (i32.const 2140))
          (i32.const 1)))
      (i32.store align=4
        (i32.const 2140)
        (i32.or
          (i32.load align=4
            (i32.const 2140))
          (i32.const 1)))
      (call $meth_jl_Thread__clinit_)))

  ;; function #345
  (func $initclass_jl_String (type $type3)
    (block $block_0
      (br_if $block_0
        (i32.and
          (i32.load align=4
            (i32.const 3852))
          (i32.const 1)))
      (i32.store align=4
        (i32.const 3852)
        (i32.or
          (i32.load align=4
            (i32.const 3852))
          (i32.const 1)))
      (call $meth_jl_String__clinit_)))

  ;; function #346
  (func $initclass_otbw_WasmHeap (type $type3)
    (block $block_0
      (br_if $block_0
        (i32.and
          (i32.load align=4
            (i32.const 4044))
          (i32.const 1)))
      (i32.store align=4
        (i32.const 4044)
        (i32.or
          (i32.load align=4
            (i32.const 4044))
          (i32.const 1)))
      (call $meth_otbw_WasmHeap__clinit_)))

  ;; function #347
  (func $initclass_cbv_VisualizerRuntime (type $type3)
    (block $block_0
      (br_if $block_0
        (i32.and
          (i32.load align=4
            (i32.const 4284))
          (i32.const 1)))
      (i32.store align=4
        (i32.const 4284)
        (i32.or
          (i32.load align=4
            (i32.const 4284))
          (i32.const 1)))
      (call $meth_cbv_VisualizerRuntime__clinit_)))

  ;; function #348
  (func $initclass_otr_EventQueue (type $type3)
    (block $block_0
      (br_if $block_0
        (i32.and
          (i32.load align=4
            (i32.const 4628))
          (i32.const 1)))
      (i32.store align=4
        (i32.const 4628)
        (i32.or
          (i32.load align=4
            (i32.const 4628))
          (i32.const 1)))
      (call $meth_otr_EventQueue__clinit_)))

  ;; function #349
  (func $initclass_otr_Fiber (type $type3)
    (block $block_0
      (br_if $block_0
        (i32.and
          (i32.load align=4
            (i32.const 4772))
          (i32.const 1)))
      (i32.store align=4
        (i32.const 4772)
        (i32.or
          (i32.load align=4
            (i32.const 4772))
          (i32.const 1)))
      (call $meth_otr_Fiber__clinit_)))

  ;; function #350
  (func $__start__ (type $type3)
    (call $initclass_otbw_WasmHeap)
    (call $meth_otbw_WasmHeap_initHeap
      (i32.const 24584)
      (i32.const 4194304)
      (i32.const 134217728)
      (i32.const 262144)
      (i32.const 512))
    (call $initclass_otr_GC)
    (call $initclass_otr_EventQueue)
    (call $initclass_otr_Fiber))

  ;; function #351
  (func $teavm_start (export "start") (type $type0)
    (call $meth_otbwr_WasmSupport_runWithArgs
      (get_local 0)))

  ;; function #352
  (func $teavm_call_start (export "_start") (type $type3)
    (call $meth_otbwr_WasmSupport_runWithoutArgs))

  (table 120 anyfunc)

  (memory (export "memory") 1)

  (elem (i32.const 0)
    $supertypeof_jl_Object
    $meth_jl_Object_getClass
    $supertypeof_jl_Throwable
    $meth_jl_Throwable_fillInStackTrace
    $supertypeof_jl_Exception
    $supertypeof_jl_RuntimeException
    $supertypeof_jl_IndexOutOfBoundsException
    $supertypeof_otr_GC
    $initclass_otr_GC
    $supertypeof_ju_Arrays
    $supertypeof_jlr_Array
    $supertypeof_otr_Console
    $supertypeof_jl_System
    $supertypeof_otbwr_WasmSupport
    $supertypeof_otbw_WasmRuntime
    $supertypeof_jl_NullPointerException
    $supertypeof_jl_Character
    $initclass_jl_Character
    $supertypeof_jl_Thread
    $initclass_jl_Thread
    $supertypeof_jl_DefaultUncaughtExceptionHandler
    $supertypeof_jl_Math
    $supertypeof_otbwr_WasmSupport_runWithoutArgs_lambda__14_0
    $meth_otbwr_WasmSupport_runWithoutArgs_lambda__14_0_run
    $supertypeof_otr_ShadowStack
    $supertypeof_jl_StringIndexOutOfBoundsException
    $supertypeof_jl_AbstractStringBuilder
    $meth_jl_AbstractStringBuilder_toString
    $meth_jl_AbstractStringBuilder_insert
    $meth_jl_AbstractStringBuilder_insert_0
    $meth_jl_AbstractStringBuilder_ensureCapacity
    $meth_jl_AbstractStringBuilder_append
    $meth_jl_AbstractStringBuilder_insert_1
    $meth_jl_AbstractStringBuilder_insert_2
    $meth_jl_AbstractStringBuilder_append_0
    $meth_jl_AbstractStringBuilder_append_1
    $meth_jl_AbstractStringBuilder_append_2
    $meth_jl_AbstractStringBuilder_append_3
    $meth_jl_AbstractStringBuilder_setLength
    $supertypeof_jl_StringBuilder
    $meth_jl_StringBuilder_toString
    $meth_jl_StringBuilder_insert
    $meth_jl_StringBuilder_insert_0
    $meth_jl_StringBuilder_ensureCapacity
    $meth_jl_StringBuilder_insert_1
    $meth_jl_StringBuilder_setLength
    $meth_jl_StringBuilder_insert_2
    $meth_jl_StringBuilder_insert_3
    $meth_jl_StringBuilder_insert_4
    $meth_jl_StringBuilder_append
    $meth_jl_StringBuilder_append_0
    $meth_jl_StringBuilder_append_1
    $meth_jl_StringBuilder_append_2
    $supertypeof_otr_Mutator
    $supertypeof_otr_MemoryTrace
    $supertypeof_otp_Platform
    $supertypeof_otr_ExceptionHandling
    $supertypeof_otr_MarkQueue
    $supertypeof_otbwr_WasmSupport_runWithArgs_lambda__15_0
    $meth_otbwr_WasmSupport_runWithArgs_lambda__15_0_run
    $supertypeof_jl_StackTraceElement
    $supertypeof_jl_String
    $meth_jl_String_length
    $meth_jl_String_charAt
    $meth_jl_String_isEmpty
    $initclass_jl_String
    $supertypeof_otbw_WasmHeap
    $initclass_otbw_WasmHeap
    $supertypeof_jl_NegativeArraySizeException
    $supertypeof_cbv_VisualizerRuntime
    $initclass_cbv_VisualizerRuntime
    $supertypeof_jl_ArrayIndexOutOfBoundsException
    $supertypeof_jl_IllegalArgumentException
    $supertypeof_otr_EventQueue
    $initclass_otr_EventQueue
    $supertypeof_otr_Fiber
    $meth_otr_Fiber_isSuspending
    $meth_otr_Fiber_push
    $meth_otr_Fiber_push_0
    $meth_otr_Fiber_push_1
    $meth_otr_Fiber_push_2
    $meth_otr_Fiber_push_3
    $meth_otr_Fiber_popInt
    $meth_otr_Fiber_popLong
    $meth_otr_Fiber_popFloat
    $meth_otr_Fiber_popDouble
    $meth_otr_Fiber_popObject
    $meth_otr_Fiber_isResuming
    $initclass_otr_Fiber
    $supertypeof_jl_String__clinit__lambda__84_0
    $supertypeof_jl_Class
    $meth_jl_Class_getComponentType
    $meth_jl_Class_getPlatformClass
    $supertypeof_otr_Allocator
    $supertypeof_C
    $supertypeof_Arr_C
    $supertypeof_I
    $supertypeof_Arr_I
    $supertypeof_J
    $supertypeof_Arr_J
    $supertypeof_F
    $supertypeof_Arr_F
    $supertypeof_D
    $supertypeof_Arr_D
    $supertypeof_V
    $supertypeof_Arr_jl_String
    $supertypeof_Arr_jl_Character
    $supertypeof_otp_PlatformClassMetadata
    $supertypeof_otp_PlatformClass
    $supertypeof_Arr_jl_StackTraceElement
    $supertypeof_otr_EventQueue_Node
    $supertypeof_otr_EventQueue_Event
    $supertypeof_Arr_otr_EventQueue_Node
    $supertypeof_Arr_jl_Object
    $supertypeof_otr_Fiber_FiberRunner
    $supertypeof_otp_PlatformObject
    $supertypeof_B
    $supertypeof_Arr_B
    $supertypeof_S
    $supertypeof_Arr_S)

  (data (i32.const 256)
      "\00\00\00\80\00\00\00@\00\00\00\00\01\00\00\00\02\00\00\00\04\00\00\00\00\04\00\00\03\00\00\00\0f\00\00\00\07\00\00\00\07\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00\03\00\00\00\04\00\00\00\05\00\00\00\06\00\00\00\07\00\00\00\08\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\00\00\00\00\a2\aa\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\18!\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00\88\ca\86\d2\11\9c \1c\04\00\08\00\0c\00\14\00\18\00\00\00\00\00\00\00u\02\00\80\00\00\00\00\1c\00\00\00\00\00\00\00\1f\00\00\00\b6\b5\aa\aa\00\00\00\00\00\00\00\00"
      "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\d0\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\03\00\00\00\00\00\00\00HI\dc[-u\a1\e1u\02\00\80\00\00\00\00\1c\00\00\00\00\00\00\00 \00\00\00\b6\8a\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00\ff\ff\ff\ff\e0\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\03\00\00\00\00\00\00\00K\cd\13\de\f7\1b\a80u\02\00\80\00\00\00\00\1c\00\00\00\00\00\00\00!\00\00\00\b6\8b\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\05\00\00\00\ff\ff\ff\ffP\02\00\00\00\00\00\00"
      "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\03\00\00\00\00\00\00\001\e2\9d\e1\cdaG\9au\02\00\80\00\00\00\00\1c\00\00\00\00\00\00\00\"\00\00\00\b6\88\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\06\00\00\00\ff\ff\ff\ff\c0\02\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\03\00\00\00\01\02\04\08\08\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\01\00\00\00\a2\ab\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\07\00\00\00\08\00\00\00"
      "`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\03\00\00\00\a2\a9\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\09\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\05\00\00\00\a2\af\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\0a\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00"
      "u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\07\00\00\00\a2\ad\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\0b\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\09\00\00\00\a2\a3\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\0c\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\0d\00\00\00\a2\a7\aa\aa\00\00\00\00\00\00\00\00"
      "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\0d\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\0f\00\00\00\a2\a5\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\0e\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00\a6\ba\f8x\e2\ab\a2$u\02\00\80\00\00\00\00\1c\00\00\00\00\00\00\00(\00\00\00\b6\82\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\0f\00\00\00\ff\ff\ff\ff\c0\02\00\00\00\00\00\00\00\00\00\00\00\00\00\00"
      "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\03\00\00\00\02\00\00\00$\00\00\00\00\00\ff\ff\00\00\00\00\00\01\02\03\04\05\06\07\08\09\0a\0b\0c\0d\0e\0f\10\11\13\14\15\16\17\18\19\1a\1b\1c\1d\1e\ff\00\01\02\03\04\05\06\07\08\09\0a\0b\0c\0d\0e\0f\10\11\12\00\d8\ff\db\00\dc\ff\df\00\d8\ff\df\00\00\00\00\01\00\00\00\00\00\ff\ff\10\00\10\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\f8\00\00\00\d8\00\00\00\fc\00\00\ff\03\00\00\00\d8\00\00\00\dc\00\00\0a\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00u\02\00\80\00\00\00\00\10\00\00\00\00\00\00\00\11\00\00\00\ba\bb\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\f8\1a\00\00\00\00\00\00\00\00\00\00\10\00\00\00\11\00\00\00"
      "`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\05\00\08\00,\004\008\00@\00\00\00\00\00u\02\00\80\00\00\00\00D\00\00\00\00\00\00\00\13\00\00\00\ee\b9\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\12\00\00\00\13\00\00\00`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00@\08\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\15\00\00\00\a2\bf\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\14\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00"
      "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00iW\14\8b\0a\bf\05@\18-DT\fb!\09@u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\17\00\00\00\a2\bd\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\15\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\19\00\00\00\a2\b3\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\16\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\17\00\00\00\00\00\00\00"
      "u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\1b\00\00\00\a2\b1\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\18\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00m~\f9*\aa\bd\11]u\02\00\80\00\00\00\00\1c\00\00\00\00\00\00\00#\00\00\00\b6\89\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\19\00\00\00\ff\ff\ff\ff0\03\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\03\00\00\00\01\00\08\00u\02\00\80\00\00\00\00\10\00\00\00\00\00\00\00Y\00\00\00\ba\f3\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00"
      "\00\00\00\00\00\00\00\00\1a\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\d4\0a\00\00\00\00\00\00\00\00\00\00\00\00\00\00\1b\00\00\00\01\00\00\00\1c\00\00\00\1d\00\00\00\1e\00\00\00\1f\00\00\00 \00\00\00!\00\00\00\"\00\00\00#\00\00\00$\00\00\00%\00\00\00&\00\00\00\00\00\00\00u\02\00\80\00\00\00\00\10\00\00\00\00\00\00\00Z\00\00\00\ba\f0\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00'\00\00\00\ff\ff\ff\ff\d8\0a\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00(\00\00\00\01\00\00\00)\00\00\00*\00\00\00+\00\00\00\1f\00\00\00,\00\00\00!\00\00\00\"\00\00\00#\00\00\00$\00\00\00%\00\00\00-\00\00\00.\00\00\00/\00\00\000\00\00\00"
      "1\00\00\002\00\00\003\00\00\004\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\001\00\00\00\a2\9b\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\005\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\003\00\00\00\a2\99\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\006\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00W\00\00\00\a2\fd\aa\aa\00\00\00\00\00\00\00\00"
      "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\007\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00]\00\00\00\a2\f7\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\008\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00_\00\00\00\a2\f5\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\009\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00"
      "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\01\00\08\00u\02\00\80\00\00\00\00\0c\00\00\00\00\00\00\00a\00\00\00\a6\cb\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00:\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\1c\0e\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00;\00\00\00\03\00\08\00\0c\00\10\00\00\00\00\00u\02\00\80\00\00\00\00\18\00\00\00\00\00\00\00c\00\00\00\b2\c9\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\1e\00\00\00\00\00\00\00\00\00\00<\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\84\0e\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00\01\00\08\00\00\00\00\00"
      "u\02\00\80\00\00\00\00\10\00\00\00\00\00\00\00e\00\00\00\ba\cf\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00H\1a\00\00\00\00\00\00\00\00\00\00=\00\00\00A\00\00\00`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\f8\0e\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00>\00\00\00?\00\00\00@\00\00\00\00\00\01\00\00\00\04\00\00\04\00\00\00\02\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00g\00\00\00\a2\cd\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00B\00\00\00C\00\00\00`\01\00\00\00\00\00\00"
      "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00W,\d8\a8/b'Cu\02\00\80\00\00\00\00\1c\00\00\00\00\00\00\00*\00\00\00\b6\80\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00D\00\00\00\ff\ff\ff\ff\c0\02\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\03\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00i\00\00\00\a2\c3\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00E\00\00\00F\00\00\00`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00"
      "\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00\96{\b8RI\f9uHu\02\00\80\00\00\00\00\1c\00\00\00\00\00\00\00%\00\00\00\b6\8f\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00G\00\00\00\ff\ff\ff\ff0\03\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\03\00\00\00\00\00\00\00\cb\d5\f5j<2\fd\eeu\02\00\80\00\00\00\00\1c\00\00\00\00\00\00\00,\00\00\00\b6\86\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00H\00\00\00\ff\ff\ff\ff\c0\02\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\03\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00"
      "\00\00\00\00\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00k\00\00\00\a2\c1\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00I\00\00\00J\00\00\00`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00\01\00\00\00\02\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\08\00\08\00\10\00\18\00 \00(\004\008\00<\00\00\00u\02\00\80\00\00\00\00\80\00\00\00\00\00\00\00m\00\00\00*\c7\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00K\00\00\00X\00\00\00`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\84\12\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00L\00\00\00M\00\00\00"
      "N\00\00\00O\00\00\00P\00\00\00Q\00\00\00R\00\00\00S\00\00\00T\00\00\00U\00\00\00V\00\00\00W\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00o\00\00\00\a2\c5\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00Y\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\0a\00\08\00\0c\00\10\00\14\00\18\00\1c\00 \00$\00(\00,\00\00\00\00\00u\02\00\80\00\00\00\000\00\00\00\00\00\00\00q\00\00\00\9a\db\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00Z\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\8e\13\00\00\00\00\00\00\00\00\00\00\00\00\00\00"
      "\ff\ff\ff\ff\01\00\00\00[\00\00\00\\\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00s\00\00\00\a2\d9\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00]\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\e0\01\00\80\00\00\00\00\84\14\00\00\00\00\00\00\00\00\00\80\00\00\00\00\04\00\00\00c\00h\00a\00r\00u\02\00\80\00\00\00\00\02\00\00\00\02\00\00\00\00\00\00\00\00\00\00\00t\14\00\00\00\00\00\00\00\00\00\00\10\15\00\00\00\00\00\00\00\00\00\00^\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\e0\01\00\80\00\00\00\00\00\15\00\00\00\00\00\00"
      "\00\00\00\80\00\00\00\00\02\00\00\00[\00C\00u\02\00\80\00\00\00\00\04\00\00\00\00\00\00\00\00\00\00\00\ae\aa\aa\aa\f0\14\00\00\00\00\00\00\98\14\00\00\00\00\00\00\00\00\00\00\00\00\00\00_\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\e0\01\00\80\00\00\00\00\84\15\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\03\00\00\00i\00n\00t\00\00\00u\02\00\80\00\00\00\00\04\00\00\00\02\00\00\00\00\00\00\00\00\00\00\00t\15\00\00\00\00\00\00\00\00\00\00\10\16\00\00\00\00\00\00\00\00\00\00`\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\e0\01\00\80\00\00\00\00\00\16\00\00\00\00\00\00"
      "\a2\02\00\80\00\00\00\00\02\00\00\00[\00I\00u\02\00\80\00\00\00\00\04\00\00\00\00\00\00\00\00\00\00\00\ae\aa\aa\aa\f0\15\00\00\00\00\00\00\98\15\00\00\00\00\00\00\00\00\00\00\00\00\00\00a\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\e0\01\00\80\00\00\00\00\84\16\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\04\00\00\00l\00o\00n\00g\00u\02\00\80\00\00\00\00\08\00\00\00\02\00\00\00\00\00\00\00\00\00\00\00t\16\00\00\00\00\00\00\00\00\00\00\10\17\00\00\00\00\00\00\00\00\00\00b\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\e0\01\00\80\00\00\00\00\00\17\00\00\00\00\00\00"
      "\a2\02\00\80\00\00\00\00\02\00\00\00[\00J\00u\02\00\80\00\00\00\00\04\00\00\00\00\00\00\00\00\00\00\00\ae\aa\aa\aa\f0\16\00\00\00\00\00\00\98\16\00\00\00\00\00\00\00\00\00\00\00\00\00\00c\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\e0\01\00\80\00\00\00\00\84\17\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\05\00\00\00f\00l\00o\00a\00t\00\00\00\00\00\00\00u\02\00\80\00\00\00\00\04\00\00\00\02\00\00\00\00\00\00\00\00\00\00\00t\17\00\00\00\00\00\00\00\00\00\00\18\18\00\00\00\00\00\00\00\00\00\00d\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\e0\01\00\80\00\00\00\00"
      "\08\18\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\02\00\00\00[\00F\00u\02\00\80\00\00\00\00\04\00\00\00\00\00\00\00\00\00\00\00\ae\aa\aa\aa\f8\17\00\00\00\00\00\00\a0\17\00\00\00\00\00\00\00\00\00\00\00\00\00\00e\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\e0\01\00\80\00\00\00\00\8c\18\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\06\00\00\00d\00o\00u\00b\00l\00e\00\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\02\00\00\00\00\00\00\00\00\00\00\00|\18\00\00\00\00\00\00\00\00\00\00 \19\00\00\00\00\00\00\00\00\00\00f\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00"
      "\e0\01\00\80\00\00\00\00\10\19\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\02\00\00\00[\00D\00u\02\00\80\00\00\00\00\04\00\00\00\00\00\00\00\00\00\00\00\ae\aa\aa\aa\00\19\00\00\00\00\00\00\a8\18\00\00\00\00\00\00\00\00\00\00\00\00\00\00g\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\e0\01\00\80\00\00\00\00\94\19\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\04\00\00\00v\00o\00i\00d\00u\02\00\80\00\00\00\00\00\00\00\00\02\00\00\00\00\00\00\00\00\00\00\00\84\19\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00h\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00"
      "\e0\01\00\80\00\00\00\00\10\1a\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\13\00\00\00[\00L\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00S\00t\00r\00i\00n\00g\00;\00\00\00\00\00\00\00u\02\00\80\00\00\00\00\04\00\00\00\00\00\00\00\00\00\00\00\ae\aa\aa\aa\00\1a\00\00\00\00\00\00\00\0f\00\00\00\00\00\00\00\00\00\00\00\00\00\00i\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\e0\01\00\80\00\00\00\00\bc\1a\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\16\00\00\00[\00L\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00C\00h\00a\00r\00a\00c\00t\00e\00r\00;\00\00\00\00\00u\02\00\80\00\00\00\00"
      "\04\00\00\00\00\00\00\00\00\00\00\00\ae\aa\aa\aa\ac\1a\00\00\00\00\00\00\c8\07\00\00\00\00\00\00\00\00\00\00\00\00\00\00j\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\e0\01\00\80\00\00\00\00l\1b\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\04\00\00\00m\00a\00i\00n\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\00\00\00\00\a2\aa\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00k\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\00\00\00\00\a2\aa\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00"
      "\00\00\00\00\00\00\00\00l\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\e0\01\00\80\00\00\00\00@\1c\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\04\00\00\00n\00u\00l\00l\00\e0\01\00\80\00\00\00\00d\1c\00\00\00\00\00\00\a2\02\00\80\00\00\00\00*\00\00\00\09\00a\00t\00 \00O\00b\00f\00u\00s\00c\00a\00t\00e\00d\00.\00o\00b\00f\00u\00s\00c\00a\00t\00e\00d\00(\00O\00b\00f\00u\00s\00c\00a\00t\00e\00d\00.\00j\00a\00v\00a\00:\00\e0\01\00\80\00\00\00\00\d4\1c\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\02\00\00\00)\00\0a\00\e0\01\00\80\00\00\00\00\f4\1c\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\04\00\00\00"
      "\09\00a\00t\00 \00\e0\01\00\80\00\00\00\00\18\1d\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\01\00\00\00.\00\00\00\e0\01\00\80\00\00\00\008\1d\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\10\00\00\00(\00U\00n\00k\00n\00o\00w\00n\00 \00m\00e\00t\00h\00o\00d\00)\00\e0\01\00\80\00\00\00\00t\1d\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\01\00\00\00(\00\00\00\e0\01\00\80\00\00\00\00\94\1d\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\01\00\00\00:\00\00\00\e0\01\00\80\00\00\00\00\b4\1d\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\1e\00\00\00[\00L\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00S\00t\00a\00c\00k\00T\00r\00a\00c\00e\00E\00l\00e\00m\00e\00n\00t\00;\00\00\00\00\00"
      "u\02\00\80\00\00\00\00\04\00\00\00\00\00\00\00\00\00\00\00\ae\aa\aa\aa\a4\1d\00\00\00\00\00\00\90\0e\00\00\00\00\00\00\00\00\00\00\00\00\00\00m\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\e0\01\00\80\00\00\00\00t\1e\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0a\00\00\00O\00b\00f\00u\00s\00c\00a\00t\00e\00d\00\e0\01\00\80\00\00\00\00\a4\1e\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0a\00\00\00o\00b\00f\00u\00s\00c\00a\00t\00e\00d\00\e0\01\00\80\00\00\00\00\d4\1e\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0f\00\00\00O\00b\00f\00u\00s\00c\00a\00t\00e\00d\00.\00j\00a\00v\00a\00\00\00"
      "\e0\01\00\80\00\00\00\00\10\1f\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\00\00\00\00\e0\01\00\80\00\00\00\00,\1f\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\04\00\00\00p\00o\00n\00g\00\01\00\0c\00\00\00\00\00u\02\00\80\00\00\00\00\18\00\00\00\00\00\00\00\0b\00\00\00\b2\a1\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00p \00\00\00\00\00\00\00\00\00\00n\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00@\1f\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\00\00\00\00\a2\aa\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00o\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00"
      "\00\00\00\00\00\00\00\00\e0\01\00\80\00\00\00\00\18 \00\00\00\00\00\00\a2\02\00\80\00\00\00\00$\00\00\00[\00L\00o\00r\00g\00.\00t\00e\00a\00v\00m\00.\00r\00u\00n\00t\00i\00m\00e\00.\00E\00v\00e\00n\00t\00Q\00u\00e\00u\00e\00$\00N\00o\00d\00e\00;\00\00\00\00\00u\02\00\80\00\00\00\00\04\00\00\00\00\00\00\00\00\00\00\00\ae\aa\aa\aa\08 \00\00\00\00\00\00H\1f\00\00\00\00\00\00\00\00\00\00\00\00\00\00p\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\e0\01\00\80\00\00\00\00\e4 \00\00\00\00\00\00\a2\02\00\80\00\00\00\00\13\00\00\00[\00L\00j\00a\00v\00a\00.\00l\00"
      "a\00n\00g\00.\00O\00b\00j\00e\00c\00t\00;\00\00\00u\02\00\80\00\00\00\00\04\00\00\00\00\00\00\00\00\00\00\00\ae\aa\aa\aa\d4 \00\00\00\00\00\00`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00q\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\19\00\00\00\a2\b3\aa\aa\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00r\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\ff\ff\ff\ff\ff\ff\ff\ff\00\00\00\00u\02\00\80\00\00\00\00\08\00\00\00\00\00\00\00\00\00\00\00\a2\aa\aa\aa"
      "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00s\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\e0\01\00\80\00\00\00\00P\"\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\04\00\00\00b\00y\00t\00e\00\00\00\00\00u\02\00\80\00\00\00\00\01\00\00\00\02\00\00\00\00\00\00\00\00\00\00\00@\"\00\00\00\00\00\00\00\00\00\00\e0\"\00\00\00\00\00\00\00\00\00\00t\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\e0\01\00\80\00\00\00\00\d0\"\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\02\00\00\00[\00B\00u\02\00\80\00\00\00\00\04\00\00\00\00\00\00\00\00\00\00\00\ae\aa\aa\aa\c0\"\00\00\00\00\00\00"
      "h\"\00\00\00\00\00\00\00\00\00\00\00\00\00\00u\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\e0\01\00\80\00\00\00\00T#\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\05\00\00\00s\00h\00o\00r\00t\00\00\00\00\00\00\00u\02\00\80\00\00\00\00\02\00\00\00\02\00\00\00\00\00\00\00\00\00\00\00D#\00\00\00\00\00\00\00\00\00\00\e8#\00\00\00\00\00\00\00\00\00\00v\00\00\00\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\e0\01\00\80\00\00\00\00\d8#\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\02\00\00\00[\00S\00u\02\00\80\00\00\00\00\04\00\00\00\00\00\00\00\00\00\00\00\ae\aa\aa\aa"
      "\c8#\00\00\00\00\00\00p#\00\00\00\00\00\00\00\00\00\00\00\00\00\00w\00\00\00\ff\ff\ff\ff`\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\01\00\00\00\ff\ff\ff\ff\00\00\00\00\94.\00\00\00\00\00\00\a0/\00\00\00\00\00\00\\0\00\00\00\00\00\00\\0\00\00\00\00\00\00h0\00\00\00\00\00\00h0\00\00\00\00\00\00t0\00\00\00\00\00\00\800\00\00\00\00\00\00\800\00\00\00\00\00\00\8c0\00\00\00\00\00\00\8c0\00\00\00\00\00\00\980\00\00\00\00\00\00\a40\00\00\00\00\00\00\a40\00\00\00\00\00\00\b00\00\00\00\00\00\00\b00\00\00\00\00\00\00\bc0\00\00\00\00\00\00\c80\00\00\00\00\00\00\c80\00\00\00\00\00\00\d40\00\00\00\00\00\00\d40\00\00\00\00\00\00\e00\00\00\00\00\00\00"
      "\ec0\00\00\00\00\00\00\ec0\00\00\00\00\00\00\f80\00\00\00\00\00\00\f80\00\00\00\00\00\00\041\00\00\00\00\00\00\041\00\00\00\00\00\00\041\00\00\00\00\00\00\041\00\00\00\00\00\00\041\00\00\00\00\00\00\101\00\00\00\00\00\00\041\00\00\00\00\00\00\1c1\00\00\00\00\00\00\1c1\00\00\00\00\00\00\1c1\00\00\00\00\00\00(1\00\00\00\00\00\00(1\00\00\00\00\00\00(1\00\00\00\00\00\00\002\00\00\00\00\00\00\002\00\00\00\00\00\00\002\00\00\00\00\00\00\0c2\00\00\00\00\00\00\182\00\00\00\00\00\00\182\00\00\00\00\00\00\182\00\00\00\00\00\00\0c2\00\00\00\00\00\00\0c2\00\00\00\00\00\00\0c2\00\00\00\00\00\00$2\00\00\00\00\00\00\8c2\00\00\00\00\00\00p3\00\00\00\00\00\00\804\00\00\00\00\00\00\d04\00\00\00\00\00\00"
      ",5\00\00\00\00\00\00,5\00\00\00\00\00\00,5\00\00\00\00\00\0085\00\00\00\00\00\00\905\00\00\00\00\00\00\905\00\00\00\00\00\00\905\00\00\00\00\00\00\9c5\00\00\00\00\00\00\046\00\00\00\00\00\00\046\00\00\00\00\00\00t6\00\00\00\00\00\00@7\00\00\00\00\00\00\d47\00\00\00\00\00\00`8\00\00\00\00\00\00\f48\00\00\00\00\00\00\189\00\00\00\00\00\00$9\00\00\00\00\00\00$9\00\00\00\00\00\00\f48\00\00\00\00\00\0009\00\00\00\00\00\00\909\00\00\00\00\00\0009\00\00\00\00\00\00\b49\00\00\00\00\00\00\b49\00\00\00\00\00\00\d89\00\00\00\00\00\00\d89\00\00\00\00\00\00\e49\00\00\00\00\00\00\e0:\00\00\00\00\00\00\ac;\00\00\00\00\00\00\f4;\00\00\00\00\00\00\f0<\00\00\00\00\00\00\94=\00\00\00\00\00\00"
      "H>\00\00\00\00\00\00\94>\00\00\00\00\00\00\a0>\00\00\00\00\00\00\ac>\00\00\00\00\00\00\b8>\00\00\00\00\00\00\04?\00\00\00\00\00\00\10?\00\00\00\00\00\00\1c?\00\00\00\00\00\00p?\00\00\00\00\00\00\c0?\00\00\00\00\00\00\1c@\00\00\00\00\00\00\1c@\00\00\00\00\00\00\1c@\00\00\00\00\00\00(@\00\00\00\00\00\00\cc@\00\00\00\00\00\00\cc@\00\00\00\00\00\00,A\00\00\00\00\00\00\00B\00\00\00\00\00\00\0cB\00\00\00\00\00\00\18B\00\00\00\00\00\00<B\00\00\00\00\00\00HB\00\00\00\00\00\00HB\00\00\00\00\00\00HB\00\00\00\00\00\00lB\00\00\00\00\00\00xB\00\00\00\00\00\00xB\00\00\00\00\00\00\84B\00\00\00\00\00\00\90B\00\00\00\00\00\00\9cB\00\00\00\00\00\00\a8B\00\00\00\00\00\00\90B\00\00\00\00\00\00"
      "\90B\00\00\00\00\00\00\90B\00\00\00\00\00\00\90B\00\00\00\00\00\00\9cB\00\00\00\00\00\00\9cB\00\00\00\00\00\00\b4B\00\00\00\00\00\00\c0B\00\00\00\00\00\00\ccB\00\00\00\00\00\00\d8B\00\00\00\00\00\00\e4B\00\00\00\00\00\00\f0B\00\00\00\00\00\00\fcB\00\00\00\00\00\00\08C\00\00\00\00\00\00\08C\00\00\00\00\00\00\e4B\00\00\00\00\00\00\e4B\00\00\00\00\00\00\14C\00\00\00\00\00\00\14C\00\00\00\00\00\00\fcB\00\00\00\00\00\00\fcB\00\00\00\00\00\00 C\00\00\00\00\00\00,C\00\00\00\00\00\008C\00\00\00\00\00\008C\00\00\00\00\00\00DC\00\00\00\00\00\00DC\00\00\00\00\00\00PC\00\00\00\00\00\00tC\00\00\00\00\00\00\80C\00\00\00\00\00\00\8cC\00\00\00\00\00\00\8cC\00\00\00\00\00\00\8cC\00\00\00\00\00\00"
      "\98C\00\00\00\00\00\00\98C\00\00\00\00\00\00\bcC\00\00\00\00\00\00\14D\00\00\00\00\00\00\14D\00\00\00\00\00\00\14D\00\00\00\00\00\00\14D\00\00\00\00\00\00 D\00\00\00\00\00\00\e8D\00\00\00\00\00\00\0cE\00\00\00\00\00\00\d0E\00\00\00\00\00\00\d0E\00\00\00\00\00\00\d0E\00\00\00\00\00\00\dcE\00\00\00\00\00\00pF\00\00\00\00\00\00\94F\00\00\00\00\00\00\94F\00\00\00\00\00\00\94F\00\00\00\00\00\00\a0F\00\00\00\00\00\00\a0F\00\00\00\00\00\00\acF\00\00\00\00\00\00\b8F\00\00\00\00\00\00pF\00\00\00\00\00\00\c4F\00\00\00\00\00\00\c4F\00\00\00\00\00\00\c4F\00\00\00\00\00\00\c4F\00\00\00\00\00\00\d0F\00\00\00\00\00\00\dcF\00\00\00\00\00\00pF\00\00\00\00\00\00\e8F\00\00\00\00\00\00\e8F\00\00\00\00\00\00"
      "8G\00\00\00\00\00\00\\G\00\00\00\00\00\00\\G\00\00\00\00\00\00\\G\00\00\00\00\00\00\a8G\00\00\00\00\00\00\b4G\00\00\00\00\00\00\b4G\00\00\00\00\00\00\c0G\00\00\00\00\00\00\0cH\00\00\00\00\00\00\\H\00\00\00\00\00\00\\H\00\00\00\00\00\00\80H\00\00\00\00\00\00dI\00\00\00\00\00\00<J\00\00\00\00\00\00`J\00\00\00\00\00\00\b4J\00\00\00\00\00\00\b4J\00\00\00\00\00\00\d8J\00\00\00\00\00\00 K\00\00\00\00\00\00tK\00\00\00\00\00\00\80K\00\00\00\00\00\00\a4K\00\00\00\00\00\00\f8K\00\00\00\00\00\00LL\00\00\00\00\00\00\a8L\00\00\00\00\00\00\a8L\00\00\00\00\00\00\ccL\00\00\00\00\00\00(M\00\00\00\00\00\00\88M\00\00\00\00\00\00\e8M\00\00\00\00\00\00PN\00\00\00\00\00\00\b4N\00\00\00\00\00\00"
      "\14O\00\00\00\00\00\00tO\00\00\00\00\00\00\dcO\00\00\00\00\00\00@P\00\00\00\00\00\00\a8P\00\00\00\00\00\00\0cQ\00\00\00\00\00\00pQ\00\00\00\00\00\00\d8Q\00\00\00\00\00\00<R\00\00\00\00\00\00\a0R\00\00\00\00\00\00\a0R\00\00\00\00\00\00\a0R\00\00\00\00\00\00\00S\00\00\00\00\00\00\a0R\00\00\00\00\00\00\a0R\00\00\00\00\00\00\a0R\00\00\00\00\00\00\a0R\00\00\00\00\00\00\a0R\00\00\00\00\00\00\a0R\00\00\00\00\00\00\a0R\00\00\00\00\00\00\a0R\00\00\00\00\00\00\a0R\00\00\00\00\00\00$S\00\00\00\00\00\00\80S\00\00\00\00\00\00\dcS\00\00\00\00\00\000T\00\00\00\00\00\000T\00\00\00\00\00\00TT\00\00\00\00\00\00\a0T\00\00\00\00\00\00\a0T\00\00\00\00\00\00\c4T\00\00\00\00\00\00 U\00\00\00\00\00\00"
      " U\00\00\00\00\00\00DU\00\00\00\00\00\00\00V\00\00\00\00\00\00\f4V\00\00\00\00\00\00\d0W\00\00\00\00\00\00\bcX\00\00\00\00\00\00\c8X\00\00\00\00\00\00\d4X\00\00\00\00\00\00\c8X\00\00\00\00\00\00\e0X\00\00\00\00\00\00\e0X\00\00\00\00\00\00\ecX\00\00\00\00\00\00\ecX\00\00\00\00\00\00\f8X\00\00\00\00\00\00\f8X\00\00\00\00\00\00DY\00\00\00\00\00\00DY\00\00\00\00\00\00DY\00\00\00\00\00\00PY\00\00\00\00\00\00DY\00\00\00\00\00\00\\Y\00\00\00\00\00\00\\Y\00\00\00\00\00\00\a8Y\00\00\00\00\00\00\a8Y\00\00\00\00\00\00\b4Y\00\00\00\00\00\00\b4Y\00\00\00\00\00\00\b4Y\00\00\00\00\00\00\b4Y\00\00\00\00\00\00\b4Y\00\00\00\00\00\00\b4Y\00\00\00\00\00\00\c0Y\00\00\00\00\00\00\c0Y\00\00\00\00\00\00"
      "\c0Y\00\00\00\00\00\00\c0Y\00\00\00\00\00\00\ccY\00\00\00\00\00\00\ccY\00\00\00\00\00\00\ccY\00\00\00\00\00\00\ccY\00\00\00\00\00\00\d8Y\00\00\00\00\00\00\fcY\00\00\00\00\00\00\9cZ\00\00\00\00\00\00\e4Z\00\00\00\00\00\00\f0Z\00\00\00\00\00\00\f0Z\00\00\00\00\00\00\fcZ\00\00\00\00\00\00\fcZ\00\00\00\00\00\00\08[\00\00\00\00\00\00\14[\00\00\00\00\00\00 [\00\00\00\00\00\00 [\00\00\00\00\00\00,[\00\00\00\00\00\00,[\00\00\00\00\00\008[\00\00\00\00\00\00D[\00\00\00\00\00\00P[\00\00\00\00\00\00P[\00\00\00\00\00\00\\[\00\00\00\00\00\00\\[\00\00\00\00\00\00h[\00\00\00\00\00\00t[\00\00\00\00\00\00\80[\00\00\00\00\00\00\80[\00\00\00\00\00\00\8c[\00\00\00\00\00\00\8c[\00\00\00\00\00\00"
      "\98[\00\00\00\00\00\00\a4[\00\00\00\00\00\00\b0[\00\00\00\00\00\00\b0[\00\00\00\00\00\00\bc[\00\00\00\00\00\00\bc[\00\00\00\00\00\00\c8[\00\00\00\00\00\00\c8[\00\00\00\00\00\00\c8[\00\00\00\00\00\00\14\\\00\00\00\00\00\00 \\\00\00\00\00\00\00 \\\00\00\00\00\00\00,\\\00\00\00\00\00\00\b8\\\00\00\00\00\00\00x]\00\00\00\00\00\00\0c^\00\00\00\00\00\000^\00\00\00\00\00\000^\00\00\00\00\00\00<^\00\00\a0.\00\00\16\00\00\00\00\00\00\00\ac.\00\00\0c/\00\00t/\00\00\b0.\00\00\e0\01\00\80\00\00\00\00\c0.\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\1f\00\00\00T\00I\00n\00d\00e\00x\00O\00u\00t\00O\00f\00B\00o\00u\00n\00d\00s\00E\00x\00c\00e\00p\00t\00i\00o\00n\00"
      ".\00j\00a\00v\00a\00\00\00\10/\00\00\e0\01\00\80\00\00\00\00 /\00\00\00\00\00\00\a2\02\00\80\00\00\00\00#\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00I\00n\00d\00e\00x\00O\00u\00t\00O\00f\00B\00o\00u\00n\00d\00s\00E\00x\00c\00e\00p\00t\00i\00o\00n\00\00\00x/\00\00\e0\01\00\80\00\00\00\00\88/\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\06\00\00\00<\00i\00n\00i\00t\00>\00\ac/\00\00,\00\00\00\00\00\00\00\b8/\00\00\f0/\00\0000\00\00\bc/\00\00\e0\01\00\80\00\00\00\00\cc/\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0c\00\00\00T\00A\00r\00r\00a\00y\00s\00.\00j\00a\00v\00a\00\f4/\00\00\e0\01\00\80\00\00\00\00\040\00\00"
      "\00\00\00\00\a2\02\00\80\00\00\00\00\10\00\00\00j\00a\00v\00a\00.\00u\00t\00i\00l\00.\00A\00r\00r\00a\00y\00s\0040\00\00\e0\01\00\80\00\00\00\00D0\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\06\00\00\00c\00o\00p\00y\00O\00f\00\ac/\00\00-\00\00\00\00\00\00\00\ac/\00\00/\00\00\00\00\00\00\00\ac/\00\00G\00\00\00\00\00\00\00\ac/\00\00H\00\00\00\00\00\00\00\ac/\00\00J\00\00\00\00\00\00\00\ac/\00\00P\00\00\00\00\00\00\00\ac/\00\00Q\00\00\00\00\00\00\00\ac/\00\00S\00\00\00\00\00\00\00\ac/\00\00Y\00\00\00\00\00\00\00\ac/\00\00Z\00\00\00\00\00\00\00\ac/\00\00\\\00\00\00\00\00\00\00\ac/\00\00b\00\00\00\00\00\00\00\ac/\00\00c\00\00\00\00\00\00\00\ac/\00\00e\00\00\00"
      "\00\00\00\00\ac/\00\00u\00\00\00\00\00\00\00\ac/\00\00v\00\00\00\00\00\00\00\ac/\00\00x\00\00\00\00\00\00\0041\00\006\00\00\00\00\00\00\00@1\00\00x1\00\00\c81\00\00D1\00\00\e0\01\00\80\00\00\00\00T1\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0b\00\00\00T\00A\00r\00r\00a\00y\00.\00j\00a\00v\00a\00\00\00|1\00\00\e0\01\00\80\00\00\00\00\8c1\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\17\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00r\00e\00f\00l\00e\00c\00t\00.\00A\00r\00r\00a\00y\00\00\00\cc1\00\00\e0\01\00\80\00\00\00\00\dc1\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0b\00\00\00n\00e\00w\00I\00n\00s\00t\00a\00n\00c\00e\00\00\00"
      "41\00\009\00\00\00\00\00\00\0041\00\00>\00\00\00\00\00\00\0041\00\00<\00\00\00\00\00\00\0002\00\00H\00\00\00\00\00\00\00<2\00\00@2\00\00D2\00\00D1\00\00|1\00\00H2\00\00\e0\01\00\80\00\00\00\00X2\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\13\00\00\00n\00e\00w\00I\00n\00s\00t\00a\00n\00c\00e\00L\00o\00w\00L\00e\00v\00e\00l\00\00\00\982\00\00\94\00\00\00\00\00\00\00\a42\00\00\dc2\00\00\1c3\00\00\a82\00\00\e0\01\00\80\00\00\00\00\b82\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0c\00\00\00T\00S\00y\00s\00t\00e\00m\00.\00j\00a\00v\00a\00\e02\00\00\e0\01\00\80\00\00\00\00\f02\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\10\00\00\00j\00a\00"
      "v\00a\00.\00l\00a\00n\00g\00.\00S\00y\00s\00t\00e\00m\00 3\00\00\e0\01\00\80\00\00\00\0003\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\19\00\00\00c\00u\00r\00r\00e\00n\00t\00T\00i\00m\00e\00M\00i\00l\00l\00i\00s\00L\00o\00w\00L\00e\00v\00e\00l\00\00\00|3\00\00!\00\00\00\00\00\00\00\883\00\00\c83\00\00<4\00\00\8c3\00\00\e0\01\00\80\00\00\00\00\9c3\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\10\00\00\00W\00a\00s\00m\00S\00u\00p\00p\00o\00r\00t\00.\00j\00a\00v\00a\00\cc3\00\00\e0\01\00\80\00\00\00\00\dc3\00\00\00\00\00\00\a2\02\00\80\00\00\00\00*\00\00\00o\00r\00g\00.\00t\00e\00a\00v\00m\00.\00b\00a\00"
      "c\00k\00e\00n\00d\00.\00w\00a\00s\00m\00.\00r\00u\00n\00t\00i\00m\00e\00.\00W\00a\00s\00m\00S\00u\00p\00p\00o\00r\00t\00@4\00\00\e0\01\00\80\00\00\00\00P4\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\11\00\00\00c\00u\00r\00r\00e\00n\00t\00T\00i\00m\00e\00M\00i\00l\00l\00i\00s\00\00\00\8c4\00\007\00\00\00\00\00\00\00\984\00\00\9c4\00\00\a04\00\00\8c3\00\00\cc3\00\00\a44\00\00\e0\01\00\80\00\00\00\00\b44\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\07\00\00\00g\00e\00t\00A\00r\00g\00s\00\00\00\dc4\00\00D\00\00\00\00\00\00\00\e84\00\00\ec4\00\00\f04\00\00\8c3\00\00\cc3\00\00\f44\00\00\e0\01\00\80\00\00\00\00\045\00\00"
      "\00\00\00\00\a2\02\00\80\00\00\00\00\0e\00\00\00r\00u\00n\00W\00i\00t\00h\00o\00u\00t\00A\00r\00g\00s\00\dc4\00\00E\00\00\00\00\00\00\00D5\00\00I\00\00\00\00\00\00\00P5\00\00T5\00\00X5\00\00\8c3\00\00\cc3\00\00\\5\00\00\e0\01\00\80\00\00\00\00l5\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0b\00\00\00r\00u\00n\00W\00i\00t\00h\00A\00r\00g\00s\00\00\00D5\00\00J\00\00\00\00\00\00\00\a85\00\00J\00\00\00\00\00\00\00\b45\00\00\b85\00\00\bc5\00\00\8c3\00\00\cc3\00\00\c05\00\00\e0\01\00\80\00\00\00\00\d05\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\14\00\00\00l\00a\00m\00b\00d\00a\00$\00r\00u\00n\00W\00i\00t\00h\00A\00r\00g\00s\00"
      "$\001\00\106\00\00E\00\00\00\00\00\00\00\1c6\00\00 6\00\00$6\00\00\8c3\00\00\cc3\00\00(6\00\00\e0\01\00\80\00\00\00\0086\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\17\00\00\00l\00a\00m\00b\00d\00a\00$\00r\00u\00n\00W\00i\00t\00h\00o\00u\00t\00A\00r\00g\00s\00$\000\00\00\00\806\00\00\1a\00\00\00\00\00\00\00\8c6\00\00\e06\00\00<7\00\00\906\00\00\e0\01\00\80\00\00\00\00\a06\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\1a\00\00\00T\00N\00u\00l\00l\00P\00o\00i\00n\00t\00e\00r\00E\00x\00c\00e\00p\00t\00i\00o\00n\00.\00j\00a\00v\00a\00\e46\00\00\e0\01\00\80\00\00\00\00\f46\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\1e\00\00\00"
      "j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00N\00u\00l\00l\00P\00o\00i\00n\00t\00e\00r\00E\00x\00c\00e\00p\00t\00i\00o\00n\00x/\00\00L7\00\00\ff\ff\ff\ff\00\00\00\00X7\00\00\\7\00\00\a47\00\00\00\1f\00\00`7\00\00\e0\01\00\80\00\00\00\00p7\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\13\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00C\00h\00a\00r\00a\00c\00t\00e\00r\00\00\00\a87\00\00\e0\01\00\80\00\00\00\00\b87\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\08\00\00\00f\00o\00r\00D\00i\00g\00i\00t\00\e07\00\00^\00\00\00\00\00\00\00\ec7\00\00,8\00\0008\00\00\f07\00\00\e0\01\00\80\00\00\00\00\008\00\00\00\00\00\00"
      "\a2\02\00\80\00\00\00\00\0f\00\00\00T\00C\00h\00a\00r\00a\00c\00t\00e\00r\00.\00j\00a\00v\00a\00\00\00`7\00\0048\00\00\e0\01\00\80\00\00\00\00D8\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\08\00\00\00<\00c\00l\00i\00n\00i\00t\00>\00l8\00\003\00\00\00\00\00\00\00x8\00\00\b08\00\00\f08\00\00|8\00\00\e0\01\00\80\00\00\00\00\8c8\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0c\00\00\00T\00T\00h\00r\00e\00a\00d\00.\00j\00a\00v\00a\00\b48\00\00\e0\01\00\80\00\00\00\00\c48\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\10\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00T\00h\00r\00e\00a\00d\00x/\00\00\009\00\00\ff\ff\ff\ff\00\00\00\00"
      "\0c9\00\00\109\00\00\149\00\00\00\1f\00\00\b48\00\00x/\00\00l8\00\00:\00\00\00\00\00\00\00l8\00\00&\00\00\00\00\00\00\00<9\00\00a\00\00\00\00\00\00\00H9\00\00L9\00\00P9\00\00|8\00\00\b48\00\00T9\00\00\e0\01\00\80\00\00\00\00d9\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\10\00\00\00s\00e\00t\00C\00u\00r\00r\00e\00n\00t\00T\00h\00r\00e\00a\00d\00\9c9\00\00\ff\ff\ff\ff\00\00\00\00\a89\00\00\ac9\00\00\b09\00\00\00\1f\00\00\b48\00\00T9\00\00\c09\00\00\1b\00\00\00\00\00\00\00\cc9\00\00\d09\00\00\d49\00\00|8\00\00\b48\00\0048\00\00\c09\00\00\1f\00\00\00\00\00\00\00\f09\00\00\14\00\00\00\00\00\00\00\fc9\00\00h:\00\00\dc:\00\00\00:\00\00"
      "\e0\01\00\80\00\00\00\00\10:\00\00\00\00\00\00\a2\02\00\80\00\00\00\00%\00\00\00T\00D\00e\00f\00a\00u\00l\00t\00U\00n\00c\00a\00u\00g\00h\00t\00E\00x\00c\00e\00p\00t\00i\00o\00n\00H\00a\00n\00d\00l\00e\00r\00.\00j\00a\00v\00a\00\00\00l:\00\00\e0\01\00\80\00\00\00\00|:\00\00\00\00\00\00\a2\02\00\80\00\00\00\00)\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00D\00e\00f\00a\00u\00l\00t\00U\00n\00c\00a\00u\00g\00h\00t\00E\00x\00c\00e\00p\00t\00i\00o\00n\00H\00a\00n\00d\00l\00e\00r\00\00\00x/\00\00\ec:\00\00E\00\00\00\00\00\00\00\f8:\00\00\fc:\00\00\a8;\00\00\8c3\00\00\00;\00\00"
      "\e0\01\00\80\00\00\00\00\10;\00\00\00\00\00\00\a2\02\00\80\00\00\00\00F\00\00\00o\00r\00g\00.\00t\00e\00a\00v\00m\00.\00b\00a\00c\00k\00e\00n\00d\00.\00w\00a\00s\00m\00.\00r\00u\00n\00t\00i\00m\00e\00.\00W\00a\00s\00m\00S\00u\00p\00p\00o\00r\00t\00$\00r\00u\00n\00W\00i\00t\00h\00o\00u\00t\00A\00r\00g\00s\00$\00l\00a\00m\00b\00d\00a\00$\00_\001\004\00_\000\00x/\00\00\b8;\00\00E\00\00\00\00\00\00\00\c4;\00\00\c8;\00\00\cc;\00\00\8c3\00\00\00;\00\00\d0;\00\00\e0\01\00\80\00\00\00\00\e0;\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\03\00\00\00r\00u\00n\00\00\00\00<\00\00\16\00\00\00\00\00\00\00"
      "\0c<\00\00x<\00\00\ec<\00\00\10<\00\00\e0\01\00\80\00\00\00\00 <\00\00\00\00\00\00\a2\02\00\80\00\00\00\00%\00\00\00T\00S\00t\00r\00i\00n\00g\00I\00n\00d\00e\00x\00O\00u\00t\00O\00f\00B\00o\00u\00n\00d\00s\00E\00x\00c\00e\00p\00t\00i\00o\00n\00.\00j\00a\00v\00a\00\00\00|<\00\00\e0\01\00\80\00\00\00\00\8c<\00\00\00\00\00\00\a2\02\00\80\00\00\00\00)\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00S\00t\00r\00i\00n\00g\00I\00n\00d\00e\00x\00O\00u\00t\00O\00f\00B\00o\00u\00n\00d\00s\00E\00x\00c\00e\00p\00t\00i\00o\00n\00\00\00x/\00\00\fc<\00\00\16\00\00\00\00\00\00\00\08=\00\00"
      "H=\00\00\90=\00\00\0c=\00\00\e0\01\00\80\00\00\00\00\1c=\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0f\00\00\00T\00E\00x\00c\00e\00p\00t\00i\00o\00n\00.\00j\00a\00v\00a\00\00\00L=\00\00\e0\01\00\80\00\00\00\00\\=\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\13\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00E\00x\00c\00e\00p\00t\00i\00o\00n\00\00\00x/\00\00\a0=\00\00\18\00\00\00\00\00\00\00\ac=\00\00\f4=\00\00D>\00\00\b0=\00\00\e0\01\00\80\00\00\00\00\c0=\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\13\00\00\00T\00S\00t\00r\00i\00n\00g\00B\00u\00i\00l\00d\00e\00r\00.\00j\00a\00v\00a\00\00\00\f8=\00\00\e0\01\00\80\00\00\00\00"
      "\08>\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\17\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00S\00t\00r\00i\00n\00g\00B\00u\00i\00l\00d\00e\00r\00\00\00x/\00\00T>\00\00r\00\00\00\00\00\00\00`>\00\00d>\00\00h>\00\00\b0=\00\00\f8=\00\00l>\00\00\e0\01\00\80\00\00\00\00|>\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\06\00\00\00a\00p\00p\00e\00n\00d\00T>\00\00*\00\00\00\00\00\00\00T>\00\000\00\00\00\00\00\00\00T>\00\00H\00\00\00\00\00\00\00\c4>\00\00\a8\00\00\00\00\00\00\00\d0>\00\00\d4>\00\00\d8>\00\00\b0=\00\00\f8=\00\00\dc>\00\00\e0\01\00\80\00\00\00\00\ec>\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\06\00\00\00i\00n\00s\00e\00"
      "r\00t\00\c4>\00\00\ba\00\00\00\00\00\00\00\c4>\00\00\d2\00\00\00\00\00\00\00(?\00\00\12\00\00\00\00\00\00\004?\00\008?\00\00<?\00\00\b0=\00\00\f8=\00\00@?\00\00\e0\01\00\80\00\00\00\00P?\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\09\00\00\00s\00e\00t\00L\00e\00n\00g\00t\00h\00\00\00|?\00\00\12\00\00\00\00\00\00\00\88?\00\00\8c?\00\00\90?\00\00\b0=\00\00\f8=\00\00\94?\00\00\e0\01\00\80\00\00\00\00\a4?\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\08\00\00\00t\00o\00S\00t\00r\00i\00n\00g\00\cc?\00\00\12\00\00\00\00\00\00\00\d8?\00\00\dc?\00\00\e0?\00\00\b0=\00\00\f8=\00\00\e4?\00\00\e0\01\00\80\00\00\00\00\f4?\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0e\00\00\00"
      "e\00n\00s\00u\00r\00e\00C\00a\00p\00a\00c\00i\00t\00y\00\c4>\00\00\12\00\00\00\00\00\00\004@\00\00=\00\00\00\00\00\00\00@@\00\00\80@\00\00\c8@\00\00D@\00\00\e0\01\00\80\00\00\00\00T@\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0f\00\00\00T\00T\00h\00r\00o\00w\00a\00b\00l\00e\00.\00j\00a\00v\00a\00\00\00\84@\00\00\e0\01\00\80\00\00\00\00\94@\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\13\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00T\00h\00r\00o\00w\00a\00b\00l\00e\00\00\00x/\00\00\d8@\00\00j\00\00\00\00\00\00\00\e4@\00\00\e8@\00\00\ec@\00\00D@\00\00\84@\00\00\f0@\00\00\e0\01\00\80\00\00\00\00\00A\00\00\00\00\00\00"
      "\a2\02\00\80\00\00\00\00\10\00\00\00f\00i\00l\00l\00I\00n\00S\00t\00a\00c\00k\00T\00r\00a\00c\00e\008A\00\00(\00\00\00\00\00\00\00DA\00\00\9cA\00\00\fcA\00\00HA\00\00\e0\01\00\80\00\00\00\00XA\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\1b\00\00\00T\00A\00b\00s\00t\00r\00a\00c\00t\00S\00t\00r\00i\00n\00g\00B\00u\00i\00l\00d\00e\00r\00.\00j\00a\00v\00a\00\00\00\a0A\00\00\e0\01\00\80\00\00\00\00\b0A\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\1f\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00A\00b\00s\00t\00r\00a\00c\00t\00S\00t\00r\00i\00n\00g\00B\00u\00i\00l\00d\00e\00r\00\00\00x/\00\00"
      "8A\00\00+\00\00\00\00\00\00\008A\00\00,\00\00\00\00\00\00\00$B\00\00\f8\01\00\00\00\00\00\000B\00\004B\00\008B\00\00HA\00\00\a0A\00\00l>\00\00$B\00\00@\00\00\00\00\00\00\00TB\00\00E\00\00\00\00\00\00\00`B\00\00dB\00\00hB\00\00HA\00\00\a0A\00\00\dc>\00\00TB\00\00I\00\00\00\00\00\00\00TB\00\00L\00\00\00\00\00\00\00TB\00\00P\00\00\00\00\00\00\00TB\00\00N\00\00\00\00\00\00\00TB\00\00S\00\00\00\00\00\00\00TB\00\00R\00\00\00\00\00\00\00$B\00\00Y\00\00\00\00\00\00\00$B\00\00a\00\00\00\00\00\00\00TB\00\00o\00\00\00\00\00\00\00TB\00\00l\00\00\00\00\00\00\00TB\00\00q\00\00\00\00\00\00\00TB\00\00\80\00\00\00\00\00\00\00TB\00\00"
      "\85\00\00\00\00\00\00\00TB\00\00m\00\00\00\00\00\00\00TB\00\00\82\00\00\00\00\00\00\00$B\00\00\e4\01\00\00\00\00\00\00TB\00\00\e8\01\00\00\00\00\00\00TB\00\00\e9\01\00\00\00\00\00\00TB\00\00\fc\01\00\00\00\00\00\00\\C\00\00\0e\02\00\00\00\00\00\00hC\00\00lC\00\00pC\00\00HA\00\00\a0A\00\00\e4?\00\00\\C\00\00\08\02\00\00\00\00\00\00\\C\00\00\0b\02\00\00\00\00\00\00\\C\00\00\0c\02\00\00\00\00\00\00\a4C\00\00\1d\02\00\00\00\00\00\00\b0C\00\00\b4C\00\00\b8C\00\00HA\00\00\a0A\00\00\94?\00\00\c8C\00\00\98\02\00\00\00\00\00\00\d4C\00\00\d8C\00\00\dcC\00\00HA\00\00\a0A\00\00\e0C\00\00\e0\01\00\80\00\00\00\00\f0C\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0b\00\00\00i\00n\00"
      "s\00e\00r\00t\00S\00p\00a\00c\00e\00\00\00\c8C\00\00\9a\02\00\00\00\00\00\00,D\00\00J\00\00\00\00\00\00\008D\00\00<D\00\00\e4D\00\00\8c3\00\00@D\00\00\e0\01\00\80\00\00\00\00PD\00\00\00\00\00\00\a2\02\00\80\00\00\00\00C\00\00\00o\00r\00g\00.\00t\00e\00a\00v\00m\00.\00b\00a\00c\00k\00e\00n\00d\00.\00w\00a\00s\00m\00.\00r\00u\00n\00t\00i\00m\00e\00.\00W\00a\00s\00m\00S\00u\00p\00p\00o\00r\00t\00$\00r\00u\00n\00W\00i\00t\00h\00A\00r\00g\00s\00$\00l\00a\00m\00b\00d\00a\00$\00_\001\005\00_\000\00\00\00x/\00\00\f4D\00\00J\00\00\00\00\00\00\00\00E\00\00\04E\00\00\08E\00\00"
      "\8c3\00\00@D\00\00\d0;\00\00\18E\00\00\1c\00\00\00\00\00\00\00$E\00\00tE\00\00\ccE\00\00(E\00\00\e0\01\00\80\00\00\00\008E\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\17\00\00\00T\00S\00t\00a\00c\00k\00T\00r\00a\00c\00e\00E\00l\00e\00m\00e\00n\00t\00.\00j\00a\00v\00a\00\00\00xE\00\00\e0\01\00\80\00\00\00\00\88E\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\1b\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00S\00t\00a\00c\00k\00T\00r\00a\00c\00e\00E\00l\00e\00m\00e\00n\00t\00\00\00x/\00\00\18E\00\00\1e\00\00\00\00\00\00\00\e8E\00\000\00\00\00\00\00\00\00\f4E\00\00,F\00\00lF\00\00\f8E\00\00\e0\01\00\80\00\00\00\00"
      "\08F\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0c\00\00\00T\00S\00t\00r\00i\00n\00g\00.\00j\00a\00v\00a\000F\00\00\e0\01\00\80\00\00\00\00@F\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\10\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00S\00t\00r\00i\00n\00g\00x/\00\00|F\00\00\ff\ff\ff\ff\00\00\00\00\88F\00\00\8cF\00\00\90F\00\00\00\1f\00\000F\00\00x/\00\00\e8E\00\003\00\00\00\00\00\00\00\e8E\00\001\00\00\00\00\00\00\00\e8E\00\007\00\00\00\00\00\00\00\e8E\00\008\00\00\00\00\00\00\00\e8E\00\00:\00\00\00\00\00\00\00\e8E\00\00u\00\00\00\00\00\00\00\e8E\00\00v\00\00\00\00\00\00\00\f4F\00\00z\00\00\00\00\00\00\00\00G\00\00\04G\00\00\08G\00\00"
      "\f8E\00\000F\00\00\0cG\00\00\e0\01\00\80\00\00\00\00\1cG\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\08\00\00\00a\00l\00l\00o\00c\00a\00t\00e\00DG\00\00\ff\ff\ff\ff\00\00\00\00PG\00\00TG\00\00XG\00\00\00\1f\00\000F\00\00\0cG\00\00hG\00\00\80\00\00\00\00\00\00\00tG\00\00xG\00\00|G\00\00\f8E\00\000F\00\00\80G\00\00\e0\01\00\80\00\00\00\00\90G\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\06\00\00\00c\00h\00a\00r\00A\00t\00hG\00\00\7f\00\00\00\00\00\00\00hG\00\00\82\00\00\00\00\00\00\00\ccG\00\00\97\00\00\00\00\00\00\00\d8G\00\00\dcG\00\00\e0G\00\00\f8E\00\000F\00\00\e4G\00\00\e0\01\00\80\00\00\00\00\f4G\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\06\00\00\00"
      "l\00e\00n\00g\00t\00h\00\18H\00\00\9b\00\00\00\00\00\00\00$H\00\00(H\00\00,H\00\00\f8E\00\000F\00\000H\00\00\e0\01\00\80\00\00\00\00@H\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\07\00\00\00i\00s\00E\00m\00p\00t\00y\00\00\00hH\00\00$\00\00\00\00\00\00\00tH\00\00xH\00\00|H\00\00\f8E\00\000F\00\0048\00\00\8cH\00\00\16\00\00\00\00\00\00\00\98H\00\00\f8H\00\00`I\00\00\9cH\00\00\e0\01\00\80\00\00\00\00\acH\00\00\00\00\00\00\a2\02\00\80\00\00\00\00 \00\00\00T\00N\00e\00g\00a\00t\00i\00v\00e\00A\00r\00r\00a\00y\00S\00i\00z\00e\00E\00x\00c\00e\00p\00t\00i\00o\00n\00.\00j\00a\00v\00a\00\fcH\00\00\e0\01\00\80"
      "\00\00\00\00\0cI\00\00\00\00\00\00\a2\02\00\80\00\00\00\00$\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00N\00e\00g\00a\00t\00i\00v\00e\00A\00r\00r\00a\00y\00S\00i\00z\00e\00E\00x\00c\00e\00p\00t\00i\00o\00n\00x/\00\00pI\00\00!\00\00\00\00\00\00\00|I\00\00\c8I\00\008J\00\00\80I\00\00\e0\01\00\80\00\00\00\00\90I\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\16\00\00\00V\00i\00s\00u\00a\00l\00i\00z\00e\00r\00R\00u\00n\00t\00i\00m\00e\00.\00j\00a\00v\00a\00\ccI\00\00\e0\01\00\80\00\00\00\00\dcI\00\00\00\00\00\00\a2\02\00\80\00\00\00\00(\00\00\00c\00o\00m\00.\00b\00a\00b\00u\00h\00u\00b\00.\00"
      "v\00i\00s\00u\00a\00l\00i\00z\00e\00r\00.\00V\00i\00s\00u\00a\00l\00i\00z\00e\00r\00R\00u\00n\00t\00i\00m\00e\00\\\1b\00\00HJ\00\00\ff\ff\ff\ff\00\00\00\00TJ\00\00XJ\00\00\\J\00\00\00\1f\00\00\ccI\00\00\\\1b\00\00lJ\00\00\ff\ff\ff\ff\00\00\00\00xJ\00\00|J\00\00\80J\00\00\00\1f\00\00\ccI\00\00\84J\00\00\e0\01\00\80\00\00\00\00\94J\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0a\00\00\00i\00n\00i\00t\00i\00a\00l\00i\00z\00e\00\c0J\00\000\00\00\00\00\00\00\00\ccJ\00\00\d0J\00\00\d4J\00\00\80I\00\00\ccI\00\00\84J\00\00\e4J\00\00\ff\ff\ff\ff\00\00\00\00\f0J\00\00\f4J\00\00\f8J\00\00\00\1f\00\00\ccI\00\00\fcJ\00\00\e0\01\00\80"
      "\00\00\00\00\0cK\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\04\00\00\00p\00i\00n\00g\00,K\00\00E\00\00\00\00\00\00\008K\00\00<K\00\00@K\00\00\80I\00\00\ccI\00\00DK\00\00\e0\01\00\80\00\00\00\00TK\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0a\00\00\00a\00c\00c\00e\00p\00t\00C\00o\00d\00e\00,K\00\00B\00\00\00\00\00\00\00\8cK\00\00\ff\ff\ff\ff\00\00\00\00\98K\00\00\9cK\00\00\a0K\00\00\00\1f\00\00\ccI\00\00DK\00\00\b0K\00\00\ff\ff\ff\ff\00\00\00\00\bcK\00\00\c0K\00\00\c4K\00\00\00\1f\00\00\ccI\00\00\c8K\00\00\e0\01\00\80\00\00\00\00\d8K\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0a\00\00\00i\00n\00v\00o\00k\00e\00M\00a\00i\00n\00\04L\00\00\ff\ff\ff\ff"
      "\00\00\00\00\10L\00\00\14L\00\00\18L\00\00\00\1f\00\00\ccI\00\00\1cL\00\00\e0\01\00\80\00\00\00\00,L\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\09\00\00\00t\00r\00a\00c\00k\00S\00t\00e\00p\00\00\00XL\00\00\ff\ff\ff\ff\00\00\00\00dL\00\00hL\00\00lL\00\00\00\1f\00\00\ccI\00\00pL\00\00\e0\01\00\80\00\00\00\00\80L\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0d\00\00\00c\00a\00p\00t\00u\00r\00e\00O\00u\00t\00p\00u\00t\00\00\00\b4L\00\00d\00\00\00\00\00\00\00\c0L\00\00\c4L\00\00\c8L\00\00\80I\00\00\ccI\00\00pL\00\00\d8L\00\00\ff\ff\ff\ff\00\00\00\00\e4L\00\00\e8L\00\00\ecL\00\00\00\1f\00\00\ccI\00\00\f0L\00\00\e0\01\00\80\00\00\00\00\00M\00\00\00\00\00\00"
      "\a2\02\00\80\00\00\00\00\0d\00\00\00t\00r\00a\00c\00k\00V\00a\00r\00i\00a\00b\00l\00e\00\00\004M\00\00\ff\ff\ff\ff\00\00\00\00@M\00\00DM\00\00HM\00\00\00\1f\00\00\ccI\00\00LM\00\00\e0\01\00\80\00\00\00\00\\M\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\10\00\00\00t\00r\00a\00c\00k\00M\00e\00t\00h\00o\00d\00E\00n\00t\00r\00y\00\94M\00\00\ff\ff\ff\ff\00\00\00\00\a0M\00\00\a4M\00\00\a8M\00\00\00\1f\00\00\ccI\00\00\acM\00\00\e0\01\00\80\00\00\00\00\bcM\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0f\00\00\00t\00r\00a\00c\00k\00M\00e\00t\00h\00o\00d\00E\00x\00i\00t\00\00\00\f4M\00\00\ff\ff\ff\ff\00\00\00\00\00N\00\00\04N\00\00\08N\00\00"
      "\00\1f\00\00\ccI\00\00\0cN\00\00\e0\01\00\80\00\00\00\00\1cN\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\13\00\00\00t\00r\00a\00c\00k\00O\00b\00j\00e\00c\00t\00C\00r\00e\00a\00t\00i\00o\00n\00\00\00\\N\00\00\ff\ff\ff\ff\00\00\00\00hN\00\00lN\00\00pN\00\00\00\1f\00\00\ccI\00\00tN\00\00\e0\01\00\80\00\00\00\00\84N\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\12\00\00\00t\00r\00a\00c\00k\00O\00b\00j\00e\00c\00t\00C\00r\00e\00a\00t\00e\00d\00\c0N\00\00\ff\ff\ff\ff\00\00\00\00\ccN\00\00\d0N\00\00\d4N\00\00\00\1f\00\00\ccI\00\00\d8N\00\00\e0\01\00\80\00\00\00\00\e8N\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0f\00\00\00t\00r\00a\00c\00k\00F\00"
      "i\00e\00l\00d\00W\00r\00i\00t\00e\00\00\00 O\00\00\ff\ff\ff\ff\00\00\00\00,O\00\000O\00\004O\00\00\00\1f\00\00\ccI\00\008O\00\00\e0\01\00\80\00\00\00\00HO\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\10\00\00\00t\00r\00a\00c\00k\00A\00r\00r\00a\00y\00C\00r\00e\00a\00t\00e\00\80O\00\00\ff\ff\ff\ff\00\00\00\00\8cO\00\00\90O\00\00\94O\00\00\00\1f\00\00\ccI\00\00\98O\00\00\e0\01\00\80\00\00\00\00\a8O\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\14\00\00\00t\00r\00a\00c\00k\00C\00o\00l\00l\00e\00c\00t\00i\00o\00n\00E\00v\00e\00n\00t\00\e8O\00\00\ff\ff\ff\ff\00\00\00\00\f4O\00\00\f8O\00\00\fcO\00\00\00\1f\00\00\ccI\00\00\00P\00\00"
      "\e0\01\00\80\00\00\00\00\10P\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\11\00\00\00t\00r\00a\00c\00k\00M\00e\00t\00h\00o\00d\00R\00e\00t\00u\00r\00n\00\00\00LP\00\00\ff\ff\ff\ff\00\00\00\00XP\00\00\\P\00\00`P\00\00\00\1f\00\00\ccI\00\00dP\00\00\e0\01\00\80\00\00\00\00tP\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\14\00\00\00t\00r\00a\00c\00k\00E\00x\00c\00e\00p\00t\00i\00o\00n\00T\00h\00r\00o\00w\00n\00\b4P\00\00\ff\ff\ff\ff\00\00\00\00\c0P\00\00\c4P\00\00\c8P\00\00\00\1f\00\00\ccI\00\00\ccP\00\00\e0\01\00\80\00\00\00\00\dcP\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\12\00\00\00t\00r\00a\00c\00k\00T\00r\00y\00C\00a\00t\00c\00"
      "h\00E\00n\00t\00e\00r\00\18Q\00\00\ff\ff\ff\ff\00\00\00\00$Q\00\00(Q\00\00,Q\00\00\00\1f\00\00\ccI\00\000Q\00\00\e0\01\00\80\00\00\00\00@Q\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\11\00\00\00t\00r\00a\00c\00k\00F\00i\00n\00a\00l\00l\00y\00E\00n\00t\00e\00r\00\00\00|Q\00\00\ff\ff\ff\ff\00\00\00\00\88Q\00\00\8cQ\00\00\90Q\00\00\00\1f\00\00\ccI\00\00\94Q\00\00\e0\01\00\80\00\00\00\00\a4Q\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\14\00\00\00t\00r\00a\00c\00k\00S\00t\00a\00t\00i\00c\00I\00n\00i\00t\00S\00t\00a\00r\00t\00\e4Q\00\00\ff\ff\ff\ff\00\00\00\00\f0Q\00\00\f4Q\00\00\f8Q\00\00\00\1f\00\00\ccI\00\00\fcQ\00\00\e0\01\00\80"
      "\00\00\00\00\0cR\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\12\00\00\00t\00r\00a\00c\00k\00S\00t\00a\00t\00i\00c\00I\00n\00i\00t\00E\00n\00d\00HR\00\00\ff\ff\ff\ff\00\00\00\00TR\00\00XR\00\00\\R\00\00\00\1f\00\00\ccI\00\00`R\00\00\e0\01\00\80\00\00\00\00pR\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\12\00\00\00t\00r\00a\00c\00k\00T\00h\00i\00s\00R\00e\00f\00e\00r\00e\00n\00c\00e\00\acR\00\00\1b\01\00\00\00\00\00\00\b8R\00\00\bcR\00\00\c0R\00\00\80I\00\00\ccI\00\00\c4R\00\00\e0\01\00\80\00\00\00\00\d4R\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\10\00\00\00g\00e\00n\00e\00r\00a\00t\00e\00O\00b\00j\00e\00c\00t\00I\00d\00"
      "\0cS\00\00\ff\ff\ff\ff\00\00\00\00\18S\00\00\1cS\00\00 S\00\00\00\1f\00\00\ccI\00\00\c4R\00\000S\00\00\ff\ff\ff\ff\00\00\00\00<S\00\00@S\00\00DS\00\00\00\1f\00\00\ccI\00\00HS\00\00\e0\01\00\80\00\00\00\00XS\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0e\00\00\00g\00e\00t\00C\00u\00r\00r\00e\00n\00t\00S\00t\00e\00p\00\8cS\00\00\ff\ff\ff\ff\00\00\00\00\98S\00\00\9cS\00\00\a0S\00\00\00\1f\00\00\ccI\00\00\a4S\00\00\e0\01\00\80\00\00\00\00\b4S\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0e\00\00\00g\00e\00t\00C\00u\00r\00r\00e\00n\00t\00L\00i\00n\00e\00\e8S\00\00\ff\ff\ff\ff\00\00\00\00\f4S\00\00\f8S\00\00\fcS\00\00\00\1f\00\00\ccI\00\00\00T\00\00"
      "\e0\01\00\80\00\00\00\00\10T\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\09\00\00\00g\00e\00t\00O\00u\00t\00p\00u\00t\00\00\00<T\00\003\01\00\00\00\00\00\00HT\00\00LT\00\00PT\00\00\80I\00\00\ccI\00\00\00T\00\00`T\00\00\ff\ff\ff\ff\00\00\00\00lT\00\00pT\00\00tT\00\00\00\1f\00\00\ccI\00\00xT\00\00\e0\01\00\80\00\00\00\00\88T\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\05\00\00\00r\00e\00s\00e\00t\00\00\00\acT\00\00=\01\00\00\00\00\00\00\b8T\00\00\bcT\00\00\c0T\00\00\80I\00\00\ccI\00\00xT\00\00\d0T\00\00\ff\ff\ff\ff\00\00\00\00\dcT\00\00\e0T\00\00\e4T\00\00\00\1f\00\00\ccI\00\00\e8T\00\00\e0\01\00\80\00\00\00\00\f8T\00\00\00\00\00\00\a2\02\00\80\00\00\00\00"
      "\0d\00\00\00i\00s\00I\00n\00i\00t\00i\00a\00l\00i\00z\00e\00d\00\00\00,U\00\00\13\00\00\00\00\00\00\008U\00\00<U\00\00@U\00\00\80I\00\00\ccI\00\0048\00\00PU\00\00\19\00\00\00\00\00\00\00\\U\00\00\a8U\00\00\fcU\00\00`U\00\00\e0\01\00\80\00\00\00\00pU\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\16\00\00\00T\00R\00u\00n\00t\00i\00m\00e\00E\00x\00c\00e\00p\00t\00i\00o\00n\00.\00j\00a\00v\00a\00\acU\00\00\e0\01\00\80\00\00\00\00\bcU\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\1a\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00R\00u\00n\00t\00i\00m\00e\00E\00x\00c\00e\00p\00t\00i\00o\00n\00x/\00\00"
      "\0cV\00\00\16\00\00\00\00\00\00\00\18V\00\00\80V\00\00\f0V\00\00\1cV\00\00\e0\01\00\80\00\00\00\00,V\00\00\00\00\00\00\a2\02\00\80\00\00\00\00$\00\00\00T\00A\00r\00r\00a\00y\00I\00n\00d\00e\00x\00O\00u\00t\00O\00f\00B\00o\00u\00n\00d\00s\00E\00x\00c\00e\00p\00t\00i\00o\00n\00.\00j\00a\00v\00a\00\84V\00\00\e0\01\00\80\00\00\00\00\94V\00\00\00\00\00\00\a2\02\00\80\00\00\00\00(\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00A\00r\00r\00a\00y\00I\00n\00d\00e\00x\00O\00u\00t\00O\00f\00B\00o\00u\00n\00d\00s\00E\00x\00c\00e\00p\00t\00i\00o\00n\00x/\00\00\00W\00\00\16\00\00\00\00\00\00\00"
      "\0cW\00\00hW\00\00\ccW\00\00\10W\00\00\e0\01\00\80\00\00\00\00 W\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\1e\00\00\00T\00I\00l\00l\00e\00g\00a\00l\00A\00r\00g\00u\00m\00e\00n\00t\00E\00x\00c\00e\00p\00t\00i\00o\00n\00.\00j\00a\00v\00a\00lW\00\00\e0\01\00\80\00\00\00\00|W\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\"\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00I\00l\00l\00e\00g\00a\00l\00A\00r\00g\00u\00m\00e\00n\00t\00E\00x\00c\00e\00p\00t\00i\00o\00n\00x/\00\00\dcW\00\00S\00\00\00\00\00\00\00\e8W\00\00(X\00\00\80X\00\00\ecW\00\00\e0\01\00\80\00\00\00\00\fcW\00\00\00\00\00\00\a2\02\00\80"
      "\00\00\00\00\0f\00\00\00E\00v\00e\00n\00t\00Q\00u\00e\00u\00e\00.\00j\00a\00v\00a\00\00\00,X\00\00\e0\01\00\80\00\00\00\00<X\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\1c\00\00\00o\00r\00g\00.\00t\00e\00a\00v\00m\00.\00r\00u\00n\00t\00i\00m\00e\00.\00E\00v\00e\00n\00t\00Q\00u\00e\00u\00e\00\84X\00\00\e0\01\00\80\00\00\00\00\94X\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0d\00\00\00p\00r\00o\00c\00e\00s\00s\00S\00i\00n\00g\00l\00e\00\00\00\dcW\00\00X\00\00\00\00\00\00\00\dcW\00\00P\00\00\00\00\00\00\00\dcW\00\00Q\00\00\00\00\00\00\00\dcW\00\00R\00\00\00\00\00\00\00\dcW\00\00T\00\00\00\00\00\00\00\04Y\00\00y\00\00\00"
      "\00\00\00\00\10Y\00\00\14Y\00\00\18Y\00\00\ecW\00\00,X\00\00\1cY\00\00\e0\01\00\80\00\00\00\00,Y\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\06\00\00\00r\00e\00m\00o\00v\00e\00\04Y\00\00v\00\00\00\00\00\00\00\04Y\00\00w\00\00\00\00\00\00\00hY\00\00}\00\00\00\00\00\00\00tY\00\00xY\00\00|Y\00\00\ecW\00\00,X\00\00\80Y\00\00\e0\01\00\80\00\00\00\00\90Y\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\06\00\00\00u\00p\00d\00a\00t\00e\00hY\00\00\8f\00\00\00\00\00\00\00hY\00\00\84\00\00\00\00\00\00\00hY\00\00\89\00\00\00\00\00\00\00hY\00\00\8c\00\00\00\00\00\00\00\e4Y\00\00\1a\00\00\00\00\00\00\00\f0Y\00\00\f4Y\00\00\f8Y\00\00\ecW\00\00,X\00\0048\00\00\08Z\00\00"
      "1\00\00\00\00\00\00\00\14Z\00\00HZ\00\00\98Z\00\00\18Z\00\00\e0\01\00\80\00\00\00\00(Z\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0a\00\00\00F\00i\00b\00e\00r\00.\00j\00a\00v\00a\00LZ\00\00\e0\01\00\80\00\00\00\00\\Z\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\17\00\00\00o\00r\00g\00.\00t\00e\00a\00v\00m\00.\00r\00u\00n\00t\00i\00m\00e\00.\00F\00i\00b\00e\00r\00\00\00x/\00\00\a8Z\00\008\00\00\00\00\00\00\00\b4Z\00\00\b8Z\00\00\bcZ\00\00\18Z\00\00LZ\00\00\c0Z\00\00\e0\01\00\80\00\00\00\00\d0Z\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\04\00\00\00p\00u\00s\00h\00\a8Z\00\009\00\00\00\00\00\00\00\a8Z\00\00<\00\00\00\00\00\00\00\a8Z\00\00"
      ":\00\00\00\00\00\00\00\a8Z\00\00A\00\00\00\00\00\00\00\a8Z\00\00B\00\00\00\00\00\00\00\a8Z\00\00E\00\00\00\00\00\00\00\a8Z\00\00C\00\00\00\00\00\00\00\a8Z\00\00J\00\00\00\00\00\00\00\a8Z\00\00K\00\00\00\00\00\00\00\a8Z\00\00N\00\00\00\00\00\00\00\a8Z\00\00L\00\00\00\00\00\00\00\a8Z\00\00S\00\00\00\00\00\00\00\a8Z\00\00T\00\00\00\00\00\00\00\a8Z\00\00W\00\00\00\00\00\00\00\a8Z\00\00U\00\00\00\00\00\00\00\a8Z\00\00\\\00\00\00\00\00\00\00\a8Z\00\00]\00\00\00\00\00\00\00\a8Z\00\00`\00\00\00\00\00\00\00\a8Z\00\00^\00\00\00\00\00\00\00\d4[\00\00\fd\00\00\00\00\00\00\00\e0[\00\00\e4[\00\00\e8[\00\00\18Z\00\00LZ\00\00\ec[\00\00\e0\01\00\80\00\00\00\00\fc[\00\00\00\00\00\00\a2\02\00\80"
      "\00\00\00\00\05\00\00\00s\00t\00a\00r\00t\00\00\00\d4[\00\00\0c\01\00\00\00\00\00\00\d4[\00\00\09\01\00\00\00\00\00\008\\\00\00$\00\00\00\00\00\00\00D\\\00\00H\\\00\00\b4\\\00\00\f8E\00\00L\\\00\00\e0\01\00\80\00\00\00\00\\\\\00\00\00\00\00\00\a2\02\00\80\00\00\00\00&\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00S\00t\00r\00i\00n\00g\00$\00<\00c\00l\00i\00n\00i\00t\00>\00$\00l\00a\00m\00b\00d\00a\00$\00_\008\004\00_\000\00x/\00\00\c4\\\00\00\dd\00\00\00\00\00\00\00\d0\\\00\00\08]\00\00H]\00\00\d4\\\00\00\e0\01\00\80\00\00\00\00\e4\\\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0c\00\00\00T\00O\00b\00j\00e\00c\00t\00.\00"
      "j\00a\00v\00a\00\0c]\00\00\e0\01\00\80\00\00\00\00\1c]\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\10\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00O\00b\00j\00e\00c\00t\00L]\00\00\e0\01\00\80\00\00\00\00\\]\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\08\00\00\00g\00e\00t\00C\00l\00a\00s\00s\00\84]\00\00C\00\00\00\00\00\00\00\90]\00\00\c8]\00\00\08^\00\00\94]\00\00\e0\01\00\80\00\00\00\00\a4]\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0b\00\00\00T\00C\00l\00a\00s\00s\00.\00j\00a\00v\00a\00\00\00\cc]\00\00\e0\01\00\80\00\00\00\00\dc]\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\0f\00\00\00j\00a\00v\00a\00.\00l\00a\00n\00g\00.\00C\00l\00"
      "a\00s\00s\00\00\00x/\00\00\18^\00\00L\00\00\00\00\00\00\00$^\00\00(^\00\00,^\00\00\94]\00\00\cc]\00\00L]\00\00\18^\00\00N\00\00\00\00\00\00\00H^\00\00)\01\00\00\00\00\00\00T^\00\00X^\00\00\\^\00\00\94]\00\00\cc]\00\00`^\00\00\e0\01\00\80\00\00\00\00p^\00\00\00\00\00\00\a2\02\00\80\00\00\00\00\10\00\00\00g\00e\00t\00C\00o\00m\00p\00o\00n\00e\00n\00t\00T\00y\00p\00e\00\00\00\00\00\16\00\00\00\00\00\00\00d\05\00\00h\05\00\00l\05\00\00p\05\00\00(\07\00\00\80\07\00\00\84\07\00\00\88\07\00\00\8c\07\00\00\90\07\00\00\94\07\00\00,\08\00\000\08\00\00<\08\00\00D\0d\00\00\f4\0e\00\00\a0\10\00\00\a8\10\00\00\ac\10\00\00\f4\11\00\00|\12\00\00\80\12\00\00"
      "0\03\00\00\c0\02\00\00P\02\00\00\e0\01\00\00`\01\00\00\c8\03\00\000\04\00\00\98\04\00\00\00\05\00\00x\05\00\00\e0\05\00\00H\06\00\00\b8\06\00\00\c8\07\00\00P\08\00\00\b8\08\00\000\09\00\00\98\09\00\00\00\0a\00\00p\0a\00\00h\0b\00\00\d8\0a\00\00\10\0c\00\00x\0c\00\00\e0\0c\00\00H\0d\00\00\b8\0d\00\00 \0e\00\00\90\0e\00\00\00\0f\00\00\c0\0f\00\000\10\00\00\b0\10\00\00 \11\00\00\90\11\00\00\08\12\00\00\98\12\00\00(\13\00\00\a8\13\00\00\10\14\00\00\10\15\00\00\98\14\00\00\10\16\00\00\98\15\00\00\10\17\00\00\98\16\00\00\18\18\00\00\a0\17\00\00 \19\00\00\a8\18\00\00\a8\19\00\00H\1a\00\00\f8\1a\00\00\80\1b\00\00\d8\1b\00\00\00\1e\00\00H\1f\00\00\b0\1f\00\00p \00\00\18!\00\00\80!\00\00\e8!\00\00\e0\"\00\00h\"\00\00"
      "\e8#\00\00p#\00\00")
  (start $__start__)
)