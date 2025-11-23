#include <inttypes.h>
#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <assert.h>
#include <math.h>
#include <wchar.h>
#include <wctype.h>
#include <time.h>
#include <uchar.h>
#include <unistd.h>

static int8_t *wasm_heap;
static int32_t wasm_heap_size;
static int wasm_args;
static char** wasm_argv;

float teavm_teavm_getNaN() {
    return NAN;
}

#define teavmMath_sin sin
#define teavmMath_cos cos
#define teavmMath_sqrt sqrt
#define teavmMath_ceil ceil
#define teavmMath_floor floor

int64_t teavm_currentTimeMillis() {
    struct timespec time;
    clock_gettime(CLOCK_REALTIME, &time);

    return time.tv_sec * 1000 + (int64_t) round(time.tv_nsec / 1000000);
}

double teavm_nanoTime() {
    struct timespec time;
    clock_gettime(CLOCK_REALTIME, &time);

    return time.tv_sec * 1000000000 + (int64_t) round(time.tv_nsec);
}

static union { float f; int32_t i; } reinterpret_union_32;
static union { double f; int64_t i; } reinterpret_union_64;

int64_t reinterpret_float64(double v) {
    reinterpret_union_64.f = v;
    return reinterpret_union_64.i;
}

double reinterpret_int64(int64_t v) {
    reinterpret_union_64.i = v;
    return reinterpret_union_64.f;
}

int32_t reinterpret_float32(double v) {
    reinterpret_union_32.f = v;
    return reinterpret_union_32.i;
}

float reinterpret_int32(int32_t v) {
    reinterpret_union_32.i = v;
    return reinterpret_union_32.f;
}

void teavm_logOutOfMemory() {
    abort();
}

void teavm_logString(int32_t string) {
    uint32_t arrayPtr = *(uint32_t*) (wasm_heap + string + 8);
    uint32_t length = *(uint32_t*) (wasm_heap + arrayPtr + 8);
    for (int32_t i = 0; i < length; ++i) {
        char16_t c = *(char16_t*) (wasm_heap + i * 2 + arrayPtr + 12);
        putwchar(c);
    }
}

void teavm_logInt(int32_t v) {
    wprintf(L"%" PRId32, v);
}

int32_t wasi_snapshot_preview1_clock_time_get(int32_t clock_id, int64_t precision, int32_t result_ptr) {
    int64_t* resultAddr = (int64_t*) (wasm_heap + result_ptr);
    struct timespec time;
    clock_gettime(CLOCK_REALTIME, &time);
    *resultAddr = time.tv_sec * 1000000000 + (int64_t) round(time.tv_nsec);
    return 0;
}

int32_t wasi_snapshot_preview1_args_sizes_get(int32_t argv_size, int32_t argv_buffer_size) {
    int32_t* argvSizePtr = (int32_t*) (wasm_heap + argv_size);
    int32_t* argvBufferSizePtr = (int32_t*) (wasm_heap + argv_buffer_size);
    *argvSizePtr = (int32_t) wasm_args;

    int32_t bufferSize = 0;
    for (int i = 0; i < wasm_args; ++i) {
        bufferSize += (int32_t) strlen(wasm_argv[i]) + 1;
    }
    *argvBufferSizePtr = bufferSize;
    return 0;
}

int32_t wasi_snapshot_preview1_args_get(int32_t sizes_ptr, int32_t args_ptr) {
    int32_t* sizesPtr = (int32_t*) (wasm_heap + sizes_ptr);
    char* argsPtr = (char*) (wasm_heap + args_ptr);
    int offset = 0;
    for (int i = 0; i < wasm_args; ++i) {
        sizesPtr[i] = (int32_t) offset + args_ptr;
        int len = strlen(wasm_argv[i]) + 1;
        memcpy(argsPtr + offset, wasm_argv[i], len);
        offset += len;
    }
    return 0;
}

typedef struct {
    int32_t tag;
    union {
        struct {
            int32_t name_length;
        } dir;
    } data;
} WasiPrestat;

int32_t wasi_snapshot_preview1_fd_prestat_get(int32_t fd, int32_t prestat_ptr) {
    if (fd != 3) {
        return 8;
    }
    WasiPrestat* prestat = (WasiPrestat*) (wasm_heap + prestat_ptr);
    prestat->tag = 0;
    prestat->data.dir.name_length = 1;
    return 0;
}

int32_t wasi_snapshot_preview1_fd_prestat_dir_name(int32_t fd, int32_t path, int32_t path_length) {
    char* pathPtr = (char*) (wasm_heap + path);
    *pathPtr = '/';
    return 0;
}

typedef struct {
    int32_t buf;
    int32_t buf_len;
} WasiIOVec;

int32_t wasi_snapshot_preview1_fd_write(int32_t fd, int32_t iovs, int32_t count, int32_t result) {
    WasiIOVec* vec = (WasiIOVec*) (wasm_heap + iovs);
    int32_t written = 0;
    for (int32_t i = 0; i < count; ++i) {
        written += write((int) fd, (char*) (wasm_heap + vec->buf), vec->buf_len);
    }
    int32_t* resultPtr = (int32_t*) (wasm_heap + result);
    *resultPtr = written;
    return 0;
}
#define TEAVM_MEMORY_TRACE 1
#define TEAVM_REFERENCE_SIZE 4

#if TEAVM_MEMORY_TRACE
    uint8_t* teavm_gc_heapMap = NULL;
    uint8_t* teavm_gc_markMap = NULL;
#endif

#if TEAVM_GC_STATS
    static int32_t teavm_gc_allocationCount = 0;
    static int32_t teavm_gc_freeCount = 0;
    static int32_t teavm_gc_freeByteCount = 0;
    static int32_t teavm_gc_markCount = 0;
    static int32_t teavm_gc_dirtyRegionCount = 0;
    static int32_t teavm_gc_relocatedBlocks = 0;
    static int32_t teavm_gc_relocatedBytes = 0;

    static int64_t teavm_gc_startTimeMillis;
    static int64_t teavm_gc_startTime;
    static int64_t teavm_gc_endTime;
    static int64_t teavm_gc_markStartTime;
    static int64_t teavm_gc_markEndTime;
    static int64_t teavm_gc_sweepStartTime;
    static int64_t teavm_gc_sweepEndTime;
    static int64_t teavm_gc_defragStartTime;
    static int64_t teavm_gc_defragEndTime;
    static int32_t teavm_gc_full;
#endif

#if TEAVM_MEMORY_TRACE
    static inline void teavmHeapTrace_assertSize(int32_t size) {
        if (size % TEAVM_REFERENCE_SIZE != 0) {
            abort();
        }
    }

    static inline void teavmHeapTrace_assertAddress(int32_t address) {
        if (address % TEAVM_REFERENCE_SIZE != 0) {
            abort();
        }
    }
#endif

int32_t teavm_javaHeapAddress();
int32_t teavm_availableBytes();
int32_t teavm_regionSize();
int32_t teavm_regionsAddress();

void teavmHeapTrace_init(int32_t maxHeap) {
    teavm_gc_heapMap = (uint8_t*) malloc(maxHeap / TEAVM_REFERENCE_SIZE);
    teavm_gc_markMap = (uint8_t*) malloc(maxHeap / TEAVM_REFERENCE_SIZE);
}

void teavmHeapTrace_allocate(int32_t address, int32_t size) {
    #if TEAVM_MEMORY_TRACE
        teavmHeapTrace_assertAddress(address);
        teavmHeapTrace_assertSize(size);

        address -= teavm_javaHeapAddress();
        size /= TEAVM_REFERENCE_SIZE;
        uint8_t* map = teavm_gc_heapMap + address / TEAVM_REFERENCE_SIZE;

        if (*map != 0) {
            fprintf(stderr, "[GC] trying allocate at memory in use at: %" PRId32 "\n", address);
            abort();
        }
        *map++ = 1;

        for (int32_t i = 1; i < size; ++i) {
            if (*map != 0) {
                fprintf(stderr, "[GC] trying allocate at memory in use at: %" PRId32 "\n", address);
                abort();
            }
            *map++ = 2;
        }
    #endif

    #if TEAVM_GC_STATS
        teavm_gc_allocationCount++;
    #endif
}

void teavmHeapTrace_free(int32_t address, int32_t size) {
    #if TEAVM_MEMORY_TRACE
        teavmHeapTrace_assertAddress(address);
        teavmHeapTrace_assertSize(size);

        address -= teavm_javaHeapAddress();
        int32_t offset = address / TEAVM_REFERENCE_SIZE;
        uint8_t* markMap = teavm_gc_markMap + offset;
        size /= TEAVM_REFERENCE_SIZE;
        for (int32_t i = 0; i < size; ++i) {
            if (markMap[i] != 0) {
                fprintf(stderr, "[GC] trying to release reachable object at: %" PRId32 "\n", address);
                abort();
            }
        }

        uint8_t* map = teavm_gc_heapMap + offset;
        memset(map, 0, size);
    #endif

    #if TEAVM_GC_STATS
        teavm_gc_freeCount++;
        teavm_gc_freeByteCount += size;
    #endif
}

void teavmHeapTrace_assertFree(int32_t address, int32_t size) {
    #if TEAVM_MEMORY_TRACE
        teavmHeapTrace_assertAddress(address);
        teavmHeapTrace_assertSize(size);

        address -= teavm_javaHeapAddress();
        int32_t offset = address / TEAVM_REFERENCE_SIZE;
        uint8_t* map = teavm_gc_heapMap + offset;
        size /= TEAVM_REFERENCE_SIZE;
        for (int32_t i = 0; i < size; ++i) {
            if (map[i] != 0) {
                fprintf(stderr, "[GC] memory supposed to be free at: %" PRId32 "\n", address);
                abort();
            }
        }
    #endif
}

void teavmHeapTrace_markStarted() {
    #if TEAVM_MEMORY_TRACE
        memset(teavm_gc_markMap, 0, teavm_availableBytes() / TEAVM_REFERENCE_SIZE);
    #endif

    #if TEAVM_GC_STATS
        teavm_gc_markStartTime = teavm_nanoTime();
    #endif
}

void teavmHeapTrace_markCompleted() {
    #if TEAVM_GC_STATS
        teavm_gc_markEndTime = teavm_nanoTime();
    #endif
}

#define TEAVM_ALIGN(addr, alignment) ((((addr) + ((int32_t) (alignment) - 1)) / (alignment) * (alignment)))
#define TEAVM_OBJECT_HEADER(address) (*(int32_t*) (wasm_heap + (address)))
#define TEAVM_OBJECT_HASH(address) (*(int32_t*) (wasm_heap + (address) + 4))
#define TEAVM_CLASS_OF(address) (TEAVM_OBJECT_HEADER(address) << 3);

#define teavm_class_size(address) (*(int32_t*) (wasm_heap + ((address) + 8)))
#define teavm_class_flags(address) (*(int32_t*) (wasm_heap + ((address) + 12)))
#define teavm_class_itemType(address) (*(int32_t*) (wasm_heap + ((address) + 32)))
#define teavm_class_superclass(address) (*(int32_t*) (wasm_heap + ((address) + 56)))
#define teavm_class_layout(address) (*(int32_t*) (wasm_heap + ((address) + 72)))
#define teavm_array_size(address) (*(int32_t*) (wasm_heap + ((address) + 8)))
#define teavm_reference_queue(address) (*(int32_t*) (wasm_heap + ((address) + 8)))
#define teavm_reference_object(address) (*(int32_t*) (wasm_heap + ((address) + 12)))
#define teavm_reference_next(address) (*(int32_t*) (wasm_heap + ((address) + 16)))
#define teavm_referenceQueue_first(address) (*(int32_t*) (wasm_heap + ((address) + 8)))
#define teavm_referenceQueue_last(address) (*(int32_t*) (wasm_heap + ((address) + 12)))
#define TEAVM_ARRAY_STRUCT_SIZE 12

int32_t teavmHeapTrace_objectSize(int32_t address) {
    int32_t cls = TEAVM_CLASS_OF(address);
    int32_t itemType = teavm_class_itemType(cls);
    if (itemType == 0) {
        return teavm_class_size(cls);
    }

    int32_t itemSize = teavm_class_flags(itemType) & 2 ? teavm_class_size(itemType) : TEAVM_REFERENCE_SIZE;
    int32_t size = TEAVM_ALIGN(TEAVM_ARRAY_STRUCT_SIZE, itemSize);
    size += teavm_array_size(address) * itemSize;
    size = TEAVM_ALIGN(size, TEAVM_REFERENCE_SIZE);
    return size;
}

void teavmHeapTrace_mark(int32_t address) {
    #if TEAVM_MEMORY_TRACE
        if (address < teavm_javaHeapAddress() || address >= teavm_javaHeapAddress() + teavm_availableBytes()) {
            return;
        }

        teavmHeapTrace_assertAddress(address);

        int32_t offset = (address - teavm_javaHeapAddress()) / TEAVM_REFERENCE_SIZE;
        uint8_t* map = teavm_gc_heapMap + offset;
        uint8_t* markMap = teavm_gc_markMap + offset;

        int32_t size = teavmHeapTrace_objectSize(address);
        teavmHeapTrace_assertSize(size);
        size /= TEAVM_REFERENCE_SIZE;

        if (*map++ != 1 || *markMap != 0) {
            fprintf(stderr, "[GC] assertion failed marking object at: %" PRId32 "\n",
                    address - teavm_javaHeapAddress());
            abort();
        }
        *markMap++ = 1;

        for (int32_t i = 1; i < size; ++i) {
            if (*map++ != 2 || *markMap != 0) {
                abort();
            }
            *markMap++ = 1;
        }
    #endif

    #if TEAVM_GC_STATS
        teavm_gc_markCount++;
    #endif
}

void teavmHeapTrace_move(int32_t from, int32_t to, int32_t size) {
    #if TEAVM_MEMORY_TRACE
        teavmHeapTrace_assertAddress(from);
        teavmHeapTrace_assertAddress(to);
        teavmHeapTrace_assertSize(size);

        uint8_t* mapFrom = teavm_gc_heapMap + ((from - teavm_javaHeapAddress()) / TEAVM_REFERENCE_SIZE);
        uint8_t* mapTo = teavm_gc_heapMap + ((to - teavm_javaHeapAddress()) / TEAVM_REFERENCE_SIZE);
        size /= TEAVM_REFERENCE_SIZE;

        if (mapFrom > mapTo) {
            for (int32_t i = 0; i < size; ++i) {
                if (mapFrom[i] == 0 || mapTo[i] != 0) {
                    fprintf(stderr, "[GC] assertion failed moving object from: %" PRId32 " to %" PRId32 "\n",
                            from - teavm_javaHeapAddress(), to - teavm_javaHeapAddress());
                    abort();
                }
                mapTo[i] = mapFrom[i];
                mapFrom[i] = 0;
            }
        } else {
            for (int32_t i = size - 1; i >= 0; --i) {
                if (mapFrom[i] == 0 || mapTo[i] != 0) {
                    abort();
                }
                mapTo[i] = mapFrom[i];
                mapFrom[i] = 0;
            }
        }
    #endif

    #if TEAVM_GC_STATS
        teavm_gc_relocatedBlocks++;
        teavm_gc_relocatedBytes += size;
    #endif
}

#if TEAVM_MEMORY_TRACE

    static inline int32_t teavm_verify(int32_t address) {
        if (address >= teavm_javaHeapAddress() && address < teavm_javaHeapAddress() + teavm_availableBytes()) {
            teavmHeapTrace_assertAddress(address);
            uint8_t* map = teavm_gc_heapMap + ((address - teavm_javaHeapAddress()) / TEAVM_REFERENCE_SIZE);
            if (*map != 1) {
                abort();
            }
        }

        return address;
    }

    void teavmHeapTrace_checkHeapConsistency(int32_t oldGen, int32_t offsets) {
        int32_t lastCheckedRegion = -1;
        int32_t obj = teavm_javaHeapAddress();
        uint16_t* regions = (uint16_t*) (wasm_heap + teavm_regionsAddress());
        while (obj < teavm_javaHeapAddress() + teavm_availableBytes()) {
            int32_t size;
            int32_t header = TEAVM_OBJECT_HEADER(obj);
            if (header == 0) {
                size = TEAVM_OBJECT_HASH(obj);
                teavmHeapTrace_assertFree(obj, size);
            } else {
                teavm_verify(obj);
                if (offsets) {
                    int32_t offset = obj - teavm_javaHeapAddress();
                    int32_t objRegion = offset / teavm_regionSize();
                    if (objRegion != lastCheckedRegion) {
                        while (++lastCheckedRegion < objRegion) {
                            if (regions[lastCheckedRegion] != 0) {
                                abort();
                            }
                        }
                        int32_t offsetInRegion = offset % teavm_regionSize();
                        if (regions[objRegion] != offsetInRegion + 1) {
                            abort();
                        }
                    }
                }
                if (oldGen && !(header & 0x40000000)) {
                    abort();
                }
                int32_t cls = TEAVM_CLASS_OF(obj);
                int32_t itemType = teavm_class_itemType(cls);
                if (itemType != 0) {
                    if (!(teavm_class_flags(itemType) & 2)) {
                        int32_t offset = 0;
                        offset += TEAVM_ARRAY_STRUCT_SIZE;
                        offset = TEAVM_ALIGN(offset, TEAVM_REFERENCE_SIZE);
                        int32_t data = obj + offset;
                        int32_t size = teavm_array_size(obj);
                        for (int32_t i = 0; i < size; ++i) {
                            teavm_verify(((int32_t*) (wasm_heap + data))[i]);
                        }
                    }
                } else {
                    while (cls != 0) {
                        int32_t kind = (teavm_class_flags(cls) >> 7) & 7;
                        if (kind == 1) {
                            teavm_verify(teavm_reference_next(obj));
                            teavm_verify(teavm_reference_object(obj));
                            teavm_verify(teavm_reference_queue(obj));
                        } else if (kind == 2) {
                            teavm_verify(teavm_referenceQueue_first(obj));
                            teavm_verify(teavm_referenceQueue_last(obj));
                        } else {
                            int32_t layoutOffset = teavm_class_layout(cls);
                            if (layoutOffset != 0) {
                                int16_t* layout = (int16_t*) (wasm_heap + layoutOffset);
                                int16_t size = *layout++;
                                for (int32_t i = 0; i < size; ++i) {
                                    int32_t ptr = obj + *layout++;
                                    teavm_verify(*(int32_t*) (wasm_heap + ptr));
                                }
                            }
                        }

                        cls = teavm_class_superclass(cls);
                    }
                }
                size = teavmHeapTrace_objectSize(obj);
            }

            if (size == 0) {
                abort();
            }
            obj += size;
        }

        if (offsets) {
            int32_t lastRegion = teavm_availableBytes() / teavm_regionSize();
            while (++lastCheckedRegion <= lastRegion) {
                if (regions[lastCheckedRegion] != 0) {
                    abort();
                }
            }
        }
    }
#endif

void teavmHeapTrace_gcStarted(int32_t full) {
    #if TEAVM_MEMORY_TRACE
        teavmHeapTrace_checkHeapConsistency(0, 0);
    #endif

    #if TEAVM_GC_STATS
        teavm_gc_startTime = teavm_nanoTime();
        teavm_gc_startTimeMillis = teavm_currentTimeMillis();
        teavm_gc_full = full;
    #endif
}

void teavmHeapTrace_sweepStarted() {
    #if TEAVM_GC_STATS
        teavm_gc_sweepStartTime = teavm_nanoTime();
    #endif
}

void teavmHeapTrace_sweepCompleted() {
    #if TEAVM_MEMORY_TRACE
        teavmHeapTrace_checkHeapConsistency(0, 1);
    #endif

    #if TEAVM_GC_STATS
        teavm_gc_sweepEndTime = teavm_nanoTime();
    #endif
}

void teavmHeapTrace_defragStarted() {
    #if TEAVM_GC_STATS
        teavm_gc_defragStartTime = teavm_nanoTime();
    #endif
}

void teavmHeapTrace_defragCompleted() {
    #if TEAVM_MEMORY_TRACE
        teavmHeapTrace_checkHeapConsistency(1, 1);
    #endif

    #if TEAVM_GC_STATS
        teavm_gc_defragEndTime = teavm_nanoTime();
    #endif
}

#if TEAVM_GC_STATS
    static void teavmHeapTrace_printStats() {
        fprintf(stderr, "[GC] Garbage collection (%s) performed at %" PRIu64 ", took %"
                PRIu64 " ns\n", teavm_gc_full ? "full" : "young", teavm_gc_startTimeMillis,
                teavm_gc_endTime - teavm_gc_startTime);

        fprintf(stderr, "[GC]   Allocations performed before GC: %" PRIu32 "\n", teavm_gc_allocationCount);

        fprintf(stderr, "[GC]   Mark phase took %" PRIu64 " ns, %" PRIu32 " objects reached\n",
                teavm_gc_markEndTime - teavm_gc_markStartTime, teavm_gc_markCount);

        if (!teavm_gc_full) {
            fprintf(stderr, "[GC]     Regions scanned from remembered set: %" PRIu32 "\n", teavm_gc_dirtyRegionCount);
        }

        fprintf(stderr, "[GC]   Sweep phase took %" PRIu64 " ns, %" PRIu32 " regions of %"
                PRIu32 " bytes freed\n", teavm_gc_sweepEndTime - teavm_gc_sweepStartTime, teavm_gc_freeCount,
                teavm_gc_freeByteCount);

        fprintf(stderr, "[GC]   Defrag phase took %" PRIu64 " ns\n",
                teavm_gc_defragEndTime - teavm_gc_defragStartTime);

        fprintf(stderr, "[GC]     Blocks relocated %" PRId32 " of total %" PRId32 " bytes\n",
                teavm_gc_relocatedBlocks, teavm_gc_relocatedBytes);
    }

    static void teavmHeapTrace_resetStats() {
        teavm_gc_allocationCount = 0;
        teavm_gc_markCount = 0;
        teavm_gc_dirtyRegionCount = 0;
        teavm_gc_freeCount = 0;
        teavm_gc_freeByteCount = 0;
        teavm_gc_relocatedBlocks = 0;
        teavm_gc_relocatedBytes = 0;
    }
#endif

void teavmHeapTrace_gcCompleted() {
    #if TEAVM_GC_STATS
        teavm_gc_endTime = teavm_nanoTime();
        teavmHeapTrace_printStats();
        teavmHeapTrace_resetStats();
    #endif
}

void teavmHeapTrace_heapResized(int64_t newSize) {
    #if TEAVM_GC_STATS
        fprintf(stderr, "[GC] Heap resized to %" PRIu64 " bytes\n", newSize);
    #endif
}

void teavmHeapTrace_reportDirtyRegion(int32_t address) {
    #if TEAVM_GC_STATS
        teavm_gc_dirtyRegionCount++;
    #endif
}

static void meth_jl_IndexOutOfBoundsException__init_(int32_t);
static int32_t meth_otr_RuntimeClass_getClass(int32_t);
static int32_t meth_otr_GC_getRegionCount();
static int32_t meth_otr_GC_alloc(int32_t);
static void meth_otr_GC_getNextChunk(int32_t);
static int32_t meth_otr_GC_hasAvailableMemory(int32_t);
static int32_t meth_otr_GC_getNextChunkIfPossible(int32_t);
void teavm_gc_collect();
void teavm_gc_collectFull();
static void meth_otr_GC_collectGarbageFullImpl(int32_t);
static void meth_otr_GC_triggerFullGC();
static void meth_otr_GC_collectGarbageImpl(int32_t);
static void meth_otr_GC_doCollectGarbage();
static int32_t meth_otr_GC_hasAvailableChunk(int32_t);
static int64_t meth_otr_GC_computeMinRequestedSize(int32_t);
void teavm_gc_fixHeap();
void teavm_gc_tryShrink();
static void meth_otr_GC_mark();
static void meth_otr_GC_markFromStaticFields();
static void meth_otr_GC_markFromClasses();
static void meth_otr_GC_markFromStack();
static void meth_otr_GC_markFromOldGeneration();
static void meth_otr_GC_markFromRegion(int32_t);
static void meth_otr_GC_mark_0(int32_t);
static int32_t meth_otr_GC_doMarkOldGeneration(int32_t);
static void meth_otr_GC_doProcessMarkQueue();
static int32_t meth_otr_GC_markObjectData(int32_t);
static int32_t meth_otr_GC_markObject(int32_t, int32_t);
static int32_t meth_otr_GC_markWeakReference(int32_t);
static int32_t meth_otr_GC_markReferenceQueue(int32_t);
static int32_t meth_otr_GC_markFields(int32_t, int32_t);
static int32_t meth_otr_GC_markArray(int32_t, int32_t);
static int32_t meth_otr_GC_enqueueMark(int32_t);
static void meth_otr_GC_doEnqueueMark(int32_t);
static void meth_otr_GC_processReferences();
static void meth_otr_GC_makeInvalid(int32_t);
static void meth_otr_GC_sweep();
static void meth_otr_GC_storeGapsInCardTable();
static void meth_otr_GC_clearGapsFromCardTable();
static void meth_otr_GC_freeMemory(int32_t, int32_t);
static void meth_otr_GC_defragment();
static void meth_otr_GC_markStackRoots();
static void meth_otr_GC_moveNonRelocatableObjectsToOldGeneration();
static void meth_otr_GC_moveObjectsToOldGenerationInRegion(int32_t, int32_t);
static void meth_otr_GC_calculateRelocationTargets();
static int32_t meth_otr_GC_shouldRelocateObject(int32_t);
static void meth_otr_GC_updatePointersFromStaticRoots();
static void meth_otr_GC_updatePointersFromClasses();
static void meth_otr_GC_updatePointersFromObjects();
static void meth_otr_GC_updatePointersFromObjectsFull();
static void meth_otr_GC_updatePointersFromObjectsYoung();
static void meth_otr_GC_updatePointersFromRegion(int32_t);
static void meth_otr_GC_updatePointers(int32_t, int32_t);
static void meth_otr_GC_updatePointersInObject(int32_t, int32_t);
static void meth_otr_GC_updatePointersInWeakReference(int32_t);
static void meth_otr_GC_updatePointersInReferenceQueue(int32_t);
static void meth_otr_GC_updatePointersInFields(int32_t, int32_t);
static void meth_otr_GC_updatePointersInArray(int32_t, int32_t);
static int32_t meth_otr_GC_updatePointer(int32_t);
static int32_t meth_otr_GC_getRelocation(int32_t);
static void meth_otr_GC_restoreObjectHeaders();
static void meth_otr_GC_restoreObjectHeadersInRegion(int32_t, int32_t);
static void meth_otr_GC_restoreObjectHeadersInRange(int32_t, int32_t);
static void meth_otr_GC_relocateObjects();
static void meth_otr_GC_moveMemoryBlock(int32_t, int32_t, int32_t);
static void meth_otr_GC_putNewFreeChunks();
static void meth_otr_GC_updateFreeMemory();
static void meth_otr_GC_resizeHeapConsistent(int64_t);
static void meth_otr_GC_resizeHeapIfNecessary(int64_t);
static int32_t meth_otr_GC_isAboutToExpand(int64_t);
static int64_t meth_otr_GC_min(int64_t, int64_t);
static int64_t meth_otr_GC_max(int64_t, int64_t);
static int32_t meth_otr_GC_objectSize(int32_t);
static int32_t meth_otr_GC_objectSize_0(int32_t, int32_t);
static int32_t meth_otr_GC_isMarked(int32_t);
static void meth_otr_GC__clinit_();
static int32_t meth_ju_Arrays_copyOf(int32_t, int32_t);
static int32_t meth_ju_Arrays_copyOf_0(int32_t, int32_t);
static int32_t meth_ju_Arrays_copyOf_1(int32_t, int32_t);
static int32_t meth_ju_Arrays_copyOf_2(int32_t, int32_t);
static int32_t meth_ju_Arrays_copyOf_3(int32_t, int32_t);
static int32_t meth_ju_Arrays_copyOf_4(int32_t, int32_t);
static int32_t meth_jlr_Array_newInstance(int32_t, int32_t);
static int32_t meth_jlr_Array_newInstanceImpl(int32_t, int32_t);
static int32_t meth_jlr_Array_newInstanceLowLevel(int32_t, int32_t);
static int64_t meth_jl_System_currentTimeMillis();
static int64_t meth_jl_System_currentTimeMillisLowLevel();
static int64_t meth_otbwr_WasmSupport_currentTimeMillis();
extern double teavm_currentTimeMillis();
extern void teavm_logString(int32_t);
extern void teavm_logInt(int32_t);
extern void teavm_logOutOfMemory();
static int32_t meth_otbwr_WasmSupport_getArgs();
static void meth_otbwr_WasmSupport_initClasses();
static void meth_otbwr_WasmSupport_runWithoutArgs();
static void meth_otbwr_WasmSupport_runWithArgs(int32_t);
static void meth_otbwr_WasmSupport_lambda_runWithArgs_1(int32_t);
static void meth_otbwr_WasmSupport_lambda_runWithoutArgs_0();
static int32_t meth_otbw_WasmRuntime_compare_0(int64_t, int64_t);
static int32_t meth_otbw_WasmRuntime_align(int32_t, int32_t);
static void meth_otbw_WasmRuntime_printString(int32_t);
static void meth_otbw_WasmRuntime_printInt(int32_t);
static void meth_otbw_WasmRuntime_printOutOfMemory();
static void meth_otbw_WasmRuntime_fillZero(int32_t, int32_t);
static void meth_otbw_WasmRuntime_fill(int32_t, int32_t, int32_t);
static void meth_otbw_WasmRuntime_moveMemoryBlock(int32_t, int32_t, int32_t);
static void meth_otbw_WasmRuntime_slowMemoryMove(int32_t, int32_t, int32_t);
static int32_t meth_otbw_WasmRuntime_allocStack(int32_t);
static int32_t meth_otbw_WasmRuntime_getStackTop();
static int32_t meth_otbw_WasmRuntime_getNextStackFrame(int32_t);
static int32_t meth_otbw_WasmRuntime_getStackRootCount(int32_t);
static int32_t meth_otbw_WasmRuntime_getStackRootPointer(int32_t);
static int32_t meth_otbw_WasmRuntime_getExceptionHandlerPtr(int32_t);
static int32_t meth_otbw_WasmRuntime_getCallSiteId(int32_t);
static void meth_otbw_WasmRuntime_setExceptionHandlerId(int32_t, int32_t);
static void meth_jl_NullPointerException__init_(int32_t);
static int32_t meth_jl_Character_forDigit(int32_t, int32_t);
static void meth_jl_Character__clinit_();
static void meth_jl_Thread__init_(int32_t, int32_t);
static void meth_jl_Thread__init__0(int32_t, int32_t, int32_t);
static void meth_jl_Thread__clinit_();
static void meth_jl_DefaultUncaughtExceptionHandler__init_(int32_t);
static int32_t meth_jl_Math_min(int32_t, int32_t);
static int32_t meth_jl_Math_max(int32_t, int32_t);
static int64_t meth_jl_Math_max_0(int64_t, int64_t);
static void meth_otbwr_WasmSupport_runWithoutArgs_lambda__14_0__init_(int32_t);
static void meth_otbwr_WasmSupport_runWithoutArgs_lambda__14_0_run(int32_t);
static void meth_jl_StringIndexOutOfBoundsException__init_(int32_t);
static void meth_jl_Exception__init_(int32_t);
static void meth_jl_StringBuilder__init_(int32_t);
static int32_t meth_jl_StringBuilder_append_0(int32_t, int32_t);
static int32_t meth_jl_StringBuilder_append(int32_t, int32_t);
static int32_t meth_jl_StringBuilder_append_1(int32_t, int32_t);
static int32_t meth_jl_StringBuilder_append_2(int32_t, int32_t);
static int32_t meth_jl_StringBuilder_insert_2(int32_t, int32_t, int32_t);
static int32_t meth_jl_StringBuilder_insert_3(int32_t, int32_t, int32_t);
static int32_t meth_jl_StringBuilder_insert_4(int32_t, int32_t, int32_t);
static void meth_jl_StringBuilder_setLength(int32_t, int32_t);
static int32_t meth_jl_StringBuilder_toString(int32_t);
static void meth_jl_StringBuilder_ensureCapacity(int32_t, int32_t);
static int32_t meth_jl_StringBuilder_insert_0(int32_t, int32_t, int32_t);
static int32_t meth_jl_StringBuilder_insert(int32_t, int32_t, int32_t);
static int32_t meth_jl_StringBuilder_insert_1(int32_t, int32_t, int32_t);
static void meth_jl_Throwable__init_(int32_t);
static int32_t meth_jl_Throwable_fillInStackTrace(int32_t);
static int32_t meth_otp_Platform_getArrayItem(int32_t);
static void meth_jl_AbstractStringBuilder__init_(int32_t);
static void meth_jl_AbstractStringBuilder__init__0(int32_t, int32_t);
static int32_t meth_jl_AbstractStringBuilder_append_0(int32_t, int32_t);
static int32_t meth_jl_AbstractStringBuilder_append_1(int32_t, int32_t);
static int32_t meth_jl_AbstractStringBuilder_insert_1(int32_t, int32_t, int32_t);
static int32_t meth_jl_AbstractStringBuilder_append_2(int32_t, int32_t);
static int32_t meth_jl_AbstractStringBuilder_append(int32_t, int32_t, int32_t);
static int32_t meth_jl_AbstractStringBuilder_insert_2(int32_t, int32_t, int32_t, int32_t);
static int32_t meth_jl_AbstractStringBuilder_append_3(int32_t, int32_t);
static int32_t meth_jl_AbstractStringBuilder_insert(int32_t, int32_t, int32_t);
static int32_t meth_jl_AbstractStringBuilder_insert_0(int32_t, int32_t, int32_t);
static void meth_jl_AbstractStringBuilder_ensureCapacity(int32_t, int32_t);
static int32_t meth_jl_AbstractStringBuilder_toString(int32_t);
static void meth_jl_AbstractStringBuilder_setLength(int32_t, int32_t);
static void meth_jl_AbstractStringBuilder_insertSpace(int32_t, int32_t, int32_t);
static void meth_otr_ExceptionHandling_printStack();
int32_t teavm_catchException();
static void meth_otr_ExceptionHandling_throwException(int32_t);
void teavm_throwNullPointerException();
void teavm_throwArrayIndexOutOfBoundsException();
static int32_t meth_otr_ExceptionHandling_callStackSize();
static int32_t meth_otr_ExceptionHandling_fillStackTrace();
static void meth_otr_MarkQueue_init();
static void meth_otr_MarkQueue_enqueue(int32_t);
static int32_t meth_otr_MarkQueue_dequeue();
static int32_t meth_otr_MarkQueue_pack(int32_t);
static int32_t meth_otr_MarkQueue_unpack(int32_t);
static int32_t meth_otr_MarkQueue_isEmpty();
static void meth_otbwr_WasmSupport_runWithArgs_lambda__15_0__init_(int32_t, int32_t);
static void meth_otbwr_WasmSupport_runWithArgs_lambda__15_0_run(int32_t);
static void meth_jl_StackTraceElement__init_(int32_t, int32_t, int32_t, int32_t, int32_t);
static void meth_jl_String__init__0(int32_t, int32_t, int32_t, int32_t);
static void meth_jl_String__init__1(int32_t, int32_t);
static int32_t meth_jl_String_allocate(int32_t);
static int32_t meth_jl_String_charAt(int32_t, int32_t);
static int32_t meth_jl_String_length(int32_t);
static int32_t meth_jl_String_isEmpty(int32_t);
static void meth_jl_String__clinit_();
static int32_t meth_otbw_WasmHeap_calculateStorageSize(int32_t);
static int32_t meth_otbw_WasmHeap_calculateRegionsCount(int32_t, int32_t);
static int32_t meth_otbw_WasmHeap_calculateRegionsSize(int32_t);
static void meth_otbw_WasmHeap_initHeap(int32_t, int32_t, int32_t, int32_t, int32_t);
static void meth_otbw_WasmHeap_resizeHeap(int32_t);
static void meth_otbw_WasmHeap__clinit_();
static void meth_jl_NegativeArraySizeException__init_(int32_t);
static void meth_cbv_VisualizerRuntime_main(int32_t);
void initialize();
int32_t ping();
int32_t acceptCode(int32_t);
int32_t invokeMain();
void trackStep(int32_t);
void captureOutput(int32_t);
void trackVariable(int32_t, int32_t, int32_t);
void trackMethodEntry(int32_t, int32_t, int32_t);
void trackMethodExit(int32_t, int32_t, int32_t);
void trackObjectCreation(int32_t, int32_t);
void trackObjectCreated(int32_t, int32_t, int32_t);
void trackFieldWrite(int32_t, int32_t, int32_t);
void trackArrayCreate(int32_t, int32_t, int32_t);
void trackCollectionEvent(int32_t, int32_t, int32_t, int32_t);
void trackMethodReturn(int32_t, int32_t);
void trackExceptionThrown(int32_t, int32_t, int32_t);
void trackTryCatchEnter(int32_t, int32_t);
void trackFinallyEnter(int32_t, int32_t);
void trackStaticInitStart(int32_t);
void trackStaticInitEnd(int32_t);
void trackThisReference(int32_t, int32_t);
int32_t generateObjectId(int32_t);
int32_t getCurrentStep();
int32_t getCurrentLine();
int32_t getOutput();
void reset();
int32_t isInitialized();
static void meth_cbv_VisualizerRuntime__clinit_();
static void meth_jl_RuntimeException__init_(int32_t);
static void meth_jl_ArrayIndexOutOfBoundsException__init_(int32_t);
static void meth_jl_IllegalArgumentException__init_(int32_t);
int64_t teavm_processQueue();
int32_t teavm_stopped();
static void meth_otr_EventQueue_stop();
static void meth_otr_EventQueue_remove(int32_t);
static void meth_otr_EventQueue_update(int32_t);
static void meth_otr_EventQueue__clinit_();
static void meth_otr_Fiber__init_(int32_t, int32_t, int32_t);
static void meth_otr_Fiber_push(int32_t, int32_t);
static void meth_otr_Fiber_push_0(int32_t, int64_t);
static void meth_otr_Fiber_push_1(int32_t, float);
static void meth_otr_Fiber_push_2(int32_t, double);
static void meth_otr_Fiber_push_3(int32_t, int32_t);
static int32_t meth_otr_Fiber_popInt(int32_t);
static int64_t meth_otr_Fiber_popLong(int32_t);
static float meth_otr_Fiber_popFloat(int32_t);
static double meth_otr_Fiber_popDouble(int32_t);
static int32_t meth_otr_Fiber_popObject(int32_t);
static int32_t meth_otr_Fiber_isSuspending(int32_t);
static int32_t meth_otr_Fiber_isResuming(int32_t);
static void meth_otr_Fiber_start(int32_t, int32_t);
static void meth_otr_Fiber_start_0(int32_t);
static void meth_otr_Fiber__clinit_();
static void meth_jl_String__clinit__lambda__84_0__init_(int32_t);
static void meth_jl_Object__init_(int32_t);
static int32_t meth_jl_Object_getClass(int32_t);
static int32_t meth_jl_Class_getPlatformClass(int32_t);
static int32_t meth_jl_Class_getComponentType(int32_t);
static int32_t meth_otr_Allocator_allocate(int32_t);
static int32_t meth_otr_Allocator_allocateArray(int32_t, int32_t);
int32_t teavm_allocateString(int32_t);
int32_t teavm_stringData(int32_t);
int32_t teavm_allocateObjectArray(int32_t);
int32_t teavm_allocateStringArray(int32_t);
int32_t teavm_allocateByteArray(int32_t);
int32_t teavm_allocateShortArray(int32_t);
int32_t teavm_allocateCharArray(int32_t);
int32_t teavm_allocateIntArray(int32_t);
int32_t teavm_allocateLongArray(int32_t);
int32_t teavm_allocateFloatArray(int32_t);
int32_t teavm_allocateDoubleArray(int32_t);
int32_t teavm_objectArrayData(int32_t);
int32_t teavm_byteArrayData(int32_t);
int32_t teavm_shortArrayData(int32_t);
int32_t teavm_charArrayData(int32_t);
int32_t teavm_intArrayData(int32_t);
int32_t teavm_longArrayData(int32_t);
int32_t teavm_floatArrayData(int32_t);
int32_t teavm_doubleArrayData(int32_t);
int32_t teavm_arrayLength(int32_t);
static int32_t supertypeof_jl_IndexOutOfBoundsException(int32_t);
static int32_t supertypeof_jl_RuntimeException(int32_t);
static int32_t supertypeof_jl_Exception(int32_t);
static int32_t supertypeof_jl_Throwable(int32_t);
static int32_t supertypeof_jl_Object(int32_t);
static int32_t supertypeof_otr_GC(int32_t);
static int32_t supertypeof_ju_Arrays(int32_t);
static int32_t supertypeof_jlr_Array(int32_t);
static int32_t supertypeof_otr_Console(int32_t);
static int32_t supertypeof_jl_System(int32_t);
static int32_t supertypeof_otbwr_WasmSupport(int32_t);
static int32_t supertypeof_otbw_WasmRuntime(int32_t);
static int32_t supertypeof_jl_NullPointerException(int32_t);
static int32_t supertypeof_jl_Character(int32_t);
static int32_t supertypeof_jl_Thread(int32_t);
static int32_t supertypeof_jl_DefaultUncaughtExceptionHandler(int32_t);
static int32_t supertypeof_jl_Math(int32_t);
static int32_t supertypeof_otbwr_WasmSupport_runWithoutArgs_lambda__14_0(int32_t);
static int32_t supertypeof_otr_ShadowStack(int32_t);
static int32_t supertypeof_jl_StringIndexOutOfBoundsException(int32_t);
static int32_t supertypeof_jl_StringBuilder(int32_t);
static int32_t supertypeof_jl_AbstractStringBuilder(int32_t);
static int32_t supertypeof_otr_Mutator(int32_t);
static int32_t supertypeof_otr_MemoryTrace(int32_t);
static int32_t supertypeof_otp_Platform(int32_t);
static int32_t supertypeof_otr_ExceptionHandling(int32_t);
static int32_t supertypeof_otr_MarkQueue(int32_t);
static int32_t supertypeof_otbwr_WasmSupport_runWithArgs_lambda__15_0(int32_t);
static int32_t supertypeof_jl_StackTraceElement(int32_t);
static int32_t supertypeof_jl_String(int32_t);
static int32_t supertypeof_otbw_WasmHeap(int32_t);
static int32_t supertypeof_jl_NegativeArraySizeException(int32_t);
static int32_t supertypeof_cbv_VisualizerRuntime(int32_t);
static int32_t supertypeof_jl_ArrayIndexOutOfBoundsException(int32_t);
static int32_t supertypeof_jl_IllegalArgumentException(int32_t);
static int32_t supertypeof_otr_EventQueue(int32_t);
static int32_t supertypeof_otr_Fiber(int32_t);
static int32_t supertypeof_jl_String__clinit__lambda__84_0(int32_t);
static int32_t supertypeof_jl_Class(int32_t);
static int32_t supertypeof_otr_Allocator(int32_t);
static int32_t supertypeof_Arr_C(int32_t);
static int32_t supertypeof_C(int32_t);
static int32_t supertypeof_Arr_I(int32_t);
static int32_t supertypeof_I(int32_t);
static int32_t supertypeof_Arr_J(int32_t);
static int32_t supertypeof_J(int32_t);
static int32_t supertypeof_Arr_F(int32_t);
static int32_t supertypeof_F(int32_t);
static int32_t supertypeof_Arr_D(int32_t);
static int32_t supertypeof_D(int32_t);
static int32_t supertypeof_V(int32_t);
static int32_t supertypeof_Arr_jl_String(int32_t);
static int32_t supertypeof_Arr_jl_Character(int32_t);
static int32_t supertypeof_otp_PlatformClassMetadata(int32_t);
static int32_t supertypeof_otp_PlatformClass(int32_t);
static int32_t supertypeof_Arr_jl_StackTraceElement(int32_t);
static int32_t supertypeof_otr_EventQueue_Node(int32_t);
static int32_t supertypeof_otr_EventQueue_Event(int32_t);
static int32_t supertypeof_Arr_otr_EventQueue_Node(int32_t);
static int32_t supertypeof_Arr_jl_Object(int32_t);
static int32_t supertypeof_otr_Fiber_FiberRunner(int32_t);
static int32_t supertypeof_otp_PlatformObject(int32_t);
static int32_t supertypeof_Arr_B(int32_t);
static int32_t supertypeof_B(int32_t);
static int32_t supertypeof_Arr_S(int32_t);
static int32_t supertypeof_S(int32_t);
int32_t teavm_javaHeapAddress();
int32_t teavm_availableBytes();
int32_t teavm_regionsAddress();
int32_t teavm_regionSize();
static void initclass_otr_GC();
static void initclass_jl_Character();
static void initclass_jl_Thread();
static void initclass_jl_String();
static void initclass_otbw_WasmHeap();
static void initclass_cbv_VisualizerRuntime();
static void initclass_otr_EventQueue();
static void initclass_otr_Fiber();
static void __start__();
void teavm_start(int32_t);
void teavm_call_start();
static void *wasm_table[] = {
    supertypeof_jl_Object,
    meth_jl_Object_getClass,
    supertypeof_jl_Throwable,
    meth_jl_Throwable_fillInStackTrace,
    supertypeof_jl_Exception,
    supertypeof_jl_RuntimeException,
    supertypeof_jl_IndexOutOfBoundsException,
    supertypeof_otr_GC,
    initclass_otr_GC,
    supertypeof_ju_Arrays,
    supertypeof_jlr_Array,
    supertypeof_otr_Console,
    supertypeof_jl_System,
    supertypeof_otbwr_WasmSupport,
    supertypeof_otbw_WasmRuntime,
    supertypeof_jl_NullPointerException,
    supertypeof_jl_Character,
    initclass_jl_Character,
    supertypeof_jl_Thread,
    initclass_jl_Thread,
    supertypeof_jl_DefaultUncaughtExceptionHandler,
    supertypeof_jl_Math,
    supertypeof_otbwr_WasmSupport_runWithoutArgs_lambda__14_0,
    meth_otbwr_WasmSupport_runWithoutArgs_lambda__14_0_run,
    supertypeof_otr_ShadowStack,
    supertypeof_jl_StringIndexOutOfBoundsException,
    supertypeof_jl_AbstractStringBuilder,
    meth_jl_AbstractStringBuilder_toString,
    meth_jl_AbstractStringBuilder_insert,
    meth_jl_AbstractStringBuilder_insert_0,
    meth_jl_AbstractStringBuilder_ensureCapacity,
    meth_jl_AbstractStringBuilder_append,
    meth_jl_AbstractStringBuilder_insert_1,
    meth_jl_AbstractStringBuilder_insert_2,
    meth_jl_AbstractStringBuilder_append_0,
    meth_jl_AbstractStringBuilder_append_1,
    meth_jl_AbstractStringBuilder_append_2,
    meth_jl_AbstractStringBuilder_append_3,
    meth_jl_AbstractStringBuilder_setLength,
    supertypeof_jl_StringBuilder,
    meth_jl_StringBuilder_toString,
    meth_jl_StringBuilder_insert,
    meth_jl_StringBuilder_insert_0,
    meth_jl_StringBuilder_ensureCapacity,
    meth_jl_StringBuilder_insert_1,
    meth_jl_StringBuilder_setLength,
    meth_jl_StringBuilder_insert_2,
    meth_jl_StringBuilder_insert_3,
    meth_jl_StringBuilder_insert_4,
    meth_jl_StringBuilder_append,
    meth_jl_StringBuilder_append_0,
    meth_jl_StringBuilder_append_1,
    meth_jl_StringBuilder_append_2,
    supertypeof_otr_Mutator,
    supertypeof_otr_MemoryTrace,
    supertypeof_otp_Platform,
    supertypeof_otr_ExceptionHandling,
    supertypeof_otr_MarkQueue,
    supertypeof_otbwr_WasmSupport_runWithArgs_lambda__15_0,
    meth_otbwr_WasmSupport_runWithArgs_lambda__15_0_run,
    supertypeof_jl_StackTraceElement,
    supertypeof_jl_String,
    meth_jl_String_length,
    meth_jl_String_charAt,
    meth_jl_String_isEmpty,
    initclass_jl_String,
    supertypeof_otbw_WasmHeap,
    initclass_otbw_WasmHeap,
    supertypeof_jl_NegativeArraySizeException,
    supertypeof_cbv_VisualizerRuntime,
    initclass_cbv_VisualizerRuntime,
    supertypeof_jl_ArrayIndexOutOfBoundsException,
    supertypeof_jl_IllegalArgumentException,
    supertypeof_otr_EventQueue,
    initclass_otr_EventQueue,
    supertypeof_otr_Fiber,
    meth_otr_Fiber_isSuspending,
    meth_otr_Fiber_push,
    meth_otr_Fiber_push_0,
    meth_otr_Fiber_push_1,
    meth_otr_Fiber_push_2,
    meth_otr_Fiber_push_3,
    meth_otr_Fiber_popInt,
    meth_otr_Fiber_popLong,
    meth_otr_Fiber_popFloat,
    meth_otr_Fiber_popDouble,
    meth_otr_Fiber_popObject,
    meth_otr_Fiber_isResuming,
    initclass_otr_Fiber,
    supertypeof_jl_String__clinit__lambda__84_0,
    supertypeof_jl_Class,
    meth_jl_Class_getComponentType,
    meth_jl_Class_getPlatformClass,
    supertypeof_otr_Allocator,
    supertypeof_C,
    supertypeof_Arr_C,
    supertypeof_I,
    supertypeof_Arr_I,
    supertypeof_J,
    supertypeof_Arr_J,
    supertypeof_F,
    supertypeof_Arr_F,
    supertypeof_D,
    supertypeof_Arr_D,
    supertypeof_V,
    supertypeof_Arr_jl_String,
    supertypeof_Arr_jl_Character,
    supertypeof_otp_PlatformClassMetadata,
    supertypeof_otp_PlatformClass,
    supertypeof_Arr_jl_StackTraceElement,
    supertypeof_otr_EventQueue_Node,
    supertypeof_otr_EventQueue_Event,
    supertypeof_Arr_otr_EventQueue_Node,
    supertypeof_Arr_jl_Object,
    supertypeof_otr_Fiber_FiberRunner,
    supertypeof_otp_PlatformObject,
    supertypeof_B,
    supertypeof_Arr_B,
    supertypeof_S,
    supertypeof_Arr_S
};

static void meth_jl_IndexOutOfBoundsException__init_(int32_t _this) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(0);
    meth_jl_RuntimeException__init_(_this);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static int32_t meth_otr_RuntimeClass_getClass(int32_t _object) {
    return (*((int32_t *) &wasm_heap[_object + 0]) << INT32_C(3));
}

static int32_t meth_otr_GC_getRegionCount() {
    return ((int32_t) ((uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]) / (int64_t) INT32_C(1024)) + INT32_C(1));
}

static int32_t meth_otr_GC_alloc(int32_t _size) {
    int32_t _current;
    int32_t _next;
    _current = *((int32_t *) &wasm_heap[INT32_C(928) + 0]);
    _next = (_current + _size);
    if ((int32_t) ((uint32_t) (_next + INT32_C(8)) >= (uint32_t) *((int32_t *) &wasm_heap[INT32_C(924) + 0]))) {
        meth_otr_GC_getNextChunk(_size);
        _current = *((int32_t *) &wasm_heap[INT32_C(928) + 0]);
        _next = (_current + _size);
    }
    *((int32_t *) &wasm_heap[INT32_C(928) + 0]) = _next;
    *((int32_t *) &wasm_heap[INT32_C(944) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(944) + 0]) - _size);
    return _current;
}

static void meth_otr_GC_getNextChunk(int32_t _size) {
    if (meth_otr_GC_getNextChunkIfPossible(_size)) {
        return;
    }
    meth_otr_GC_collectGarbageImpl(_size);
    if ((meth_otr_GC_hasAvailableMemory(_size) == INT32_C(0))) {
        meth_otr_GC_collectGarbageFullImpl(_size);
        if ((meth_otr_GC_hasAvailableMemory(_size) == INT32_C(0))) {
            meth_otr_ExceptionHandling_printStack();
            meth_otbw_WasmRuntime_printOutOfMemory();
            assert(0);
        }
    }
}

static int32_t meth_otr_GC_hasAvailableMemory(int32_t _size) {
    int32_t tmp_0;
    if ((*((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + 4]) == _size)) {
        tmp_0 = INT32_C(0);
        goto block_0;
    }
    int32_t tmp_1;
    if ((*((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + 4]) > (_size + INT32_C(8)))) {
        tmp_1 = INT32_C(0);
        goto block_1;
    }
    tmp_1 = (meth_otr_GC_getNextChunkIfPossible(_size) == INT32_C(0));
    block_1: ;
    tmp_0 = tmp_1;
    block_0: ;
    return (tmp_0 ? INT32_C(0) : INT32_C(1));
}

static int32_t meth_otr_GC_getNextChunkIfPossible(int32_t _size) {
    int32_t localVar1;
    block_2: do {
        if ((int32_t) ((uint32_t) *((int32_t *) &wasm_heap[INT32_C(928) + 0]) < (uint32_t) *((int32_t *) &wasm_heap[INT32_C(924) + 0]))) {
            *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + 0]) = INT32_C(0);
            *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + 4]) = (int32_t) ((uint64_t) *((int32_t *) &wasm_heap[INT32_C(924) + 0]) - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(928) + 0]));
        }
        localVar1 = (*((int32_t *) &wasm_heap[INT32_C(936) + 0]) - INT32_C(1));
        *((int32_t *) &wasm_heap[INT32_C(936) + 0]) = localVar1;
        if ((localVar1 == INT32_C(0))) {
            goto block_0;
        }
        *((int32_t *) &wasm_heap[INT32_C(932) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(932) + 0]) + (INT32_C(1) * INT32_C(4)));
        *((int32_t *) &wasm_heap[INT32_C(928) + 0]) = *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(932) + 0]) + 0]);
        if ((*((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + 4]) >= (_size + INT32_C(8)))) {
            goto block_1;
        }
        if ((*((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + 4]) == _size)) {
            goto block_1;
        }
        *((int32_t *) &wasm_heap[INT32_C(944) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(944) + 0]) - *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + 4]));
        goto block_2;
    } while(0);
    block_0: ;
    return INT32_C(0);
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(924) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + 4]));
    return INT32_C(1);
}

void teavm_gc_collect() {
    teavm_gc_fixHeap();
    meth_otr_GC_collectGarbageImpl(INT32_C(0));
}

void teavm_gc_collectFull() {
    teavm_gc_fixHeap();
    meth_otr_GC_collectGarbageFullImpl(INT32_C(0));
}

static void meth_otr_GC_collectGarbageFullImpl(int32_t _size) {
    meth_otr_GC_triggerFullGC();
    meth_otr_GC_collectGarbageImpl(_size);
}

static void meth_otr_GC_triggerFullGC() {
    int32_t _regionsCount;
    wasm_heap[INT32_C(960) + 0] = INT32_C(1);
    _regionsCount = meth_otr_GC_getRegionCount();
    meth_otbw_WasmRuntime_fill(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]), INT32_C(0), meth_otr_GC_getRegionCount());
    meth_otbw_WasmRuntime_fill(*((int32_t *) &wasm_heap[INT32_C(3980) + 0]), INT32_C(0), (_regionsCount * INT32_C(2)));
}

static void meth_otr_GC_collectGarbageImpl(int32_t _size) {
    int64_t _minRequestedSize;
    int32_t _youngGCLimit;
    int32_t localVar3;
    meth_otr_GC_doCollectGarbage();
    _minRequestedSize = INT64_C(0);
    if ((meth_otr_GC_hasAvailableChunk(_size) == INT32_C(0))) {
        _minRequestedSize = meth_otr_GC_computeMinRequestedSize(_size);
    }
    if ((int32_t) (int8_t) wasm_heap[INT32_C(960) + 0]) {
        *((int32_t *) &wasm_heap[INT32_C(964) + 0]) = INT32_C(0);
    } else {
        _youngGCLimit = ((INT32_C(0) == INT32_C(0)) ? INT32_C(8) : INT32_C(2));
        localVar3 = (*((int32_t *) &wasm_heap[INT32_C(964) + 0]) + INT32_C(1));
        *((int32_t *) &wasm_heap[INT32_C(964) + 0]) = localVar3;
        int32_t tmp_0;
        if ((localVar3 < _youngGCLimit)) {
            tmp_0 = INT32_C(0);
            goto block_0;
        }
        tmp_0 = meth_otr_GC_isAboutToExpand(_minRequestedSize);
        block_0: ;
        if (tmp_0) {
            meth_otr_GC_triggerFullGC();
            meth_otr_GC_doCollectGarbage();
            *((int32_t *) &wasm_heap[INT32_C(964) + 0]) = INT32_C(0);
        }
    }
    wasm_heap[INT32_C(960) + 0] = INT32_C(0);
    meth_otr_GC_resizeHeapIfNecessary(_minRequestedSize);
    *((int32_t *) &wasm_heap[INT32_C(928) + 0]) = *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(932) + 0]) + 0]);
    *((int32_t *) &wasm_heap[INT32_C(924) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + 4]));
    meth_otbw_WasmRuntime_fill(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]), INT32_C(1), meth_otr_GC_getRegionCount());
}

static void meth_otr_GC_doCollectGarbage() {
    if (((int32_t) (int8_t) wasm_heap[INT32_C(960) + 0] == INT32_C(0))) {
        meth_otr_GC_storeGapsInCardTable();
    }
    meth_otr_GC_mark();
    meth_otr_GC_processReferences();
    meth_otr_GC_sweep();
    meth_otr_GC_defragment();
    meth_otr_GC_updateFreeMemory();
    *((int32_t *) &wasm_heap[INT32_C(940) + 0]) = *((int32_t *) &wasm_heap[INT32_C(936) + 0]);
}

static int32_t meth_otr_GC_hasAvailableChunk(int32_t _size) {
    int32_t _ptr;
    int32_t _i;
    if ((_size == INT32_C(0))) {
        return INT32_C(1);
    }
    _ptr = *((int32_t *) &wasm_heap[INT32_C(932) + 0]);
    _i = INT32_C(0);
    block_2: do {
        if ((_i >= *((int32_t *) &wasm_heap[INT32_C(936) + 0]))) {
            goto block_0;
        }
        if ((_size == *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_ptr + 0]) + 4]))) {
            goto block_1;
        }
        if (((_size + INT32_C(8)) <= *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_ptr + 0]) + 4]))) {
            goto block_1;
        }
        _ptr = (_ptr + (INT32_C(1) * INT32_C(4)));
        _i = (_i + INT32_C(1));
        goto block_2;
    } while(0);
    block_0: ;
    return INT32_C(0);
    block_1: ;
    return INT32_C(1);
}

static int64_t meth_otr_GC_computeMinRequestedSize(int32_t _size) {
    if ((*((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(952) + 0]) + 0]) == INT32_C(0))) {
        _size = (_size - *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(952) + 0]) + 4]));
    }
    return ((uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]) + (int64_t) _size);
}

void teavm_gc_fixHeap() {
    if ((*((int32_t *) &wasm_heap[INT32_C(936) + 0]) > INT32_C(0))) {
        *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + 0]) = INT32_C(0);
        *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + 4]) = (int32_t) ((uint64_t) *((int32_t *) &wasm_heap[INT32_C(924) + 0]) - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(928) + 0]));
    }
}

void teavm_gc_tryShrink() {
    int64_t _availableBytes;
    _availableBytes = (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]);
    if (((_availableBytes - (int64_t) *((int32_t *) &wasm_heap[INT32_C(944) + 0])) < (_availableBytes / INT64_C(4)))) {
        teavm_gc_collectFull();
    }
}

static void meth_otr_GC_mark() {
    *((int32_t *) &wasm_heap[INT32_C(948) + 0]) = INT32_C(0);
    meth_otr_GC_markFromStaticFields();
    meth_otr_GC_markFromClasses();
    meth_otr_GC_markFromStack();
    if (((int32_t) (int8_t) wasm_heap[INT32_C(960) + 0] == INT32_C(0))) {
        meth_otr_GC_markFromOldGeneration();
    }
}

static void meth_otr_GC_markFromStaticFields() {
    int32_t _staticRoots;
    int32_t _staticCount;
    int32_t localVar2;
    int32_t localVar3;
    int32_t _object;
    _staticRoots = INT32_C(24224);
    _staticCount = *((int32_t *) &wasm_heap[_staticRoots + 0]);
    localVar2 = (_staticRoots + INT32_C(4));
    block_1: do {
        localVar3 = (_staticCount + INT32_C(-1));
        if ((_staticCount <= INT32_C(0))) {
            goto block_0;
        }
        _object = *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[localVar2 + 0]) + 0]);
        if ((_object != INT32_C(0))) {
            meth_otr_GC_mark_0(_object);
        }
        localVar2 = (localVar2 + INT32_C(4));
        _staticCount = localVar3;
        goto block_1;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_markFromClasses() {
    int32_t _classCount;
    int32_t _classPtr;
    int32_t _i;
    int32_t _cls;
    _classCount = INT32_C(66);
    _classPtr = INT32_C(24320);
    _i = INT32_C(0);
    block_1: do {
        if ((_i >= _classCount)) {
            goto block_0;
        }
        _cls = *((int32_t *) &wasm_heap[_classPtr + 0]);
        if ((*((int32_t *) &wasm_heap[_cls + 80]) != INT32_C(0))) {
            meth_otr_GC_mark_0(*((int32_t *) &wasm_heap[_cls + 80]));
        }
        if ((*((int32_t *) &wasm_heap[_cls + 84]) != INT32_C(0))) {
            meth_otr_GC_mark_0(*((int32_t *) &wasm_heap[_cls + 84]));
        }
        if ((*((int32_t *) &wasm_heap[_cls + 28]) != INT32_C(0))) {
            meth_otr_GC_mark_0(*((int32_t *) &wasm_heap[_cls + 28]));
        }
        _classPtr = (_classPtr + INT32_C(4));
        _i = (_i + INT32_C(1));
        goto block_1;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_markFromStack() {
    int32_t _stackRoots;
    int32_t _count;
    int32_t _stackRootsPtr;
    int32_t localVar3;
    _stackRoots = meth_otbw_WasmRuntime_getStackTop();
    block_3: do {
        if ((_stackRoots == INT32_C(0))) {
            goto block_0;
        }
        _count = meth_otbw_WasmRuntime_getStackRootCount(_stackRoots);
        _stackRootsPtr = meth_otbw_WasmRuntime_getStackRootPointer(_stackRoots);
        block_2: do {
            localVar3 = (_count + INT32_C(-1));
            if ((_count <= INT32_C(0))) {
                goto block_1;
            }
            meth_otr_GC_mark_0(*((int32_t *) &wasm_heap[_stackRootsPtr + 0]));
            _stackRootsPtr = (_stackRootsPtr + INT32_C(4));
            _count = localVar3;
            goto block_2;
        } while(0);
        block_1: ;
        _stackRoots = meth_otbw_WasmRuntime_getNextStackFrame(_stackRoots);
        goto block_3;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_markFromOldGeneration() {
    int32_t _regionsCount;
    int32_t _regionSize;
    int32_t _cardPtr;
    int32_t _regionPtr;
    int32_t _regionIndex;
    int32_t _i;
    _regionsCount = meth_otr_GC_getRegionCount();
    _regionSize = INT32_C(1024);
    _cardPtr = *((int32_t *) &wasm_heap[INT32_C(3992) + 0]);
    _regionPtr = *((int32_t *) &wasm_heap[INT32_C(3996) + 0]);
    _regionIndex = INT32_C(0);
    block_3: do {
        if ((_regionIndex >= (_regionsCount - INT32_C(3)))) {
            goto block_0;
        }
        if (((*((int32_t *) &wasm_heap[_cardPtr + 0]) & INT32_C(16843009)) != INT32_C(16843009))) {
            _i = INT32_C(0);
            block_2: do {
                if ((_i >= INT32_C(4))) {
                    goto block_1;
                }
                if ((((int32_t) (int8_t) wasm_heap[(_cardPtr + _i) + 0] & INT32_C(1)) == INT32_C(0))) {
                    meth_otr_GC_markFromRegion((_regionIndex + _i));
                }
                _i = (_i + INT32_C(1));
                goto block_2;
            } while(0);
        }
        block_1: ;
        _cardPtr = (_cardPtr + INT32_C(4));
        _regionPtr = (_regionPtr + (INT32_C(4) * _regionSize));
        _regionIndex = (_regionIndex + INT32_C(4));
        goto block_3;
    } while(0);
    block_0: ;
    block_5: do {
        if ((_regionIndex >= _regionsCount)) {
            goto block_4;
        }
        if ((((int32_t) (int8_t) wasm_heap[_cardPtr + 0] & INT32_C(1)) == INT32_C(0))) {
            meth_otr_GC_markFromRegion(_regionIndex);
        }
        _cardPtr = (_cardPtr + INT32_C(1));
        _regionIndex = (_regionIndex + INT32_C(1));
        goto block_5;
    } while(0);
    block_4: ;
}

static void meth_otr_GC_markFromRegion(int32_t _regionIndex) {
    int32_t _card;
    int32_t _regionOffset;
    int32_t localVar3;
    int32_t _regionSize;
    int32_t _regionStart;
    int32_t _regionEnd;
    int32_t _object;
    int32_t _heapLimit;
    int32_t _objectMarked;
    int32_t _header;
    _card = (*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + _regionIndex);
    _regionOffset = (int32_t) *((int16_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (_regionIndex * INT32_C(2))) + 0]);
    if ((_regionOffset == INT32_C(0))) {
        wasm_heap[_card + 0] = ((((int32_t) (int8_t) wasm_heap[_card + 0] | INT32_C(1)) << INT32_C(24)) >> INT32_C(24));
        return;
    }
    localVar3 = (_regionOffset + INT32_C(-1));
    _regionSize = INT32_C(1024);
    _regionStart = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (_regionIndex * _regionSize));
    _regionEnd = (_regionStart + _regionSize);
    _object = (_regionStart + localVar3);
    _heapLimit = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]));
    if ((int32_t) ((uint32_t) _heapLimit >= (uint32_t) _regionEnd)) {
        _heapLimit = _regionEnd;
    }
    _objectMarked = INT32_C(0);
    block_2: do {
        if ((int32_t) ((uint32_t) _object >= (uint32_t) _heapLimit)) {
            goto block_0;
        }
        _header = *((int32_t *) &wasm_heap[_object + 0]);
        int32_t tmp_0;
        if ((_header == INT32_C(0))) {
            tmp_0 = INT32_C(0);
            goto block_1;
        }
        tmp_0 = (_header & INT32_C(1073741824));
        block_1: ;
        if (tmp_0) {
            _objectMarked = (_objectMarked | meth_otr_GC_doMarkOldGeneration(_object));
        }
        _object = (_object + meth_otr_GC_objectSize(_object));
        goto block_2;
    } while(0);
    block_0: ;
    if ((_objectMarked == INT32_C(0))) {
        wasm_heap[_card + 0] = ((((int32_t) (int8_t) wasm_heap[_card + 0] | INT32_C(1)) << INT32_C(24)) >> INT32_C(24));
    }
}

static void meth_otr_GC_mark_0(int32_t _object) {
    int32_t tmp_0;
    if ((_object == INT32_C(0))) {
        tmp_0 = INT32_C(0);
        goto block_0;
    }
    tmp_0 = (meth_otr_GC_isMarked(_object) == INT32_C(0));
    block_0: ;
    if (tmp_0) {
        meth_otr_MarkQueue_init();
        meth_otr_GC_enqueueMark(_object);
        meth_otr_GC_doProcessMarkQueue();
        return;
    }
}

static int32_t meth_otr_GC_doMarkOldGeneration(int32_t _object) {
    int32_t _hasObjectsFromYoungGen;
    meth_otr_MarkQueue_init();
    _hasObjectsFromYoungGen = meth_otr_GC_markObjectData(_object);
    meth_otr_GC_doProcessMarkQueue();
    return _hasObjectsFromYoungGen;
}

static void meth_otr_GC_doProcessMarkQueue() {
    int32_t _object;
    int64_t _offset;
    int32_t _region;
    int32_t _relativeOffset;
    int32_t _cardTableItem;
    block_2: do {
        if ((meth_otr_MarkQueue_isEmpty() != INT32_C(0))) {
            goto block_0;
        }
        _object = meth_otr_MarkQueue_dequeue();
        _offset = ((uint64_t) _object - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0]));
        _region = (*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + ((int32_t) (_offset / (int64_t) INT32_C(1024)) * INT32_C(2)));
        _relativeOffset = (((int32_t) ((_offset % (int64_t) INT32_C(1024)) + INT64_C(1)) << INT32_C(16)) >> INT32_C(16));
        int32_t tmp_0;
        if (((int32_t) *((int16_t *) &wasm_heap[_region + 0]) == INT32_C(0))) {
            tmp_0 = INT32_C(0);
            goto block_1;
        }
        tmp_0 = ((int32_t) *((int16_t *) &wasm_heap[_region + 0]) <= _relativeOffset);
        block_1: ;
        if ((tmp_0 == INT32_C(0))) {
            *((int16_t *) &wasm_heap[_region + 0]) = _relativeOffset;
        }
        _cardTableItem = (*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + (uint32_t) (_offset / (int64_t) INT32_C(1024)));
        wasm_heap[_cardTableItem + 0] = ((((int32_t) (int8_t) wasm_heap[_cardTableItem + 0] | INT32_C(2)) << INT32_C(24)) >> INT32_C(24));
        meth_otr_GC_markObjectData(_object);
        goto block_2;
    } while(0);
    block_0: ;
}

static int32_t meth_otr_GC_markObjectData(int32_t _object) {
    int32_t _cls;
    _cls = meth_otr_RuntimeClass_getClass(_object);
    if ((*((int32_t *) &wasm_heap[_cls + 32]) == INT32_C(0))) {
        return meth_otr_GC_markObject(_cls, _object);
    }
    return meth_otr_GC_markArray(_cls, _object);
}

static int32_t meth_otr_GC_markObject(int32_t _cls, int32_t _object) {
    int32_t _hasObjectsFromYoungGen;
    _hasObjectsFromYoungGen = INT32_C(0);
    block_5: do {
        if ((_cls == INT32_C(0))) {
            goto block_0;
        }
        switch ((((*((int32_t *) &wasm_heap[_cls + 12]) >> INT32_C(7)) & INT32_C(7)) - INT32_C(1))) {
            case 0: goto block_1;
            case 1: goto block_2;
            default: goto block_3;
        }
        block_1: ;
        _hasObjectsFromYoungGen = (_hasObjectsFromYoungGen | meth_otr_GC_markWeakReference(_object));
        goto block_4;
        block_2: ;
        _hasObjectsFromYoungGen = (_hasObjectsFromYoungGen | meth_otr_GC_markReferenceQueue(_object));
        goto block_4;
        block_3: ;
        _hasObjectsFromYoungGen = (_hasObjectsFromYoungGen | meth_otr_GC_markFields(_cls, _object));
        block_4: ;
        _cls = *((int32_t *) &wasm_heap[_cls + 56]);
        goto block_5;
    } while(0);
    block_0: ;
    return _hasObjectsFromYoungGen;
}

static int32_t meth_otr_GC_markWeakReference(int32_t _object) {
    int32_t _hasObjectsFromYoungGen;
    _hasObjectsFromYoungGen = INT32_C(0);
    if ((*((int32_t *) &wasm_heap[_object + 8]) != INT32_C(0))) {
        _hasObjectsFromYoungGen = (_hasObjectsFromYoungGen | meth_otr_GC_enqueueMark(*((int32_t *) &wasm_heap[_object + 8])));
        int32_t tmp_0;
        if ((*((int32_t *) &wasm_heap[_object + 16]) == INT32_C(0))) {
            tmp_0 = INT32_C(0);
            goto block_0;
        }
        tmp_0 = (*((int32_t *) &wasm_heap[_object + 12]) != INT32_C(0));
        block_0: ;
        if (tmp_0) {
            _hasObjectsFromYoungGen = (_hasObjectsFromYoungGen | meth_otr_GC_enqueueMark(*((int32_t *) &wasm_heap[_object + 12])));
        }
    }
    if ((*((int32_t *) &wasm_heap[_object + 16]) != INT32_C(0))) {
        _hasObjectsFromYoungGen = (_hasObjectsFromYoungGen | meth_otr_GC_enqueueMark(*((int32_t *) &wasm_heap[_object + 16])));
    } else {
        if ((*((int32_t *) &wasm_heap[_object + 12]) != INT32_C(0))) {
            *((int32_t *) &wasm_heap[_object + 16]) = *((int32_t *) &wasm_heap[INT32_C(948) + 0]);
            *((int32_t *) &wasm_heap[INT32_C(948) + 0]) = _object;
        }
    }
    return _hasObjectsFromYoungGen;
}

static int32_t meth_otr_GC_markReferenceQueue(int32_t _object) {
    int32_t _reference;
    int32_t _hasObjectsFromYoungGen;
    _reference = *((int32_t *) &wasm_heap[_object + 8]);
    _hasObjectsFromYoungGen = INT32_C(0);
    if ((_reference != INT32_C(0))) {
        _hasObjectsFromYoungGen = (_hasObjectsFromYoungGen | meth_otr_GC_enqueueMark(_reference));
    }
    return _hasObjectsFromYoungGen;
}

static int32_t meth_otr_GC_markFields(int32_t _cls, int32_t _object) {
    int32_t _layout;
    int32_t _hasObjectsFromYoungGen;
    int32_t _fieldCount;
    int32_t _fieldCount1;
    int32_t _fieldOffset;
    _layout = *((int32_t *) &wasm_heap[_cls + 72]);
    if ((_layout == INT32_C(0))) {
        return INT32_C(0);
    }
    _hasObjectsFromYoungGen = INT32_C(0);
    _fieldCount = (int32_t) *((int16_t *) &wasm_heap[_layout + 0]);
    block_1: do {
        _fieldCount1 = (((_fieldCount - INT32_C(1)) << INT32_C(16)) >> INT32_C(16));
        if ((_fieldCount <= INT32_C(0))) {
            goto block_0;
        }
        _layout = (_layout + INT32_C(2));
        _fieldOffset = (int32_t) *((int16_t *) &wasm_heap[_layout + 0]);
        _hasObjectsFromYoungGen = (_hasObjectsFromYoungGen | meth_otr_GC_enqueueMark(*((int32_t *) &wasm_heap[(_object + _fieldOffset) + 0])));
        _fieldCount = _fieldCount1;
        goto block_1;
    } while(0);
    block_0: ;
    return _hasObjectsFromYoungGen;
}

static int32_t meth_otr_GC_markArray(int32_t _cls, int32_t _array) {
    int32_t _base;
    int32_t _hasObjectsFromYoungGen;
    int32_t _i;
    if ((*((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_cls + 32]) + 12]) & INT32_C(2))) {
        return INT32_C(0);
    }
    _base = meth_otbw_WasmRuntime_align((_array + (INT32_C(1) * INT32_C(12))), INT32_C(4));
    _hasObjectsFromYoungGen = INT32_C(0);
    _i = INT32_C(0);
    block_1: do {
        if ((_i >= *((int32_t *) &wasm_heap[_array + 8]))) {
            goto block_0;
        }
        _hasObjectsFromYoungGen = (_hasObjectsFromYoungGen | meth_otr_GC_enqueueMark(*((int32_t *) &wasm_heap[_base + 0])));
        _base = (_base + INT32_C(4));
        _i = (_i + INT32_C(1));
        goto block_1;
    } while(0);
    block_0: ;
    return _hasObjectsFromYoungGen;
}

static int32_t meth_otr_GC_enqueueMark(int32_t _object) {
    if ((_object == INT32_C(0))) {
        return INT32_C(0);
    }
    if ((meth_otr_GC_isMarked(_object) == INT32_C(0))) {
        meth_otr_GC_doEnqueueMark(_object);
        return INT32_C(1);
    }
    return ((*((int32_t *) &wasm_heap[_object + 0]) & INT32_C(1073741824)) ? INT32_C(0) : INT32_C(1));
}

static void meth_otr_GC_doEnqueueMark(int32_t _object) {
    if (((int32_t) (int8_t) wasm_heap[INT32_C(960) + 0] == INT32_C(0))) {
        *((int32_t *) &wasm_heap[_object + 0]) = (*((int32_t *) &wasm_heap[_object + 0]) | INT32_C(-2147483648));
    } else {
        *((int32_t *) &wasm_heap[_object + 0]) = (*((int32_t *) &wasm_heap[_object + 0]) | INT32_C(-1073741824));
    }
    meth_otr_MarkQueue_enqueue(_object);
}

static void meth_otr_GC_processReferences() {
    int32_t _reference;
    int32_t _reference1;
    int32_t _queue;
    _reference = *((int32_t *) &wasm_heap[INT32_C(948) + 0]);
    block_1: do {
        if ((_reference == INT32_C(0))) {
            goto block_0;
        }
        _reference1 = *((int32_t *) &wasm_heap[_reference + 16]);
        *((int32_t *) &wasm_heap[_reference + 16]) = INT32_C(0);
        if ((meth_otr_GC_isMarked(*((int32_t *) &wasm_heap[_reference + 12])) == INT32_C(0))) {
            *((int32_t *) &wasm_heap[_reference + 12]) = INT32_C(0);
            _queue = *((int32_t *) &wasm_heap[_reference + 8]);
            if ((_queue != INT32_C(0))) {
                if ((*((int32_t *) &wasm_heap[_queue + 8]) == INT32_C(0))) {
                    *((int32_t *) &wasm_heap[_queue + 8]) = _reference;
                } else {
                    *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_queue + 12]) + 16]) = _reference;
                    meth_otr_GC_makeInvalid(*((int32_t *) &wasm_heap[_queue + 12]));
                }
                *((int32_t *) &wasm_heap[_queue + 12]) = _reference;
                meth_otr_GC_makeInvalid(_queue);
            }
        }
        _reference = _reference1;
        goto block_1;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_makeInvalid(int32_t _object) {
    int64_t _offset;
    int32_t _cardTableItem;
    _offset = ((uint64_t) _object - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0]));
    _cardTableItem = (*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + (uint32_t) (_offset / (int64_t) INT32_C(1024)));
    wasm_heap[_cardTableItem + 0] = ((((int32_t) (int8_t) wasm_heap[_cardTableItem + 0] & INT32_C(-2)) << INT32_C(24)) >> INT32_C(24));
}

static void meth_otr_GC_sweep() {
    int32_t _object;
    int32_t _lastFreeSpace;
    int64_t _heapSize;
    int32_t _regionsCount;
    int32_t _currentRegionEnd;
    int32_t _limit;
    int32_t _tag;
    int32_t _free;
    int32_t _currentRegionIndex;
    int32_t _currentRegion;
    int32_t localVar10;
    int32_t _newRegionStart;
    int32_t localVar12;
    int32_t _size;
    *((int32_t *) &wasm_heap[INT32_C(932) + 0]) = *((int32_t *) &wasm_heap[INT32_C(3972) + 0]);
    *((int32_t *) &wasm_heap[INT32_C(936) + 0]) = INT32_C(0);
    *((int32_t *) &wasm_heap[INT32_C(940) + 0]) = INT32_C(0);
    _object = *((int32_t *) &wasm_heap[INT32_C(3996) + 0]);
    _lastFreeSpace = INT32_C(0);
    _heapSize = (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]);
    _regionsCount = meth_otr_GC_getRegionCount();
    _currentRegionEnd = INT32_C(0);
    _limit = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) _heapSize);
    block_7: do {
        if ((int32_t) ((uint32_t) _object >= (uint32_t) _limit)) {
            goto block_0;
        }
        _tag = *((int32_t *) &wasm_heap[_object + 0]);
        if ((_tag == INT32_C(0))) {
            _free = INT32_C(1);
        } else {
            _free = ((_tag & INT32_C(-2147483648)) ? INT32_C(0) : INT32_C(1));
            int32_t tmp_0;
            if ((_free == INT32_C(0))) {
                tmp_0 = INT32_C(0);
                goto block_1;
            }
            int32_t tmp_1;
            if (((int32_t) (int8_t) wasm_heap[INT32_C(960) + 0] != INT32_C(0))) {
                tmp_1 = INT32_C(0);
                goto block_2;
            }
            tmp_1 = (_tag & INT32_C(1073741824));
            block_2: ;
            tmp_0 = tmp_1;
            block_1: ;
            if (tmp_0) {
                _free = INT32_C(0);
            }
            if ((_free == INT32_C(0))) {
                _tag = (_tag & INT32_C(2147483647));
            }
            *((int32_t *) &wasm_heap[_object + 0]) = _tag;
        }
        if (_free) {
            if ((_lastFreeSpace == INT32_C(0))) {
                _lastFreeSpace = _object;
            }
            if ((int32_t) ((uint32_t) _object < (uint32_t) _currentRegionEnd)) {
                goto block_3;
            }
            _currentRegionIndex = (int32_t) (((uint64_t) _object - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / (int64_t) INT32_C(1024));
            _currentRegion = (*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (_currentRegionIndex * INT32_C(2)));
            _currentRegionEnd = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + ((_currentRegionIndex + INT32_C(1)) * INT32_C(1024)));
            if ((int32_t) *((int16_t *) &wasm_heap[_currentRegion + 0])) {
                goto block_3;
            }
            block_6: do {
                _currentRegionIndex = (_currentRegionIndex + INT32_C(1));
                if ((_currentRegionIndex == _regionsCount)) {
                    _object = _limit;
                    goto block_4;
                }
                localVar10 = (*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (_currentRegionIndex * INT32_C(2)));
                if ((int32_t) *((int16_t *) &wasm_heap[localVar10 + 0])) {
                    goto block_5;
                }
                goto block_6;
            } while(0);
            block_5: ;
            _newRegionStart = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (_currentRegionIndex * INT32_C(1024)));
            _object = (_newRegionStart + ((int32_t) *((int16_t *) &wasm_heap[localVar10 + 0]) - INT32_C(1)));
            _currentRegionEnd = (_newRegionStart + INT32_C(1024));
            goto block_7;
        }
        if ((_lastFreeSpace != INT32_C(0))) {
            meth_otr_GC_freeMemory(_lastFreeSpace, _object);
            _lastFreeSpace = INT32_C(0);
        }
        if ((int32_t) ((uint32_t) _object >= (uint32_t) _currentRegionEnd)) {
            _currentRegionIndex = (int32_t) (((uint64_t) _object - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / (int64_t) INT32_C(1024));
            _currentRegionEnd = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + ((_currentRegionIndex + INT32_C(1)) * INT32_C(1024)));
            int32_t tmp_2;
            if (((int32_t) (int8_t) wasm_heap[INT32_C(960) + 0] != INT32_C(0))) {
                tmp_2 = INT32_C(0);
                goto block_8;
            }
            int32_t tmp_3;
            if ((((int32_t) (int8_t) wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + _currentRegionIndex) + 0] & INT32_C(2)) != INT32_C(0))) {
                tmp_3 = INT32_C(0);
                goto block_9;
            }
            tmp_3 = (((int32_t) (int8_t) wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + _currentRegionIndex) + 0] & INT32_C(4)) == INT32_C(0));
            block_9: ;
            tmp_2 = tmp_3;
            block_8: ;
            if (tmp_2) {
                block_12: do {
                    _currentRegionIndex = (_currentRegionIndex + INT32_C(1));
                    if ((_currentRegionIndex == _regionsCount)) {
                        goto block_10;
                    }
                    if (((int32_t) *((int16_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (_currentRegionIndex * INT32_C(2))) + 0]) == INT32_C(0))) {
                        goto block_11;
                    }
                    if (((int32_t) (int8_t) wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + _currentRegionIndex) + 0] & INT32_C(2))) {
                        goto block_11;
                    }
                    if (((int32_t) (int8_t) wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + _currentRegionIndex) + 0] & INT32_C(4))) {
                        goto block_11;
                    }
                    goto block_12;
                } while(0);
                block_10: ;
                block_11: ;
                localVar12 = (_currentRegionIndex + INT32_C(-1));
                _currentRegion = (*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (localVar12 * INT32_C(2)));
                _newRegionStart = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (localVar12 * INT32_C(1024)));
                localVar10 = (_newRegionStart + ((int32_t) *((int16_t *) &wasm_heap[_currentRegion + 0]) - INT32_C(1)));
                _currentRegionEnd = (_newRegionStart + INT32_C(1024));
                if ((int32_t) ((uint32_t) _object < (uint32_t) localVar10)) {
                    _object = localVar10;
                    goto block_7;
                }
                _object = localVar10;
            }
        }
        block_3: ;
        _size = meth_otr_GC_objectSize(_object);
        _object = (_object + _size);
        goto block_7;
    } while(0);
    block_0: ;
    block_4: ;
    if ((_lastFreeSpace != INT32_C(0))) {
        meth_otr_GC_freeMemory(_lastFreeSpace, _object);
    }
    *((int32_t *) &wasm_heap[INT32_C(932) + 0]) = *((int32_t *) &wasm_heap[INT32_C(3972) + 0]);
}

static void meth_otr_GC_storeGapsInCardTable() {
    int32_t _i;
    int32_t _freeChunkStart;
    int64_t _freeChunkOffset;
    int64_t _freeChunkEndOffset;
    int32_t _region;
    int32_t _endRegion;
    int32_t _card;
    _i = INT32_C(0);
    block_3: do {
        if ((_i >= *((int32_t *) &wasm_heap[INT32_C(940) + 0]))) {
            goto block_0;
        }
        _freeChunkStart = *((int32_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3972) + 0]) + (_i * INT32_C(4))) + 0]);
        _freeChunkOffset = ((uint64_t) _freeChunkStart - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0]));
        _freeChunkEndOffset = (_freeChunkOffset + (int64_t) *((int32_t *) &wasm_heap[_freeChunkStart + 4]));
        _region = (int32_t) (_freeChunkOffset / (int64_t) INT32_C(1024));
        _endRegion = (int32_t) (_freeChunkEndOffset / (int64_t) INT32_C(1024));
        block_2: do {
            if ((_region > _endRegion)) {
                goto block_1;
            }
            _card = (*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + _region);
            wasm_heap[_card + 0] = ((((int32_t) (int8_t) wasm_heap[_card + 0] | INT32_C(4)) << INT32_C(24)) >> INT32_C(24));
            _region = (_region + INT32_C(1));
            goto block_2;
        } while(0);
        block_1: ;
        _i = (_i + INT32_C(1));
        goto block_3;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_clearGapsFromCardTable() {
    int32_t _regionsCount;
    int32_t _cardPtr;
    int32_t _regionIndex;
    _regionsCount = meth_otr_GC_getRegionCount();
    _cardPtr = *((int32_t *) &wasm_heap[INT32_C(3992) + 0]);
    _regionIndex = INT32_C(0);
    block_1: do {
        if ((_regionIndex >= (_regionsCount - INT32_C(3)))) {
            goto block_0;
        }
        *((int32_t *) &wasm_heap[_cardPtr + 0]) = (*((int32_t *) &wasm_heap[_cardPtr + 0]) & INT32_C(-67372037));
        _cardPtr = (_cardPtr + INT32_C(4));
        _regionIndex = (_regionIndex + INT32_C(4));
        goto block_1;
    } while(0);
    block_0: ;
    block_3: do {
        if ((_regionIndex >= _regionsCount)) {
            goto block_2;
        }
        wasm_heap[_cardPtr + 0] = ((((int32_t) (int8_t) wasm_heap[_cardPtr + 0] & INT32_C(-5)) << INT32_C(24)) >> INT32_C(24));
        _cardPtr = (_cardPtr + INT32_C(1));
        _regionIndex = (_regionIndex + INT32_C(1));
        goto block_3;
    } while(0);
    block_2: ;
}

static void meth_otr_GC_freeMemory(int32_t _from, int32_t _to) {
    *((int32_t *) &wasm_heap[_from + 0]) = INT32_C(0);
    *((int32_t *) &wasm_heap[_from + 4]) = (int32_t) ((uint64_t) _to - (uint64_t) _from);
    *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(932) + 0]) + 0]) = _from;
    *((int32_t *) &wasm_heap[INT32_C(932) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(932) + 0]) + (INT32_C(1) * INT32_C(4)));
    *((int32_t *) &wasm_heap[INT32_C(936) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(936) + 0]) + INT32_C(1));
    *((int32_t *) &wasm_heap[INT32_C(940) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(940) + 0]) + INT32_C(1));
}

static void meth_otr_GC_defragment() {
    meth_otr_GC_clearGapsFromCardTable();
    meth_otr_GC_storeGapsInCardTable();
    meth_otr_GC_markStackRoots();
    meth_otr_GC_moveNonRelocatableObjectsToOldGeneration();
    meth_otr_GC_calculateRelocationTargets();
    meth_otr_GC_updatePointersFromStaticRoots();
    meth_otr_GC_updatePointersFromClasses();
    meth_otr_GC_updatePointersFromObjects();
    meth_otr_GC_restoreObjectHeaders();
    meth_otr_GC_relocateObjects();
    meth_otr_GC_putNewFreeChunks();
}

static void meth_otr_GC_markStackRoots() {
    int32_t _relocationThreshold;
    int32_t _stackRoots;
    int32_t _count;
    int32_t _stackRootsPtr;
    int32_t localVar4;
    int32_t _obj;
    _relocationThreshold = *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(932) + 0]) + 0]);
    _stackRoots = meth_otbw_WasmRuntime_getStackTop();
    block_5: do {
        if ((_stackRoots == INT32_C(0))) {
            goto block_0;
        }
        _count = meth_otbw_WasmRuntime_getStackRootCount(_stackRoots);
        _stackRootsPtr = meth_otbw_WasmRuntime_getStackRootPointer(_stackRoots);
        block_4: do {
            localVar4 = (_count + INT32_C(-1));
            if ((_count <= INT32_C(0))) {
                goto block_1;
            }
            _obj = *((int32_t *) &wasm_heap[_stackRootsPtr + 0]);
            int32_t tmp_0;
            if ((int32_t) ((uint32_t) _obj < (uint32_t) _relocationThreshold)) {
                tmp_0 = INT32_C(0);
                goto block_2;
            }
            int32_t tmp_1;
            if (((int32_t) (int8_t) wasm_heap[INT32_C(960) + 0] != INT32_C(0))) {
                tmp_1 = INT32_C(0);
                goto block_3;
            }
            tmp_1 = (*((int32_t *) &wasm_heap[_obj + 0]) & INT32_C(1073741824));
            block_3: ;
            tmp_0 = (tmp_1 == INT32_C(0));
            block_2: ;
            if (tmp_0) {
                *((int32_t *) &wasm_heap[_obj + 0]) = (*((int32_t *) &wasm_heap[_obj + 0]) | INT32_C(-2147483648));
            }
            _stackRootsPtr = (_stackRootsPtr + INT32_C(4));
            _count = localVar4;
            goto block_4;
        } while(0);
        block_1: ;
        _stackRoots = meth_otbw_WasmRuntime_getNextStackFrame(_stackRoots);
        goto block_5;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_moveNonRelocatableObjectsToOldGeneration() {
    int32_t _limitAddress;
    int64_t _limit;
    int32_t _region;
    _limitAddress = *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(932) + 0]) + 0]);
    _limit = ((uint64_t) _limitAddress - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0]));
    _region = INT32_C(0);
    block_1: do {
        if ((((int64_t) _region * (int64_t) INT32_C(1024)) >= _limit)) {
            goto block_0;
        }
        if (((int32_t) (int8_t) wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + _region) + 0] & INT32_C(2))) {
            meth_otr_GC_moveObjectsToOldGenerationInRegion(_region, _limitAddress);
        }
        _region = (_region + INT32_C(1));
        goto block_1;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_moveObjectsToOldGenerationInRegion(int32_t _region, int32_t _limit) {
    int32_t _regionOffset;
    int32_t _regionSize;
    int32_t _regionStart;
    int32_t _regionEnd;
    int32_t _object;
    int32_t _classRef;
    int32_t _size;
    _regionOffset = ((int32_t) *((int16_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (_region * INT32_C(2))) + 0]) - INT32_C(1));
    _regionSize = INT32_C(1024);
    _regionStart = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (_region * _regionSize));
    _regionEnd = (_regionStart + _regionSize);
    _object = (_regionStart + _regionOffset);
    if ((int32_t) ((uint32_t) _limit >= (uint32_t) _regionEnd)) {
        _limit = _regionEnd;
    }
    block_2: do {
        if ((int32_t) ((uint32_t) _object >= (uint32_t) _limit)) {
            goto block_0;
        }
        _classRef = *((int32_t *) &wasm_heap[_object + 0]);
        int32_t tmp_0;
        if ((_classRef == INT32_C(0))) {
            tmp_0 = INT32_C(0);
            goto block_1;
        }
        tmp_0 = ((_classRef & INT32_C(1073741824)) == INT32_C(0));
        block_1: ;
        if (tmp_0) {
            *((int32_t *) &wasm_heap[_object + 0]) = (_classRef | INT32_C(1073741824));
        }
        _size = meth_otr_GC_objectSize(_object);
        _object = (_object + _size);
        goto block_2;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_calculateRelocationTargets() {
    int32_t _limit;
    int32_t _freeChunkPointer;
    int32_t _freeChunks;
    int32_t _freeChunk;
    int32_t _object;
    int32_t _relocationBlock;
    int32_t _relocationTarget;
    int32_t _countInCurrentRelocationBlock;
    int32_t _relocations;
    int32_t _relocationsLimit;
    int32_t _currentRegionEnd;
    int32_t _lastWasLocked;
    int32_t localVar12;
    int32_t _size;
    int32_t _nextRelocationTarget;
    int32_t _shouldRelocateObject;
    int32_t _nextRelocationBlock;
    int32_t localVar17;
    int32_t _relocation;
    int64_t _targetAddress;
    int32_t _region;
    int32_t _card;
    int32_t _card1;
    int32_t localVar23;
    int32_t localVar24;
    int32_t _offset;
    _limit = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]));
    _freeChunkPointer = *((int32_t *) &wasm_heap[INT32_C(932) + 0]);
    _freeChunks = *((int32_t *) &wasm_heap[INT32_C(936) + 0]);
    _freeChunk = *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(932) + 0]) + 0]);
    _object = (_freeChunk + *((int32_t *) &wasm_heap[_freeChunk + 4]));
    _relocationBlock = (*((int32_t *) &wasm_heap[INT32_C(932) + 0]) + (_freeChunks * INT32_C(4)));
    _relocationTarget = _freeChunk;
    *((int32_t *) &wasm_heap[_relocationBlock + 4]) = _relocationTarget;
    *((int32_t *) &wasm_heap[_relocationBlock + 8]) = _limit;
    *((int32_t *) &wasm_heap[_relocationBlock + 0]) = INT32_C(0);
    _countInCurrentRelocationBlock = INT32_C(0);
    _relocations = (_freeChunk + (INT32_C(1) * INT32_C(8)));
    _relocationsLimit = (_freeChunk + *((int32_t *) &wasm_heap[_freeChunk + 4]));
    _currentRegionEnd = INT32_C(0);
    *((int32_t *) &wasm_heap[INT32_C(952) + 0]) = *((int32_t *) &wasm_heap[INT32_C(3996) + 0]);
    _lastWasLocked = INT32_C(0);
    localVar12 = _relocationBlock;
    block_12: do {
        if ((int32_t) ((uint32_t) _object >= (uint32_t) _limit)) {
            goto block_0;
        }
        _size = meth_otr_GC_objectSize(_object);
        if ((*((int32_t *) &wasm_heap[_object + 0]) == INT32_C(0))) {
            _lastWasLocked = INT32_C(0);
        } else {
            _nextRelocationTarget = INT32_C(0);
            _shouldRelocateObject = meth_otr_GC_shouldRelocateObject(_object);
            *((int32_t *) &wasm_heap[_object + 0]) = (*((int32_t *) &wasm_heap[_object + 0]) | INT32_C(1073741824));
            if (_shouldRelocateObject) {
                block_3: do {
                    _nextRelocationTarget = (_relocationTarget + _size);
                    if ((_nextRelocationTarget == *((int32_t *) &wasm_heap[localVar12 + 8]))) {
                        goto block_1;
                    }
                    if ((int32_t) ((uint32_t) (_nextRelocationTarget + INT32_C(7)) < (uint32_t) *((int32_t *) &wasm_heap[localVar12 + 8]))) {
                        goto block_2;
                    }
                    _nextRelocationBlock = (localVar12 + (INT32_C(1) * INT32_C(12)));
                    if ((*((int32_t *) &wasm_heap[_nextRelocationBlock + 4]) == _object)) {
                        _shouldRelocateObject = INT32_C(0);
                        goto block_2;
                    }
                    *((int32_t *) &wasm_heap[localVar12 + 0]) = _countInCurrentRelocationBlock;
                    _countInCurrentRelocationBlock = INT32_C(0);
                    _relocationTarget = *((int32_t *) &wasm_heap[_nextRelocationBlock + 4]);
                    localVar12 = _nextRelocationBlock;
                    goto block_3;
                } while(0);
                block_1: ;
            }
            block_2: ;
            if (_shouldRelocateObject) {
                _lastWasLocked = INT32_C(0);
                block_6: do {
                    if ((int32_t) ((uint32_t) (_relocations + INT32_C(12)) < (uint32_t) _relocationsLimit)) {
                        goto block_4;
                    }
                    _freeChunks = (_freeChunks + INT32_C(-1));
                    if ((_freeChunks == INT32_C(0))) {
                        *((int32_t *) &wasm_heap[_relocationBlock + 8]) = _object;
                        goto block_5;
                    }
                    _freeChunkPointer = (_freeChunkPointer + (INT32_C(1) * INT32_C(4)));
                    localVar17 = *((int32_t *) &wasm_heap[_freeChunkPointer + 0]);
                    _relocations = (localVar17 + (INT32_C(1) * INT32_C(8)));
                    _relocationsLimit = (localVar17 + *((int32_t *) &wasm_heap[localVar17 + 4]));
                    goto block_6;
                } while(0);
                block_4: ;
                _relocation = _relocations;
                *((int32_t *) &wasm_heap[_relocation + 0]) = *((int32_t *) &wasm_heap[_object + 0]);
                *((int32_t *) &wasm_heap[_relocation + 4]) = *((int32_t *) &wasm_heap[_object + 4]);
                *((int32_t *) &wasm_heap[_relocation + 8]) = _relocationTarget;
                _countInCurrentRelocationBlock = (_countInCurrentRelocationBlock + INT32_C(1));
                _relocations = (_relocations + INT32_C(12));
                _targetAddress = (uint64_t) _relocation;
                *((int32_t *) &wasm_heap[_object + 0]) = ((int32_t) (int64_t) ((uint64_t) _targetAddress >> (uint64_t) INT32_C(33)) | INT32_C(-2147483648));
                *((int32_t *) &wasm_heap[_object + 4]) = (int32_t) (_targetAddress >> (uint64_t) INT32_C(1));
                _region = (int32_t) (((uint64_t) _object - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / (int64_t) INT32_C(1024));
                _card = (*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + _region);
                wasm_heap[_card + 0] = ((((int32_t) (int8_t) wasm_heap[_card + 0] | INT32_C(8)) << INT32_C(24)) >> INT32_C(24));
                _relocationTarget = _nextRelocationTarget;
            } else {
                if ((_lastWasLocked == INT32_C(0))) {
                    *((int32_t *) &wasm_heap[_relocationBlock + 8]) = _object;
                    _relocationBlock = (_relocationBlock + (INT32_C(1) * INT32_C(12)));
                    *((int32_t *) &wasm_heap[_relocationBlock + 8]) = _limit;
                    _lastWasLocked = INT32_C(1);
                }
                int32_t tmp_0;
                if (((int32_t) (int8_t) wasm_heap[INT32_C(960) + 0] != INT32_C(0))) {
                    tmp_0 = INT32_C(0);
                    goto block_7;
                }
                tmp_0 = (int32_t) ((uint32_t) _object >= (uint32_t) _currentRegionEnd);
                block_7: ;
                if (tmp_0) {
                    _region = (int32_t) (((uint64_t) _object - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / (int64_t) INT32_C(1024));
                    _currentRegionEnd = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) ((int64_t) INT32_C(1024) * (int64_t) (_region + INT32_C(1))));
                    _card1 = (int32_t) (int8_t) wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + _region) + 0];
                    int32_t tmp_1;
                    if (((_card1 & INT32_C(2)) != INT32_C(0))) {
                        tmp_1 = INT32_C(0);
                        goto block_8;
                    }
                    tmp_1 = ((_card1 & INT32_C(4)) == INT32_C(0));
                    block_8: ;
                    if (tmp_1) {
                        block_11: do {
                            _region = (_region + INT32_C(1));
                            localVar23 = (int32_t) (int8_t) wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + _region) + 0];
                            if ((localVar23 & INT32_C(2))) {
                                goto block_9;
                            }
                            if ((localVar23 & INT32_C(4))) {
                                goto block_9;
                            }
                            if (((int32_t) *((int16_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (_region * INT32_C(2))) + 0]) == INT32_C(0))) {
                                goto block_10;
                            }
                            goto block_11;
                        } while(0);
                        block_10: ;
                        block_9: ;
                        localVar24 = (_region + INT32_C(-1));
                        _currentRegionEnd = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) ((int64_t) INT32_C(1024) * (int64_t) (localVar24 + INT32_C(1))));
                        _offset = ((int32_t) *((int16_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (localVar24 * INT32_C(2))) + 0]) - INT32_C(1));
                        _object = ((*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) ((int64_t) INT32_C(1024) * (int64_t) localVar24)) + _offset);
                        _size = meth_otr_GC_objectSize(_object);
                    }
                }
                *((int32_t *) &wasm_heap[_relocationBlock + 4]) = (_object + _size);
                *((int32_t *) &wasm_heap[_relocationBlock + 0]) = INT32_C(0);
                *((int32_t *) &wasm_heap[_object + 0]) = (*((int32_t *) &wasm_heap[_object + 0]) & INT32_C(2147483647));
                *((int32_t *) &wasm_heap[INT32_C(952) + 0]) = _object;
            }
        }
        _object = (_object + _size);
        goto block_12;
    } while(0);
    block_0: ;
    block_5: ;
    *((int32_t *) &wasm_heap[localVar12 + 0]) = _countInCurrentRelocationBlock;
    block_14: do {
        if ((int32_t) ((uint32_t) _object >= (uint32_t) _limit)) {
            goto block_13;
        }
        _size = meth_otr_GC_objectSize(_object);
        if (*((int32_t *) &wasm_heap[_object + 0])) {
            *((int32_t *) &wasm_heap[_object + 0]) = ((*((int32_t *) &wasm_heap[_object + 0]) & INT32_C(2147483647)) | INT32_C(1073741824));
        } else {
            _relocationBlock = (_relocationBlock + (INT32_C(1) * INT32_C(12)));
            *((int32_t *) &wasm_heap[_relocationBlock + 4]) = _object;
            *((int32_t *) &wasm_heap[_relocationBlock + 0]) = INT32_C(0);
            *((int32_t *) &wasm_heap[_relocationBlock + 8]) = (*((int32_t *) &wasm_heap[_relocationBlock + 4]) + _size);
        }
        _object = (_object + _size);
        goto block_14;
    } while(0);
    block_13: ;
    *((int32_t *) &wasm_heap[INT32_C(956) + 0]) = _relocationBlock;
}

static int32_t meth_otr_GC_shouldRelocateObject(int32_t _object) {
    int32_t localVar1;
    if (((*((int32_t *) &wasm_heap[_object + 0]) & INT32_C(-2147483648)) == INT32_C(0))) {
        if ((int32_t) (int8_t) wasm_heap[INT32_C(960) + 0]) {
            goto block_0;
        }
        if (((*((int32_t *) &wasm_heap[_object + 0]) & INT32_C(1073741824)) == INT32_C(0))) {
            goto block_0;
        }
    }
    localVar1 = INT32_C(0);
    goto block_1;
    block_0: ;
    localVar1 = INT32_C(1);
    block_1: ;
    return localVar1;
}

static void meth_otr_GC_updatePointersFromStaticRoots() {
    int32_t _staticRoots;
    int32_t _staticCount;
    int32_t localVar2;
    int32_t localVar3;
    int32_t _staticRoot;
    _staticRoots = INT32_C(24224);
    _staticCount = *((int32_t *) &wasm_heap[_staticRoots + 0]);
    localVar2 = (_staticRoots + INT32_C(4));
    block_1: do {
        localVar3 = (_staticCount + INT32_C(-1));
        if ((_staticCount <= INT32_C(0))) {
            goto block_0;
        }
        _staticRoot = *((int32_t *) &wasm_heap[localVar2 + 0]);
        *((int32_t *) &wasm_heap[_staticRoot + 0]) = meth_otr_GC_updatePointer(*((int32_t *) &wasm_heap[_staticRoot + 0]));
        localVar2 = (localVar2 + INT32_C(4));
        _staticCount = localVar3;
        goto block_1;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_updatePointersFromClasses() {
    int32_t _classCount;
    int32_t _classPtr;
    int32_t _i;
    int32_t _cls;
    _classCount = INT32_C(66);
    _classPtr = INT32_C(24320);
    _i = INT32_C(0);
    block_1: do {
        if ((_i >= _classCount)) {
            goto block_0;
        }
        _cls = *((int32_t *) &wasm_heap[_classPtr + 0]);
        if ((*((int32_t *) &wasm_heap[_cls + 80]) != INT32_C(0))) {
            *((int32_t *) &wasm_heap[_cls + 80]) = meth_otr_GC_updatePointer(*((int32_t *) &wasm_heap[_cls + 80]));
        }
        if ((*((int32_t *) &wasm_heap[_cls + 84]) != INT32_C(0))) {
            *((int32_t *) &wasm_heap[_cls + 84]) = meth_otr_GC_updatePointer(*((int32_t *) &wasm_heap[_cls + 84]));
        }
        if ((*((int32_t *) &wasm_heap[_cls + 28]) != INT32_C(0))) {
            *((int32_t *) &wasm_heap[_cls + 28]) = meth_otr_GC_updatePointer(*((int32_t *) &wasm_heap[_cls + 28]));
        }
        _classPtr = (_classPtr + INT32_C(4));
        _i = (_i + INT32_C(1));
        goto block_1;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_updatePointersFromObjects() {
    if (((int32_t) (int8_t) wasm_heap[INT32_C(960) + 0] == INT32_C(0))) {
        meth_otr_GC_updatePointersFromObjectsYoung();
    } else {
        meth_otr_GC_updatePointersFromObjectsFull();
    }
}

static void meth_otr_GC_updatePointersFromObjectsFull() {
    int32_t _limit;
    int32_t _object;
    int32_t _classRef;
    int32_t _size;
    int32_t _relocation;
    int32_t _cls;
    int32_t _realObject;
    _limit = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]));
    _object = *((int32_t *) &wasm_heap[INT32_C(3996) + 0]);
    block_1: do {
        if ((int32_t) ((uint32_t) _object >= (uint32_t) _limit)) {
            goto block_0;
        }
        _classRef = *((int32_t *) &wasm_heap[_object + 0]);
        if ((_classRef == INT32_C(0))) {
            _size = *((int32_t *) &wasm_heap[_object + 4]);
        } else {
            _relocation = meth_otr_GC_getRelocation(_object);
            if ((_relocation != INT32_C(0))) {
                _classRef = *((int32_t *) &wasm_heap[_relocation + 0]);
            }
            _cls = (_classRef << INT32_C(3));
            _realObject = _object;
            meth_otr_GC_updatePointers(_cls, _realObject);
            _size = meth_otr_GC_objectSize_0(_realObject, _cls);
        }
        _object = (_object + _size);
        goto block_1;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_updatePointersFromObjectsYoung() {
    int32_t _regionsCount;
    int32_t _regionSize;
    int32_t _cardPtr;
    int32_t _regionPtr;
    int32_t _regionIndex;
    int32_t _n;
    int32_t _i;
    int32_t localVar7;
    _regionsCount = meth_otr_GC_getRegionCount();
    _regionSize = INT32_C(1024);
    _cardPtr = *((int32_t *) &wasm_heap[INT32_C(3992) + 0]);
    _regionPtr = *((int32_t *) &wasm_heap[INT32_C(3996) + 0]);
    _regionIndex = INT32_C(0);
    block_5: do {
        if ((_regionIndex >= (_regionsCount - INT32_C(3)))) {
            goto block_0;
        }
        _n = *((int32_t *) &wasm_heap[_cardPtr + 0]);
        int32_t tmp_0;
        if (((_n & INT32_C(16843009)) != INT32_C(16843009))) {
            tmp_0 = INT32_C(0);
            goto block_1;
        }
        tmp_0 = ((_n & INT32_C(33686018)) == INT32_C(0));
        block_1: ;
        if ((tmp_0 == INT32_C(0))) {
            _i = INT32_C(0);
            block_4: do {
                if ((_i >= INT32_C(4))) {
                    goto block_2;
                }
                localVar7 = (int32_t) (int8_t) wasm_heap[(_cardPtr + _i) + 0];
                int32_t tmp_1;
                if (((localVar7 & INT32_C(1)) == INT32_C(0))) {
                    tmp_1 = INT32_C(0);
                    goto block_3;
                }
                tmp_1 = ((localVar7 & INT32_C(2)) == INT32_C(0));
                block_3: ;
                if ((tmp_1 == INT32_C(0))) {
                    meth_otr_GC_updatePointersFromRegion((_regionIndex + _i));
                }
                _i = (_i + INT32_C(1));
                goto block_4;
            } while(0);
        }
        block_2: ;
        _cardPtr = (_cardPtr + INT32_C(4));
        _regionPtr = (_regionPtr + (INT32_C(4) * _regionSize));
        _regionIndex = (_regionIndex + INT32_C(4));
        goto block_5;
    } while(0);
    block_0: ;
    block_8: do {
        if ((_regionIndex >= _regionsCount)) {
            goto block_6;
        }
        _n = (int32_t) (int8_t) wasm_heap[_cardPtr + 0];
        int32_t tmp_2;
        if (((_n & INT32_C(1)) == INT32_C(0))) {
            tmp_2 = INT32_C(0);
            goto block_7;
        }
        tmp_2 = ((_n & INT32_C(2)) == INT32_C(0));
        block_7: ;
        if ((tmp_2 == INT32_C(0))) {
            meth_otr_GC_updatePointersFromRegion(_regionIndex);
        }
        _cardPtr = (_cardPtr + INT32_C(1));
        _regionIndex = (_regionIndex + INT32_C(1));
        goto block_8;
    } while(0);
    block_6: ;
}

static void meth_otr_GC_updatePointersFromRegion(int32_t _regionIndex) {
    int32_t _regionOffset;
    int32_t _regionSize;
    int32_t _regionStart;
    int32_t _regionEnd;
    int32_t _object;
    int32_t _heapLimit;
    int32_t _classRef;
    int32_t _size;
    int32_t _relocation;
    int32_t _cls;
    _regionOffset = ((int32_t) *((int16_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (_regionIndex * INT32_C(2))) + 0]) - INT32_C(1));
    if ((_regionOffset < INT32_C(0))) {
        return;
    }
    _regionSize = INT32_C(1024);
    _regionStart = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (_regionIndex * _regionSize));
    _regionEnd = (_regionStart + _regionSize);
    _object = (_regionStart + _regionOffset);
    _heapLimit = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]));
    if ((int32_t) ((uint32_t) _heapLimit >= (uint32_t) _regionEnd)) {
        _heapLimit = _regionEnd;
    }
    block_1: do {
        if ((int32_t) ((uint32_t) _object >= (uint32_t) _heapLimit)) {
            goto block_0;
        }
        _classRef = *((int32_t *) &wasm_heap[_object + 0]);
        if ((_classRef == INT32_C(0))) {
            _size = *((int32_t *) &wasm_heap[_object + 4]);
        } else {
            _relocation = meth_otr_GC_getRelocation(_object);
            if ((_relocation != INT32_C(0))) {
                _classRef = *((int32_t *) &wasm_heap[_relocation + 0]);
            }
            _cls = (_classRef << INT32_C(3));
            meth_otr_GC_updatePointers(_cls, _object);
            _size = meth_otr_GC_objectSize_0(_object, _cls);
        }
        _object = (_object + _size);
        goto block_1;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_updatePointers(int32_t _cls, int32_t _object) {
    if ((*((int32_t *) &wasm_heap[_cls + 32]) == INT32_C(0))) {
        meth_otr_GC_updatePointersInObject(_cls, _object);
    } else {
        meth_otr_GC_updatePointersInArray(_cls, _object);
    }
}

static void meth_otr_GC_updatePointersInObject(int32_t _cls, int32_t _object) {
    block_5: do {
        if ((_cls == INT32_C(0))) {
            goto block_0;
        }
        switch ((((*((int32_t *) &wasm_heap[_cls + 12]) >> INT32_C(7)) & INT32_C(7)) - INT32_C(1))) {
            case 0: goto block_1;
            case 1: goto block_2;
            default: goto block_3;
        }
        block_1: ;
        meth_otr_GC_updatePointersInWeakReference(_object);
        goto block_4;
        block_2: ;
        meth_otr_GC_updatePointersInReferenceQueue(_object);
        goto block_4;
        block_3: ;
        meth_otr_GC_updatePointersInFields(_cls, _object);
        block_4: ;
        _cls = *((int32_t *) &wasm_heap[_cls + 56]);
        goto block_5;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_updatePointersInWeakReference(int32_t _object) {
    *((int32_t *) &wasm_heap[_object + 8]) = meth_otr_GC_updatePointer(*((int32_t *) &wasm_heap[_object + 8]));
    *((int32_t *) &wasm_heap[_object + 16]) = meth_otr_GC_updatePointer(*((int32_t *) &wasm_heap[_object + 16]));
    *((int32_t *) &wasm_heap[_object + 12]) = meth_otr_GC_updatePointer(*((int32_t *) &wasm_heap[_object + 12]));
}

static void meth_otr_GC_updatePointersInReferenceQueue(int32_t _object) {
    *((int32_t *) &wasm_heap[_object + 8]) = meth_otr_GC_updatePointer(*((int32_t *) &wasm_heap[_object + 8]));
    *((int32_t *) &wasm_heap[_object + 12]) = meth_otr_GC_updatePointer(*((int32_t *) &wasm_heap[_object + 12]));
}

static void meth_otr_GC_updatePointersInFields(int32_t _cls, int32_t _object) {
    int32_t _layout;
    int32_t _fieldCount;
    int32_t _fieldCount1;
    int32_t _fieldOffset;
    int32_t _referenceHolder;
    _layout = *((int32_t *) &wasm_heap[_cls + 72]);
    if ((_layout != INT32_C(0))) {
        _fieldCount = (int32_t) *((int16_t *) &wasm_heap[_layout + 0]);
        block_1: do {
            _fieldCount1 = (((_fieldCount - INT32_C(1)) << INT32_C(16)) >> INT32_C(16));
            if ((_fieldCount <= INT32_C(0))) {
                goto block_0;
            }
            _layout = (_layout + INT32_C(2));
            _fieldOffset = (int32_t) *((int16_t *) &wasm_heap[_layout + 0]);
            _referenceHolder = (_object + _fieldOffset);
            *((int32_t *) &wasm_heap[_referenceHolder + 0]) = meth_otr_GC_updatePointer(*((int32_t *) &wasm_heap[_referenceHolder + 0]));
            _fieldCount = _fieldCount1;
            goto block_1;
        } while(0);
    }
    block_0: ;
}

static void meth_otr_GC_updatePointersInArray(int32_t _cls, int32_t _array) {
    int32_t _base;
    int32_t _size;
    int32_t _i;
    if ((*((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_cls + 32]) + 12]) & INT32_C(2))) {
        return;
    }
    _base = meth_otbw_WasmRuntime_align((_array + (INT32_C(1) * INT32_C(12))), INT32_C(4));
    _size = *((int32_t *) &wasm_heap[_array + 8]);
    _i = INT32_C(0);
    block_1: do {
        if ((_i >= _size)) {
            goto block_0;
        }
        *((int32_t *) &wasm_heap[_base + 0]) = meth_otr_GC_updatePointer(*((int32_t *) &wasm_heap[_base + 0]));
        _base = (_base + INT32_C(4));
        _i = (_i + INT32_C(1));
        goto block_1;
    } while(0);
    block_0: ;
}

static int32_t meth_otr_GC_updatePointer(int32_t _address) {
    int32_t _relocation;
    if ((_address == INT32_C(0))) {
        return INT32_C(0);
    }
    _relocation = meth_otr_GC_getRelocation(_address);
    if ((_relocation != INT32_C(0))) {
        _address = *((int32_t *) &wasm_heap[_relocation + 8]);
    }
    return _address;
}

static int32_t meth_otr_GC_getRelocation(int32_t _address) {
    int32_t _obj;
    int32_t tmp_0;
    if ((int32_t) ((uint32_t) _address < (uint32_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0]))) {
        tmp_0 = INT32_C(0);
        goto block_0;
    }
    tmp_0 = (int32_t) ((uint32_t) _address < (uint32_t) (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0])));
    block_0: ;
    if (tmp_0) {
        _obj = _address;
        if (((*((int32_t *) &wasm_heap[_obj + 0]) & INT32_C(-2147483648)) == INT32_C(0))) {
            return INT32_C(0);
        }
        return (uint32_t) ((((int64_t) *((int32_t *) &wasm_heap[_obj + 0]) & INT64_C(4294967295)) << (uint64_t) INT32_C(33)) | (((int64_t) *((int32_t *) &wasm_heap[_obj + 4]) & INT64_C(4294967295)) << (uint64_t) INT32_C(1)));
    }
    return INT32_C(0);
}

static void meth_otr_GC_restoreObjectHeaders() {
    int32_t _regionsCount;
    int32_t _cardPtr;
    int32_t _limit;
    int32_t _regionIndex;
    int32_t _i;
    _regionsCount = meth_otr_GC_getRegionCount();
    _cardPtr = *((int32_t *) &wasm_heap[INT32_C(3992) + 0]);
    _limit = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]));
    _regionIndex = INT32_C(0);
    block_3: do {
        if ((_regionIndex >= (_regionsCount - INT32_C(3)))) {
            goto block_0;
        }
        if ((*((int32_t *) &wasm_heap[_cardPtr + 0]) & INT32_C(134744072))) {
            _i = INT32_C(0);
            block_2: do {
                if ((_i >= INT32_C(4))) {
                    goto block_1;
                }
                if (((int32_t) (int8_t) wasm_heap[(_cardPtr + _i) + 0] & INT32_C(8))) {
                    meth_otr_GC_restoreObjectHeadersInRegion((_regionIndex + _i), _limit);
                }
                _i = (_i + INT32_C(1));
                goto block_2;
            } while(0);
        }
        block_1: ;
        _cardPtr = (_cardPtr + INT32_C(4));
        _regionIndex = (_regionIndex + INT32_C(4));
        goto block_3;
    } while(0);
    block_0: ;
    block_5: do {
        if ((_regionIndex >= _regionsCount)) {
            goto block_4;
        }
        if (((int32_t) (int8_t) wasm_heap[_cardPtr + 0] & INT32_C(8))) {
            meth_otr_GC_restoreObjectHeadersInRegion(_regionIndex, _limit);
        }
        _cardPtr = (_cardPtr + INT32_C(1));
        _regionIndex = (_regionIndex + INT32_C(1));
        goto block_5;
    } while(0);
    block_4: ;
}

static void meth_otr_GC_restoreObjectHeadersInRegion(int32_t _region, int32_t _limit) {
    int32_t _regionOffset;
    int32_t _regionSize;
    int32_t _regionStart;
    int32_t _regionEnd;
    int32_t _object;
    _regionOffset = ((int32_t) *((int16_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (_region * INT32_C(2))) + 0]) - INT32_C(1));
    _regionSize = INT32_C(1024);
    _regionStart = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (_region * _regionSize));
    _regionEnd = (_regionStart + _regionSize);
    _object = (_regionStart + _regionOffset);
    if ((int32_t) ((uint32_t) _limit >= (uint32_t) _regionEnd)) {
        _limit = _regionEnd;
    }
    meth_otr_GC_restoreObjectHeadersInRange(_object, _limit);
}

static void meth_otr_GC_restoreObjectHeadersInRange(int32_t _object, int32_t _limit) {
    int32_t _relocation;
    int32_t _size;
    block_1: do {
        if ((int32_t) ((uint32_t) _object >= (uint32_t) _limit)) {
            goto block_0;
        }
        _relocation = meth_otr_GC_getRelocation(_object);
        if ((_relocation != INT32_C(0))) {
            *((int32_t *) &wasm_heap[_object + 0]) = (*((int32_t *) &wasm_heap[_relocation + 0]) | INT32_C(-2147483648));
            *((int32_t *) &wasm_heap[_object + 4]) = *((int32_t *) &wasm_heap[_relocation + 4]);
        }
        _size = meth_otr_GC_objectSize(_object);
        _object = (_object + _size);
        goto block_1;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_relocateObjects() {
    int32_t _limit;
    int32_t _freeChunks;
    int32_t _freeChunk;
    int32_t _object;
    int32_t _relocationBlock;
    int32_t _countInRelocationBlock;
    int32_t _relocationTarget;
    int32_t _blockTarget;
    int32_t _blockSource;
    int32_t _blockSize;
    int32_t _currentRegionEnd;
    int32_t _regionCount;
    int32_t _size;
    int32_t _region;
    int32_t _card;
    int32_t localVar15;
    int32_t localVar16;
    int32_t _offset;
    _limit = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]));
    _freeChunks = *((int32_t *) &wasm_heap[INT32_C(936) + 0]);
    _freeChunk = *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(932) + 0]) + 0]);
    _object = (_freeChunk + *((int32_t *) &wasm_heap[_freeChunk + 4]));
    _relocationBlock = (*((int32_t *) &wasm_heap[INT32_C(932) + 0]) + (_freeChunks * INT32_C(4)));
    _countInRelocationBlock = *((int32_t *) &wasm_heap[_relocationBlock + 0]);
    _relocationTarget = *((int32_t *) &wasm_heap[_relocationBlock + 4]);
    _blockTarget = INT32_C(0);
    _blockSource = INT32_C(0);
    _blockSize = INT32_C(0);
    _currentRegionEnd = INT32_C(0);
    _regionCount = meth_otr_GC_getRegionCount();
    block_8: do {
        if ((int32_t) ((uint32_t) _object >= (uint32_t) _limit)) {
            goto block_0;
        }
        _size = meth_otr_GC_objectSize(_object);
        if ((*((int32_t *) &wasm_heap[_object + 0]) & INT32_C(-2147483648))) {
            *((int32_t *) &wasm_heap[_object + 0]) = (*((int32_t *) &wasm_heap[_object + 0]) & INT32_C(2147483647));
            block_2: do {
                if ((_countInRelocationBlock != INT32_C(0))) {
                    goto block_1;
                }
                if (_blockSize) {
                    meth_otr_GC_moveMemoryBlock(_blockSource, _blockTarget, _blockSize);
                    _blockSource = INT32_C(0);
                    _blockSize = INT32_C(0);
                }
                *((int32_t *) &wasm_heap[_relocationBlock + 4]) = _relocationTarget;
                _relocationBlock = (_relocationBlock + (INT32_C(1) * INT32_C(12)));
                _countInRelocationBlock = *((int32_t *) &wasm_heap[_relocationBlock + 0]);
                _relocationTarget = *((int32_t *) &wasm_heap[_relocationBlock + 4]);
                goto block_2;
            } while(0);
            block_1: ;
            if ((_blockSource == INT32_C(0))) {
                _blockSource = _object;
                _blockTarget = _relocationTarget;
            }
            _relocationTarget = (_relocationTarget + _size);
            _blockSize = (_blockSize + _size);
            _countInRelocationBlock = (_countInRelocationBlock + INT32_C(-1));
        } else {
            if ((_blockSource != INT32_C(0))) {
                meth_otr_GC_moveMemoryBlock(_blockSource, _blockTarget, _blockSize);
                _blockSource = INT32_C(0);
                _blockSize = INT32_C(0);
            }
            int32_t tmp_0;
            if ((*((int32_t *) &wasm_heap[_object + 0]) == INT32_C(0))) {
                tmp_0 = INT32_C(0);
                goto block_3;
            }
            tmp_0 = (int32_t) ((uint32_t) _object >= (uint32_t) _currentRegionEnd);
            block_3: ;
            if (tmp_0) {
                _region = (int32_t) (((uint64_t) _object - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / (int64_t) INT32_C(1024));
                _currentRegionEnd = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) ((int64_t) INT32_C(1024) * (int64_t) (_region + INT32_C(1))));
                _card = (int32_t) (int8_t) wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + _region) + 0];
                int32_t tmp_1;
                if (((_card & INT32_C(8)) != INT32_C(0))) {
                    tmp_1 = INT32_C(0);
                    goto block_4;
                }
                tmp_1 = ((_card & INT32_C(4)) == INT32_C(0));
                block_4: ;
                if (tmp_1) {
                    block_7: do {
                        _region = (_region + INT32_C(1));
                        if ((_region >= _regionCount)) {
                            goto block_5;
                        }
                        localVar15 = (int32_t) (int8_t) wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + _region) + 0];
                        if ((localVar15 & INT32_C(8))) {
                            goto block_5;
                        }
                        if ((localVar15 & INT32_C(4))) {
                            goto block_5;
                        }
                        if (((int32_t) *((int16_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (_region * INT32_C(2))) + 0]) == INT32_C(0))) {
                            goto block_6;
                        }
                        goto block_7;
                    } while(0);
                    block_6: ;
                    block_5: ;
                    localVar16 = (_region + INT32_C(-1));
                    _currentRegionEnd = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) ((int64_t) INT32_C(1024) * (int64_t) (localVar16 + INT32_C(1))));
                    _offset = ((int32_t) *((int16_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (localVar16 * INT32_C(2))) + 0]) - INT32_C(1));
                    _object = ((*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) ((int64_t) INT32_C(1024) * (int64_t) localVar16)) + _offset);
                    _size = meth_otr_GC_objectSize(_object);
                }
            }
        }
        _object = (_object + _size);
        goto block_8;
    } while(0);
    block_0: ;
    *((int32_t *) &wasm_heap[_relocationBlock + 4]) = _relocationTarget;
    if ((_blockSource != INT32_C(0))) {
        meth_otr_GC_moveMemoryBlock(_blockSource, _blockTarget, _blockSize);
    }
}

static void meth_otr_GC_moveMemoryBlock(int32_t _blockSource, int32_t _blockTarget, int32_t _blockSize) {
    int64_t _sourceStartOffset;
    int32_t _sourceStartRegionIndex;
    int32_t _sourceStartRegion;
    int32_t _sourceEndRegionIndex;
    int32_t _sourceEndRegion;
    int32_t _i;
    int32_t _heapLimit;
    int32_t _objectAfterSource;
    int32_t localVar11;
    int32_t _object;
    int32_t _blockTargetEnd;
    int32_t _currentRegionEnd;
    int64_t _offset;
    int32_t _regionIndex;
    int32_t _region;
    int32_t _offsetInRegion;
    int32_t _size;
    _sourceStartOffset = ((uint64_t) _blockSource - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0]));
    _sourceStartRegionIndex = (int32_t) (_sourceStartOffset / (int64_t) INT32_C(1024));
    _sourceStartRegion = (*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (_sourceStartRegionIndex * INT32_C(2)));
    _sourceEndRegionIndex = (int32_t) ((_sourceStartOffset + (int64_t) _blockSize) / (int64_t) INT32_C(1024));
    _sourceEndRegion = (*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (_sourceEndRegionIndex * INT32_C(2)));
    int32_t tmp_0;
    if ((_sourceStartRegion == _sourceEndRegion)) {
        tmp_0 = INT32_C(0);
        goto block_0;
    }
    tmp_0 = (((_sourceStartOffset % (int64_t) INT32_C(1024)) + INT64_C(1)) == (int64_t) (int32_t) *((int16_t *) &wasm_heap[_sourceStartRegion + 0]));
    block_0: ;
    if (tmp_0) {
        *((int16_t *) &wasm_heap[_sourceStartRegion + 0]) = INT32_C(0);
    }
    _i = (_sourceStartRegionIndex + INT32_C(1));
    block_2: do {
        if ((_i >= _sourceEndRegionIndex)) {
            goto block_1;
        }
        *((int16_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (_i * INT32_C(2))) + 0]) = INT32_C(0);
        _i = (_i + INT32_C(1));
        goto block_2;
    } while(0);
    block_1: ;
    int32_t tmp_1;
    if ((_sourceStartRegion != _sourceEndRegion)) {
        tmp_1 = INT32_C(0);
        goto block_3;
    }
    tmp_1 = (((_sourceStartOffset % (int64_t) INT32_C(1024)) + INT64_C(1)) != (int64_t) (int32_t) *((int16_t *) &wasm_heap[_sourceStartRegion + 0]));
    block_3: ;
    if ((tmp_1 == INT32_C(0))) {
        _heapLimit = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]));
        _objectAfterSource = (_blockSource + _blockSize);
        if ((int32_t) ((uint32_t) _objectAfterSource >= (uint32_t) _heapLimit)) {
            *((int16_t *) &wasm_heap[_sourceEndRegion + 0]) = INT32_C(0);
        } else {
            if (*((int32_t *) &wasm_heap[_objectAfterSource + 0])) {
                localVar11 = _sourceEndRegionIndex;
            } else {
                _objectAfterSource = (_objectAfterSource + *((int32_t *) &wasm_heap[_objectAfterSource + 4]));
                localVar11 = (int32_t) (((uint64_t) _objectAfterSource - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / (int64_t) INT32_C(1024));
            }
            int32_t tmp_2;
            if ((localVar11 != _sourceEndRegionIndex)) {
                tmp_2 = INT32_C(0);
                goto block_4;
            }
            tmp_2 = (int32_t) ((uint32_t) _objectAfterSource < (uint32_t) _heapLimit);
            block_4: ;
            if (tmp_2) {
                *((int16_t *) &wasm_heap[_sourceEndRegion + 0]) = (((int32_t) ((((uint64_t) _objectAfterSource - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) % (int64_t) INT32_C(1024)) + INT64_C(1)) << INT32_C(16)) >> INT32_C(16));
            } else {
                *((int16_t *) &wasm_heap[_sourceEndRegion + 0]) = INT32_C(0);
            }
        }
    }
    meth_otbw_WasmRuntime_moveMemoryBlock(_blockSource, _blockTarget, _blockSize);
    _object = _blockTarget;
    _blockTargetEnd = (_blockTarget + _blockSize);
    _currentRegionEnd = INT32_C(0);
    block_7: do {
        if ((int32_t) ((uint32_t) _object >= (uint32_t) _blockTargetEnd)) {
            goto block_5;
        }
        if ((int32_t) ((uint32_t) _object >= (uint32_t) _currentRegionEnd)) {
            _offset = ((uint64_t) _object - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0]));
            _regionIndex = (int32_t) (_offset / (int64_t) INT32_C(1024));
            _currentRegionEnd = (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) ((int64_t) INT32_C(1024) * (int64_t) (_regionIndex + INT32_C(1))));
            _region = (*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (_regionIndex * INT32_C(2)));
            _offsetInRegion = (int32_t) (_offset % (int64_t) INT32_C(1024));
            int32_t tmp_3;
            if (((int32_t) *((int16_t *) &wasm_heap[_region + 0]) == INT32_C(0))) {
                tmp_3 = INT32_C(0);
                goto block_6;
            }
            tmp_3 = (((int32_t) *((int16_t *) &wasm_heap[_region + 0]) - INT32_C(1)) <= _offsetInRegion);
            block_6: ;
            if ((tmp_3 == INT32_C(0))) {
                *((int16_t *) &wasm_heap[_region + 0]) = (((_offsetInRegion + INT32_C(1)) << INT32_C(16)) >> INT32_C(16));
            }
        }
        _size = meth_otr_GC_objectSize(_object);
        _object = (_object + _size);
        goto block_7;
    } while(0);
    block_5: ;
}

static void meth_otr_GC_putNewFreeChunks() {
    int32_t _freeChunkPointer;
    int32_t _relocationBlock;
    int32_t _freeChunk;
    _freeChunkPointer = *((int32_t *) &wasm_heap[INT32_C(932) + 0]);
    _relocationBlock = (*((int32_t *) &wasm_heap[INT32_C(932) + 0]) + (*((int32_t *) &wasm_heap[INT32_C(936) + 0]) * INT32_C(4)));
    *((int32_t *) &wasm_heap[INT32_C(936) + 0]) = INT32_C(0);
    block_1: do {
        if ((int32_t) ((uint32_t) *((int32_t *) &wasm_heap[INT32_C(956) + 0]) < (uint32_t) _relocationBlock)) {
            goto block_0;
        }
        if ((int32_t) ((uint32_t) *((int32_t *) &wasm_heap[_relocationBlock + 4]) < (uint32_t) *((int32_t *) &wasm_heap[_relocationBlock + 8]))) {
            _freeChunk = *((int32_t *) &wasm_heap[_relocationBlock + 4]);
            if ((int32_t) ((uint32_t) _freeChunk >= (uint32_t) *((int32_t *) &wasm_heap[INT32_C(952) + 0]))) {
                *((int32_t *) &wasm_heap[INT32_C(952) + 0]) = _freeChunk;
            }
            *((int32_t *) &wasm_heap[_freeChunk + 4]) = (int32_t) ((uint64_t) *((int32_t *) &wasm_heap[_relocationBlock + 8]) - (uint64_t) *((int32_t *) &wasm_heap[_relocationBlock + 4]));
            *((int32_t *) &wasm_heap[_freeChunk + 0]) = INT32_C(0);
            *((int32_t *) &wasm_heap[_freeChunkPointer + 0]) = _freeChunk;
            _freeChunkPointer = (_freeChunkPointer + (INT32_C(1) * INT32_C(4)));
            *((int32_t *) &wasm_heap[INT32_C(936) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(936) + 0]) + INT32_C(1));
        }
        _relocationBlock = (_relocationBlock + (INT32_C(1) * INT32_C(12)));
        goto block_1;
    } while(0);
    block_0: ;
    *((int32_t *) &wasm_heap[INT32_C(940) + 0]) = *((int32_t *) &wasm_heap[INT32_C(936) + 0]);
}

static void meth_otr_GC_updateFreeMemory() {
    int32_t _freeChunkPtr;
    int32_t _i;
    *((int32_t *) &wasm_heap[INT32_C(944) + 0]) = INT32_C(0);
    _freeChunkPtr = *((int32_t *) &wasm_heap[INT32_C(932) + 0]);
    _i = INT32_C(0);
    block_1: do {
        if ((_i >= *((int32_t *) &wasm_heap[INT32_C(936) + 0]))) {
            goto block_0;
        }
        *((int32_t *) &wasm_heap[INT32_C(944) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(944) + 0]) + *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_freeChunkPtr + 0]) + 4]));
        _freeChunkPtr = (_freeChunkPtr + (INT32_C(1) * INT32_C(4)));
        _i = (_i + INT32_C(1));
        goto block_1;
    } while(0);
    block_0: ;
}

static void meth_otr_GC_resizeHeapConsistent(int64_t _newSize) {
    int64_t _oldSize;
    int32_t localVar2;
    int32_t _i;
    int32_t _newRegionCount;
    int32_t localVar5;
    int32_t _size;
    int64_t _minimumSize;
    _oldSize = (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]);
    localVar2 = meth_otbw_WasmRuntime_compare_0(_newSize, _oldSize);
    if ((localVar2 == INT32_C(0))) {
        return;
    }
    if ((localVar2 > INT32_C(0))) {
        _i = meth_otr_GC_getRegionCount();
        meth_otbw_WasmHeap_resizeHeap((uint32_t) _newSize);
        *((int32_t *) &wasm_heap[INT32_C(932) + 0]) = *((int32_t *) &wasm_heap[INT32_C(3972) + 0]);
        _newRegionCount = meth_otr_GC_getRegionCount();
        block_1: do {
            if ((_i >= _newRegionCount)) {
                goto block_0;
            }
            *((int16_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3980) + 0]) + (_i * INT32_C(2))) + 0]) = INT32_C(0);
            _i = (_i + INT32_C(1));
            goto block_1;
        } while(0);
        block_0: ;
        if ((*((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(952) + 0]) + 0]) == INT32_C(0))) {
            localVar5 = *((int32_t *) &wasm_heap[INT32_C(952) + 0]);
            *((int32_t *) &wasm_heap[localVar5 + 4]) = (*((int32_t *) &wasm_heap[localVar5 + 4]) + (int32_t) (_newSize - _oldSize));
        } else {
            _size = meth_otr_GC_objectSize(*((int32_t *) &wasm_heap[INT32_C(952) + 0]));
            *((int32_t *) &wasm_heap[INT32_C(952) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(952) + 0]) + _size);
            *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(952) + 0]) + 0]) = INT32_C(0);
            *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(952) + 0]) + 4]) = (int32_t) (_newSize - _oldSize);
            *((int32_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(932) + 0]) + (*((int32_t *) &wasm_heap[INT32_C(936) + 0]) * INT32_C(4))) + 0]) = *((int32_t *) &wasm_heap[INT32_C(952) + 0]);
            *((int32_t *) &wasm_heap[INT32_C(936) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(936) + 0]) + INT32_C(1));
            *((int32_t *) &wasm_heap[INT32_C(940) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(940) + 0]) + INT32_C(1));
        }
    } else {
        if (INT32_C(0)) {
            _minimumSize = ((uint64_t) *((int32_t *) &wasm_heap[INT32_C(952) + 0]) - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0]));
            if (*((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(952) + 0]) + 0])) {
                _minimumSize = (_minimumSize + (int64_t) meth_otr_GC_objectSize(*((int32_t *) &wasm_heap[INT32_C(952) + 0])));
            }
            if ((_newSize < _minimumSize)) {
                if ((_minimumSize == _oldSize)) {
                    return;
                }
                _newSize = _minimumSize;
            }
            if ((_newSize != _minimumSize)) {
                localVar5 = *((int32_t *) &wasm_heap[INT32_C(952) + 0]);
                *((int32_t *) &wasm_heap[localVar5 + 4]) = (*((int32_t *) &wasm_heap[localVar5 + 4]) - (int32_t) (_oldSize - _newSize));
            } else {
                *((int32_t *) &wasm_heap[INT32_C(936) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(936) + 0]) - INT32_C(1));
                *((int32_t *) &wasm_heap[INT32_C(940) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(940) + 0]) - INT32_C(1));
            }
            meth_otbw_WasmHeap_resizeHeap((uint32_t) _newSize);
            *((int32_t *) &wasm_heap[INT32_C(932) + 0]) = *((int32_t *) &wasm_heap[INT32_C(3972) + 0]);
        }
    }
}

static void meth_otr_GC_resizeHeapIfNecessary(int64_t _requestedSize) {
    int64_t _availableBytes;
    int64_t _occupiedMemory;
    int64_t localVar3;
    int64_t localVar4;
    _availableBytes = (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]);
    _occupiedMemory = (_availableBytes - (int64_t) *((int32_t *) &wasm_heap[INT32_C(944) + 0]));
    if (meth_otr_GC_isAboutToExpand(_requestedSize)) {
        localVar3 = meth_otr_GC_min(meth_otr_GC_max(_requestedSize, ((_availableBytes - (int64_t) *((int32_t *) &wasm_heap[INT32_C(944) + 0])) * INT64_C(2))), (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3968) + 0]));
        if ((localVar3 != _availableBytes)) {
            localVar4 = (localVar3 % INT64_C(8));
            if ((localVar4 != INT64_C(0))) {
                localVar3 = (localVar3 + (INT64_C(8) - localVar4));
            }
            meth_otr_GC_resizeHeapConsistent(localVar3);
        }
    } else {
        if ((_occupiedMemory < (_availableBytes / INT64_C(4)))) {
            localVar3 = meth_otr_GC_max((_occupiedMemory * INT64_C(3)), (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3964) + 0]));
            localVar4 = (localVar3 % INT64_C(8));
            if ((localVar4 != INT64_C(0))) {
                localVar3 = (localVar3 - localVar4);
            }
            meth_otr_GC_resizeHeapConsistent(localVar3);
        }
    }
}

static int32_t meth_otr_GC_isAboutToExpand(int64_t _requestedSize) {
    int64_t _availableBytes;
    int64_t _occupiedMemory;
    _availableBytes = (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]);
    _occupiedMemory = (_availableBytes - (int64_t) *((int32_t *) &wasm_heap[INT32_C(944) + 0]));
    int32_t tmp_0;
    if ((_requestedSize > _availableBytes)) {
        tmp_0 = INT32_C(0);
        goto block_0;
    }
    tmp_0 = (_occupiedMemory <= (_availableBytes / INT64_C(2)));
    block_0: ;
    return (tmp_0 ? INT32_C(0) : INT32_C(1));
}

static int64_t meth_otr_GC_min(int64_t _a, int64_t _b) {
    if ((_a < _b)) {
        _b = _a;
    }
    return _b;
}

static int64_t meth_otr_GC_max(int64_t _a, int64_t _b) {
    if ((_a > _b)) {
        _b = _a;
    }
    return _b;
}

static int32_t meth_otr_GC_objectSize(int32_t _object) {
    int32_t _realObject;
    if ((*((int32_t *) &wasm_heap[_object + 0]) == INT32_C(0))) {
        return *((int32_t *) &wasm_heap[_object + 4]);
    }
    _realObject = _object;
    return meth_otr_GC_objectSize_0(_realObject, meth_otr_RuntimeClass_getClass(_realObject));
}

static int32_t meth_otr_GC_objectSize_0(int32_t _object, int32_t _cls) {
    int32_t _itemSize;
    int32_t _array;
    if ((*((int32_t *) &wasm_heap[_cls + 32]) == INT32_C(0))) {
        return *((int32_t *) &wasm_heap[_cls + 8]);
    }
    _itemSize = (((*((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_cls + 32]) + 12]) & INT32_C(2)) == INT32_C(0)) ? INT32_C(4) : *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_cls + 32]) + 8]));
    _array = _object;
    return meth_otbw_WasmRuntime_align((meth_otbw_WasmRuntime_align(INT32_C(12), _itemSize) + (_itemSize * *((int32_t *) &wasm_heap[_array + 8]))), INT32_C(4));
}

static int32_t meth_otr_GC_isMarked(int32_t _object) {
    int32_t localVar1;
    if (((*((int32_t *) &wasm_heap[_object + 0]) & INT32_C(-2147483648)) == INT32_C(0))) {
        if ((int32_t) (int8_t) wasm_heap[INT32_C(960) + 0]) {
            goto block_0;
        }
        if (((*((int32_t *) &wasm_heap[_object + 0]) & INT32_C(1073741824)) == INT32_C(0))) {
            goto block_0;
        }
    }
    localVar1 = INT32_C(1);
    goto block_1;
    block_0: ;
    localVar1 = INT32_C(0);
    block_1: ;
    return localVar1;
}

static void meth_otr_GC__clinit_() {
    int32_t _regionCount;
    *((int32_t *) &wasm_heap[INT32_C(944) + 0]) = (int32_t) (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]);
    wasm_heap[INT32_C(960) + 0] = INT32_C(1);
    *((int32_t *) &wasm_heap[INT32_C(928) + 0]) = *((int32_t *) &wasm_heap[INT32_C(3996) + 0]);
    *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + 0]) = INT32_C(0);
    *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + 4]) = (int32_t) (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4000) + 0]);
    *((int32_t *) &wasm_heap[INT32_C(924) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(928) + 0]) + 4]));
    *((int32_t *) &wasm_heap[INT32_C(932) + 0]) = *((int32_t *) &wasm_heap[INT32_C(3972) + 0]);
    *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[INT32_C(932) + 0]) + 0]) = *((int32_t *) &wasm_heap[INT32_C(928) + 0]);
    *((int32_t *) &wasm_heap[INT32_C(936) + 0]) = INT32_C(1);
    *((int32_t *) &wasm_heap[INT32_C(940) + 0]) = INT32_C(1);
    _regionCount = meth_otr_GC_getRegionCount();
    meth_otbw_WasmRuntime_fill(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]), INT32_C(1), _regionCount);
}

static int32_t meth_ju_Arrays_copyOf(int32_t _array, int32_t _length) {
    int32_t _result;
    int32_t localVar3;
    int32_t localVar4;
    int32_t _sz;
    int32_t _i;
    int32_t localVar7;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(2));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(1);
    _result = meth_otr_Allocator_allocateArray(INT32_C(5392), _length);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(1))) {
        if ((_array == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(3);
            teavm_throwNullPointerException();
        } else {
            localVar3 = _array;
            localVar4 = *((int32_t *) &wasm_heap[(localVar3 + INT32_C(8)) + 0]);
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar3;
            *((int32_t *) &wasm_heap[___stack__ + 8]) = _result;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(2);
            _sz = meth_jl_Math_min(_length, localVar4);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(2))) {
                _i = INT32_C(0);
                block_3: do {
                    if ((_i >= _sz)) {
                        goto block_0;
                    }
                    localVar7 = _result;
                    if ((_i < INT32_C(0))) {
                        goto block_1;
                    }
                    if ((_i >= *((int32_t *) &wasm_heap[(localVar3 + INT32_C(8)) + 0]))) {
                        goto block_1;
                    }
                    localVar4 = (int32_t) *((uint16_t *) &wasm_heap[((localVar3 + INT32_C(12)) + (_i << INT32_C(1))) + 0]);
                    if ((_i >= *((int32_t *) &wasm_heap[(localVar7 + INT32_C(8)) + 0]))) {
                        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(5);
                        teavm_throwArrayIndexOutOfBoundsException();
                        goto block_2;
                    }
                    *((uint16_t *) &wasm_heap[((localVar7 + INT32_C(12)) + (_i << INT32_C(1))) + 0]) = localVar4;
                    _i = (_i + INT32_C(1));
                    goto block_3;
                } while(0);
                block_0: ;
                goto block_4;
                block_1: ;
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(4);
                teavm_throwArrayIndexOutOfBoundsException();
            }
        }
    }
    block_2: ;
    _result = INT32_C(0);
    block_4: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _result;
}

static int32_t meth_ju_Arrays_copyOf_0(int32_t _array, int32_t _length) {
    int32_t _result;
    int32_t localVar3;
    int32_t localVar4;
    int32_t _sz;
    int32_t _i;
    int32_t localVar7;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(2));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(6);
    _result = meth_otr_Allocator_allocateArray(INT32_C(5648), _length);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(6))) {
        if ((_array == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(8);
            teavm_throwNullPointerException();
        } else {
            localVar3 = _array;
            localVar4 = *((int32_t *) &wasm_heap[(localVar3 + INT32_C(8)) + 0]);
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar3;
            *((int32_t *) &wasm_heap[___stack__ + 8]) = _result;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(7);
            _sz = meth_jl_Math_min(_length, localVar4);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(7))) {
                _i = INT32_C(0);
                block_3: do {
                    if ((_i >= _sz)) {
                        goto block_0;
                    }
                    localVar7 = _result;
                    if ((_i < INT32_C(0))) {
                        goto block_1;
                    }
                    if ((_i >= *((int32_t *) &wasm_heap[(localVar3 + INT32_C(8)) + 0]))) {
                        goto block_1;
                    }
                    localVar4 = *((int32_t *) &wasm_heap[((localVar3 + INT32_C(12)) + (_i << INT32_C(2))) + 0]);
                    if ((_i >= *((int32_t *) &wasm_heap[(localVar7 + INT32_C(8)) + 0]))) {
                        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(10);
                        teavm_throwArrayIndexOutOfBoundsException();
                        goto block_2;
                    }
                    *((int32_t *) &wasm_heap[((localVar7 + INT32_C(12)) + (_i << INT32_C(2))) + 0]) = localVar4;
                    _i = (_i + INT32_C(1));
                    goto block_3;
                } while(0);
                block_0: ;
                goto block_4;
                block_1: ;
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(9);
                teavm_throwArrayIndexOutOfBoundsException();
            }
        }
    }
    block_2: ;
    _result = INT32_C(0);
    block_4: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _result;
}

static int32_t meth_ju_Arrays_copyOf_1(int32_t _array, int32_t _length) {
    int32_t _result;
    int32_t localVar3;
    int32_t localVar4;
    int32_t _sz;
    int32_t _i;
    int32_t localVar7;
    int64_t localVar8;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(2));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(11);
    _result = meth_otr_Allocator_allocateArray(INT32_C(5904), _length);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(11))) {
        if ((_array == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(13);
            teavm_throwNullPointerException();
        } else {
            localVar3 = _array;
            localVar4 = *((int32_t *) &wasm_heap[(localVar3 + INT32_C(8)) + 0]);
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar3;
            *((int32_t *) &wasm_heap[___stack__ + 8]) = _result;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(12);
            _sz = meth_jl_Math_min(_length, localVar4);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(12))) {
                _i = INT32_C(0);
                block_3: do {
                    if ((_i >= _sz)) {
                        goto block_0;
                    }
                    localVar7 = _result;
                    if ((_i < INT32_C(0))) {
                        goto block_1;
                    }
                    if ((_i >= *((int32_t *) &wasm_heap[(localVar3 + INT32_C(8)) + 0]))) {
                        goto block_1;
                    }
                    localVar8 = *((int64_t *) &wasm_heap[((localVar3 + INT32_C(16)) + (_i << INT32_C(3))) + 0]);
                    if ((_i >= *((int32_t *) &wasm_heap[(localVar7 + INT32_C(8)) + 0]))) {
                        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(15);
                        teavm_throwArrayIndexOutOfBoundsException();
                        goto block_2;
                    }
                    *((int64_t *) &wasm_heap[((localVar7 + INT32_C(16)) + (_i << INT32_C(3))) + 0]) = localVar8;
                    _i = (_i + INT32_C(1));
                    goto block_3;
                } while(0);
                block_0: ;
                goto block_4;
                block_1: ;
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(14);
                teavm_throwArrayIndexOutOfBoundsException();
            }
        }
    }
    block_2: ;
    _result = INT32_C(0);
    block_4: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _result;
}

static int32_t meth_ju_Arrays_copyOf_2(int32_t _array, int32_t _length) {
    int32_t _result;
    int32_t localVar3;
    int32_t localVar4;
    int32_t _sz;
    int32_t _i;
    int32_t localVar7;
    float localVar8;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(2));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(16);
    _result = meth_otr_Allocator_allocateArray(INT32_C(6168), _length);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(16))) {
        if ((_array == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(18);
            teavm_throwNullPointerException();
        } else {
            localVar3 = _array;
            localVar4 = *((int32_t *) &wasm_heap[(localVar3 + INT32_C(8)) + 0]);
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar3;
            *((int32_t *) &wasm_heap[___stack__ + 8]) = _result;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(17);
            _sz = meth_jl_Math_min(_length, localVar4);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(17))) {
                _i = INT32_C(0);
                block_3: do {
                    if ((_i >= _sz)) {
                        goto block_0;
                    }
                    localVar7 = _result;
                    if ((_i < INT32_C(0))) {
                        goto block_1;
                    }
                    if ((_i >= *((int32_t *) &wasm_heap[(localVar3 + INT32_C(8)) + 0]))) {
                        goto block_1;
                    }
                    localVar8 = *((float *) &wasm_heap[((localVar3 + INT32_C(12)) + (_i << INT32_C(2))) + 0]);
                    if ((_i >= *((int32_t *) &wasm_heap[(localVar7 + INT32_C(8)) + 0]))) {
                        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(20);
                        teavm_throwArrayIndexOutOfBoundsException();
                        goto block_2;
                    }
                    *((float *) &wasm_heap[((localVar7 + INT32_C(12)) + (_i << INT32_C(2))) + 0]) = localVar8;
                    _i = (_i + INT32_C(1));
                    goto block_3;
                } while(0);
                block_0: ;
                goto block_4;
                block_1: ;
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(19);
                teavm_throwArrayIndexOutOfBoundsException();
            }
        }
    }
    block_2: ;
    _result = INT32_C(0);
    block_4: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _result;
}

static int32_t meth_ju_Arrays_copyOf_3(int32_t _array, int32_t _length) {
    int32_t _result;
    int32_t localVar3;
    int32_t localVar4;
    int32_t _sz;
    int32_t _i;
    int32_t localVar7;
    double localVar8;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(2));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(21);
    _result = meth_otr_Allocator_allocateArray(INT32_C(6432), _length);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(21))) {
        if ((_array == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(23);
            teavm_throwNullPointerException();
        } else {
            localVar3 = _array;
            localVar4 = *((int32_t *) &wasm_heap[(localVar3 + INT32_C(8)) + 0]);
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar3;
            *((int32_t *) &wasm_heap[___stack__ + 8]) = _result;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(22);
            _sz = meth_jl_Math_min(_length, localVar4);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(22))) {
                _i = INT32_C(0);
                block_3: do {
                    if ((_i >= _sz)) {
                        goto block_0;
                    }
                    localVar7 = _result;
                    if ((_i < INT32_C(0))) {
                        goto block_1;
                    }
                    if ((_i >= *((int32_t *) &wasm_heap[(localVar3 + INT32_C(8)) + 0]))) {
                        goto block_1;
                    }
                    localVar8 = *((double *) &wasm_heap[((localVar3 + INT32_C(16)) + (_i << INT32_C(3))) + 0]);
                    if ((_i >= *((int32_t *) &wasm_heap[(localVar7 + INT32_C(8)) + 0]))) {
                        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(25);
                        teavm_throwArrayIndexOutOfBoundsException();
                        goto block_2;
                    }
                    *((double *) &wasm_heap[((localVar7 + INT32_C(16)) + (_i << INT32_C(3))) + 0]) = localVar8;
                    _i = (_i + INT32_C(1));
                    goto block_3;
                } while(0);
                block_0: ;
                goto block_4;
                block_1: ;
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(24);
                teavm_throwArrayIndexOutOfBoundsException();
            }
        }
    }
    block_2: ;
    _result = INT32_C(0);
    block_4: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _result;
}

static int32_t meth_ju_Arrays_copyOf_4(int32_t _original, int32_t _newLength) {
    int32_t localVar2;
    int32_t localVar3;
    int32_t _result;
    int32_t localVar5;
    int32_t _sz;
    int32_t _i;
    int32_t localVar8;
    int32_t ___stack__;
    int32_t localVar10;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(2));
    if ((_original == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(27);
        teavm_throwNullPointerException();
    } else {
        localVar2 = _original;
        *((int32_t *) &wasm_heap[___stack__ + 4]) = _original;
        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(26);
        localVar3 = meth_jl_Object_getClass(_original);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(26))) {
            if ((localVar3 == INT32_C(0))) {
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(32);
                teavm_throwNullPointerException();
            } else {
                *((int32_t *) &wasm_heap[___stack__ + 8]) = localVar3;
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(28);
                localVar10 = localVar3;
                int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar10 + 0]) << INT32_C(3)) + INT32_C(96)) + 0]);
                localVar3 = (*(int32_t (*)(int32_t)) wasm_table[tmp_0])(localVar10);
                if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(28))) {
                    *((int32_t *) &wasm_heap[___stack__ + 8]) = localVar3;
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(29);
                    localVar3 = meth_jlr_Array_newInstance(localVar3, _newLength);
                    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(29))) {
                        *((int32_t *) &wasm_heap[___stack__ + 8]) = localVar3;
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(30);
                        _result = localVar3;
                        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(30))) {
                            localVar5 = *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]);
                            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(31);
                            _sz = meth_jl_Math_min(_newLength, localVar5);
                            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(31))) {
                                _i = INT32_C(0);
                                block_3: do {
                                    if ((_i >= _sz)) {
                                        goto block_0;
                                    }
                                    if ((_i < INT32_C(0))) {
                                        goto block_1;
                                    }
                                    if ((_i >= *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]))) {
                                        goto block_1;
                                    }
                                    localVar3 = *((int32_t *) &wasm_heap[((localVar2 + INT32_C(12)) + (_i << INT32_C(2))) + 0]);
                                    if ((_result == INT32_C(0))) {
                                        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                                        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(34);
                                        teavm_throwNullPointerException();
                                        goto block_2;
                                    }
                                    localVar8 = _result;
                                    if ((_i >= *((int32_t *) &wasm_heap[(localVar8 + INT32_C(8)) + 0]))) {
                                        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                                        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(35);
                                        teavm_throwArrayIndexOutOfBoundsException();
                                        goto block_2;
                                    }
                                    wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((localVar8 - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
                                    *((int32_t *) &wasm_heap[((localVar8 + INT32_C(12)) + (_i << INT32_C(2))) + 0]) = localVar3;
                                    _i = (_i + INT32_C(1));
                                    goto block_3;
                                } while(0);
                                block_0: ;
                                goto block_4;
                                block_1: ;
                                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                                *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(33);
                                teavm_throwArrayIndexOutOfBoundsException();
                            }
                        }
                    }
                }
            }
        }
    }
    block_2: ;
    _result = INT32_C(0);
    block_4: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _result;
}

static int32_t meth_jlr_Array_newInstance(int32_t _componentType, int32_t _length) {
    int32_t localVar2;
    int32_t ___stack__;
    int32_t localVar4;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    if ((_componentType == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(36);
        localVar2 = meth_otr_Allocator_allocate(INT32_C(1720));
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(36))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar2;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(37);
            meth_jl_NullPointerException__init_(localVar2);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(37))) {
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(38);
                meth_otr_ExceptionHandling_throwException(localVar2);
            }
        }
    } else {
        if ((_componentType == INT32_C(6568))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(39);
            localVar2 = meth_otr_Allocator_allocate(INT32_C(4496));
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(39))) {
                *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar2;
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(40);
                meth_jl_IllegalArgumentException__init_(localVar2);
                if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(40))) {
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(41);
                    meth_otr_ExceptionHandling_throwException(localVar2);
                }
            }
        } else {
            if ((_length < INT32_C(0))) {
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(43);
                localVar2 = meth_otr_Allocator_allocate(INT32_C(4144));
                if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(43))) {
                    *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar2;
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(44);
                    meth_jl_NegativeArraySizeException__init_(localVar2);
                    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(44))) {
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(45);
                        meth_otr_ExceptionHandling_throwException(localVar2);
                    }
                }
            } else {
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(42);
                localVar2 = _componentType;
                if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(42))) {
                    if ((localVar2 == INT32_C(0))) {
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(48);
                        teavm_throwNullPointerException();
                    } else {
                        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar2;
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(46);
                        localVar4 = localVar2;
                        int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar4 + 0]) << INT32_C(3)) + INT32_C(100)) + 0]);
                        localVar2 = (*(int32_t (*)(int32_t)) wasm_table[tmp_0])(localVar4);
                        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(46))) {
                            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar2;
                            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(47);
                            localVar2 = meth_jlr_Array_newInstanceImpl(localVar2, _length);
                            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(47))) {
                                goto block_0;
                            }
                        }
                    }
                }
            }
        }
    }
    localVar2 = INT32_C(0);
    block_0: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar2;
}

static int32_t meth_jlr_Array_newInstanceImpl(int32_t localVar0, int32_t localVar1) {
    return meth_jlr_Array_newInstanceLowLevel(localVar0, localVar1);
}

static int32_t meth_jlr_Array_newInstanceLowLevel(int32_t _cls, int32_t _length) {
    int32_t localVar2;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    localVar2 = meth_otr_Allocator_allocateArray(*((int32_t *) &wasm_heap[_cls + 36]), _length);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(49);
    localVar2 = localVar2;
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(49))) {
        localVar2 = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar2;
}

static int64_t meth_jl_System_currentTimeMillis() {
    return meth_jl_System_currentTimeMillisLowLevel();
}

static int64_t meth_jl_System_currentTimeMillisLowLevel() {
    int64_t localVar0;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(50);
    localVar0 = meth_otbwr_WasmSupport_currentTimeMillis();
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(50))) {
        localVar0 = INT64_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar0;
}

static int64_t meth_otbwr_WasmSupport_currentTimeMillis() {
    double localVar0;
    int64_t localVar1;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(51);
    localVar0 = teavm_currentTimeMillis();
    localVar1 = ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(51)) ? (int64_t) localVar0 : INT64_C(0));
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar1;
}

static int32_t meth_otbwr_WasmSupport_getArgs() {
    int32_t localVar0;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(52);
    localVar0 = meth_otr_Allocator_allocateArray(INT32_C(6728), INT32_C(0));
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(52))) {
        localVar0 = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar0;
}

static void meth_otbwr_WasmSupport_initClasses() {
    return;
}

static void meth_otbwr_WasmSupport_runWithoutArgs() {
    int32_t localVar0;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(53);
    meth_otbwr_WasmSupport_initClasses();
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(53))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(54);
        localVar0 = meth_otr_Allocator_allocate(INT32_C(2456));
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(54))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar0;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(55);
            meth_otbwr_WasmSupport_runWithoutArgs_lambda__14_0__init_(localVar0);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(55))) {
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(56);
                meth_otr_Fiber_start(localVar0, INT32_C(0));
            }
        }
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otbwr_WasmSupport_runWithArgs(int32_t _args) {
    int32_t localVar1;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(57);
    meth_otbwr_WasmSupport_initClasses();
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(57))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(58);
        localVar1 = meth_otr_Allocator_allocate(INT32_C(3616));
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(58))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar1;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(59);
            meth_otbwr_WasmSupport_runWithArgs_lambda__15_0__init_(localVar1, _args);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(59))) {
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(60);
                meth_otr_Fiber_start(localVar1, INT32_C(0));
            }
        }
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otbwr_WasmSupport_lambda_runWithArgs_1(int32_t _args) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(61);
    meth_cbv_VisualizerRuntime_main(_args);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otbwr_WasmSupport_lambda_runWithoutArgs_0() {
    int32_t localVar0;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(62);
    localVar0 = meth_otbwr_WasmSupport_getArgs();
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(62))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar0;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(63);
        meth_cbv_VisualizerRuntime_main(localVar0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static int32_t meth_otbw_WasmRuntime_compare_0(int64_t _a, int64_t _b) {
    return ((_a > _b) ? INT32_C(1) : ((_a >= _b) ? INT32_C(0) : INT32_C(-1)));
}

static int32_t meth_otbw_WasmRuntime_align(int32_t _address, int32_t _alignment) {
    int32_t _value;
    _value = _address;
    if ((_value == INT32_C(0))) {
        return _address;
    }
    return ((((_value - INT32_C(1)) / _alignment) + INT32_C(1)) * _alignment);
}

static void meth_otbw_WasmRuntime_printString(int32_t _s) {
    teavm_logString(_s);
}

static void meth_otbw_WasmRuntime_printInt(int32_t _i) {
    teavm_logInt(_i);
}

static void meth_otbw_WasmRuntime_printOutOfMemory() {
    teavm_logOutOfMemory();
}

static void meth_otbw_WasmRuntime_fillZero(int32_t _address, int32_t _count) {
    meth_otbw_WasmRuntime_fill(_address, INT32_C(0), _count);
}

static void meth_otbw_WasmRuntime_fill(int32_t _address, int32_t _value, int32_t _count) {
    int32_t _value4;
    int32_t _start;
    int32_t _alignedStart;
    int32_t localVar6;
    int32_t _end;
    int32_t _alignedEnd;
    int32_t localVar9;
    _value4 = ((((_value & INT32_C(-16777216)) | (_value & INT32_C(16711680))) | (_value & INT32_C(65280))) | (_value & INT32_C(255)));
    _start = _address;
    _alignedStart = ((int32_t) ((uint32_t) _start >> INT32_C(2)) << INT32_C(2));
    localVar6 = _alignedStart;
    switch ((_start - _alignedStart)) {
        case 0: goto block_0;
        case 1: goto block_1;
        case 2: goto block_2;
        case 3: goto block_3;
        default: goto block_4;
    }
    block_0: ;
    goto block_5;
    block_1: ;
    wasm_heap[(localVar6 + INT32_C(1)) + 0] = _value;
    wasm_heap[(localVar6 + INT32_C(2)) + 0] = _value;
    wasm_heap[(localVar6 + INT32_C(3)) + 0] = _value;
    goto block_6;
    block_2: ;
    wasm_heap[(localVar6 + INT32_C(2)) + 0] = _value;
    wasm_heap[(localVar6 + INT32_C(3)) + 0] = _value;
    goto block_6;
    block_3: ;
    wasm_heap[(localVar6 + INT32_C(3)) + 0] = _value;
    goto block_6;
    block_4: ;
    goto block_6;
    block_5: ;
    *((int32_t *) &wasm_heap[localVar6 + 0]) = _value4;
    block_6: ;
    _end = (_start + _count);
    _alignedEnd = ((int32_t) ((uint32_t) _end >> INT32_C(2)) << INT32_C(2));
    localVar9 = _alignedEnd;
    switch ((_end - _alignedEnd)) {
        case 0: goto block_7;
        case 1: goto block_8;
        case 2: goto block_9;
        case 3: goto block_10;
        default: goto block_11;
    }
    block_7: ;
    goto block_12;
    block_8: ;
    wasm_heap[localVar9 + 0] = _value;
    goto block_13;
    block_9: ;
    wasm_heap[localVar9 + 0] = _value;
    wasm_heap[(localVar9 + INT32_C(1)) + 0] = _value;
    goto block_13;
    block_10: ;
    wasm_heap[localVar9 + 0] = _value;
    wasm_heap[(localVar9 + INT32_C(1)) + 0] = _value;
    wasm_heap[(localVar9 + INT32_C(2)) + 0] = _value;
    goto block_13;
    block_11: ;
    goto block_13;
    block_12: ;
    block_13: ;
    localVar6 = (_alignedStart + INT32_C(4));
    block_15: do {
        if ((localVar6 >= _alignedEnd)) {
            goto block_14;
        }
        *((int32_t *) &wasm_heap[localVar6 + 0]) = _value4;
        localVar6 = (localVar6 + INT32_C(4));
        goto block_15;
    } while(0);
    block_14: ;
}

static void meth_otbw_WasmRuntime_moveMemoryBlock(int32_t _source, int32_t _target, int32_t _count) {
    int32_t _diff;
    int32_t _alignedSourceStart;
    int32_t _alignedTargetStart;
    int32_t _alignedSourceEnd;
    int32_t _alignedTargetEnd;
    int32_t localVar8;
    int32_t localVar9;
    if ((_count < INT32_C(8))) {
        meth_otbw_WasmRuntime_slowMemoryMove(_source, _target, _count);
        return;
    }
    _diff = (_source - _target);
    if ((_diff == INT32_C(0))) {
        return;
    }
    if ((_diff & INT32_C(3))) {
        meth_otbw_WasmRuntime_slowMemoryMove(_source, _target, _count);
        return;
    }
    _alignedSourceStart = ((int32_t) ((uint32_t) _source >> INT32_C(2)) << INT32_C(2));
    _alignedTargetStart = ((int32_t) ((uint32_t) _target >> INT32_C(2)) << INT32_C(2));
    _alignedSourceEnd = ((int32_t) ((uint32_t) (_source + _count) >> INT32_C(2)) << INT32_C(2));
    _alignedTargetEnd = ((int32_t) ((uint32_t) (_target + _count) >> INT32_C(2)) << INT32_C(2));
    if ((_source <= _target)) {
        switch (((_source + _count) - _alignedSourceEnd)) {
            case 0: goto block_0;
            case 1: goto block_1;
            case 2: goto block_2;
            case 3: goto block_3;
            default: goto block_4;
        }
        block_0: ;
        goto block_5;
        block_1: ;
        wasm_heap[_alignedTargetEnd + 0] = (int32_t) (int8_t) wasm_heap[_alignedSourceEnd + 0];
        goto block_6;
        block_2: ;
        *((int16_t *) &wasm_heap[_alignedTargetEnd + 0]) = (int32_t) *((int16_t *) &wasm_heap[_alignedSourceEnd + 0]);
        goto block_6;
        block_3: ;
        wasm_heap[(_alignedTargetEnd + INT32_C(2)) + 0] = (int32_t) (int8_t) wasm_heap[(_alignedSourceEnd + INT32_C(2)) + 0];
        *((int16_t *) &wasm_heap[_alignedTargetEnd + 0]) = (int32_t) *((int16_t *) &wasm_heap[_alignedSourceEnd + 0]);
        goto block_6;
        block_4: ;
        goto block_6;
        block_5: ;
        block_6: ;
        block_8: do {
            if ((_alignedSourceEnd <= _alignedSourceStart)) {
                goto block_7;
            }
            _alignedSourceEnd = (_alignedSourceEnd + INT32_C(-4));
            _alignedTargetEnd = (_alignedTargetEnd + INT32_C(-4));
            *((int32_t *) &wasm_heap[_alignedTargetEnd + 0]) = *((int32_t *) &wasm_heap[_alignedSourceEnd + 0]);
            goto block_8;
        } while(0);
        block_7: ;
        switch (((_source - _alignedSourceStart) - INT32_C(1))) {
            case 0: goto block_9;
            case 1: goto block_10;
            case 2: goto block_11;
            default: goto block_12;
        }
        block_9: ;
        *((int16_t *) &wasm_heap[(_alignedTargetStart + INT32_C(-2)) + 0]) = (int32_t) *((int16_t *) &wasm_heap[(_alignedSourceStart + INT32_C(-2)) + 0]);
        wasm_heap[(_alignedTargetStart + INT32_C(-3)) + 0] = (int32_t) (int8_t) wasm_heap[(_alignedSourceStart + INT32_C(-3)) + 0];
        goto block_13;
        block_10: ;
        goto block_14;
        block_11: ;
        wasm_heap[(_alignedTargetStart + INT32_C(-1)) + 0] = (int32_t) (int8_t) wasm_heap[(_alignedSourceStart + INT32_C(-1)) + 0];
        goto block_13;
        block_12: ;
        goto block_13;
        block_14: ;
        *((int16_t *) &wasm_heap[(_alignedTargetStart + INT32_C(-2)) + 0]) = (int32_t) *((int16_t *) &wasm_heap[(_alignedSourceStart + INT32_C(-2)) + 0]);
    } else {
        switch ((_source - _alignedSourceStart)) {
            case 0: goto block_15;
            case 1: goto block_16;
            case 2: goto block_17;
            case 3: goto block_18;
            default: goto block_19;
        }
        block_15: ;
        goto block_20;
        block_16: ;
        wasm_heap[(_alignedTargetStart + INT32_C(1)) + 0] = (int32_t) (int8_t) wasm_heap[(_alignedSourceStart + INT32_C(1)) + 0];
        *((int16_t *) &wasm_heap[(_alignedTargetStart + INT32_C(2)) + 0]) = (int32_t) *((int16_t *) &wasm_heap[(_alignedSourceStart + INT32_C(2)) + 0]);
        goto block_21;
        block_17: ;
        *((int16_t *) &wasm_heap[(_alignedTargetStart + INT32_C(2)) + 0]) = (int32_t) *((int16_t *) &wasm_heap[(_alignedSourceStart + INT32_C(2)) + 0]);
        goto block_21;
        block_18: ;
        wasm_heap[(_alignedTargetStart + INT32_C(3)) + 0] = (int32_t) (int8_t) wasm_heap[(_alignedSourceStart + INT32_C(3)) + 0];
        goto block_21;
        block_19: ;
        goto block_21;
        block_20: ;
        *((int32_t *) &wasm_heap[_alignedTargetStart + 0]) = *((int32_t *) &wasm_heap[_alignedSourceStart + 0]);
        block_21: ;
        localVar8 = (_alignedSourceStart + INT32_C(4));
        localVar9 = (_alignedTargetStart + INT32_C(4));
        block_23: do {
            if ((localVar8 >= _alignedSourceEnd)) {
                goto block_22;
            }
            *((int32_t *) &wasm_heap[localVar9 + 0]) = *((int32_t *) &wasm_heap[localVar8 + 0]);
            localVar8 = (localVar8 + INT32_C(4));
            localVar9 = (localVar9 + INT32_C(4));
            goto block_23;
        } while(0);
        block_22: ;
        switch (((_source + _count) - _alignedSourceEnd)) {
            case 0: goto block_24;
            case 1: goto block_25;
            case 2: goto block_26;
            case 3: goto block_27;
            default: goto block_28;
        }
        block_24: ;
        goto block_29;
        block_25: ;
        wasm_heap[_alignedTargetEnd + 0] = (int32_t) (int8_t) wasm_heap[_alignedSourceEnd + 0];
        goto block_30;
        block_26: ;
        *((int16_t *) &wasm_heap[_alignedTargetEnd + 0]) = (int32_t) *((int16_t *) &wasm_heap[_alignedSourceEnd + 0]);
        goto block_30;
        block_27: ;
        *((int16_t *) &wasm_heap[_alignedTargetEnd + 0]) = (int32_t) *((int16_t *) &wasm_heap[_alignedSourceEnd + 0]);
        wasm_heap[(_alignedTargetEnd + INT32_C(2)) + 0] = (int32_t) (int8_t) wasm_heap[(_alignedSourceEnd + INT32_C(2)) + 0];
        goto block_30;
        block_28: ;
        goto block_30;
        block_29: ;
        block_30: ;
    }
    block_13: ;
}

static void meth_otbw_WasmRuntime_slowMemoryMove(int32_t _source, int32_t _target, int32_t _count) {
    int32_t localVar3;
    int32_t localVar4;
    int32_t localVar5;
    if ((_source > _target)) {
        block_1: do {
            localVar3 = (_count + INT32_C(-1));
            if ((_count <= INT32_C(0))) {
                goto block_0;
            }
            wasm_heap[_target + 0] = (int32_t) (int8_t) wasm_heap[_source + 0];
            _target = (_target + INT32_C(1));
            _source = (_source + INT32_C(1));
            _count = localVar3;
            goto block_1;
        } while(0);
    }
    localVar4 = (_source + _count);
    localVar5 = (_target + _count);
    block_2: do {
        localVar3 = (_count + INT32_C(-1));
        if ((_count <= INT32_C(0))) {
            goto block_0;
        }
        localVar5 = (localVar5 + INT32_C(-1));
        localVar4 = (localVar4 + INT32_C(-1));
        wasm_heap[localVar5 + 0] = (int32_t) (int8_t) wasm_heap[localVar4 + 0];
        _count = localVar3;
        goto block_2;
    } while(0);
    block_0: ;
}

static int32_t meth_otbw_WasmRuntime_allocStack(int32_t _size) {
    int32_t _result;
    int32_t localVar2;
    _result = (*((int32_t *) &wasm_heap[INT32_C(4016) + 0]) + INT32_C(4));
    localVar2 = (_result + ((_size << INT32_C(2)) + INT32_C(4)));
    *((int32_t *) &wasm_heap[localVar2 + 0]) = _size;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = localVar2;
    return _result;
}

static int32_t meth_otbw_WasmRuntime_getStackTop() {
    return ((*((int32_t *) &wasm_heap[INT32_C(4016) + 0]) == *((int32_t *) &wasm_heap[INT32_C(4012) + 0])) ? INT32_C(0) : *((int32_t *) &wasm_heap[INT32_C(4016) + 0]));
}

static int32_t meth_otbw_WasmRuntime_getNextStackFrame(int32_t _stackFrame) {
    int32_t _result;
    _result = (_stackFrame + ((INT32_C(0) - (*((int32_t *) &wasm_heap[_stackFrame + 0]) + INT32_C(2))) * INT32_C(4)));
    if ((_result == *((int32_t *) &wasm_heap[INT32_C(4012) + 0]))) {
        _result = INT32_C(0);
    }
    return _result;
}

static int32_t meth_otbw_WasmRuntime_getStackRootCount(int32_t _stackFrame) {
    return *((int32_t *) &wasm_heap[_stackFrame + 0]);
}

static int32_t meth_otbw_WasmRuntime_getStackRootPointer(int32_t _stackFrame) {
    return (_stackFrame + ((INT32_C(0) - *((int32_t *) &wasm_heap[_stackFrame + 0])) * INT32_C(4)));
}

static int32_t meth_otbw_WasmRuntime_getExceptionHandlerPtr(int32_t _stackFrame) {
    return (_stackFrame + (((INT32_C(0) - *((int32_t *) &wasm_heap[_stackFrame + 0])) * INT32_C(4)) - INT32_C(4)));
}

static int32_t meth_otbw_WasmRuntime_getCallSiteId(int32_t _stackFrame) {
    return *((int32_t *) &wasm_heap[meth_otbw_WasmRuntime_getExceptionHandlerPtr(_stackFrame) + 0]);
}

static void meth_otbw_WasmRuntime_setExceptionHandlerId(int32_t _stackFrame, int32_t _id) {
    *((int32_t *) &wasm_heap[meth_otbw_WasmRuntime_getExceptionHandlerPtr(_stackFrame) + 0]) = _id;
}

static void meth_jl_NullPointerException__init_(int32_t _this) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(64);
    meth_jl_RuntimeException__init_(_this);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static int32_t meth_jl_Character_forDigit(int32_t _digit, int32_t _radix) {
    int32_t localVar2;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(2004) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(65);
        initclass_jl_Character();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(65))) {
            localVar2 = INT32_C(0);
            goto block_0;
        }
    }
    int32_t tmp_0;
    if ((_radix < INT32_C(2))) {
        tmp_0 = INT32_C(0);
        goto block_1;
    }
    int32_t tmp_1;
    if ((_radix > INT32_C(36))) {
        tmp_1 = INT32_C(0);
        goto block_2;
    }
    tmp_1 = (_digit < _radix);
    block_2: ;
    tmp_0 = tmp_1;
    block_1: ;
    if (tmp_0) {
        localVar2 = ((_digit < INT32_C(10)) ? (int32_t) ((uint32_t) ((INT32_C(48) + _digit) << INT32_C(16)) >> INT32_C(16)) : (int32_t) ((uint32_t) (((INT32_C(97) + _digit) - INT32_C(10)) << INT32_C(16)) >> INT32_C(16)));
    } else {
        localVar2 = INT32_C(0);
    }
    block_0: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar2;
}

static void meth_jl_Character__clinit_() {
    int32_t localVar0;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[INT32_C(1832) + 0]) = INT32_C(5272);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(66);
    localVar0 = meth_otr_Allocator_allocateArray(INT32_C(6904), INT32_C(128));
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(66))) {
        *((int32_t *) &wasm_heap[INT32_C(1940) + 0]) = localVar0;
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_Thread__init_(int32_t _this, int32_t _name) {
    int32_t localVar2;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(2140) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(68);
        initclass_jl_Thread();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(68))) {
            goto block_0;
        }
    }
    localVar2 = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(67);
    meth_jl_Thread__init__0(_this, localVar2, _name);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(67))) {
        goto block_1;
    }
    block_0: ;
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_Thread__init__0(int32_t _this, int32_t _target, int32_t _name) {
    int32_t localVar3;
    int32_t localVar4;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    if (((*((int32_t *) &wasm_heap[INT32_C(2140) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(72);
        initclass_jl_Thread();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(72))) {
            goto block_0;
        }
    }
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(69);
    meth_jl_Object__init_(_this);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(69))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(70);
        localVar3 = meth_otr_Allocator_allocate(INT32_C(352));
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(70))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar3;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(71);
            meth_jl_Object__init_(localVar3);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(71))) {
                wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
                *((int32_t *) &wasm_heap[_this + 44]) = localVar3;
                wasm_heap[_this + 60] = INT32_C(1);
                *((int32_t *) &wasm_heap[_this + 56]) = _name;
                *((int32_t *) &wasm_heap[_this + 64]) = _target;
                localVar4 = *((int32_t *) &wasm_heap[INT32_C(2100) + 0]);
                *((int32_t *) &wasm_heap[INT32_C(2100) + 0]) = (localVar4 + INT32_C(1));
                *((int64_t *) &wasm_heap[_this + 16]) = (int64_t) localVar4;
                goto block_1;
            }
        }
    }
    block_0: ;
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_Thread__clinit_() {
    int32_t localVar0;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(76);
    localVar0 = meth_otr_Allocator_allocate(INT32_C(2128));
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(76))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar0;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(77);
        meth_jl_Thread__init_(localVar0, INT32_C(7004));
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(77))) {
            *((int32_t *) &wasm_heap[INT32_C(2092) + 0]) = localVar0;
            *((int32_t *) &wasm_heap[INT32_C(2096) + 0]) = *((int32_t *) &wasm_heap[INT32_C(2092) + 0]);
            *((int32_t *) &wasm_heap[INT32_C(2100) + 0]) = INT32_C(1);
            *((int32_t *) &wasm_heap[INT32_C(2104) + 0]) = INT32_C(1);
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(78);
            localVar0 = meth_otr_Allocator_allocate(INT32_C(2232));
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(78))) {
                *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar0;
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(79);
                meth_jl_DefaultUncaughtExceptionHandler__init_(localVar0);
                if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(79))) {
                    *((int32_t *) &wasm_heap[INT32_C(2108) + 0]) = localVar0;
                }
            }
        }
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_DefaultUncaughtExceptionHandler__init_(int32_t _this) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(80);
    meth_jl_Object__init_(_this);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static int32_t meth_jl_Math_min(int32_t _a, int32_t _b) {
    if ((_a < _b)) {
        _b = _a;
    }
    return _b;
}

static int32_t meth_jl_Math_max(int32_t _a, int32_t _b) {
    if ((_a > _b)) {
        _b = _a;
    }
    return _b;
}

static int64_t meth_jl_Math_max_0(int64_t _a, int64_t _b) {
    if ((_a > _b)) {
        _b = _a;
    }
    return _b;
}

static void meth_otbwr_WasmSupport_runWithoutArgs_lambda__14_0__init_(int32_t localVar0) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(81);
    meth_jl_Object__init_(localVar0);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otbwr_WasmSupport_runWithoutArgs_lambda__14_0_run(int32_t localVar0) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(82);
    meth_otbwr_WasmSupport_lambda_runWithoutArgs_0();
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_StringIndexOutOfBoundsException__init_(int32_t _this) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(83);
    meth_jl_IndexOutOfBoundsException__init_(_this);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_Exception__init_(int32_t _this) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(84);
    meth_jl_Throwable__init_(_this);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_StringBuilder__init_(int32_t _this) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(85);
    meth_jl_AbstractStringBuilder__init_(_this);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static int32_t meth_jl_StringBuilder_append_0(int32_t _this, int32_t _obj) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(86);
    meth_jl_AbstractStringBuilder_append_0(_this, _obj);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(86))) {
        _this = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _this;
}

static int32_t meth_jl_StringBuilder_append(int32_t _this, int32_t _string) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(87);
    meth_jl_AbstractStringBuilder_append_1(_this, _string);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(87))) {
        _this = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _this;
}

static int32_t meth_jl_StringBuilder_append_1(int32_t _this, int32_t _value) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(88);
    meth_jl_AbstractStringBuilder_append_2(_this, _value);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(88))) {
        _this = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _this;
}

static int32_t meth_jl_StringBuilder_append_2(int32_t _this, int32_t _c) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(89);
    meth_jl_AbstractStringBuilder_append_3(_this, _c);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(89))) {
        _this = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _this;
}

static int32_t meth_jl_StringBuilder_insert_2(int32_t _this, int32_t _index, int32_t _obj) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(90);
    meth_jl_AbstractStringBuilder_insert_0(_this, _index, _obj);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(90))) {
        _this = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _this;
}

static int32_t meth_jl_StringBuilder_insert_3(int32_t _this, int32_t _index, int32_t _c) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(91);
    meth_jl_AbstractStringBuilder_insert(_this, _index, _c);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(91))) {
        _this = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _this;
}

static int32_t meth_jl_StringBuilder_insert_4(int32_t _this, int32_t _index, int32_t _string) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(92);
    meth_jl_AbstractStringBuilder_insert_1(_this, _index, _string);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(92))) {
        _this = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _this;
}

static void meth_jl_StringBuilder_setLength(int32_t _this, int32_t localVar1) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(93);
    meth_jl_AbstractStringBuilder_setLength(_this, localVar1);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static int32_t meth_jl_StringBuilder_toString(int32_t _this) {
    int32_t localVar1;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(94);
    localVar1 = meth_jl_AbstractStringBuilder_toString(_this);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(94))) {
        localVar1 = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar1;
}

static void meth_jl_StringBuilder_ensureCapacity(int32_t _this, int32_t localVar1) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(95);
    meth_jl_AbstractStringBuilder_ensureCapacity(_this, localVar1);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static int32_t meth_jl_StringBuilder_insert_0(int32_t _this, int32_t localVar1, int32_t localVar2) {
    int32_t ___stack__;
    int32_t localVar4;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(96);
    localVar4 = _this;
    int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar4 + 0]) << INT32_C(3)) + INT32_C(140)) + 0]);
    localVar2 = (*(int32_t (*)(int32_t, int32_t, int32_t)) wasm_table[tmp_0])(localVar4, localVar1, localVar2);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(96))) {
        localVar2 = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar2;
}

static int32_t meth_jl_StringBuilder_insert(int32_t _this, int32_t localVar1, int32_t localVar2) {
    int32_t localVar3;
    int32_t ___stack__;
    int32_t localVar5;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(97);
    localVar5 = _this;
    int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar5 + 0]) << INT32_C(3)) + INT32_C(144)) + 0]);
    localVar3 = (*(int32_t (*)(int32_t, int32_t, int32_t)) wasm_table[tmp_0])(localVar5, localVar1, localVar2);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(97))) {
        localVar3 = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar3;
}

static int32_t meth_jl_StringBuilder_insert_1(int32_t _this, int32_t localVar1, int32_t localVar2) {
    int32_t ___stack__;
    int32_t localVar4;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(98);
    localVar4 = _this;
    int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar4 + 0]) << INT32_C(3)) + INT32_C(148)) + 0]);
    localVar2 = (*(int32_t (*)(int32_t, int32_t, int32_t)) wasm_table[tmp_0])(localVar4, localVar1, localVar2);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(98))) {
        localVar2 = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar2;
}

static void meth_jl_Throwable__init_(int32_t _this) {
    int32_t ___stack__;
    int32_t localVar2;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    wasm_heap[_this + 16] = INT32_C(1);
    wasm_heap[_this + 17] = INT32_C(1);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(99);
    localVar2 = _this;
    int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar2 + 0]) << INT32_C(3)) + INT32_C(96)) + 0]);
    (*(int32_t (*)(int32_t)) wasm_table[tmp_0])(localVar2);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static int32_t meth_jl_Throwable_fillInStackTrace(int32_t _this) {
    int32_t localVar1;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(100);
    localVar1 = meth_otr_ExceptionHandling_fillStackTrace();
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(100))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar1;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(101);
        localVar1 = localVar1;
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(101))) {
            wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
            *((int32_t *) &wasm_heap[_this + 24]) = localVar1;
            goto block_0;
        }
    }
    _this = INT32_C(0);
    block_0: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _this;
}

static int32_t meth_otp_Platform_getArrayItem(int32_t _cls) {
    return *((int32_t *) &wasm_heap[_cls + 32]);
}

static void meth_jl_AbstractStringBuilder__init_(int32_t _this) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(102);
    meth_jl_AbstractStringBuilder__init__0(_this, INT32_C(16));
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_AbstractStringBuilder__init__0(int32_t _this, int32_t _capacity) {
    int32_t localVar2;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(103);
    meth_jl_Object__init_(_this);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(103))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(104);
        localVar2 = meth_otr_Allocator_allocateArray(INT32_C(5392), _capacity);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(104))) {
            wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
            *((int32_t *) &wasm_heap[_this + 8]) = localVar2;
        }
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static int32_t meth_jl_AbstractStringBuilder_append_0(int32_t _this, int32_t _obj) {
    int32_t localVar2;
    int32_t localVar3;
    int32_t ___stack__;
    int32_t localVar5;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    localVar2 = *((int32_t *) &wasm_heap[_this + 12]);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(105);
    localVar5 = _this;
    int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar5 + 0]) << INT32_C(3)) + INT32_C(100)) + 0]);
    localVar3 = (*(int32_t (*)(int32_t, int32_t, int32_t)) wasm_table[tmp_0])(localVar5, localVar2, _obj);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(105))) {
        localVar3 = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar3;
}

static int32_t meth_jl_AbstractStringBuilder_append_1(int32_t _this, int32_t _string) {
    int32_t localVar2;
    int32_t localVar3;
    int32_t ___stack__;
    int32_t localVar5;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    localVar2 = *((int32_t *) &wasm_heap[_this + 12]);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(106);
    localVar5 = _this;
    int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar5 + 0]) << INT32_C(3)) + INT32_C(112)) + 0]);
    localVar3 = (*(int32_t (*)(int32_t, int32_t, int32_t)) wasm_table[tmp_0])(localVar5, localVar2, _string);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(106))) {
        localVar3 = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar3;
}

static int32_t meth_jl_AbstractStringBuilder_insert_1(int32_t _this, int32_t _index, int32_t _string) {
    int32_t localVar3;
    int32_t localVar4;
    int32_t localVar5;
    int32_t _i;
    int32_t localVar7;
    int32_t localVar8;
    int32_t localVar9;
    int32_t ___stack__;
    int32_t localVar11;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(2));
    int32_t tmp_0;
    if ((_index < INT32_C(0))) {
        tmp_0 = INT32_C(0);
        goto block_0;
    }
    tmp_0 = (_index <= *((int32_t *) &wasm_heap[_this + 12]));
    block_0: ;
    if ((tmp_0 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(107);
        localVar3 = meth_otr_Allocator_allocate(INT32_C(2672));
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(107))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar3;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(108);
            meth_jl_StringIndexOutOfBoundsException__init_(localVar3);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(108))) {
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(109);
                meth_otr_ExceptionHandling_throwException(localVar3);
            }
        }
    } else {
        if ((_string == INT32_C(0))) {
            _string = INT32_C(7216);
        } else {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(110);
            localVar11 = _string;
            int32_t tmp_1 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar11 + 0]) << INT32_C(3)) + INT32_C(104)) + 0]);
            localVar4 = (*(int32_t (*)(int32_t)) wasm_table[tmp_1])(localVar11);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(110))) {
                goto block_1;
            }
            if (localVar4) {
                goto block_2;
            }
        }
        localVar4 = *((int32_t *) &wasm_heap[_this + 12]);
        *((int32_t *) &wasm_heap[___stack__ + 4]) = _string;
        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(111);
        localVar11 = _string;
        int32_t tmp_2 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar11 + 0]) << INT32_C(3)) + INT32_C(96)) + 0]);
        localVar5 = (*(int32_t (*)(int32_t)) wasm_table[tmp_2])(localVar11);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(111))) {
            localVar4 = (localVar4 + localVar5);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(112);
            localVar11 = _this;
            int32_t tmp_3 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar11 + 0]) << INT32_C(3)) + INT32_C(104)) + 0]);
            (*(void (*)(int32_t, int32_t)) wasm_table[tmp_3])(localVar11, localVar4);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(112))) {
                _i = (*((int32_t *) &wasm_heap[_this + 12]) - INT32_C(1));
                block_8: do {
                    if ((_i < _index)) {
                        localVar4 = *((int32_t *) &wasm_heap[_this + 12]);
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(113);
                        localVar11 = _string;
                        int32_t tmp_4 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar11 + 0]) << INT32_C(3)) + INT32_C(96)) + 0]);
                        localVar5 = (*(int32_t (*)(int32_t)) wasm_table[tmp_4])(localVar11);
                        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(113))) {
                            goto block_1;
                        }
                        *((int32_t *) &wasm_heap[_this + 12]) = (localVar4 + localVar5);
                        _i = INT32_C(0);
                        block_5: do {
                            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(116);
                            localVar11 = _string;
                            int32_t tmp_5 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar11 + 0]) << INT32_C(3)) + INT32_C(96)) + 0]);
                            localVar4 = (*(int32_t (*)(int32_t)) wasm_table[tmp_5])(localVar11);
                            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(116))) {
                                goto block_1;
                            }
                            if ((_i >= localVar4)) {
                                goto block_3;
                            }
                            localVar7 = *((int32_t *) &wasm_heap[_this + 8]);
                            localVar4 = (_index + INT32_C(1));
                            *((int32_t *) &wasm_heap[___stack__ + 8]) = localVar7;
                            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(115);
                            localVar11 = _string;
                            int32_t tmp_6 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar11 + 0]) << INT32_C(3)) + INT32_C(100)) + 0]);
                            localVar5 = (*(int32_t (*)(int32_t, int32_t)) wasm_table[tmp_6])(localVar11, _i);
                            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(115))) {
                                goto block_1;
                            }
                            if ((localVar7 == INT32_C(0))) {
                                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                                *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(121);
                                teavm_throwNullPointerException();
                                goto block_1;
                            }
                            localVar7 = localVar7;
                            if ((_index < INT32_C(0))) {
                                goto block_4;
                            }
                            if ((_index >= *((int32_t *) &wasm_heap[(localVar7 + INT32_C(8)) + 0]))) {
                                goto block_4;
                            }
                            *((uint16_t *) &wasm_heap[((localVar7 + INT32_C(12)) + (_index << INT32_C(1))) + 0]) = localVar5;
                            _i = (_i + INT32_C(1));
                            _index = localVar4;
                            goto block_5;
                        } while(0);
                        block_3: ;
                        goto block_2;
                        block_4: ;
                        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(122);
                        teavm_throwArrayIndexOutOfBoundsException();
                        goto block_1;
                    }
                    localVar7 = *((int32_t *) &wasm_heap[_this + 8]);
                    *((int32_t *) &wasm_heap[___stack__ + 8]) = localVar7;
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(114);
                    localVar11 = _string;
                    int32_t tmp_7 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar11 + 0]) << INT32_C(3)) + INT32_C(96)) + 0]);
                    localVar8 = (*(int32_t (*)(int32_t)) wasm_table[tmp_7])(localVar11);
                    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(114))) {
                        goto block_1;
                    }
                    localVar5 = (_i + localVar8);
                    localVar9 = *((int32_t *) &wasm_heap[_this + 8]);
                    if ((localVar9 == INT32_C(0))) {
                        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(117);
                        teavm_throwNullPointerException();
                        goto block_1;
                    }
                    localVar9 = localVar9;
                    if ((_i < INT32_C(0))) {
                        goto block_6;
                    }
                    if ((_i >= *((int32_t *) &wasm_heap[(localVar9 + INT32_C(8)) + 0]))) {
                        goto block_6;
                    }
                    localVar8 = (int32_t) *((uint16_t *) &wasm_heap[((localVar9 + INT32_C(12)) + (_i << INT32_C(1))) + 0]);
                    if ((localVar7 == INT32_C(0))) {
                        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(119);
                        teavm_throwNullPointerException();
                        goto block_1;
                    }
                    localVar7 = localVar7;
                    if ((localVar5 < INT32_C(0))) {
                        goto block_7;
                    }
                    if ((localVar5 >= *((int32_t *) &wasm_heap[(localVar7 + INT32_C(8)) + 0]))) {
                        goto block_7;
                    }
                    *((uint16_t *) &wasm_heap[((localVar7 + INT32_C(12)) + (localVar5 << INT32_C(1))) + 0]) = localVar8;
                    _i = (_i + INT32_C(-1));
                    goto block_8;
                } while(0);
                block_7: ;
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(120);
                teavm_throwArrayIndexOutOfBoundsException();
                goto block_1;
                block_6: ;
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(118);
                teavm_throwArrayIndexOutOfBoundsException();
            }
        }
    }
    block_1: ;
    _this = INT32_C(0);
    block_2: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _this;
}

static int32_t meth_jl_AbstractStringBuilder_append_2(int32_t _this, int32_t _value) {
    int32_t localVar2;
    int32_t ___stack__;
    int32_t localVar4;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(123);
    localVar4 = _this;
    int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar4 + 0]) << INT32_C(3)) + INT32_C(108)) + 0]);
    localVar2 = (*(int32_t (*)(int32_t, int32_t, int32_t)) wasm_table[tmp_0])(localVar4, _value, INT32_C(10));
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(123))) {
        localVar2 = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar2;
}

static int32_t meth_jl_AbstractStringBuilder_append(int32_t _this, int32_t _value, int32_t _radix) {
    int32_t localVar3;
    int32_t localVar4;
    int32_t ___stack__;
    int32_t localVar6;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    localVar3 = *((int32_t *) &wasm_heap[_this + 12]);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(124);
    localVar6 = _this;
    int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar6 + 0]) << INT32_C(3)) + INT32_C(116)) + 0]);
    localVar4 = (*(int32_t (*)(int32_t, int32_t, int32_t, int32_t)) wasm_table[tmp_0])(localVar6, localVar3, _value, _radix);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(124))) {
        localVar4 = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar4;
}

static int32_t meth_jl_AbstractStringBuilder_insert_2(int32_t _this, int32_t _target, int32_t _value, int32_t _radix) {
    int32_t _positive;
    int32_t localVar5;
    int32_t localVar6;
    int32_t localVar7;
    int32_t _pos;
    int32_t _sz;
    int32_t _posLimit;
    int32_t localVar11;
    int32_t localVar12;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    _positive = INT32_C(1);
    if ((_value < INT32_C(0))) {
        _positive = INT32_C(0);
        _value = (INT32_C(0) - _value);
    }
    if ((_value < _radix)) {
        if (_positive) {
            localVar5 = (_target + INT32_C(1));
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(125);
            meth_jl_AbstractStringBuilder_insertSpace(_this, _target, localVar5);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(125))) {
                goto block_0;
            }
            localVar5 = _target;
        } else {
            localVar5 = (_target + INT32_C(2));
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(126);
            meth_jl_AbstractStringBuilder_insertSpace(_this, _target, localVar5);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(126))) {
                goto block_0;
            }
            localVar6 = *((int32_t *) &wasm_heap[_this + 8]);
            localVar5 = (_target + INT32_C(1));
            if ((localVar6 == INT32_C(0))) {
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(130);
                teavm_throwNullPointerException();
                goto block_0;
            }
            localVar6 = localVar6;
            int32_t tmp_0;
            if ((_target < INT32_C(0))) {
                tmp_0 = INT32_C(0);
                goto block_1;
            }
            tmp_0 = (_target < *((int32_t *) &wasm_heap[(localVar6 + INT32_C(8)) + 0]));
            block_1: ;
            if (tmp_0) {
                *((uint16_t *) &wasm_heap[((localVar6 + INT32_C(12)) + (_target << INT32_C(1))) + 0]) = INT32_C(45);
            } else {
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(131);
                teavm_throwArrayIndexOutOfBoundsException();
                goto block_0;
            }
        }
        localVar6 = *((int32_t *) &wasm_heap[_this + 8]);
        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar6;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(127);
        localVar7 = meth_jl_Character_forDigit(_value, _radix);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(127))) {
            goto block_0;
        }
        if ((localVar6 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(132);
            teavm_throwNullPointerException();
            goto block_0;
        }
        localVar6 = localVar6;
        int32_t tmp_1;
        if ((localVar5 < INT32_C(0))) {
            tmp_1 = INT32_C(0);
            goto block_2;
        }
        tmp_1 = (localVar5 < *((int32_t *) &wasm_heap[(localVar6 + INT32_C(8)) + 0]));
        block_2: ;
        if (tmp_1) {
            *((uint16_t *) &wasm_heap[((localVar6 + INT32_C(12)) + (localVar5 << INT32_C(1))) + 0]) = localVar7;
            goto block_3;
        }
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(133);
        teavm_throwArrayIndexOutOfBoundsException();
        goto block_0;
    }
    _pos = INT32_C(1);
    _sz = INT32_C(1);
    _posLimit = (INT32_C(2147483647) / _radix);
    block_6: do {
        localVar11 = (_pos * _radix);
        if ((localVar11 > _value)) {
            localVar11 = _pos;
            goto block_4;
        }
        _sz = (_sz + INT32_C(1));
        if ((localVar11 > _posLimit)) {
            goto block_5;
        }
        _pos = localVar11;
        goto block_6;
    } while(0);
    block_5: ;
    block_4: ;
    if ((_positive == INT32_C(0))) {
        _sz = (_sz + INT32_C(1));
    }
    localVar7 = (_target + _sz);
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(128);
    meth_jl_AbstractStringBuilder_insertSpace(_this, _target, localVar7);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(128))) {
        goto block_0;
    }
    if (_positive) {
        localVar5 = _target;
    } else {
        localVar6 = *((int32_t *) &wasm_heap[_this + 8]);
        localVar5 = (_target + INT32_C(1));
        if ((localVar6 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(134);
            teavm_throwNullPointerException();
            goto block_0;
        }
        localVar6 = localVar6;
        int32_t tmp_2;
        if ((_target < INT32_C(0))) {
            tmp_2 = INT32_C(0);
            goto block_7;
        }
        tmp_2 = (_target < *((int32_t *) &wasm_heap[(localVar6 + INT32_C(8)) + 0]));
        block_7: ;
        if (tmp_2) {
            *((uint16_t *) &wasm_heap[((localVar6 + INT32_C(12)) + (_target << INT32_C(1))) + 0]) = INT32_C(45);
        } else {
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(135);
            teavm_throwArrayIndexOutOfBoundsException();
            goto block_0;
        }
    }
    block_9: do {
        if ((localVar11 <= INT32_C(0))) {
            goto block_3;
        }
        localVar6 = *((int32_t *) &wasm_heap[_this + 8]);
        localVar7 = (localVar5 + INT32_C(1));
        localVar12 = (_value / localVar11);
        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar6;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(129);
        localVar12 = meth_jl_Character_forDigit(localVar12, _radix);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(129))) {
            goto block_0;
        }
        if ((localVar6 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(136);
            teavm_throwNullPointerException();
            goto block_0;
        }
        localVar6 = localVar6;
        if ((localVar5 < INT32_C(0))) {
            goto block_8;
        }
        if ((localVar5 >= *((int32_t *) &wasm_heap[(localVar6 + INT32_C(8)) + 0]))) {
            goto block_8;
        }
        *((uint16_t *) &wasm_heap[((localVar6 + INT32_C(12)) + (localVar5 << INT32_C(1))) + 0]) = localVar12;
        _value = (_value % localVar11);
        localVar11 = (localVar11 / _radix);
        localVar5 = localVar7;
        goto block_9;
    } while(0);
    block_3: ;
    goto block_10;
    block_8: ;
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(137);
    teavm_throwArrayIndexOutOfBoundsException();
    block_0: ;
    _this = INT32_C(0);
    block_10: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _this;
}

static int32_t meth_jl_AbstractStringBuilder_append_3(int32_t _this, int32_t _c) {
    int32_t localVar2;
    int32_t localVar3;
    int32_t ___stack__;
    int32_t localVar5;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    localVar2 = *((int32_t *) &wasm_heap[_this + 12]);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(138);
    localVar5 = _this;
    int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar5 + 0]) << INT32_C(3)) + INT32_C(96)) + 0]);
    localVar3 = (*(int32_t (*)(int32_t, int32_t, int32_t)) wasm_table[tmp_0])(localVar5, localVar2, _c);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(138))) {
        localVar3 = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar3;
}

static int32_t meth_jl_AbstractStringBuilder_insert(int32_t _this, int32_t _index, int32_t _c) {
    int32_t localVar3;
    int32_t localVar4;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    localVar3 = (_index + INT32_C(1));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(139);
    meth_jl_AbstractStringBuilder_insertSpace(_this, _index, localVar3);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(139))) {
        localVar4 = *((int32_t *) &wasm_heap[_this + 8]);
        if ((localVar4 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(140);
            teavm_throwNullPointerException();
        } else {
            localVar4 = localVar4;
            int32_t tmp_0;
            if ((_index < INT32_C(0))) {
                tmp_0 = INT32_C(0);
                goto block_0;
            }
            tmp_0 = (_index < *((int32_t *) &wasm_heap[(localVar4 + INT32_C(8)) + 0]));
            block_0: ;
            if (tmp_0) {
                *((uint16_t *) &wasm_heap[((localVar4 + INT32_C(12)) + (_index << INT32_C(1))) + 0]) = _c;
                goto block_1;
            }
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(141);
            teavm_throwArrayIndexOutOfBoundsException();
        }
    }
    _this = INT32_C(0);
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _this;
}

static int32_t meth_jl_AbstractStringBuilder_insert_0(int32_t _this, int32_t _index, int32_t _obj) {
    int32_t localVar3;
    int32_t ___stack__;
    int32_t localVar5;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    if ((_obj == INT32_C(0))) {
        localVar3 = INT32_C(7216);
    } else {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(142);
        localVar5 = _obj;
        int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar5 + 0]) << INT32_C(3)) + INT32_C(88)) + 0]);
        localVar3 = (*(int32_t (*)(int32_t)) wasm_table[tmp_0])(localVar5);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(142))) {
            goto block_0;
        }
    }
    *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar3;
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(143);
    localVar5 = _this;
    int32_t tmp_1 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar5 + 0]) << INT32_C(3)) + INT32_C(112)) + 0]);
    localVar3 = (*(int32_t (*)(int32_t, int32_t, int32_t)) wasm_table[tmp_1])(localVar5, _index, localVar3);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(143))) {
        goto block_1;
    }
    block_0: ;
    localVar3 = INT32_C(0);
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar3;
}

static void meth_jl_AbstractStringBuilder_ensureCapacity(int32_t _this, int32_t _capacity) {
    int32_t localVar2;
    int32_t _newLength;
    int32_t localVar4;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    localVar2 = *((int32_t *) &wasm_heap[_this + 8]);
    if ((localVar2 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(145);
        teavm_throwNullPointerException();
    } else {
        if ((*((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]) >= _capacity)) {
            goto block_0;
        }
        localVar2 = *((int32_t *) &wasm_heap[_this + 8]);
        if ((localVar2 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(146);
            teavm_throwNullPointerException();
        } else {
            if ((*((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]) >= INT32_C(1073741823))) {
                _newLength = INT32_C(2147483647);
            } else {
                localVar2 = *((int32_t *) &wasm_heap[_this + 8]);
                if ((localVar2 == INT32_C(0))) {
                    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(149);
                    teavm_throwNullPointerException();
                    goto block_1;
                }
                localVar4 = (*((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]) * INT32_C(2));
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(147);
                localVar4 = meth_jl_Math_max(localVar4, INT32_C(5));
                if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(147))) {
                    goto block_1;
                }
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(148);
                _newLength = meth_jl_Math_max(_capacity, localVar4);
                if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(148))) {
                    goto block_1;
                }
            }
            localVar2 = *((int32_t *) &wasm_heap[_this + 8]);
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar2;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(144);
            localVar2 = meth_ju_Arrays_copyOf(localVar2, _newLength);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(144))) {
                wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
                *((int32_t *) &wasm_heap[_this + 8]) = localVar2;
                goto block_0;
            }
        }
    }
    block_1: ;
    block_0: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static int32_t meth_jl_AbstractStringBuilder_toString(int32_t _this) {
    int32_t localVar1;
    int32_t localVar2;
    int32_t localVar3;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(2));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(150);
    localVar1 = meth_otr_Allocator_allocate(INT32_C(3840));
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(150))) {
        localVar2 = *((int32_t *) &wasm_heap[_this + 8]);
        localVar3 = *((int32_t *) &wasm_heap[_this + 12]);
        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar1;
        *((int32_t *) &wasm_heap[___stack__ + 8]) = localVar2;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(151);
        meth_jl_String__init__0(localVar1, localVar2, INT32_C(0), localVar3);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(151))) {
            goto block_0;
        }
    }
    localVar1 = INT32_C(0);
    block_0: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar1;
}

static void meth_jl_AbstractStringBuilder_setLength(int32_t _this, int32_t _newLength) {
    *((int32_t *) &wasm_heap[_this + 12]) = _newLength;
}

static void meth_jl_AbstractStringBuilder_insertSpace(int32_t _this, int32_t _start, int32_t _end) {
    int32_t _sz;
    int32_t localVar4;
    int32_t _i;
    int32_t localVar6;
    int32_t localVar7;
    int32_t localVar8;
    int32_t ___stack__;
    int32_t localVar10;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    _sz = (*((int32_t *) &wasm_heap[_this + 12]) - _start);
    localVar4 = ((*((int32_t *) &wasm_heap[_this + 12]) + _end) - _start);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(152);
    localVar10 = _this;
    int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar10 + 0]) << INT32_C(3)) + INT32_C(104)) + 0]);
    (*(void (*)(int32_t, int32_t)) wasm_table[tmp_0])(localVar10, localVar4);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(152))) {
        _i = (_sz - INT32_C(1));
        block_4: do {
            if ((_i < INT32_C(0))) {
                goto block_0;
            }
            localVar6 = *((int32_t *) &wasm_heap[_this + 8]);
            localVar4 = (_end + _i);
            localVar7 = *((int32_t *) &wasm_heap[_this + 8]);
            localVar8 = (_start + _i);
            if ((localVar7 == INT32_C(0))) {
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(153);
                teavm_throwNullPointerException();
                goto block_1;
            }
            localVar7 = localVar7;
            if ((localVar8 < INT32_C(0))) {
                goto block_2;
            }
            if ((localVar8 >= *((int32_t *) &wasm_heap[(localVar7 + INT32_C(8)) + 0]))) {
                goto block_2;
            }
            localVar8 = (int32_t) *((uint16_t *) &wasm_heap[((localVar7 + INT32_C(12)) + (localVar8 << INT32_C(1))) + 0]);
            if ((localVar6 == INT32_C(0))) {
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(155);
                teavm_throwNullPointerException();
                goto block_1;
            }
            localVar6 = localVar6;
            if ((localVar4 < INT32_C(0))) {
                goto block_3;
            }
            if ((localVar4 >= *((int32_t *) &wasm_heap[(localVar6 + INT32_C(8)) + 0]))) {
                goto block_3;
            }
            *((uint16_t *) &wasm_heap[((localVar6 + INT32_C(12)) + (localVar4 << INT32_C(1))) + 0]) = localVar8;
            _i = (_i + INT32_C(-1));
            goto block_4;
        } while(0);
        block_0: ;
        *((int32_t *) &wasm_heap[_this + 12]) = (*((int32_t *) &wasm_heap[_this + 12]) + (_end - _start));
        goto block_5;
        block_3: ;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(156);
        teavm_throwArrayIndexOutOfBoundsException();
        goto block_1;
        block_2: ;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(154);
        teavm_throwArrayIndexOutOfBoundsException();
    }
    block_1: ;
    block_5: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otr_ExceptionHandling_printStack() {
    int32_t _stackFrame;
    int32_t _callSiteId;
    int32_t _location;
    int32_t _methodLocation;
    _stackFrame = meth_otbw_WasmRuntime_getStackTop();
    block_5: do {
        if ((_stackFrame == INT32_C(0))) {
            goto block_0;
        }
        _callSiteId = meth_otbw_WasmRuntime_getCallSiteId(_stackFrame);
        if (INT32_C(0)) {
            meth_otbw_WasmRuntime_printString(INT32_C(7252));
            meth_otbw_WasmRuntime_printInt(_callSiteId);
            meth_otbw_WasmRuntime_printString(INT32_C(7364));
        } else {
            _location = *((int32_t *) &wasm_heap[(INT32_C(9292) + (_callSiteId * INT32_C(8))) + 4]);
            block_4: do {
                if ((_location == INT32_C(0))) {
                    goto block_1;
                }
                _methodLocation = *((int32_t *) &wasm_heap[_location + 0]);
                if ((_methodLocation != INT32_C(0))) {
                    meth_otbw_WasmRuntime_printString(INT32_C(7396));
                    int32_t tmp_0;
                    if ((*((int32_t *) &wasm_heap[_methodLocation + 4]) == INT32_C(0))) {
                        tmp_0 = INT32_C(0);
                        goto block_2;
                    }
                    tmp_0 = (*((int32_t *) &wasm_heap[_methodLocation + 8]) != INT32_C(0));
                    block_2: ;
                    if (tmp_0) {
                        meth_otbw_WasmRuntime_printString(*((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_methodLocation + 4]) + 0]));
                        meth_otbw_WasmRuntime_printString(INT32_C(7432));
                        meth_otbw_WasmRuntime_printString(*((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_methodLocation + 8]) + 0]));
                    } else {
                        meth_otbw_WasmRuntime_printString(INT32_C(7464));
                    }
                    meth_otbw_WasmRuntime_printString(INT32_C(7524));
                    int32_t tmp_1;
                    if ((*((int32_t *) &wasm_heap[_methodLocation + 0]) == INT32_C(0))) {
                        tmp_1 = INT32_C(0);
                        goto block_3;
                    }
                    tmp_1 = (*((int32_t *) &wasm_heap[_location + 4]) >= INT32_C(0));
                    block_3: ;
                    if (tmp_1) {
                        meth_otbw_WasmRuntime_printString(*((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_methodLocation + 0]) + 0]));
                        meth_otbw_WasmRuntime_printString(INT32_C(7556));
                        meth_otbw_WasmRuntime_printInt(*((int32_t *) &wasm_heap[_location + 4]));
                    }
                    meth_otbw_WasmRuntime_printString(INT32_C(7364));
                }
                _location = *((int32_t *) &wasm_heap[_location + 8]);
                goto block_4;
            } while(0);
        }
        block_1: ;
        _stackFrame = meth_otbw_WasmRuntime_getNextStackFrame(_stackFrame);
        goto block_5;
    } while(0);
    block_0: ;
}

int32_t teavm_catchException() {
    int32_t _exception;
    _exception = *((int32_t *) &wasm_heap[INT32_C(3396) + 0]);
    *((int32_t *) &wasm_heap[INT32_C(3396) + 0]) = INT32_C(0);
    return _exception;
}

static void meth_otr_ExceptionHandling_throwException(int32_t _exception) {
    int32_t _exceptionClass;
    int32_t _stackFrame;
    int32_t _handlerId;
    int32_t _callSiteId;
    int32_t _handler;
    int32_t localVar6;
    *((int32_t *) &wasm_heap[INT32_C(3396) + 0]) = _exception;
    _exceptionClass = meth_otr_RuntimeClass_getClass(_exception);
    _stackFrame = meth_otbw_WasmRuntime_getStackTop();
    _handlerId = INT32_C(0);
    block_4: do {
        if ((_stackFrame == INT32_C(0))) {
            goto block_0;
        }
        _callSiteId = meth_otbw_WasmRuntime_getCallSiteId(_stackFrame);
        if ((_callSiteId >= INT32_C(0))) {
            _handler = *((int32_t *) &wasm_heap[(INT32_C(9292) + (_callSiteId * INT32_C(8))) + 0]);
            block_3: do {
                if ((_handler == INT32_C(0))) {
                    goto block_1;
                }
                if ((*((int32_t *) &wasm_heap[_handler + 4]) == INT32_C(0))) {
                    goto block_2;
                }
                int32_t tmp_0 = *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_handler + 4]) + 48]);
                if ((*(int32_t (*)(int32_t)) wasm_table[tmp_0])(_exceptionClass)) {
                    goto block_2;
                }
                _handler = *((int32_t *) &wasm_heap[_handler + 8]);
                goto block_3;
            } while(0);
            block_1: ;
            if ((INT32_C(0) == INT32_C(0))) {
                meth_otbw_WasmRuntime_setExceptionHandlerId(_stackFrame, (_callSiteId - INT32_C(1)));
            }
        }
        _stackFrame = meth_otbw_WasmRuntime_getNextStackFrame(_stackFrame);
        goto block_4;
    } while(0);
    block_0: ;
    goto block_5;
    block_2: ;
    _handlerId = *((int32_t *) &wasm_heap[_handler + 0]);
    if ((INT32_C(0) == INT32_C(0))) {
        meth_otbw_WasmRuntime_setExceptionHandlerId(_stackFrame, _handlerId);
    }
    block_5: ;
    if ((_stackFrame == INT32_C(0))) {
        localVar6 = meth_otbw_WasmRuntime_getStackTop();
        block_7: do {
            if ((localVar6 == INT32_C(0))) {
                goto block_6;
            }
            _callSiteId = meth_otbw_WasmRuntime_getCallSiteId(localVar6);
            if ((_callSiteId >= INT32_C(0))) {
                meth_otbw_WasmRuntime_setExceptionHandlerId(localVar6, (_callSiteId + INT32_C(1)));
            }
            localVar6 = meth_otbw_WasmRuntime_getNextStackFrame(localVar6);
            goto block_7;
        } while(0);
        block_6: ;
        meth_otr_ExceptionHandling_printStack();
        assert(0);
    } else {
        if (INT32_C(0)) {
            assert(0);
        }
    }
}

void teavm_throwNullPointerException() {
    int32_t localVar0;
    localVar0 = meth_otr_Allocator_allocate(INT32_C(1720));
    meth_jl_NullPointerException__init_(localVar0);
    meth_otr_ExceptionHandling_throwException(localVar0);
}

void teavm_throwArrayIndexOutOfBoundsException() {
    int32_t localVar0;
    localVar0 = meth_otr_Allocator_allocate(INT32_C(4384));
    meth_jl_ArrayIndexOutOfBoundsException__init_(localVar0);
    meth_otr_ExceptionHandling_throwException(localVar0);
}

static int32_t meth_otr_ExceptionHandling_callStackSize() {
    int32_t _stackFrame;
    int32_t _size;
    int32_t _callSiteId;
    int32_t _location;
    _stackFrame = meth_otbw_WasmRuntime_getStackTop();
    _size = INT32_C(0);
    block_4: do {
        if ((_stackFrame == INT32_C(0))) {
            goto block_0;
        }
        _callSiteId = meth_otbw_WasmRuntime_getCallSiteId(_stackFrame);
        if ((_callSiteId >= INT32_C(0))) {
            _location = *((int32_t *) &wasm_heap[(INT32_C(9292) + (_callSiteId * INT32_C(8))) + 4]);
            int32_t tmp_0;
            if ((INT32_C(0) != INT32_C(0))) {
                tmp_0 = INT32_C(0);
                goto block_1;
            }
            tmp_0 = (_location != INT32_C(0));
            block_1: ;
            if (tmp_0) {
                block_3: do {
                    if ((_location == INT32_C(0))) {
                        goto block_2;
                    }
                    _size = (_size + INT32_C(1));
                    _location = *((int32_t *) &wasm_heap[_location + 8]);
                    goto block_3;
                } while(0);
                block_2: ;
            } else {
                _size = (_size + INT32_C(1));
            }
        }
        _stackFrame = meth_otbw_WasmRuntime_getNextStackFrame(_stackFrame);
        goto block_4;
    } while(0);
    block_0: ;
    return _size;
}

static int32_t meth_otr_ExceptionHandling_fillStackTrace() {
    int32_t _stackFrame;
    int32_t _size;
    int32_t _target;
    int32_t _index;
    int32_t _callSiteId;
    int32_t _location;
    int32_t localVar6;
    int32_t localVar7;
    int32_t localVar8;
    int32_t localVar9;
    int32_t _methodLocation;
    int32_t _element;
    int32_t ___stack__;
    int32_t localVar13;
    _stackFrame = meth_otbw_WasmRuntime_getStackTop();
    _size = meth_otr_ExceptionHandling_callStackSize();
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    _target = meth_otr_Allocator_allocateArray(INT32_C(7680), _size);
    *((int32_t *) &wasm_heap[___stack__ + 4]) = _target;
    _index = INT32_C(0);
    block_6: do {
        if ((_stackFrame == INT32_C(0))) {
            goto block_0;
        }
        _callSiteId = meth_otbw_WasmRuntime_getCallSiteId(_stackFrame);
        if ((_callSiteId >= INT32_C(0))) {
            _location = *((int32_t *) &wasm_heap[(INT32_C(9292) + (_callSiteId * INT32_C(8))) + 4]);
            if (INT32_C(0)) {
                localVar6 = _target;
                localVar7 = (_index + INT32_C(1));
                localVar13 = meth_otr_Allocator_allocate(INT32_C(3728));
                meth_jl_StackTraceElement__init_(localVar13, INT32_C(7780), INT32_C(7828), INT32_C(7876), _callSiteId);
                localVar8 = localVar13;
                if ((_index < INT32_C(0))) {
                    goto block_1;
                }
                if ((_index >= *((int32_t *) &wasm_heap[(localVar6 + INT32_C(8)) + 0]))) {
                    goto block_1;
                }
                wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((localVar6 - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
                *((int32_t *) &wasm_heap[((localVar6 + INT32_C(12)) + (_index << INT32_C(2))) + 0]) = localVar8;
                _index = localVar7;
            } else {
                if ((_location == INT32_C(0))) {
                    localVar6 = _target;
                    localVar7 = (_index + INT32_C(1));
                    localVar13 = meth_otr_Allocator_allocate(INT32_C(3728));
                    meth_jl_StackTraceElement__init_(localVar13, INT32_C(7936), INT32_C(7936), INT32_C(0), INT32_C(-1));
                    localVar9 = localVar13;
                    if ((_index < INT32_C(0))) {
                        goto block_2;
                    }
                    if ((_index >= *((int32_t *) &wasm_heap[(localVar6 + INT32_C(8)) + 0]))) {
                        goto block_2;
                    }
                    wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((localVar6 - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
                    *((int32_t *) &wasm_heap[((localVar6 + INT32_C(12)) + (_index << INT32_C(2))) + 0]) = localVar9;
                    _index = localVar7;
                } else {
                    block_5: do {
                        if ((_location == INT32_C(0))) {
                            goto block_3;
                        }
                        _methodLocation = *((int32_t *) &wasm_heap[_location + 0]);
                        int32_t tmp_0;
                        if ((_methodLocation == INT32_C(0))) {
                            localVar13 = meth_otr_Allocator_allocate(INT32_C(3728));
                            meth_jl_StackTraceElement__init_(localVar13, INT32_C(7936), INT32_C(7936), INT32_C(0), *((int32_t *) &wasm_heap[_location + 4]));
                            tmp_0 = localVar13;
                        } else {
                            localVar13 = meth_otr_Allocator_allocate(INT32_C(3728));
                            meth_jl_StackTraceElement__init_(localVar13, ((*((int32_t *) &wasm_heap[_methodLocation + 4]) == INT32_C(0)) ? INT32_C(7936) : *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_methodLocation + 4]) + 0])), ((*((int32_t *) &wasm_heap[_methodLocation + 8]) == INT32_C(0)) ? INT32_C(7936) : *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_methodLocation + 8]) + 0])), ((*((int32_t *) &wasm_heap[_methodLocation + 0]) == INT32_C(0)) ? INT32_C(0) : *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_methodLocation + 0]) + 0])), *((int32_t *) &wasm_heap[_location + 4]));
                            tmp_0 = localVar13;
                        }
                        _element = tmp_0;
                        localVar6 = _target;
                        localVar7 = (_index + INT32_C(1));
                        if ((_index < INT32_C(0))) {
                            goto block_4;
                        }
                        if ((_index >= *((int32_t *) &wasm_heap[(localVar6 + INT32_C(8)) + 0]))) {
                            goto block_4;
                        }
                        wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((localVar6 - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
                        *((int32_t *) &wasm_heap[((localVar6 + INT32_C(12)) + (_index << INT32_C(2))) + 0]) = _element;
                        _location = *((int32_t *) &wasm_heap[_location + 8]);
                        _index = localVar7;
                        goto block_5;
                    } while(0);
                    block_3: ;
                }
            }
        }
        _stackFrame = meth_otbw_WasmRuntime_getNextStackFrame(_stackFrame);
        goto block_6;
    } while(0);
    block_0: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return _target;
    block_4: ;
    teavm_throwArrayIndexOutOfBoundsException();
    goto block_7;
    block_2: ;
    teavm_throwArrayIndexOutOfBoundsException();
    goto block_7;
    block_1: ;
    teavm_throwArrayIndexOutOfBoundsException();
    block_7: ;
    return INT32_C(0);
}

static void meth_otr_MarkQueue_init() {
    *((int32_t *) &wasm_heap[INT32_C(3500) + 0]) = INT32_C(0);
    *((int32_t *) &wasm_heap[INT32_C(3504) + 0]) = INT32_C(0);
    *((int32_t *) &wasm_heap[INT32_C(3508) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(3976) + 0]) / INT32_C(4));
}

static void meth_otr_MarkQueue_enqueue(int32_t _object) {
    int32_t localVar1;
    *((int32_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3972) + 0]) + (INT32_C(4) * *((int32_t *) &wasm_heap[INT32_C(3504) + 0]))) + 0]) = meth_otr_MarkQueue_pack(_object);
    localVar1 = (*((int32_t *) &wasm_heap[INT32_C(3504) + 0]) + INT32_C(1));
    *((int32_t *) &wasm_heap[INT32_C(3504) + 0]) = localVar1;
    if ((localVar1 >= *((int32_t *) &wasm_heap[INT32_C(3508) + 0]))) {
        *((int32_t *) &wasm_heap[INT32_C(3504) + 0]) = INT32_C(0);
    }
    if ((*((int32_t *) &wasm_heap[INT32_C(3504) + 0]) == *((int32_t *) &wasm_heap[INT32_C(3500) + 0]))) {
        meth_otr_ExceptionHandling_printStack();
        meth_otbw_WasmRuntime_printOutOfMemory();
        assert(0);
    }
}

static int32_t meth_otr_MarkQueue_dequeue() {
    int32_t _result;
    int32_t localVar1;
    _result = meth_otr_MarkQueue_unpack(*((int32_t *) &wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3972) + 0]) + (INT32_C(4) * *((int32_t *) &wasm_heap[INT32_C(3500) + 0]))) + 0]));
    localVar1 = (*((int32_t *) &wasm_heap[INT32_C(3500) + 0]) + INT32_C(1));
    *((int32_t *) &wasm_heap[INT32_C(3500) + 0]) = localVar1;
    if ((localVar1 >= *((int32_t *) &wasm_heap[INT32_C(3508) + 0]))) {
        *((int32_t *) &wasm_heap[INT32_C(3500) + 0]) = INT32_C(0);
    }
    return _result;
}

static int32_t meth_otr_MarkQueue_pack(int32_t _address) {
    return (int32_t) (int64_t) ((uint64_t) ((uint64_t) _address - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) >> (uint64_t) INT32_C(2));
}

static int32_t meth_otr_MarkQueue_unpack(int32_t _packed) {
    return (*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + (uint32_t) ((int64_t) _packed << (uint64_t) INT32_C(2)));
}

static int32_t meth_otr_MarkQueue_isEmpty() {
    return ((*((int32_t *) &wasm_heap[INT32_C(3500) + 0]) != *((int32_t *) &wasm_heap[INT32_C(3504) + 0])) ? INT32_C(0) : INT32_C(1));
}

static void meth_otbwr_WasmSupport_runWithArgs_lambda__15_0__init_(int32_t localVar0, int32_t localVar1) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(157);
    meth_jl_Object__init_(localVar0);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(157))) {
        wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((localVar0 - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
        *((int32_t *) &wasm_heap[localVar0 + 8]) = localVar1;
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otbwr_WasmSupport_runWithArgs_lambda__15_0_run(int32_t localVar0) {
    int32_t localVar1;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    localVar1 = *((int32_t *) &wasm_heap[localVar0 + 8]);
    *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar1;
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(158);
    meth_otbwr_WasmSupport_lambda_runWithArgs_1(localVar1);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_StackTraceElement__init_(int32_t _this, int32_t _declaringClass, int32_t _methodName, int32_t _fileName, int32_t _lineNumber) {
    int32_t localVar5;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(159);
    meth_jl_Object__init_(_this);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(159))) {
        int32_t tmp_0;
        if ((_declaringClass == INT32_C(0))) {
            tmp_0 = INT32_C(0);
            goto block_0;
        }
        tmp_0 = (_methodName != INT32_C(0));
        block_0: ;
        if (tmp_0) {
            wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
            *((int32_t *) &wasm_heap[_this + 8]) = _declaringClass;
            *((int32_t *) &wasm_heap[_this + 12]) = _methodName;
            *((int32_t *) &wasm_heap[_this + 16]) = _fileName;
            *((int32_t *) &wasm_heap[_this + 20]) = _lineNumber;
        } else {
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(160);
            localVar5 = meth_otr_Allocator_allocate(INT32_C(1720));
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(160))) {
                *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar5;
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(161);
                meth_jl_NullPointerException__init_(localVar5);
                if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(161))) {
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(162);
                    meth_otr_ExceptionHandling_throwException(localVar5);
                }
            }
        }
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_String__init__0(int32_t _this, int32_t _value, int32_t _offset, int32_t _count) {
    int32_t localVar4;
    int32_t _i;
    int32_t localVar6;
    int32_t localVar7;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(3852) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(172);
        initclass_jl_String();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(172))) {
            goto block_0;
        }
    }
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(170);
    meth_jl_Object__init_(_this);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(170))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(171);
        localVar4 = meth_otr_Allocator_allocateArray(INT32_C(5392), _count);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(171))) {
            wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
            *((int32_t *) &wasm_heap[_this + 8]) = localVar4;
            _i = INT32_C(0);
            block_4: do {
                if ((_i >= _count)) {
                    goto block_1;
                }
                localVar4 = *((int32_t *) &wasm_heap[_this + 8]);
                localVar6 = (_i + _offset);
                if ((_value == INT32_C(0))) {
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(173);
                    teavm_throwNullPointerException();
                    goto block_0;
                }
                localVar7 = _value;
                if ((localVar6 < INT32_C(0))) {
                    goto block_2;
                }
                if ((localVar6 >= *((int32_t *) &wasm_heap[(localVar7 + INT32_C(8)) + 0]))) {
                    goto block_2;
                }
                localVar6 = (int32_t) *((uint16_t *) &wasm_heap[((localVar7 + INT32_C(12)) + (localVar6 << INT32_C(1))) + 0]);
                if ((localVar4 == INT32_C(0))) {
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(175);
                    teavm_throwNullPointerException();
                    goto block_0;
                }
                localVar4 = localVar4;
                if ((_i < INT32_C(0))) {
                    goto block_3;
                }
                if ((_i >= *((int32_t *) &wasm_heap[(localVar4 + INT32_C(8)) + 0]))) {
                    goto block_3;
                }
                *((uint16_t *) &wasm_heap[((localVar4 + INT32_C(12)) + (_i << INT32_C(1))) + 0]) = localVar6;
                _i = (_i + INT32_C(1));
                goto block_4;
            } while(0);
            block_1: ;
            goto block_5;
            block_3: ;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(176);
            teavm_throwArrayIndexOutOfBoundsException();
            goto block_0;
            block_2: ;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(174);
            teavm_throwArrayIndexOutOfBoundsException();
        }
    }
    block_0: ;
    block_5: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_String__init__1(int32_t _this, int32_t _length) {
    int32_t localVar2;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(3852) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(179);
        initclass_jl_String();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(179))) {
            goto block_0;
        }
    }
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(177);
    meth_jl_Object__init_(_this);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(177))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(178);
        localVar2 = meth_otr_Allocator_allocateArray(INT32_C(5392), _length);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(178))) {
            wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
            *((int32_t *) &wasm_heap[_this + 8]) = localVar2;
            goto block_1;
        }
    }
    block_0: ;
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static int32_t meth_jl_String_allocate(int32_t _size) {
    int32_t localVar1;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    if (((*((int32_t *) &wasm_heap[INT32_C(3852) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(182);
        initclass_jl_String();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(182))) {
            goto block_0;
        }
    }
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(180);
    localVar1 = meth_otr_Allocator_allocate(INT32_C(3840));
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(180))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar1;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(181);
        meth_jl_String__init__1(localVar1, _size);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(181))) {
            goto block_1;
        }
    }
    block_0: ;
    localVar1 = INT32_C(0);
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar1;
}

static int32_t meth_jl_String_charAt(int32_t _this, int32_t _index) {
    int32_t localVar2;
    int32_t localVar3;
    int32_t localVar4;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    if ((_index >= INT32_C(0))) {
        localVar2 = *((int32_t *) &wasm_heap[_this + 8]);
        if ((localVar2 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(186);
            teavm_throwNullPointerException();
            goto block_0;
        }
        if ((_index < *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]))) {
            goto block_1;
        }
    }
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(183);
    localVar3 = meth_otr_Allocator_allocate(INT32_C(2672));
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(183))) {
        goto block_0;
    }
    *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar3;
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(184);
    meth_jl_StringIndexOutOfBoundsException__init_(localVar3);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(184))) {
        goto block_0;
    }
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(185);
    meth_otr_ExceptionHandling_throwException(localVar3);
    goto block_0;
    block_1: ;
    localVar2 = *((int32_t *) &wasm_heap[_this + 8]);
    if ((localVar2 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(187);
        teavm_throwNullPointerException();
    } else {
        localVar2 = localVar2;
        int32_t tmp_0;
        if ((_index < INT32_C(0))) {
            tmp_0 = INT32_C(0);
            goto block_2;
        }
        tmp_0 = (_index < *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]));
        block_2: ;
        if (tmp_0) {
            localVar4 = (int32_t) *((uint16_t *) &wasm_heap[((localVar2 + INT32_C(12)) + (_index << INT32_C(1))) + 0]);
            goto block_3;
        }
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(188);
        teavm_throwArrayIndexOutOfBoundsException();
    }
    block_0: ;
    localVar4 = INT32_C(0);
    block_3: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar4;
}

static int32_t meth_jl_String_length(int32_t _this) {
    int32_t localVar1;
    int32_t localVar2;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    localVar1 = *((int32_t *) &wasm_heap[_this + 8]);
    if ((localVar1 != INT32_C(0))) {
        localVar2 = *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]);
    } else {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(189);
        teavm_throwNullPointerException();
        localVar2 = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar2;
}

static int32_t meth_jl_String_isEmpty(int32_t _this) {
    int32_t localVar1;
    int32_t localVar2;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    localVar1 = *((int32_t *) &wasm_heap[_this + 8]);
    if ((localVar1 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(190);
        teavm_throwNullPointerException();
        localVar2 = INT32_C(0);
    } else {
        localVar2 = (*((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]) ? INT32_C(0) : INT32_C(1));
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar2;
}

static void meth_jl_String__clinit_() {
    int32_t localVar0;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(191);
    localVar0 = meth_otr_Allocator_allocate(INT32_C(4904));
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(191))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar0;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(192);
        meth_jl_String__clinit__lambda__84_0__init_(localVar0);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(192))) {
            *((int32_t *) &wasm_heap[INT32_C(3828) + 0]) = localVar0;
        }
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static int32_t meth_otbw_WasmHeap_calculateStorageSize(int32_t _heapSize) {
    return (_heapSize / INT32_C(16));
}

static int32_t meth_otbw_WasmHeap_calculateRegionsCount(int32_t _heapSize, int32_t _regionSize) {
    return ((_heapSize / _regionSize) + INT32_C(1));
}

static int32_t meth_otbw_WasmHeap_calculateRegionsSize(int32_t _regionsCount) {
    return (_regionsCount * INT32_C(2));
}

static void meth_otbw_WasmHeap_initHeap(int32_t _start, int32_t _minHeap, int32_t _maxHeap, int32_t _stackSize, int32_t _bufferSize) {
    *((int32_t *) &wasm_heap[INT32_C(4024) + 0]) = meth_otbw_WasmRuntime_align(_start, INT32_C(16));
    *((int32_t *) &wasm_heap[INT32_C(4028) + 0]) = _bufferSize;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = meth_otbw_WasmRuntime_align((*((int32_t *) &wasm_heap[INT32_C(4024) + 0]) + _bufferSize), INT32_C(16));
    *((int32_t *) &wasm_heap[INT32_C(4012) + 0]) = *((int32_t *) &wasm_heap[INT32_C(4016) + 0]);
    *((int32_t *) &wasm_heap[INT32_C(3996) + 0]) = meth_otbw_WasmRuntime_align((*((int32_t *) &wasm_heap[INT32_C(4012) + 0]) + _stackSize), INT32_C(16));
    *((int32_t *) &wasm_heap[INT32_C(4008) + 0]) = meth_otbw_WasmRuntime_align(_start, INT32_C(65536));
    *((int32_t *) &wasm_heap[INT32_C(3964) + 0]) = _minHeap;
    *((int32_t *) &wasm_heap[INT32_C(3968) + 0]) = _maxHeap;
    *((int32_t *) &wasm_heap[INT32_C(4020) + 0]) = _stackSize;
    meth_otbw_WasmHeap_resizeHeap(_minHeap);
}

static void meth_otbw_WasmHeap_resizeHeap(int32_t _newHeapSize) {
    int32_t _newStorageSize;
    int32_t _newRegionsCount;
    int32_t _newRegionsSize;
    int32_t _newRegionsAddress;
    int32_t _newCardTable;
    int32_t _newStorageAddress;
    int32_t _newMemoryLimit;
    if ((_newHeapSize <= *((int32_t *) &wasm_heap[INT32_C(4000) + 0]))) {
        return;
    }
    _newStorageSize = meth_otbw_WasmHeap_calculateStorageSize(_newHeapSize);
    _newRegionsCount = meth_otbw_WasmHeap_calculateRegionsCount(_newHeapSize, *((int32_t *) &wasm_heap[INT32_C(4004) + 0]));
    _newRegionsSize = meth_otbw_WasmHeap_calculateRegionsSize(_newRegionsCount);
    _newRegionsAddress = meth_otbw_WasmRuntime_align((*((int32_t *) &wasm_heap[INT32_C(3996) + 0]) + _newHeapSize), INT32_C(16));
    _newCardTable = meth_otbw_WasmRuntime_align((_newRegionsAddress + _newRegionsSize), INT32_C(16));
    _newStorageAddress = meth_otbw_WasmRuntime_align((_newCardTable + _newRegionsCount), INT32_C(16));
    _newMemoryLimit = meth_otbw_WasmRuntime_align((_newStorageAddress + _newStorageSize), INT32_C(65536));
    if ((_newMemoryLimit != *((int32_t *) &wasm_heap[INT32_C(4008) + 0]))) {
        wasm_heap_size += 65536 * (((int32_t) ((uint64_t) _newMemoryLimit - (uint64_t) *((int32_t *) &wasm_heap[INT32_C(4008) + 0])) / INT32_C(65536)));
        wasm_heap = realloc(wasm_heap, wasm_heap_size);
        *((int32_t *) &wasm_heap[INT32_C(4008) + 0]) = _newMemoryLimit;
    }
    if ((*((int32_t *) &wasm_heap[INT32_C(3976) + 0]) > INT32_C(0))) {
        meth_otbw_WasmRuntime_moveMemoryBlock(*((int32_t *) &wasm_heap[INT32_C(3972) + 0]), _newStorageAddress, *((int32_t *) &wasm_heap[INT32_C(3976) + 0]));
    }
    if ((*((int32_t *) &wasm_heap[INT32_C(3988) + 0]) > INT32_C(0))) {
        meth_otbw_WasmRuntime_moveMemoryBlock(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]), _newCardTable, *((int32_t *) &wasm_heap[INT32_C(3984) + 0]));
        meth_otbw_WasmRuntime_moveMemoryBlock(*((int32_t *) &wasm_heap[INT32_C(3980) + 0]), _newRegionsAddress, *((int32_t *) &wasm_heap[INT32_C(3988) + 0]));
    }
    *((int32_t *) &wasm_heap[INT32_C(3972) + 0]) = _newStorageAddress;
    *((int32_t *) &wasm_heap[INT32_C(3980) + 0]) = _newRegionsAddress;
    *((int32_t *) &wasm_heap[INT32_C(3992) + 0]) = _newCardTable;
    *((int32_t *) &wasm_heap[INT32_C(3976) + 0]) = _newStorageSize;
    *((int32_t *) &wasm_heap[INT32_C(3984) + 0]) = _newRegionsCount;
    *((int32_t *) &wasm_heap[INT32_C(3988) + 0]) = _newRegionsSize;
    *((int32_t *) &wasm_heap[INT32_C(4000) + 0]) = _newHeapSize;
}

static void meth_otbw_WasmHeap__clinit_() {
    *((int32_t *) &wasm_heap[INT32_C(4004) + 0]) = INT32_C(1024);
}

static void meth_jl_NegativeArraySizeException__init_(int32_t _this) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(193);
    meth_jl_RuntimeException__init_(_this);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_cbv_VisualizerRuntime_main(int32_t _args) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(195);
        initclass_cbv_VisualizerRuntime();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(195))) {
            goto block_0;
        }
    }
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(194);
    initialize();
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(194))) {
        goto block_1;
    }
    block_0: ;
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void initialize() {
    int32_t localVar0;
    int32_t ___stack__;
    int32_t localVar2;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(196);
        initclass_cbv_VisualizerRuntime();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(196))) {
            goto block_0;
        }
    }
    if ((int32_t) (int8_t) wasm_heap[INT32_C(4244) + 0]) {
        goto block_1;
    }
    wasm_heap[INT32_C(4244) + 0] = INT32_C(1);
    *((int32_t *) &wasm_heap[INT32_C(4248) + 0]) = INT32_C(0);
    *((int32_t *) &wasm_heap[INT32_C(4252) + 0]) = INT32_C(0);
    localVar0 = *((int32_t *) &wasm_heap[INT32_C(4256) + 0]);
    if ((localVar0 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(198);
        teavm_throwNullPointerException();
    } else {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar0;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(197);
        localVar2 = localVar0;
        int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar2 + 0]) << INT32_C(3)) + INT32_C(136)) + 0]);
        (*(void (*)(int32_t, int32_t)) wasm_table[tmp_0])(localVar2, INT32_C(0));
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(197))) {
            *((int32_t *) &wasm_heap[INT32_C(4260) + 0]) = INT32_C(0);
            goto block_1;
        }
    }
    block_0: ;
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

int32_t ping() {
    int32_t localVar0;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(199);
        initclass_cbv_VisualizerRuntime();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(199))) {
            localVar0 = INT32_C(0);
            goto block_0;
        }
    }
    localVar0 = INT32_C(7964);
    block_0: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar0;
}

int32_t acceptCode(int32_t _instrumentedCode) {
    int32_t localVar1;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(202);
        initclass_cbv_VisualizerRuntime();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(202))) {
            goto block_0;
        }
    }
    if (((int32_t) (int8_t) wasm_heap[INT32_C(4244) + 0] == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(201);
        initialize();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(201))) {
            goto block_0;
        }
    }
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(200);
    reset();
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(200))) {
        localVar1 = INT32_C(1);
        goto block_1;
    }
    block_0: ;
    localVar1 = INT32_C(0);
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar1;
}

int32_t invokeMain() {
    int32_t localVar0;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(203);
        initclass_cbv_VisualizerRuntime();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(203))) {
            localVar0 = INT32_C(0);
            goto block_0;
        }
    }
    if ((int32_t) (int8_t) wasm_heap[INT32_C(4244) + 0]) {
        localVar0 = INT32_C(0);
    } else {
        localVar0 = INT32_C(-1);
    }
    block_0: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar0;
}

void trackStep(int32_t _lineNumber) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(204);
        initclass_cbv_VisualizerRuntime();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(204))) {
            goto block_0;
        }
    }
    *((int32_t *) &wasm_heap[INT32_C(4252) + 0]) = _lineNumber;
    *((int32_t *) &wasm_heap[INT32_C(4248) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(4248) + 0]) + INT32_C(1));
    block_0: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void captureOutput(int32_t _text) {
    int32_t localVar1;
    int32_t ___stack__;
    int32_t localVar3;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(205);
        initclass_cbv_VisualizerRuntime();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(205))) {
            goto block_0;
        }
    }
    if ((_text != INT32_C(0))) {
        localVar1 = *((int32_t *) &wasm_heap[INT32_C(4256) + 0]);
        if ((localVar1 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(207);
            teavm_throwNullPointerException();
            goto block_0;
        }
        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar1;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(206);
        localVar3 = localVar1;
        int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar3 + 0]) << INT32_C(3)) + INT32_C(152)) + 0]);
        (*(int32_t (*)(int32_t, int32_t)) wasm_table[tmp_0])(localVar3, _text);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(206))) {
            goto block_0;
        }
    }
    goto block_1;
    block_0: ;
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackVariable(int32_t _name, int32_t _value, int32_t _type) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(208);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackMethodEntry(int32_t _className, int32_t _methodName, int32_t _lineNumber) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(209);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackMethodExit(int32_t _className, int32_t _methodName, int32_t _lineNumber) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(210);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackObjectCreation(int32_t _objectId, int32_t _className) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(211);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackObjectCreated(int32_t _objectId, int32_t _type, int32_t _shallowFields) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(212);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackFieldWrite(int32_t _objectId, int32_t _fieldName, int32_t _value) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(213);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackArrayCreate(int32_t _objectId, int32_t _componentType, int32_t _length) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(214);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackCollectionEvent(int32_t _objectId, int32_t _collectionType, int32_t _action, int32_t _preview) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(215);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackMethodReturn(int32_t _methodName, int32_t _returnValue) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(216);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackExceptionThrown(int32_t _line, int32_t _exceptionType, int32_t _message) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(217);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackTryCatchEnter(int32_t _tryId, int32_t _line) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(218);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackFinallyEnter(int32_t _finallyId, int32_t _line) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(219);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackStaticInitStart(int32_t _className) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(220);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackStaticInitEnd(int32_t _className) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(221);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

void trackThisReference(int32_t _methodName, int32_t _thisId) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(222);
        initclass_cbv_VisualizerRuntime();
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

int32_t generateObjectId(int32_t _prefix) {
    int32_t localVar1;
    int32_t localVar2;
    int32_t localVar3;
    int32_t localVar4;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(2));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(226);
        initclass_cbv_VisualizerRuntime();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(226))) {
            goto block_0;
        }
    }
    *((int32_t *) &wasm_heap[INT32_C(4260) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(4260) + 0]) + INT32_C(1));
    localVar1 = *((int32_t *) &wasm_heap[INT32_C(4260) + 0]);
    localVar2 = *((int32_t *) &wasm_heap[INT32_C(4248) + 0]);
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(223);
    localVar3 = meth_otr_Allocator_allocate(INT32_C(2920));
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(223))) {
        goto block_0;
    }
    *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar3;
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(224);
    meth_jl_StringBuilder__init_(localVar3);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(224))) {
        goto block_0;
    }
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(225);
    localVar4 = meth_jl_StringBuilder_append_0(localVar3, _prefix);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(225))) {
        goto block_0;
    }
    if ((localVar4 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(228);
        teavm_throwNullPointerException();
        goto block_0;
    }
    *((int32_t *) &wasm_heap[___stack__ + 8]) = localVar4;
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(227);
    localVar4 = meth_jl_StringBuilder_append_2(localVar4, INT32_C(95));
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(227))) {
        goto block_0;
    }
    if ((localVar4 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(230);
        teavm_throwNullPointerException();
        goto block_0;
    }
    *((int32_t *) &wasm_heap[___stack__ + 8]) = localVar4;
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(229);
    localVar4 = meth_jl_StringBuilder_append_1(localVar4, localVar1);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(229))) {
        goto block_0;
    }
    if ((localVar4 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(232);
        teavm_throwNullPointerException();
        goto block_0;
    }
    *((int32_t *) &wasm_heap[___stack__ + 8]) = localVar4;
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(231);
    localVar4 = meth_jl_StringBuilder_append_2(localVar4, INT32_C(95));
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(231))) {
        goto block_0;
    }
    if ((localVar4 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(235);
        teavm_throwNullPointerException();
        goto block_0;
    }
    *((int32_t *) &wasm_heap[___stack__ + 8]) = localVar4;
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(233);
    meth_jl_StringBuilder_append_1(localVar4, localVar2);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(233))) {
        goto block_0;
    }
    *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(234);
    localVar3 = meth_jl_StringBuilder_toString(localVar3);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(234))) {
        goto block_0;
    }
    goto block_1;
    block_0: ;
    localVar3 = INT32_C(0);
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar3;
}

int32_t getCurrentStep() {
    int32_t localVar0;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(236);
        initclass_cbv_VisualizerRuntime();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(236))) {
            localVar0 = INT32_C(0);
            goto block_0;
        }
    }
    localVar0 = *((int32_t *) &wasm_heap[INT32_C(4248) + 0]);
    block_0: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar0;
}

int32_t getCurrentLine() {
    int32_t localVar0;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(237);
        initclass_cbv_VisualizerRuntime();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(237))) {
            localVar0 = INT32_C(0);
            goto block_0;
        }
    }
    localVar0 = *((int32_t *) &wasm_heap[INT32_C(4252) + 0]);
    block_0: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar0;
}

int32_t getOutput() {
    int32_t localVar0;
    int32_t ___stack__;
    int32_t localVar2;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(238);
        initclass_cbv_VisualizerRuntime();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(238))) {
            goto block_0;
        }
    }
    localVar0 = *((int32_t *) &wasm_heap[INT32_C(4256) + 0]);
    if ((localVar0 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(240);
        teavm_throwNullPointerException();
    } else {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar0;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(239);
        localVar2 = localVar0;
        int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar2 + 0]) << INT32_C(3)) + INT32_C(88)) + 0]);
        localVar0 = (*(int32_t (*)(int32_t)) wasm_table[tmp_0])(localVar2);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(239))) {
            goto block_1;
        }
    }
    block_0: ;
    localVar0 = INT32_C(0);
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar0;
}

void reset() {
    int32_t localVar0;
    int32_t ___stack__;
    int32_t localVar2;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(241);
        initclass_cbv_VisualizerRuntime();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(241))) {
            goto block_0;
        }
    }
    *((int32_t *) &wasm_heap[INT32_C(4248) + 0]) = INT32_C(0);
    *((int32_t *) &wasm_heap[INT32_C(4252) + 0]) = INT32_C(0);
    localVar0 = *((int32_t *) &wasm_heap[INT32_C(4256) + 0]);
    if ((localVar0 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(243);
        teavm_throwNullPointerException();
    } else {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar0;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(242);
        localVar2 = localVar0;
        int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar2 + 0]) << INT32_C(3)) + INT32_C(136)) + 0]);
        (*(void (*)(int32_t, int32_t)) wasm_table[tmp_0])(localVar2, INT32_C(0));
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(242))) {
            *((int32_t *) &wasm_heap[INT32_C(4260) + 0]) = INT32_C(0);
            goto block_1;
        }
    }
    block_0: ;
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

int32_t isInitialized() {
    int32_t localVar0;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    if (((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1)) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(244);
        initclass_cbv_VisualizerRuntime();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(244))) {
            localVar0 = INT32_C(0);
            goto block_0;
        }
    }
    localVar0 = (int32_t) (int8_t) wasm_heap[INT32_C(4244) + 0];
    block_0: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar0;
}

static void meth_cbv_VisualizerRuntime__clinit_() {
    int32_t localVar0;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    wasm_heap[INT32_C(4244) + 0] = INT32_C(0);
    *((int32_t *) &wasm_heap[INT32_C(4248) + 0]) = INT32_C(0);
    *((int32_t *) &wasm_heap[INT32_C(4252) + 0]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(245);
    localVar0 = meth_otr_Allocator_allocate(INT32_C(2920));
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(245))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar0;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(246);
        meth_jl_StringBuilder__init_(localVar0);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(246))) {
            *((int32_t *) &wasm_heap[INT32_C(4256) + 0]) = localVar0;
            *((int32_t *) &wasm_heap[INT32_C(4260) + 0]) = INT32_C(0);
            *((int32_t *) &wasm_heap[INT32_C(4264) + 0]) = INT32_C(0);
            *((int32_t *) &wasm_heap[INT32_C(4268) + 0]) = INT32_C(0);
        }
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_RuntimeException__init_(int32_t _this) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(247);
    meth_jl_Exception__init_(_this);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_ArrayIndexOutOfBoundsException__init_(int32_t _this) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(248);
    meth_jl_IndexOutOfBoundsException__init_(_this);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_IllegalArgumentException__init_(int32_t _this) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(249);
    meth_jl_RuntimeException__init_(_this);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

int64_t teavm_processQueue() {
    int64_t localVar0;
    int32_t localVar1;
    int32_t _node;
    int64_t _currentTime;
    int64_t localVar4;
    int32_t localVar5;
    int32_t ___stack__;
    int32_t localVar7;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(2));
    if ((*((int32_t *) &wasm_heap[INT32_C(4600) + 0]) == INT32_C(0))) {
        localVar0 = INT64_C(-1);
    } else {
        localVar1 = *((int32_t *) &wasm_heap[INT32_C(4596) + 0]);
        if ((localVar1 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(252);
            teavm_throwNullPointerException();
            goto block_0;
        }
        localVar1 = localVar1;
        if ((INT32_C(0) >= *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(254);
            teavm_throwArrayIndexOutOfBoundsException();
            goto block_0;
        }
        _node = *((int32_t *) &wasm_heap[((localVar1 + INT32_C(12)) + (INT32_C(0) << INT32_C(2))) + 0]);
        *((int32_t *) &wasm_heap[___stack__ + 4]) = _node;
        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(253);
        _currentTime = meth_jl_System_currentTimeMillis();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(253))) {
            goto block_0;
        }
        if ((_node == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(256);
            teavm_throwNullPointerException();
            goto block_0;
        }
        localVar4 = *((int64_t *) &wasm_heap[_node + 16]);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(255);
        localVar0 = meth_jl_System_currentTimeMillis();
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(255))) {
            goto block_0;
        }
        if ((localVar4 > localVar0)) {
            localVar0 = (*((int64_t *) &wasm_heap[_node + 16]) - _currentTime);
            goto block_1;
        }
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(250);
        meth_otr_EventQueue_remove(INT32_C(0));
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(250))) {
            goto block_0;
        }
        localVar5 = *((int32_t *) &wasm_heap[_node + 12]);
        if ((localVar5 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(258);
            teavm_throwNullPointerException();
            goto block_0;
        }
        *((int32_t *) &wasm_heap[___stack__ + 8]) = localVar5;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(257);
        assert(0);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(257))) {
            goto block_0;
        }
        if ((*((int32_t *) &wasm_heap[INT32_C(4600) + 0]) == INT32_C(0))) {
            localVar0 = INT64_C(-1);
            goto block_1;
        }
        localVar4 = (*((int64_t *) &wasm_heap[_node + 16]) - _currentTime);
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(251);
        localVar0 = meth_jl_Math_max_0(INT64_C(0), localVar4);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(251))) {
            goto block_0;
        }
        goto block_1;
        block_0: ;
        localVar0 = INT64_C(0);
    }
    block_1: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar0;
}

int32_t teavm_stopped() {
    return (int32_t) (int8_t) wasm_heap[INT32_C(4604) + 0];
}

static void meth_otr_EventQueue_stop() {
    wasm_heap[INT32_C(4604) + 0] = INT32_C(1);
}

static void meth_otr_EventQueue_remove(int32_t _index) {
    int32_t localVar1;
    int32_t localVar2;
    int32_t localVar3;
    int32_t localVar4;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[INT32_C(4600) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(4600) + 0]) - INT32_C(1));
    if ((_index < *((int32_t *) &wasm_heap[INT32_C(4600) + 0]))) {
        localVar1 = *((int32_t *) &wasm_heap[INT32_C(4596) + 0]);
        localVar2 = *((int32_t *) &wasm_heap[INT32_C(4596) + 0]);
        localVar3 = *((int32_t *) &wasm_heap[INT32_C(4600) + 0]);
        if ((localVar2 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(261);
            teavm_throwNullPointerException();
            goto block_0;
        }
        localVar2 = localVar2;
        int32_t tmp_0;
        if ((localVar3 < INT32_C(0))) {
            tmp_0 = INT32_C(0);
            goto block_1;
        }
        tmp_0 = (localVar3 < *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]));
        block_1: ;
        if (tmp_0) {
            localVar4 = *((int32_t *) &wasm_heap[((localVar2 + INT32_C(12)) + (localVar3 << INT32_C(2))) + 0]);
            if ((localVar1 == INT32_C(0))) {
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(263);
                teavm_throwNullPointerException();
                goto block_0;
            }
            localVar1 = localVar1;
            int32_t tmp_1;
            if ((_index < INT32_C(0))) {
                tmp_1 = INT32_C(0);
                goto block_2;
            }
            tmp_1 = (_index < *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]));
            block_2: ;
            if (tmp_1) {
                wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((localVar1 - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
                *((int32_t *) &wasm_heap[((localVar1 + INT32_C(12)) + (_index << INT32_C(2))) + 0]) = localVar4;
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(264);
                meth_otr_EventQueue_update(_index);
                if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(264))) {
                    goto block_3;
                } else {
                    goto block_0;
                }
            }
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(265);
            teavm_throwArrayIndexOutOfBoundsException();
            goto block_0;
        }
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(262);
        teavm_throwArrayIndexOutOfBoundsException();
        goto block_0;
    }
    block_3: ;
    localVar1 = *((int32_t *) &wasm_heap[INT32_C(4596) + 0]);
    localVar3 = *((int32_t *) &wasm_heap[INT32_C(4600) + 0]);
    localVar4 = INT32_C(0);
    if ((localVar1 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(259);
        teavm_throwNullPointerException();
    } else {
        localVar1 = localVar1;
        int32_t tmp_2;
        if ((localVar3 < INT32_C(0))) {
            tmp_2 = INT32_C(0);
            goto block_4;
        }
        tmp_2 = (localVar3 < *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]));
        block_4: ;
        if (tmp_2) {
            *((int32_t *) &wasm_heap[((localVar1 + INT32_C(12)) + (localVar3 << INT32_C(2))) + 0]) = localVar4;
            goto block_5;
        }
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(260);
        teavm_throwArrayIndexOutOfBoundsException();
    }
    block_0: ;
    block_5: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otr_EventQueue_update(int32_t _index) {
    int32_t localVar1;
    int32_t _item;
    int32_t _left;
    int32_t _next;
    int32_t localVar5;
    int64_t localVar6;
    int32_t localVar7;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    localVar1 = *((int32_t *) &wasm_heap[INT32_C(4596) + 0]);
    if ((localVar1 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(266);
        teavm_throwNullPointerException();
    } else {
        localVar1 = localVar1;
        int32_t tmp_0;
        if ((_index < INT32_C(0))) {
            tmp_0 = INT32_C(0);
            goto block_0;
        }
        tmp_0 = (_index < *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]));
        block_0: ;
        if (tmp_0) {
            _item = *((int32_t *) &wasm_heap[((localVar1 + INT32_C(12)) + (_index << INT32_C(2))) + 0]);
            block_7: do {
                _left = ((_index * INT32_C(2)) + INT32_C(1));
                _next = (_left + INT32_C(1));
                if ((_left >= *((int32_t *) &wasm_heap[INT32_C(4600) + 0]))) {
                    goto block_1;
                }
                if ((_next >= *((int32_t *) &wasm_heap[INT32_C(4600) + 0]))) {
                    _next = _left;
                } else {
                    localVar1 = *((int32_t *) &wasm_heap[INT32_C(4596) + 0]);
                    if ((localVar1 == INT32_C(0))) {
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(270);
                        teavm_throwNullPointerException();
                        goto block_2;
                    }
                    localVar1 = localVar1;
                    if ((_left < INT32_C(0))) {
                        goto block_3;
                    }
                    if ((_left >= *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]))) {
                        goto block_3;
                    }
                    localVar5 = *((int32_t *) &wasm_heap[((localVar1 + INT32_C(12)) + (_left << INT32_C(2))) + 0]);
                    if ((localVar5 == INT32_C(0))) {
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(272);
                        teavm_throwNullPointerException();
                        goto block_2;
                    }
                    localVar6 = *((int64_t *) &wasm_heap[localVar5 + 16]);
                    localVar1 = *((int32_t *) &wasm_heap[INT32_C(4596) + 0]);
                    if ((localVar1 == INT32_C(0))) {
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(273);
                        teavm_throwNullPointerException();
                        goto block_2;
                    }
                    localVar1 = localVar1;
                    if ((_next < INT32_C(0))) {
                        goto block_4;
                    }
                    if ((_next >= *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]))) {
                        goto block_4;
                    }
                    localVar5 = *((int32_t *) &wasm_heap[((localVar1 + INT32_C(12)) + (_next << INT32_C(2))) + 0]);
                    if ((localVar5 == INT32_C(0))) {
                        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(275);
                        teavm_throwNullPointerException();
                        goto block_2;
                    }
                    if ((localVar6 < *((int64_t *) &wasm_heap[localVar5 + 16]))) {
                        _next = _left;
                    }
                }
                if ((_item == INT32_C(0))) {
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(276);
                    teavm_throwNullPointerException();
                    goto block_2;
                }
                localVar6 = *((int64_t *) &wasm_heap[_item + 16]);
                localVar1 = *((int32_t *) &wasm_heap[INT32_C(4596) + 0]);
                if ((localVar1 == INT32_C(0))) {
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(277);
                    teavm_throwNullPointerException();
                    goto block_2;
                }
                localVar1 = localVar1;
                if ((_next < INT32_C(0))) {
                    goto block_5;
                }
                if ((_next >= *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]))) {
                    goto block_5;
                }
                localVar5 = *((int32_t *) &wasm_heap[((localVar1 + INT32_C(12)) + (_next << INT32_C(2))) + 0]);
                if ((localVar5 == INT32_C(0))) {
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(279);
                    teavm_throwNullPointerException();
                    goto block_2;
                }
                if ((localVar6 <= *((int64_t *) &wasm_heap[localVar5 + 16]))) {
                    goto block_1;
                }
                localVar1 = *((int32_t *) &wasm_heap[INT32_C(4596) + 0]);
                localVar7 = *((int32_t *) &wasm_heap[INT32_C(4596) + 0]);
                if ((localVar7 == INT32_C(0))) {
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(280);
                    teavm_throwNullPointerException();
                    goto block_2;
                }
                localVar7 = localVar7;
                if ((_next >= *((int32_t *) &wasm_heap[(localVar7 + INT32_C(8)) + 0]))) {
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(281);
                    teavm_throwArrayIndexOutOfBoundsException();
                    goto block_2;
                }
                localVar5 = *((int32_t *) &wasm_heap[((localVar7 + INT32_C(12)) + (_next << INT32_C(2))) + 0]);
                if ((localVar1 == INT32_C(0))) {
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(282);
                    teavm_throwNullPointerException();
                    goto block_2;
                }
                localVar1 = localVar1;
                if ((_index < INT32_C(0))) {
                    goto block_6;
                }
                if ((_index >= *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]))) {
                    goto block_6;
                }
                wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((localVar1 - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
                *((int32_t *) &wasm_heap[((localVar1 + INT32_C(12)) + (_index << INT32_C(2))) + 0]) = localVar5;
                _index = _next;
                goto block_7;
            } while(0);
            block_6: ;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(283);
            teavm_throwArrayIndexOutOfBoundsException();
            goto block_2;
            block_5: ;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(278);
            teavm_throwArrayIndexOutOfBoundsException();
            goto block_2;
            block_4: ;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(274);
            teavm_throwArrayIndexOutOfBoundsException();
            goto block_2;
            block_3: ;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(271);
            teavm_throwArrayIndexOutOfBoundsException();
            goto block_2;
            block_1: ;
            localVar1 = *((int32_t *) &wasm_heap[INT32_C(4596) + 0]);
            if ((localVar1 == INT32_C(0))) {
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(268);
                teavm_throwNullPointerException();
            } else {
                localVar1 = localVar1;
                int32_t tmp_1;
                if ((_index < INT32_C(0))) {
                    tmp_1 = INT32_C(0);
                    goto block_8;
                }
                tmp_1 = (_index < *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]));
                block_8: ;
                if (tmp_1) {
                    wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((localVar1 - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
                    *((int32_t *) &wasm_heap[((localVar1 + INT32_C(12)) + (_index << INT32_C(2))) + 0]) = _item;
                    goto block_9;
                }
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(269);
                teavm_throwArrayIndexOutOfBoundsException();
            }
        } else {
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(267);
            teavm_throwArrayIndexOutOfBoundsException();
        }
    }
    block_2: ;
    block_9: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otr_EventQueue__clinit_() {
    int32_t localVar0;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(284);
    localVar0 = meth_otr_Allocator_allocateArray(INT32_C(8304), INT32_C(16));
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(284))) {
        *((int32_t *) &wasm_heap[INT32_C(4596) + 0]) = localVar0;
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otr_Fiber__init_(int32_t _this, int32_t _runner, int32_t _daemon) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(285);
    meth_jl_Object__init_(_this);
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(285))) {
        wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
        *((int32_t *) &wasm_heap[_this + 52]) = _runner;
        wasm_heap[_this + 64] = _daemon;
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otr_Fiber_push(int32_t _this, int32_t _value) {
    int32_t localVar2;
    int32_t localVar3;
    int32_t localVar4;
    int32_t localVar5;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    if ((*((int32_t *) &wasm_heap[_this + 8]) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(286);
        localVar2 = meth_otr_Allocator_allocateArray(INT32_C(5648), INT32_C(4));
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(286))) {
            goto block_0;
        }
        wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
        *((int32_t *) &wasm_heap[_this + 8]) = localVar2;
    } else {
        localVar3 = (*((int32_t *) &wasm_heap[_this + 12]) + INT32_C(1));
        localVar2 = *((int32_t *) &wasm_heap[_this + 8]);
        if ((localVar2 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(287);
            teavm_throwNullPointerException();
            goto block_0;
        }
        if ((localVar3 == *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]))) {
            localVar2 = *((int32_t *) &wasm_heap[_this + 8]);
            localVar4 = *((int32_t *) &wasm_heap[_this + 8]);
            if ((localVar4 == INT32_C(0))) {
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(291);
                teavm_throwNullPointerException();
                goto block_0;
            }
            localVar3 = ((*((int32_t *) &wasm_heap[(localVar4 + INT32_C(8)) + 0]) * INT32_C(3)) / INT32_C(2));
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar2;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(290);
            localVar2 = meth_ju_Arrays_copyOf_0(localVar2, localVar3);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(290))) {
                goto block_0;
            }
            wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
            *((int32_t *) &wasm_heap[_this + 8]) = localVar2;
        }
    }
    localVar2 = *((int32_t *) &wasm_heap[_this + 8]);
    localVar5 = *((int32_t *) &wasm_heap[_this + 12]);
    *((int32_t *) &wasm_heap[_this + 12]) = (localVar5 + INT32_C(1));
    if ((localVar2 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(288);
        teavm_throwNullPointerException();
    } else {
        localVar2 = localVar2;
        int32_t tmp_0;
        if ((localVar5 < INT32_C(0))) {
            tmp_0 = INT32_C(0);
            goto block_1;
        }
        tmp_0 = (localVar5 < *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]));
        block_1: ;
        if (tmp_0) {
            *((int32_t *) &wasm_heap[((localVar2 + INT32_C(12)) + (localVar5 << INT32_C(2))) + 0]) = _value;
            goto block_2;
        }
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(289);
        teavm_throwArrayIndexOutOfBoundsException();
    }
    block_0: ;
    block_2: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otr_Fiber_push_0(int32_t _this, int64_t _value) {
    int32_t localVar2;
    int32_t localVar3;
    int32_t localVar4;
    int32_t localVar5;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    if ((*((int32_t *) &wasm_heap[_this + 16]) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(292);
        localVar2 = meth_otr_Allocator_allocateArray(INT32_C(5904), INT32_C(4));
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(292))) {
            goto block_0;
        }
        wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
        *((int32_t *) &wasm_heap[_this + 16]) = localVar2;
    } else {
        localVar3 = (*((int32_t *) &wasm_heap[_this + 20]) + INT32_C(1));
        localVar2 = *((int32_t *) &wasm_heap[_this + 16]);
        if ((localVar2 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(293);
            teavm_throwNullPointerException();
            goto block_0;
        }
        if ((localVar3 == *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]))) {
            localVar2 = *((int32_t *) &wasm_heap[_this + 16]);
            localVar4 = *((int32_t *) &wasm_heap[_this + 16]);
            if ((localVar4 == INT32_C(0))) {
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(297);
                teavm_throwNullPointerException();
                goto block_0;
            }
            localVar3 = ((*((int32_t *) &wasm_heap[(localVar4 + INT32_C(8)) + 0]) * INT32_C(3)) / INT32_C(2));
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar2;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(296);
            localVar2 = meth_ju_Arrays_copyOf_1(localVar2, localVar3);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(296))) {
                goto block_0;
            }
            wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
            *((int32_t *) &wasm_heap[_this + 16]) = localVar2;
        }
    }
    localVar2 = *((int32_t *) &wasm_heap[_this + 16]);
    localVar5 = *((int32_t *) &wasm_heap[_this + 20]);
    *((int32_t *) &wasm_heap[_this + 20]) = (localVar5 + INT32_C(1));
    if ((localVar2 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(294);
        teavm_throwNullPointerException();
    } else {
        localVar2 = localVar2;
        int32_t tmp_0;
        if ((localVar5 < INT32_C(0))) {
            tmp_0 = INT32_C(0);
            goto block_1;
        }
        tmp_0 = (localVar5 < *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]));
        block_1: ;
        if (tmp_0) {
            *((int64_t *) &wasm_heap[((localVar2 + INT32_C(16)) + (localVar5 << INT32_C(3))) + 0]) = _value;
            goto block_2;
        }
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(295);
        teavm_throwArrayIndexOutOfBoundsException();
    }
    block_0: ;
    block_2: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otr_Fiber_push_1(int32_t _this, float _value) {
    int32_t localVar2;
    int32_t localVar3;
    int32_t localVar4;
    int32_t localVar5;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    if ((*((int32_t *) &wasm_heap[_this + 24]) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(298);
        localVar2 = meth_otr_Allocator_allocateArray(INT32_C(6168), INT32_C(4));
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(298))) {
            goto block_0;
        }
        wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
        *((int32_t *) &wasm_heap[_this + 24]) = localVar2;
    } else {
        localVar3 = (*((int32_t *) &wasm_heap[_this + 28]) + INT32_C(1));
        localVar2 = *((int32_t *) &wasm_heap[_this + 24]);
        if ((localVar2 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(299);
            teavm_throwNullPointerException();
            goto block_0;
        }
        if ((localVar3 == *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]))) {
            localVar2 = *((int32_t *) &wasm_heap[_this + 24]);
            localVar4 = *((int32_t *) &wasm_heap[_this + 24]);
            if ((localVar4 == INT32_C(0))) {
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(303);
                teavm_throwNullPointerException();
                goto block_0;
            }
            localVar3 = ((*((int32_t *) &wasm_heap[(localVar4 + INT32_C(8)) + 0]) * INT32_C(3)) / INT32_C(2));
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar2;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(302);
            localVar2 = meth_ju_Arrays_copyOf_2(localVar2, localVar3);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(302))) {
                goto block_0;
            }
            wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
            *((int32_t *) &wasm_heap[_this + 24]) = localVar2;
        }
    }
    localVar2 = *((int32_t *) &wasm_heap[_this + 24]);
    localVar5 = *((int32_t *) &wasm_heap[_this + 28]);
    *((int32_t *) &wasm_heap[_this + 28]) = (localVar5 + INT32_C(1));
    if ((localVar2 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(300);
        teavm_throwNullPointerException();
    } else {
        localVar2 = localVar2;
        int32_t tmp_0;
        if ((localVar5 < INT32_C(0))) {
            tmp_0 = INT32_C(0);
            goto block_1;
        }
        tmp_0 = (localVar5 < *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]));
        block_1: ;
        if (tmp_0) {
            *((float *) &wasm_heap[((localVar2 + INT32_C(12)) + (localVar5 << INT32_C(2))) + 0]) = _value;
            goto block_2;
        }
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(301);
        teavm_throwArrayIndexOutOfBoundsException();
    }
    block_0: ;
    block_2: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otr_Fiber_push_2(int32_t _this, double _value) {
    int32_t localVar2;
    int32_t localVar3;
    int32_t localVar4;
    int32_t localVar5;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    if ((*((int32_t *) &wasm_heap[_this + 32]) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(304);
        localVar2 = meth_otr_Allocator_allocateArray(INT32_C(6432), INT32_C(4));
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(304))) {
            goto block_0;
        }
        wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
        *((int32_t *) &wasm_heap[_this + 32]) = localVar2;
    } else {
        localVar3 = (*((int32_t *) &wasm_heap[_this + 36]) + INT32_C(1));
        localVar2 = *((int32_t *) &wasm_heap[_this + 32]);
        if ((localVar2 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(305);
            teavm_throwNullPointerException();
            goto block_0;
        }
        if ((localVar3 == *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]))) {
            localVar2 = *((int32_t *) &wasm_heap[_this + 32]);
            localVar4 = *((int32_t *) &wasm_heap[_this + 32]);
            if ((localVar4 == INT32_C(0))) {
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(309);
                teavm_throwNullPointerException();
                goto block_0;
            }
            localVar3 = ((*((int32_t *) &wasm_heap[(localVar4 + INT32_C(8)) + 0]) * INT32_C(3)) / INT32_C(2));
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar2;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(308);
            localVar2 = meth_ju_Arrays_copyOf_3(localVar2, localVar3);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(308))) {
                goto block_0;
            }
            wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
            *((int32_t *) &wasm_heap[_this + 32]) = localVar2;
        }
    }
    localVar2 = *((int32_t *) &wasm_heap[_this + 32]);
    localVar5 = *((int32_t *) &wasm_heap[_this + 36]);
    *((int32_t *) &wasm_heap[_this + 36]) = (localVar5 + INT32_C(1));
    if ((localVar2 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(306);
        teavm_throwNullPointerException();
    } else {
        localVar2 = localVar2;
        int32_t tmp_0;
        if ((localVar5 < INT32_C(0))) {
            tmp_0 = INT32_C(0);
            goto block_1;
        }
        tmp_0 = (localVar5 < *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]));
        block_1: ;
        if (tmp_0) {
            *((double *) &wasm_heap[((localVar2 + INT32_C(16)) + (localVar5 << INT32_C(3))) + 0]) = _value;
            goto block_2;
        }
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(307);
        teavm_throwArrayIndexOutOfBoundsException();
    }
    block_0: ;
    block_2: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otr_Fiber_push_3(int32_t _this, int32_t _value) {
    int32_t localVar2;
    int32_t localVar3;
    int32_t localVar4;
    int32_t localVar5;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    if ((*((int32_t *) &wasm_heap[_this + 40]) == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(310);
        localVar2 = meth_otr_Allocator_allocateArray(INT32_C(8472), INT32_C(4));
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(310))) {
            goto block_0;
        }
        wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
        *((int32_t *) &wasm_heap[_this + 40]) = localVar2;
    } else {
        localVar3 = (*((int32_t *) &wasm_heap[_this + 44]) + INT32_C(1));
        localVar2 = *((int32_t *) &wasm_heap[_this + 40]);
        if ((localVar2 == INT32_C(0))) {
            *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(311);
            teavm_throwNullPointerException();
            goto block_0;
        }
        if ((localVar3 == *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]))) {
            localVar2 = *((int32_t *) &wasm_heap[_this + 40]);
            localVar4 = *((int32_t *) &wasm_heap[_this + 40]);
            if ((localVar4 == INT32_C(0))) {
                *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(315);
                teavm_throwNullPointerException();
                goto block_0;
            }
            localVar3 = ((*((int32_t *) &wasm_heap[(localVar4 + INT32_C(8)) + 0]) * INT32_C(3)) / INT32_C(2));
            *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar2;
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(314);
            localVar2 = meth_ju_Arrays_copyOf_4(localVar2, localVar3);
            if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(314))) {
                goto block_0;
            }
            wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((_this - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
            *((int32_t *) &wasm_heap[_this + 40]) = localVar2;
        }
    }
    localVar2 = *((int32_t *) &wasm_heap[_this + 40]);
    localVar5 = *((int32_t *) &wasm_heap[_this + 44]);
    *((int32_t *) &wasm_heap[_this + 44]) = (localVar5 + INT32_C(1));
    if ((localVar2 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(312);
        teavm_throwNullPointerException();
    } else {
        localVar2 = localVar2;
        int32_t tmp_0;
        if ((localVar5 < INT32_C(0))) {
            tmp_0 = INT32_C(0);
            goto block_1;
        }
        tmp_0 = (localVar5 < *((int32_t *) &wasm_heap[(localVar2 + INT32_C(8)) + 0]));
        block_1: ;
        if (tmp_0) {
            wasm_heap[(*((int32_t *) &wasm_heap[INT32_C(3992) + 0]) + ((localVar2 - *((int32_t *) &wasm_heap[INT32_C(3996) + 0])) / INT32_C(1024))) + 0] = INT32_C(0);
            *((int32_t *) &wasm_heap[((localVar2 + INT32_C(12)) + (localVar5 << INT32_C(2))) + 0]) = _value;
            goto block_2;
        }
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(313);
        teavm_throwArrayIndexOutOfBoundsException();
    }
    block_0: ;
    block_2: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static int32_t meth_otr_Fiber_popInt(int32_t _this) {
    int32_t localVar1;
    int32_t localVar2;
    localVar1 = *((int32_t *) &wasm_heap[_this + 8]);
    localVar2 = (*((int32_t *) &wasm_heap[_this + 12]) - INT32_C(1));
    *((int32_t *) &wasm_heap[_this + 12]) = localVar2;
    int32_t tmp_0;
    if ((localVar2 < INT32_C(0))) {
        tmp_0 = INT32_C(0);
        goto block_0;
    }
    tmp_0 = (localVar2 < *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]));
    block_0: ;
    if (tmp_0) {
        return *((int32_t *) &wasm_heap[((localVar1 + INT32_C(12)) + (localVar2 << INT32_C(2))) + 0]);
    }
    teavm_throwArrayIndexOutOfBoundsException();
    return INT32_C(0);
}

static int64_t meth_otr_Fiber_popLong(int32_t _this) {
    int32_t localVar1;
    int32_t localVar2;
    localVar1 = *((int32_t *) &wasm_heap[_this + 16]);
    localVar2 = (*((int32_t *) &wasm_heap[_this + 20]) - INT32_C(1));
    *((int32_t *) &wasm_heap[_this + 20]) = localVar2;
    int32_t tmp_0;
    if ((localVar2 < INT32_C(0))) {
        tmp_0 = INT32_C(0);
        goto block_0;
    }
    tmp_0 = (localVar2 < *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]));
    block_0: ;
    if (tmp_0) {
        return *((int64_t *) &wasm_heap[((localVar1 + INT32_C(16)) + (localVar2 << INT32_C(3))) + 0]);
    }
    teavm_throwArrayIndexOutOfBoundsException();
    return INT64_C(0);
}

static float meth_otr_Fiber_popFloat(int32_t _this) {
    int32_t localVar1;
    int32_t localVar2;
    localVar1 = *((int32_t *) &wasm_heap[_this + 24]);
    localVar2 = (*((int32_t *) &wasm_heap[_this + 28]) - INT32_C(1));
    *((int32_t *) &wasm_heap[_this + 28]) = localVar2;
    int32_t tmp_0;
    if ((localVar2 < INT32_C(0))) {
        tmp_0 = INT32_C(0);
        goto block_0;
    }
    tmp_0 = (localVar2 < *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]));
    block_0: ;
    if (tmp_0) {
        return *((float *) &wasm_heap[((localVar1 + INT32_C(12)) + (localVar2 << INT32_C(2))) + 0]);
    }
    teavm_throwArrayIndexOutOfBoundsException();
    return 0x0.0p0F;
}

static double meth_otr_Fiber_popDouble(int32_t _this) {
    int32_t localVar1;
    int32_t localVar2;
    localVar1 = *((int32_t *) &wasm_heap[_this + 32]);
    localVar2 = (*((int32_t *) &wasm_heap[_this + 36]) - INT32_C(1));
    *((int32_t *) &wasm_heap[_this + 36]) = localVar2;
    int32_t tmp_0;
    if ((localVar2 < INT32_C(0))) {
        tmp_0 = INT32_C(0);
        goto block_0;
    }
    tmp_0 = (localVar2 < *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]));
    block_0: ;
    if (tmp_0) {
        return *((double *) &wasm_heap[((localVar1 + INT32_C(16)) + (localVar2 << INT32_C(3))) + 0]);
    }
    teavm_throwArrayIndexOutOfBoundsException();
    return 0x0.0p0;
}

static int32_t meth_otr_Fiber_popObject(int32_t _this) {
    int32_t localVar1;
    int32_t localVar2;
    int32_t _result;
    int32_t localVar4;
    localVar1 = *((int32_t *) &wasm_heap[_this + 40]);
    localVar2 = (*((int32_t *) &wasm_heap[_this + 44]) - INT32_C(1));
    *((int32_t *) &wasm_heap[_this + 44]) = localVar2;
    int32_t tmp_0;
    if ((localVar2 < INT32_C(0))) {
        tmp_0 = INT32_C(0);
        goto block_0;
    }
    tmp_0 = (localVar2 < *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]));
    block_0: ;
    if (tmp_0) {
        _result = *((int32_t *) &wasm_heap[((localVar1 + INT32_C(12)) + (localVar2 << INT32_C(2))) + 0]);
        localVar1 = *((int32_t *) &wasm_heap[_this + 40]);
        localVar2 = *((int32_t *) &wasm_heap[_this + 44]);
        localVar4 = INT32_C(0);
        int32_t tmp_1;
        if ((localVar2 < INT32_C(0))) {
            tmp_1 = INT32_C(0);
            goto block_1;
        }
        tmp_1 = (localVar2 < *((int32_t *) &wasm_heap[(localVar1 + INT32_C(8)) + 0]));
        block_1: ;
        if (tmp_1) {
            *((int32_t *) &wasm_heap[((localVar1 + INT32_C(12)) + (localVar2 << INT32_C(2))) + 0]) = localVar4;
            return _result;
        }
        teavm_throwArrayIndexOutOfBoundsException();
    } else {
        teavm_throwArrayIndexOutOfBoundsException();
    }
    return INT32_C(0);
}

static int32_t meth_otr_Fiber_isSuspending(int32_t _this) {
    return ((*((int32_t *) &wasm_heap[_this + 48]) != INT32_C(1)) ? INT32_C(0) : INT32_C(1));
}

static int32_t meth_otr_Fiber_isResuming(int32_t _this) {
    return ((*((int32_t *) &wasm_heap[_this + 48]) != INT32_C(2)) ? INT32_C(0) : INT32_C(1));
}

static void meth_otr_Fiber_start(int32_t _runner, int32_t _daemon) {
    int32_t localVar2;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(316);
    localVar2 = meth_otr_Allocator_allocate(INT32_C(4760));
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(316))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar2;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(317);
        meth_otr_Fiber__init_(localVar2, _runner, _daemon);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(317))) {
            *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(318);
            meth_otr_Fiber_start_0(localVar2);
        }
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otr_Fiber_start_0(int32_t _this) {
    int32_t _former;
    int32_t localVar2;
    int32_t localVar3;
    int32_t ___stack__;
    int32_t localVar5;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(2));
    _former = *((int32_t *) &wasm_heap[INT32_C(4732) + 0]);
    *((int32_t *) &wasm_heap[INT32_C(4732) + 0]) = _this;
    localVar2 = *((int32_t *) &wasm_heap[_this + 52]);
    if ((localVar2 == INT32_C(0))) {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(321);
        teavm_throwNullPointerException();
    } else {
        *((int32_t *) &wasm_heap[___stack__ + 4]) = _former;
        *((int32_t *) &wasm_heap[___stack__ + 8]) = localVar2;
        *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(320);
        localVar5 = localVar2;
        int32_t tmp_0 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar5 + 0]) << INT32_C(3)) + INT32_C(96)) + 0]);
        (*(void (*)(int32_t)) wasm_table[tmp_0])(localVar5);
        if ((*((int32_t *) &wasm_heap[___stack__ + 0]) == INT32_C(320))) {
            *((int32_t *) &wasm_heap[INT32_C(4732) + 0]) = _former;
            int32_t tmp_2;
            localVar5 = _this;
            int32_t tmp_1 = *((int32_t *) &wasm_heap[((*((int32_t *) &wasm_heap[localVar5 + 0]) << INT32_C(3)) + INT32_C(96)) + 0]);
            if (((*(int32_t (*)(int32_t)) wasm_table[tmp_1])(localVar5) != INT32_C(0))) {
                tmp_2 = INT32_C(0);
                goto block_0;
            }
            tmp_2 = ((int32_t) (int8_t) wasm_heap[_this + 64] == INT32_C(0));
            block_0: ;
            if (tmp_2) {
                localVar3 = (*((int32_t *) &wasm_heap[INT32_C(4728) + 0]) - INT32_C(1));
                *((int32_t *) &wasm_heap[INT32_C(4728) + 0]) = localVar3;
                if ((localVar3 == INT32_C(0))) {
                    *((int32_t *) &wasm_heap[___stack__ + 4]) = INT32_C(0);
                    *((int32_t *) &wasm_heap[___stack__ + 8]) = INT32_C(0);
                    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(319);
                    meth_otr_EventQueue_stop();
                    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(319))) {
                        goto block_1;
                    }
                }
            }
            goto block_2;
        }
    }
    block_1: ;
    block_2: ;
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_otr_Fiber__clinit_() {
    *((int32_t *) &wasm_heap[INT32_C(4728) + 0]) = INT32_C(1);
}

static void meth_jl_String__clinit__lambda__84_0__init_(int32_t localVar0) {
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(0));
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(322);
    meth_jl_Object__init_(localVar0);
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
}

static void meth_jl_Object__init_(int32_t _this) {
    return;
}

static int32_t meth_jl_Object_getClass(int32_t _this) {
    int32_t localVar1;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    localVar1 = (*((int32_t *) &wasm_heap[_this + 0]) << INT32_C(3));
    *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar1;
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(323);
    localVar1 = localVar1;
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(323))) {
        localVar1 = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar1;
}

static int32_t meth_jl_Class_getPlatformClass(int32_t _this) {
    return _this;
}

static int32_t meth_jl_Class_getComponentType(int32_t _this) {
    int32_t localVar1;
    int32_t ___stack__;
    ___stack__ = meth_otbw_WasmRuntime_allocStack(INT32_C(1));
    localVar1 = meth_otp_Platform_getArrayItem(_this);
    *((int32_t *) &wasm_heap[___stack__ + 4]) = localVar1;
    *((int32_t *) &wasm_heap[___stack__ + 0]) = INT32_C(328);
    localVar1 = localVar1;
    if ((*((int32_t *) &wasm_heap[___stack__ + 0]) != INT32_C(328))) {
        localVar1 = INT32_C(0);
    }
    *((int32_t *) &wasm_heap[INT32_C(4016) + 0]) = (___stack__ - INT32_C(4));
    return localVar1;
}

static int32_t meth_otr_Allocator_allocate(int32_t _tag) {
    int32_t _object;
    _object = meth_otr_GC_alloc(*((int32_t *) &wasm_heap[_tag + 8]));
    meth_otbw_WasmRuntime_fillZero(_object, *((int32_t *) &wasm_heap[_tag + 8]));
    *((int32_t *) &wasm_heap[_object + 0]) = (int32_t) ((uint32_t) _tag >> INT32_C(3));
    return _object;
}

static int32_t meth_otr_Allocator_allocateArray(int32_t _tag, int32_t _size) {
    int32_t _itemSize;
    int32_t localVar3;
    int32_t _result;
    int32_t _array;
    _itemSize = (((*((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_tag + 32]) + 12]) & INT32_C(2)) == INT32_C(0)) ? INT32_C(4) : *((int32_t *) &wasm_heap[*((int32_t *) &wasm_heap[_tag + 32]) + 8]));
    localVar3 = meth_otbw_WasmRuntime_align((meth_otbw_WasmRuntime_align(INT32_C(12), _itemSize) + (_itemSize * _size)), INT32_C(4));
    _result = meth_otr_GC_alloc(localVar3);
    meth_otbw_WasmRuntime_fillZero(_result, localVar3);
    _array = _result;
    *((int32_t *) &wasm_heap[_array + 0]) = (int32_t) ((uint32_t) _tag >> INT32_C(3));
    *((int32_t *) &wasm_heap[_array + 8]) = _size;
    return _result;
}

int32_t teavm_allocateString(int32_t _size) {
    meth_jl_String_allocate(_size);
    return meth_jl_String_allocate(_size);
}

int32_t teavm_stringData(int32_t _string) {
    return *((int32_t *) &wasm_heap[_string + 8]);
}

int32_t teavm_allocateObjectArray(int32_t _size) {
    return meth_otr_Allocator_allocateArray(INT32_C(8472), _size);
}

int32_t teavm_allocateStringArray(int32_t _size) {
    return meth_otr_Allocator_allocateArray(INT32_C(6728), _size);
}

int32_t teavm_allocateByteArray(int32_t _size) {
    return meth_otr_Allocator_allocateArray(INT32_C(8928), _size);
}

int32_t teavm_allocateShortArray(int32_t _size) {
    return meth_otr_Allocator_allocateArray(INT32_C(9192), _size);
}

int32_t teavm_allocateCharArray(int32_t _size) {
    return meth_otr_Allocator_allocateArray(INT32_C(5392), _size);
}

int32_t teavm_allocateIntArray(int32_t _size) {
    return meth_otr_Allocator_allocateArray(INT32_C(5648), _size);
}

int32_t teavm_allocateLongArray(int32_t _size) {
    return meth_otr_Allocator_allocateArray(INT32_C(5904), _size);
}

int32_t teavm_allocateFloatArray(int32_t _size) {
    return meth_otr_Allocator_allocateArray(INT32_C(6168), _size);
}

int32_t teavm_allocateDoubleArray(int32_t _size) {
    return meth_otr_Allocator_allocateArray(INT32_C(6432), _size);
}

int32_t teavm_objectArrayData(int32_t _array) {
    return (_array + INT32_C(12));
}

int32_t teavm_byteArrayData(int32_t _array) {
    return (_array + INT32_C(12));
}

int32_t teavm_shortArrayData(int32_t _array) {
    return (_array + INT32_C(12));
}

int32_t teavm_charArrayData(int32_t _array) {
    return (_array + INT32_C(12));
}

int32_t teavm_intArrayData(int32_t _array) {
    return (_array + INT32_C(12));
}

int32_t teavm_longArrayData(int32_t _array) {
    return (_array + INT32_C(16));
}

int32_t teavm_floatArrayData(int32_t _array) {
    return (_array + INT32_C(12));
}

int32_t teavm_doubleArrayData(int32_t _array) {
    return (_array + INT32_C(16));
}

int32_t teavm_arrayLength(int32_t _array) {
    return *((int32_t *) &wasm_heap[(_array + INT32_C(8)) + 0]);
}

static int32_t supertypeof_jl_IndexOutOfBoundsException(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(34))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(40))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_RuntimeException(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(33))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(47))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_Exception(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(32))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(48))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_Throwable(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(31))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(49))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_Object(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(0))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(118))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otr_GC(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(1))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(3))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_ju_Arrays(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(3))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(5))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jlr_Array(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(5))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(7))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otr_Console(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(7))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(9))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_System(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(9))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(11))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otbwr_WasmSupport(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(13))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(15))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otbw_WasmRuntime(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(15))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(17))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_NullPointerException(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(40))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(42))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_Character(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(17))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(19))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_Thread(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(19))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(21))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_DefaultUncaughtExceptionHandler(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(21))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(23))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_Math(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(23))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(25))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otbwr_WasmSupport_runWithoutArgs_lambda__14_0(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(25))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(27))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otr_ShadowStack(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(27))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(29))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_StringIndexOutOfBoundsException(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(35))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(37))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_StringBuilder(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(90))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(92))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_AbstractStringBuilder(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(89))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(93))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otr_Mutator(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(49))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(51))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otr_MemoryTrace(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(51))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(53))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otp_Platform(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(87))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(89))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otr_ExceptionHandling(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(93))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(95))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otr_MarkQueue(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(95))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(97))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otbwr_WasmSupport_runWithArgs_lambda__15_0(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(97))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(99))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_StackTraceElement(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(99))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(101))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_String(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(101))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(103))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otbw_WasmHeap(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(103))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(105))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_NegativeArraySizeException(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(42))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(44))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_cbv_VisualizerRuntime(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(105))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(107))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_ArrayIndexOutOfBoundsException(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(37))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(39))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_IllegalArgumentException(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(44))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(46))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otr_EventQueue(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(107))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(109))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otr_Fiber(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(109))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(111))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_String__clinit__lambda__84_0(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(111))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(113))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_jl_Class(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(113))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(115))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otr_Allocator(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(115))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(117))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_Arr_C(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(32)) + 0]);
    return ((_subtype == INT32_C(0)) ? INT32_C(0) : supertypeof_C(_subtype));
}

static int32_t supertypeof_C(int32_t _subtype) {
    return (_subtype == INT32_C(5272));
}

static int32_t supertypeof_Arr_I(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(32)) + 0]);
    return ((_subtype == INT32_C(0)) ? INT32_C(0) : supertypeof_I(_subtype));
}

static int32_t supertypeof_I(int32_t _subtype) {
    return (_subtype == INT32_C(5528));
}

static int32_t supertypeof_Arr_J(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(32)) + 0]);
    return ((_subtype == INT32_C(0)) ? INT32_C(0) : supertypeof_J(_subtype));
}

static int32_t supertypeof_J(int32_t _subtype) {
    return (_subtype == INT32_C(5784));
}

static int32_t supertypeof_Arr_F(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(32)) + 0]);
    return ((_subtype == INT32_C(0)) ? INT32_C(0) : supertypeof_F(_subtype));
}

static int32_t supertypeof_F(int32_t _subtype) {
    return (_subtype == INT32_C(6048));
}

static int32_t supertypeof_Arr_D(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(32)) + 0]);
    return ((_subtype == INT32_C(0)) ? INT32_C(0) : supertypeof_D(_subtype));
}

static int32_t supertypeof_D(int32_t _subtype) {
    return (_subtype == INT32_C(6312));
}

static int32_t supertypeof_V(int32_t _subtype) {
    return (_subtype == INT32_C(6568));
}

static int32_t supertypeof_Arr_jl_String(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(32)) + 0]);
    return ((_subtype == INT32_C(0)) ? INT32_C(0) : supertypeof_jl_String(_subtype));
}

static int32_t supertypeof_Arr_jl_Character(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(32)) + 0]);
    return ((_subtype == INT32_C(0)) ? INT32_C(0) : supertypeof_jl_Character(_subtype));
}

static int32_t supertypeof_otp_PlatformClassMetadata(int32_t _subtype) {
    return INT32_C(0);
}

static int32_t supertypeof_otp_PlatformClass(int32_t _subtype) {
    return INT32_C(0);
}

static int32_t supertypeof_Arr_jl_StackTraceElement(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(32)) + 0]);
    return ((_subtype == INT32_C(0)) ? INT32_C(0) : supertypeof_jl_StackTraceElement(_subtype));
}

static int32_t supertypeof_otr_EventQueue_Node(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(11))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(13))) {
        return INT32_C(0);
    }
    return INT32_C(1);
}

static int32_t supertypeof_otr_EventQueue_Event(int32_t _subtype) {
    return INT32_C(0);
}

static int32_t supertypeof_Arr_otr_EventQueue_Node(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(32)) + 0]);
    return ((_subtype == INT32_C(0)) ? INT32_C(0) : supertypeof_otr_EventQueue_Node(_subtype));
}

static int32_t supertypeof_Arr_jl_Object(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(32)) + 0]);
    return ((_subtype == INT32_C(0)) ? INT32_C(0) : supertypeof_jl_Object(_subtype));
}

static int32_t supertypeof_otr_Fiber_FiberRunner(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(16)) + 0]);
    if ((_subtype < INT32_C(25))) {
        return INT32_C(0);
    }
    if ((_subtype >= INT32_C(99))) {
        return INT32_C(0);
    }
    if ((_subtype > INT32_C(27))) {
        if ((_subtype < INT32_C(97))) {
            return INT32_C(0);
        }
    }
    return INT32_C(1);
}

static int32_t supertypeof_otp_PlatformObject(int32_t _subtype) {
    return INT32_C(0);
}

static int32_t supertypeof_Arr_B(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(32)) + 0]);
    return ((_subtype == INT32_C(0)) ? INT32_C(0) : supertypeof_B(_subtype));
}

static int32_t supertypeof_B(int32_t _subtype) {
    return (_subtype == INT32_C(8808));
}

static int32_t supertypeof_Arr_S(int32_t _subtype) {
    _subtype = *((int32_t *) &wasm_heap[(_subtype + INT32_C(32)) + 0]);
    return ((_subtype == INT32_C(0)) ? INT32_C(0) : supertypeof_S(_subtype));
}

static int32_t supertypeof_S(int32_t _subtype) {
    return (_subtype == INT32_C(9072));
}

int32_t teavm_javaHeapAddress() {
    return *((int32_t *) &wasm_heap[INT32_C(3996) + 0]);
}

int32_t teavm_availableBytes() {
    return *((int32_t *) &wasm_heap[INT32_C(4000) + 0]);
}

int32_t teavm_regionsAddress() {
    return *((int32_t *) &wasm_heap[INT32_C(3980) + 0]);
}

int32_t teavm_regionSize() {
    return INT32_C(1024);
}

static void initclass_otr_GC() {
    if ((*((int32_t *) &wasm_heap[INT32_C(980) + 0]) & INT32_C(1))) {
        goto block_0;
    }
    *((int32_t *) &wasm_heap[INT32_C(980) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(980) + 0]) | INT32_C(1));
    meth_otr_GC__clinit_();
    block_0: ;
}

static void initclass_jl_Character() {
    if ((*((int32_t *) &wasm_heap[INT32_C(2004) + 0]) & INT32_C(1))) {
        goto block_0;
    }
    *((int32_t *) &wasm_heap[INT32_C(2004) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(2004) + 0]) | INT32_C(1));
    meth_jl_Character__clinit_();
    block_0: ;
}

static void initclass_jl_Thread() {
    if ((*((int32_t *) &wasm_heap[INT32_C(2140) + 0]) & INT32_C(1))) {
        goto block_0;
    }
    *((int32_t *) &wasm_heap[INT32_C(2140) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(2140) + 0]) | INT32_C(1));
    meth_jl_Thread__clinit_();
    block_0: ;
}

static void initclass_jl_String() {
    if ((*((int32_t *) &wasm_heap[INT32_C(3852) + 0]) & INT32_C(1))) {
        goto block_0;
    }
    *((int32_t *) &wasm_heap[INT32_C(3852) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(3852) + 0]) | INT32_C(1));
    meth_jl_String__clinit_();
    block_0: ;
}

static void initclass_otbw_WasmHeap() {
    if ((*((int32_t *) &wasm_heap[INT32_C(4044) + 0]) & INT32_C(1))) {
        goto block_0;
    }
    *((int32_t *) &wasm_heap[INT32_C(4044) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(4044) + 0]) | INT32_C(1));
    meth_otbw_WasmHeap__clinit_();
    block_0: ;
}

static void initclass_cbv_VisualizerRuntime() {
    if ((*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) & INT32_C(1))) {
        goto block_0;
    }
    *((int32_t *) &wasm_heap[INT32_C(4284) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(4284) + 0]) | INT32_C(1));
    meth_cbv_VisualizerRuntime__clinit_();
    block_0: ;
}

static void initclass_otr_EventQueue() {
    if ((*((int32_t *) &wasm_heap[INT32_C(4628) + 0]) & INT32_C(1))) {
        goto block_0;
    }
    *((int32_t *) &wasm_heap[INT32_C(4628) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(4628) + 0]) | INT32_C(1));
    meth_otr_EventQueue__clinit_();
    block_0: ;
}

static void initclass_otr_Fiber() {
    if ((*((int32_t *) &wasm_heap[INT32_C(4772) + 0]) & INT32_C(1))) {
        goto block_0;
    }
    *((int32_t *) &wasm_heap[INT32_C(4772) + 0]) = (*((int32_t *) &wasm_heap[INT32_C(4772) + 0]) | INT32_C(1));
    meth_otr_Fiber__clinit_();
    block_0: ;
}

static void __start__() {
    initclass_otbw_WasmHeap();
    meth_otbw_WasmHeap_initHeap(INT32_C(24584), INT32_C(4194304), INT32_C(134217728), INT32_C(262144), INT32_C(512));
    initclass_otr_GC();
    initclass_otr_EventQueue();
    initclass_otr_Fiber();
}

void teavm_start(int32_t _args) {
    meth_otbwr_WasmSupport_runWithArgs(_args);
}

void teavm_call_start() {
    meth_otbwr_WasmSupport_runWithoutArgs();
}

void main(int argc, char** argv) {
    wasm_args = argc;
    wasm_argv = argv;
    wasm_heap_size = 65536;
    wasm_heap = malloc(wasm_heap_size);
    memcpy(wasm_heap + 256,
        "\x00\x00\x00\x80\x00\x00\x00\x40\x00\x00\x00\x00\x01\x00\x00\x00\x02\x00\x00\x00\x04\x00\x00\x00\x00\x04\x00\x00\x03\x00\x00\x00\x0f\x00\x00\x00\x07\x00\x00\x00\x07\x00\x00\x00\x00\x00\x00\x00"
        "\x01\x00\x00\x00\x02\x00\x00\x00\x03\x00\x00\x00\x04\x00\x00\x00\x05\x00\x00\x00\x06\x00\x00\x00\x07\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00"
        "\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xa2\xaa\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x18\x21\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00"
        "\xff\xff\xff\xff\x00\x00\x00\x00\x88\xca\x86\xd2\x11\x9c\x20\x1c\x04\x00\x08\x00\x0c\x00\x14\x00\x18\x00\x00\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x1c\x00\x00\x00\x00\x00\x00\x00"
        "\x1f\x00\x00\x00\xb6\xb5\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\xd0\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\x03\x00\x00\x00\x00\x00\x00\x00\x48\x49\xdc\x5b\x2d\x75\xa1\xe1"
        "\x75\x02\x00\x80\x00\x00\x00\x00\x1c\x00\x00\x00\x00\x00\x00\x00\x20\x00\x00\x00\xb6\x8a\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x04\x00\x00\x00\xff\xff\xff\xff\xe0\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00"
        "\x03\x00\x00\x00\x00\x00\x00\x00\x4b\xcd\x13\xde\xf7\x1b\xa8\x30\x75\x02\x00\x80\x00\x00\x00\x00\x1c\x00\x00\x00\x00\x00\x00\x00\x21\x00\x00\x00\xb6\x8b\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x05\x00\x00\x00\xff\xff\xff\xff\x50\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\x03\x00\x00\x00\x00\x00\x00\x00\x31\xe2\x9d\xe1\xcd\x61\x47\x9a\x75\x02\x00\x80\x00\x00\x00\x00\x1c\x00\x00\x00\x00\x00\x00\x00"
        "\x22\x00\x00\x00\xb6\x88\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x06\x00\x00\x00\xff\xff\xff\xff\xc0\x02\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\x03\x00\x00\x00\x01\x02\x04\x08\x08\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00"
        "\x08\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\xa2\xab\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x07\x00\x00\x00\x08\x00\x00\x00"
        "\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00"
        "\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x03\x00\x00\x00\xa2\xa9\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x09\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00"
        "\xff\xff\xff\xff\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x05\x00\x00\x00\xa2\xaf\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x0a\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x07\x00\x00\x00\xa2\xad\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0b\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00"
        "\x08\x00\x00\x00\x00\x00\x00\x00\x09\x00\x00\x00\xa2\xa3\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0c\x00\x00\x00\xff\xff\xff\xff"
        "\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00"
        "\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x0d\x00\x00\x00\xa2\xa7\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x0d\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00"
        "\xff\xff\xff\xff\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x0f\x00\x00\x00\xa2\xa5\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x0e\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\xa6\xba\xf8\x78\xe2\xab\xa2\x24\x75\x02\x00\x80\x00\x00\x00\x00\x1c\x00\x00\x00\x00\x00\x00\x00\x28\x00\x00\x00\xb6\x82\xaa\xaa"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0f\x00\x00\x00\xff\xff\xff\xff\xc0\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x00\x24\x00\x00\x00\x00\x00\xff\xff\x00\x00\x00\x00\x00\x01\x02\x03"
        "\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10\x11\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\xff\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10\x11\x12\x00\xd8"
        "\xff\xdb\x00\xdc\xff\xdf\x00\xd8\xff\xdf\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\xff\xff\x10\x00\x10\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\xf8\x00\x00\x00\xd8\x00\x00\x00\xfc\x00\x00\xff\x03\x00\x00\x00\xd8\x00\x00\x00\xdc\x00\x00\x0a\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00\x00\x00\x00\x00\x11\x00\x00\x00\xba\xbb\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xf8\x1a\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x10\x00\x00\x00\x11\x00\x00\x00\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x05\x00\x08\x00\x2c\x00\x34\x00\x38\x00\x40\x00\x00\x00\x00\x00"
        "\x75\x02\x00\x80\x00\x00\x00\x00\x44\x00\x00\x00\x00\x00\x00\x00\x13\x00\x00\x00\xee\xb9\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x12\x00\x00\x00\x13\x00\x00\x00\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x40\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00"
        "\xff\xff\xff\xff\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x15\x00\x00\x00\xa2\xbf\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x14\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x69\x57\x14\x8b\x0a\xbf\x05\x40\x18\x2d\x44\x54\xfb\x21\x09\x40\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00"
        "\x17\x00\x00\x00\xa2\xbd\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x15\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00"
        "\x08\x00\x00\x00\x00\x00\x00\x00\x19\x00\x00\x00\xa2\xb3\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x16\x00\x00\x00\xff\xff\xff\xff"
        "\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\x17\x00\x00\x00\x00\x00\x00\x00"
        "\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x1b\x00\x00\x00\xa2\xb1\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x18\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00"
        "\xff\xff\xff\xff\x00\x00\x00\x00\x6d\x7e\xf9\x2a\xaa\xbd\x11\x5d\x75\x02\x00\x80\x00\x00\x00\x00\x1c\x00\x00\x00\x00\x00\x00\x00\x23\x00\x00\x00\xb6\x89\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x19\x00\x00\x00\xff\xff\xff\xff\x30\x03\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\x03\x00\x00\x00\x01\x00\x08\x00\x75\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00\x00\x00\x00\x00\x59\x00\x00\x00\xba\xf3\xaa\xaa"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x1a\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\xd4\x0a\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x1b\x00\x00\x00\x01\x00\x00\x00\x1c\x00\x00\x00\x1d\x00\x00\x00\x1e\x00\x00\x00\x1f\x00\x00\x00\x20\x00\x00\x00\x21\x00\x00\x00"
        "\x22\x00\x00\x00\x23\x00\x00\x00\x24\x00\x00\x00\x25\x00\x00\x00\x26\x00\x00\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00\x00\x00\x00\x00\x5a\x00\x00\x00\xba\xf0\xaa\xaa"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x27\x00\x00\x00\xff\xff\xff\xff\xd8\x0a\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x28\x00\x00\x00\x01\x00\x00\x00\x29\x00\x00\x00\x2a\x00\x00\x00\x2b\x00\x00\x00\x1f\x00\x00\x00\x2c\x00\x00\x00\x21\x00\x00\x00"
        "\x22\x00\x00\x00\x23\x00\x00\x00\x24\x00\x00\x00\x25\x00\x00\x00\x2d\x00\x00\x00\x2e\x00\x00\x00\x2f\x00\x00\x00\x30\x00\x00\x00\x31\x00\x00\x00\x32\x00\x00\x00\x33\x00\x00\x00\x34\x00\x00\x00"
        "\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x31\x00\x00\x00\xa2\x9b\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x35\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00"
        "\xff\xff\xff\xff\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x33\x00\x00\x00\xa2\x99\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x36\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x57\x00\x00\x00\xa2\xfd\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x37\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x5d\x00\x00\x00\xa2\xf7\xaa\xaa"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x38\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00"
        "\x08\x00\x00\x00\x00\x00\x00\x00\x5f\x00\x00\x00\xa2\xf5\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x39\x00\x00\x00\xff\xff\xff\xff"
        "\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x01\x00\x08\x00"
        "\x75\x02\x00\x80\x00\x00\x00\x00\x0c\x00\x00\x00\x00\x00\x00\x00\x61\x00\x00\x00\xa6\xcb\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x3a\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x1c\x0e\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00"
        "\x3b\x00\x00\x00\x03\x00\x08\x00\x0c\x00\x10\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x63\x00\x00\x00\xb2\xc9\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x1e\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x3c\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x84\x0e\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x01\x00\x08\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00\x00\x00\x00\x00"
        "\x65\x00\x00\x00\xba\xcf\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x48\x1a\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x3d\x00\x00\x00\x41\x00\x00\x00\x60\x01\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\xf8\x0e\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\x3e\x00\x00\x00\x3f\x00\x00\x00\x40\x00\x00\x00\x00\x00\x01\x00"
        "\x00\x00\x04\x00\x00\x04\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00"
        "\x67\x00\x00\x00\xa2\xcd\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x42\x00\x00\x00\x43\x00\x00\x00\x60\x01\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x57\x2c\xd8\xa8\x2f\x62\x27\x43"
        "\x75\x02\x00\x80\x00\x00\x00\x00\x1c\x00\x00\x00\x00\x00\x00\x00\x2a\x00\x00\x00\xb6\x80\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x44\x00\x00\x00\xff\xff\xff\xff\xc0\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00"
        "\x03\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00"
        "\x69\x00\x00\x00\xa2\xc3\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x45\x00\x00\x00\x46\x00\x00\x00\x60\x01\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x96\x7b\xb8\x52\x49\xf9\x75\x48"
        "\x75\x02\x00\x80\x00\x00\x00\x00\x1c\x00\x00\x00\x00\x00\x00\x00\x25\x00\x00\x00\xb6\x8f\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x47\x00\x00\x00\xff\xff\xff\xff\x30\x03\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00"
        "\x03\x00\x00\x00\x00\x00\x00\x00\xcb\xd5\xf5\x6a\x3c\x32\xfd\xee\x75\x02\x00\x80\x00\x00\x00\x00\x1c\x00\x00\x00\x00\x00\x00\x00\x2c\x00\x00\x00\xb6\x86\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x48\x00\x00\x00\xff\xff\xff\xff\xc0\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\x03\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00"
        "\x08\x00\x00\x00\x00\x00\x00\x00\x6b\x00\x00\x00\xa2\xc1\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x49\x00\x00\x00\x4a\x00\x00\x00"
        "\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00"
        "\x01\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x08\x00\x08\x00\x10\x00\x18\x00\x20\x00\x28\x00\x34\x00\x38\x00\x3c\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00"
        "\x80\x00\x00\x00\x00\x00\x00\x00\x6d\x00\x00\x00\x2a\xc7\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x4b\x00\x00\x00\x58\x00\x00\x00"
        "\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x84\x12\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\x4c\x00\x00\x00\x4d\x00\x00\x00"
        "\x4e\x00\x00\x00\x4f\x00\x00\x00\x50\x00\x00\x00\x51\x00\x00\x00\x52\x00\x00\x00\x53\x00\x00\x00\x54\x00\x00\x00\x55\x00\x00\x00\x56\x00\x00\x00\x57\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00"
        "\x08\x00\x00\x00\x00\x00\x00\x00\x6f\x00\x00\x00\xa2\xc5\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x59\x00\x00\x00\xff\xff\xff\xff"
        "\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x0a\x00"
        "\x08\x00\x0c\x00\x10\x00\x14\x00\x18\x00\x1c\x00\x20\x00\x24\x00\x28\x00\x2c\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x30\x00\x00\x00\x00\x00\x00\x00\x71\x00\x00\x00\x9a\xdb\xaa\xaa"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x5a\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x8e\x13\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\x5b\x00\x00\x00\x5c\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00"
        "\x73\x00\x00\x00\xa2\xd9\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x5d\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\xe0\x01\x00\x80\x00\x00\x00\x00\x84\x14\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x63\x00\x68\x00\x61\x00\x72\x00\x75\x02\x00\x80\x00\x00\x00\x00\x02\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x74\x14\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\x15\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x5e\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x00\x15\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\x00\x00\x00\x00\x02\x00\x00\x00\x5b\x00\x43\x00"
        "\x75\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xae\xaa\xaa\xaa\xf0\x14\x00\x00\x00\x00\x00\x00\x98\x14\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x5f\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00"
        "\xff\xff\xff\xff\xe0\x01\x00\x80\x00\x00\x00\x00\x84\x15\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x03\x00\x00\x00\x69\x00\x6e\x00\x74\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00"
        "\x04\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x74\x15\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\x16\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x60\x00\x00\x00\xff\xff\xff\xff"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x00\x16\x00\x00\x00\x00\x00\x00"
        "\xa2\x02\x00\x80\x00\x00\x00\x00\x02\x00\x00\x00\x5b\x00\x49\x00\x75\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xae\xaa\xaa\xaa\xf0\x15\x00\x00\x00\x00\x00\x00"
        "\x98\x15\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x61\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\xe0\x01\x00\x80\x00\x00\x00\x00\x84\x16\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00"
        "\x6c\x00\x6f\x00\x6e\x00\x67\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x74\x16\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\x17\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x62\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x00\x17\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x02\x00\x00\x00\x5b\x00\x4a\x00\x75\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\xae\xaa\xaa\xaa\xf0\x16\x00\x00\x00\x00\x00\x00\x98\x16\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x63\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\xe0\x01\x00\x80\x00\x00\x00\x00\x84\x17\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x05\x00\x00\x00\x66\x00\x6c\x00\x6f\x00\x61\x00\x74\x00\x00\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x02\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x74\x17\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x18\x18\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x64\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x08\x18\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00"
        "\x02\x00\x00\x00\x5b\x00\x46\x00\x75\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xae\xaa\xaa\xaa\xf8\x17\x00\x00\x00\x00\x00\x00\xa0\x17\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x65\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\xe0\x01\x00\x80\x00\x00\x00\x00\x8c\x18\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x06\x00\x00\x00\x64\x00\x6f\x00\x75\x00\x62\x00"
        "\x6c\x00\x65\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x7c\x18\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x20\x19\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x66\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x10\x19\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x02\x00\x00\x00\x5b\x00\x44\x00\x75\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\xae\xaa\xaa\xaa\x00\x19\x00\x00\x00\x00\x00\x00\xa8\x18\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x67\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\xe0\x01\x00\x80\x00\x00\x00\x00\x94\x19\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x76\x00\x6f\x00\x69\x00\x64\x00\x75\x02\x00\x80\x00\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x84\x19\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x68\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x10\x1a\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x13\x00\x00\x00\x5b\x00\x4c\x00"
        "\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x53\x00\x74\x00\x72\x00\x69\x00\x6e\x00\x67\x00\x3b\x00\x00\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00"
        "\x04\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xae\xaa\xaa\xaa\x00\x1a\x00\x00\x00\x00\x00\x00\x00\x0f\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x69\x00\x00\x00\xff\xff\xff\xff"
        "\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\xbc\x1a\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x16\x00\x00\x00\x5b\x00\x4c\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00"
        "\x43\x00\x68\x00\x61\x00\x72\x00\x61\x00\x63\x00\x74\x00\x65\x00\x72\x00\x3b\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xae\xaa\xaa\xaa"
        "\xac\x1a\x00\x00\x00\x00\x00\x00\xc8\x07\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x6a\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\xe0\x01\x00\x80\x00\x00\x00\x00\x6c\x1b\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80"
        "\x00\x00\x00\x00\x04\x00\x00\x00\x6d\x00\x61\x00\x69\x00\x6e\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xa2\xaa\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x6b\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xa2\xaa\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x6c\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x40\x1c\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x6e\x00\x75\x00\x6c\x00\x6c\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x64\x1c\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x2a\x00\x00\x00\x09\x00\x61\x00\x74\x00\x20\x00\x4f\x00\x62\x00\x66\x00\x75\x00\x73\x00\x63\x00\x61\x00\x74\x00\x65\x00\x64\x00\x2e\x00\x6f\x00"
        "\x62\x00\x66\x00\x75\x00\x73\x00\x63\x00\x61\x00\x74\x00\x65\x00\x64\x00\x28\x00\x4f\x00\x62\x00\x66\x00\x75\x00\x73\x00\x63\x00\x61\x00\x74\x00\x65\x00\x64\x00\x2e\x00\x6a\x00\x61\x00\x76\x00"
        "\x61\x00\x3a\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xd4\x1c\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x02\x00\x00\x00\x29\x00\x0a\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xf4\x1c\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x09\x00\x61\x00\x74\x00\x20\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x18\x1d\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00"
        "\x01\x00\x00\x00\x2e\x00\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x38\x1d\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00\x28\x00\x55\x00\x6e\x00\x6b\x00\x6e\x00\x6f\x00"
        "\x77\x00\x6e\x00\x20\x00\x6d\x00\x65\x00\x74\x00\x68\x00\x6f\x00\x64\x00\x29\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x74\x1d\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x01\x00\x00\x00"
        "\x28\x00\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x94\x1d\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x01\x00\x00\x00\x3a\x00\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xb4\x1d\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x1e\x00\x00\x00\x5b\x00\x4c\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x53\x00\x74\x00\x61\x00\x63\x00"
        "\x6b\x00\x54\x00\x72\x00\x61\x00\x63\x00\x65\x00\x45\x00\x6c\x00\x65\x00\x6d\x00\x65\x00\x6e\x00\x74\x00\x3b\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\xae\xaa\xaa\xaa\xa4\x1d\x00\x00\x00\x00\x00\x00\x90\x0e\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x6d\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\xe0\x01\x00\x80\x00\x00\x00\x00\x74\x1e\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0a\x00\x00\x00\x4f\x00\x62\x00\x66\x00\x75\x00\x73\x00\x63\x00\x61\x00\x74\x00\x65\x00\x64\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xa4\x1e\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0a\x00\x00\x00\x6f\x00\x62\x00\x66\x00\x75\x00\x73\x00\x63\x00\x61\x00\x74\x00\x65\x00\x64\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xd4\x1e\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0f\x00\x00\x00\x4f\x00\x62\x00\x66\x00\x75\x00\x73\x00\x63\x00\x61\x00\x74\x00\x65\x00\x64\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x10\x1f\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x00\x00\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x2c\x1f\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80"
        "\x00\x00\x00\x00\x04\x00\x00\x00\x70\x00\x6f\x00\x6e\x00\x67\x00\x01\x00\x0c\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x0b\x00\x00\x00\xb2\xa1\xaa\xaa"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x70\x20\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x6e\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x40\x1f\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\xa2\xaa\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x6f\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x18\x20\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00"
        "\x24\x00\x00\x00\x5b\x00\x4c\x00\x6f\x00\x72\x00\x67\x00\x2e\x00\x74\x00\x65\x00\x61\x00\x76\x00\x6d\x00\x2e\x00\x72\x00\x75\x00\x6e\x00\x74\x00\x69\x00\x6d\x00\x65\x00\x2e\x00\x45\x00\x76\x00"
        "\x65\x00\x6e\x00\x74\x00\x51\x00\x75\x00\x65\x00\x75\x00\x65\x00\x24\x00\x4e\x00\x6f\x00\x64\x00\x65\x00\x3b\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\xae\xaa\xaa\xaa\x08\x20\x00\x00\x00\x00\x00\x00\x48\x1f\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x70\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\xe0\x01\x00\x80\x00\x00\x00\x00\xe4\x20\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x13\x00\x00\x00\x5b\x00\x4c\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x4f\x00\x62\x00\x6a\x00\x65\x00"
        "\x63\x00\x74\x00\x3b\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xae\xaa\xaa\xaa\xd4\x20\x00\x00\x00\x00\x00\x00\x60\x01\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x71\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x19\x00\x00\x00\xa2\xb3\xaa\xaa\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x72\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xa2\xaa\xaa\xaa"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x73\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x50\x22\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x62\x00\x79\x00"
        "\x74\x00\x65\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x01\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x40\x22\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xe0\x22\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x74\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\xd0\x22\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x02\x00\x00\x00\x5b\x00\x42\x00\x75\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\xae\xaa\xaa\xaa\xc0\x22\x00\x00\x00\x00\x00\x00\x68\x22\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x75\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\xe0\x01\x00\x80\x00\x00\x00\x00\x54\x23\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x05\x00\x00\x00\x73\x00\x68\x00\x6f\x00\x72\x00\x74\x00\x00\x00\x00\x00\x00\x00\x75\x02\x00\x80\x00\x00\x00\x00\x02\x00\x00\x00\x02\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x44\x23\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xe8\x23\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x76\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xd8\x23\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00"
        "\x02\x00\x00\x00\x5b\x00\x53\x00\x75\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xae\xaa\xaa\xaa\xc8\x23\x00\x00\x00\x00\x00\x00\x70\x23\x00\x00\x00\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x00\x00\x00\x77\x00\x00\x00\xff\xff\xff\xff\x60\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
        "\xff\xff\xff\xff\x01\x00\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x94\x2e\x00\x00\x00\x00\x00\x00\xa0\x2f\x00\x00\x00\x00\x00\x00\x5c\x30\x00\x00\x00\x00\x00\x00\x5c\x30\x00\x00\x00\x00\x00\x00"
        "\x68\x30\x00\x00\x00\x00\x00\x00\x68\x30\x00\x00\x00\x00\x00\x00\x74\x30\x00\x00\x00\x00\x00\x00\x80\x30\x00\x00\x00\x00\x00\x00\x80\x30\x00\x00\x00\x00\x00\x00\x8c\x30\x00\x00\x00\x00\x00\x00"
        "\x8c\x30\x00\x00\x00\x00\x00\x00\x98\x30\x00\x00\x00\x00\x00\x00\xa4\x30\x00\x00\x00\x00\x00\x00\xa4\x30\x00\x00\x00\x00\x00\x00\xb0\x30\x00\x00\x00\x00\x00\x00\xb0\x30\x00\x00\x00\x00\x00\x00"
        "\xbc\x30\x00\x00\x00\x00\x00\x00\xc8\x30\x00\x00\x00\x00\x00\x00\xc8\x30\x00\x00\x00\x00\x00\x00\xd4\x30\x00\x00\x00\x00\x00\x00\xd4\x30\x00\x00\x00\x00\x00\x00\xe0\x30\x00\x00\x00\x00\x00\x00"
        "\xec\x30\x00\x00\x00\x00\x00\x00\xec\x30\x00\x00\x00\x00\x00\x00\xf8\x30\x00\x00\x00\x00\x00\x00\xf8\x30\x00\x00\x00\x00\x00\x00\x04\x31\x00\x00\x00\x00\x00\x00\x04\x31\x00\x00\x00\x00\x00\x00"
        "\x04\x31\x00\x00\x00\x00\x00\x00\x04\x31\x00\x00\x00\x00\x00\x00\x04\x31\x00\x00\x00\x00\x00\x00\x10\x31\x00\x00\x00\x00\x00\x00\x04\x31\x00\x00\x00\x00\x00\x00\x1c\x31\x00\x00\x00\x00\x00\x00"
        "\x1c\x31\x00\x00\x00\x00\x00\x00\x1c\x31\x00\x00\x00\x00\x00\x00\x28\x31\x00\x00\x00\x00\x00\x00\x28\x31\x00\x00\x00\x00\x00\x00\x28\x31\x00\x00\x00\x00\x00\x00\x00\x32\x00\x00\x00\x00\x00\x00"
        "\x00\x32\x00\x00\x00\x00\x00\x00\x00\x32\x00\x00\x00\x00\x00\x00\x0c\x32\x00\x00\x00\x00\x00\x00\x18\x32\x00\x00\x00\x00\x00\x00\x18\x32\x00\x00\x00\x00\x00\x00\x18\x32\x00\x00\x00\x00\x00\x00"
        "\x0c\x32\x00\x00\x00\x00\x00\x00\x0c\x32\x00\x00\x00\x00\x00\x00\x0c\x32\x00\x00\x00\x00\x00\x00\x24\x32\x00\x00\x00\x00\x00\x00\x8c\x32\x00\x00\x00\x00\x00\x00\x70\x33\x00\x00\x00\x00\x00\x00"
        "\x80\x34\x00\x00\x00\x00\x00\x00\xd0\x34\x00\x00\x00\x00\x00\x00\x2c\x35\x00\x00\x00\x00\x00\x00\x2c\x35\x00\x00\x00\x00\x00\x00\x2c\x35\x00\x00\x00\x00\x00\x00\x38\x35\x00\x00\x00\x00\x00\x00"
        "\x90\x35\x00\x00\x00\x00\x00\x00\x90\x35\x00\x00\x00\x00\x00\x00\x90\x35\x00\x00\x00\x00\x00\x00\x9c\x35\x00\x00\x00\x00\x00\x00\x04\x36\x00\x00\x00\x00\x00\x00\x04\x36\x00\x00\x00\x00\x00\x00"
        "\x74\x36\x00\x00\x00\x00\x00\x00\x40\x37\x00\x00\x00\x00\x00\x00\xd4\x37\x00\x00\x00\x00\x00\x00\x60\x38\x00\x00\x00\x00\x00\x00\xf4\x38\x00\x00\x00\x00\x00\x00\x18\x39\x00\x00\x00\x00\x00\x00"
        "\x24\x39\x00\x00\x00\x00\x00\x00\x24\x39\x00\x00\x00\x00\x00\x00\xf4\x38\x00\x00\x00\x00\x00\x00\x30\x39\x00\x00\x00\x00\x00\x00\x90\x39\x00\x00\x00\x00\x00\x00\x30\x39\x00\x00\x00\x00\x00\x00"
        "\xb4\x39\x00\x00\x00\x00\x00\x00\xb4\x39\x00\x00\x00\x00\x00\x00\xd8\x39\x00\x00\x00\x00\x00\x00\xd8\x39\x00\x00\x00\x00\x00\x00\xe4\x39\x00\x00\x00\x00\x00\x00\xe0\x3a\x00\x00\x00\x00\x00\x00"
        "\xac\x3b\x00\x00\x00\x00\x00\x00\xf4\x3b\x00\x00\x00\x00\x00\x00\xf0\x3c\x00\x00\x00\x00\x00\x00\x94\x3d\x00\x00\x00\x00\x00\x00\x48\x3e\x00\x00\x00\x00\x00\x00\x94\x3e\x00\x00\x00\x00\x00\x00"
        "\xa0\x3e\x00\x00\x00\x00\x00\x00\xac\x3e\x00\x00\x00\x00\x00\x00\xb8\x3e\x00\x00\x00\x00\x00\x00\x04\x3f\x00\x00\x00\x00\x00\x00\x10\x3f\x00\x00\x00\x00\x00\x00\x1c\x3f\x00\x00\x00\x00\x00\x00"
        "\x70\x3f\x00\x00\x00\x00\x00\x00\xc0\x3f\x00\x00\x00\x00\x00\x00\x1c\x40\x00\x00\x00\x00\x00\x00\x1c\x40\x00\x00\x00\x00\x00\x00\x1c\x40\x00\x00\x00\x00\x00\x00\x28\x40\x00\x00\x00\x00\x00\x00"
        "\xcc\x40\x00\x00\x00\x00\x00\x00\xcc\x40\x00\x00\x00\x00\x00\x00\x2c\x41\x00\x00\x00\x00\x00\x00\x00\x42\x00\x00\x00\x00\x00\x00\x0c\x42\x00\x00\x00\x00\x00\x00\x18\x42\x00\x00\x00\x00\x00\x00"
        "\x3c\x42\x00\x00\x00\x00\x00\x00\x48\x42\x00\x00\x00\x00\x00\x00\x48\x42\x00\x00\x00\x00\x00\x00\x48\x42\x00\x00\x00\x00\x00\x00\x6c\x42\x00\x00\x00\x00\x00\x00\x78\x42\x00\x00\x00\x00\x00\x00"
        "\x78\x42\x00\x00\x00\x00\x00\x00\x84\x42\x00\x00\x00\x00\x00\x00\x90\x42\x00\x00\x00\x00\x00\x00\x9c\x42\x00\x00\x00\x00\x00\x00\xa8\x42\x00\x00\x00\x00\x00\x00\x90\x42\x00\x00\x00\x00\x00\x00"
        "\x90\x42\x00\x00\x00\x00\x00\x00\x90\x42\x00\x00\x00\x00\x00\x00\x90\x42\x00\x00\x00\x00\x00\x00\x9c\x42\x00\x00\x00\x00\x00\x00\x9c\x42\x00\x00\x00\x00\x00\x00\xb4\x42\x00\x00\x00\x00\x00\x00"
        "\xc0\x42\x00\x00\x00\x00\x00\x00\xcc\x42\x00\x00\x00\x00\x00\x00\xd8\x42\x00\x00\x00\x00\x00\x00\xe4\x42\x00\x00\x00\x00\x00\x00\xf0\x42\x00\x00\x00\x00\x00\x00\xfc\x42\x00\x00\x00\x00\x00\x00"
        "\x08\x43\x00\x00\x00\x00\x00\x00\x08\x43\x00\x00\x00\x00\x00\x00\xe4\x42\x00\x00\x00\x00\x00\x00\xe4\x42\x00\x00\x00\x00\x00\x00\x14\x43\x00\x00\x00\x00\x00\x00\x14\x43\x00\x00\x00\x00\x00\x00"
        "\xfc\x42\x00\x00\x00\x00\x00\x00\xfc\x42\x00\x00\x00\x00\x00\x00\x20\x43\x00\x00\x00\x00\x00\x00\x2c\x43\x00\x00\x00\x00\x00\x00\x38\x43\x00\x00\x00\x00\x00\x00\x38\x43\x00\x00\x00\x00\x00\x00"
        "\x44\x43\x00\x00\x00\x00\x00\x00\x44\x43\x00\x00\x00\x00\x00\x00\x50\x43\x00\x00\x00\x00\x00\x00\x74\x43\x00\x00\x00\x00\x00\x00\x80\x43\x00\x00\x00\x00\x00\x00\x8c\x43\x00\x00\x00\x00\x00\x00"
        "\x8c\x43\x00\x00\x00\x00\x00\x00\x8c\x43\x00\x00\x00\x00\x00\x00\x98\x43\x00\x00\x00\x00\x00\x00\x98\x43\x00\x00\x00\x00\x00\x00\xbc\x43\x00\x00\x00\x00\x00\x00\x14\x44\x00\x00\x00\x00\x00\x00"
        "\x14\x44\x00\x00\x00\x00\x00\x00\x14\x44\x00\x00\x00\x00\x00\x00\x14\x44\x00\x00\x00\x00\x00\x00\x20\x44\x00\x00\x00\x00\x00\x00\xe8\x44\x00\x00\x00\x00\x00\x00\x0c\x45\x00\x00\x00\x00\x00\x00"
        "\xd0\x45\x00\x00\x00\x00\x00\x00\xd0\x45\x00\x00\x00\x00\x00\x00\xd0\x45\x00\x00\x00\x00\x00\x00\xdc\x45\x00\x00\x00\x00\x00\x00\x70\x46\x00\x00\x00\x00\x00\x00\x94\x46\x00\x00\x00\x00\x00\x00"
        "\x94\x46\x00\x00\x00\x00\x00\x00\x94\x46\x00\x00\x00\x00\x00\x00\xa0\x46\x00\x00\x00\x00\x00\x00\xa0\x46\x00\x00\x00\x00\x00\x00\xac\x46\x00\x00\x00\x00\x00\x00\xb8\x46\x00\x00\x00\x00\x00\x00"
        "\x70\x46\x00\x00\x00\x00\x00\x00\xc4\x46\x00\x00\x00\x00\x00\x00\xc4\x46\x00\x00\x00\x00\x00\x00\xc4\x46\x00\x00\x00\x00\x00\x00\xc4\x46\x00\x00\x00\x00\x00\x00\xd0\x46\x00\x00\x00\x00\x00\x00"
        "\xdc\x46\x00\x00\x00\x00\x00\x00\x70\x46\x00\x00\x00\x00\x00\x00\xe8\x46\x00\x00\x00\x00\x00\x00\xe8\x46\x00\x00\x00\x00\x00\x00\x38\x47\x00\x00\x00\x00\x00\x00\x5c\x47\x00\x00\x00\x00\x00\x00"
        "\x5c\x47\x00\x00\x00\x00\x00\x00\x5c\x47\x00\x00\x00\x00\x00\x00\xa8\x47\x00\x00\x00\x00\x00\x00\xb4\x47\x00\x00\x00\x00\x00\x00\xb4\x47\x00\x00\x00\x00\x00\x00\xc0\x47\x00\x00\x00\x00\x00\x00"
        "\x0c\x48\x00\x00\x00\x00\x00\x00\x5c\x48\x00\x00\x00\x00\x00\x00\x5c\x48\x00\x00\x00\x00\x00\x00\x80\x48\x00\x00\x00\x00\x00\x00\x64\x49\x00\x00\x00\x00\x00\x00\x3c\x4a\x00\x00\x00\x00\x00\x00"
        "\x60\x4a\x00\x00\x00\x00\x00\x00\xb4\x4a\x00\x00\x00\x00\x00\x00\xb4\x4a\x00\x00\x00\x00\x00\x00\xd8\x4a\x00\x00\x00\x00\x00\x00\x20\x4b\x00\x00\x00\x00\x00\x00\x74\x4b\x00\x00\x00\x00\x00\x00"
        "\x80\x4b\x00\x00\x00\x00\x00\x00\xa4\x4b\x00\x00\x00\x00\x00\x00\xf8\x4b\x00\x00\x00\x00\x00\x00\x4c\x4c\x00\x00\x00\x00\x00\x00\xa8\x4c\x00\x00\x00\x00\x00\x00\xa8\x4c\x00\x00\x00\x00\x00\x00"
        "\xcc\x4c\x00\x00\x00\x00\x00\x00\x28\x4d\x00\x00\x00\x00\x00\x00\x88\x4d\x00\x00\x00\x00\x00\x00\xe8\x4d\x00\x00\x00\x00\x00\x00\x50\x4e\x00\x00\x00\x00\x00\x00\xb4\x4e\x00\x00\x00\x00\x00\x00"
        "\x14\x4f\x00\x00\x00\x00\x00\x00\x74\x4f\x00\x00\x00\x00\x00\x00\xdc\x4f\x00\x00\x00\x00\x00\x00\x40\x50\x00\x00\x00\x00\x00\x00\xa8\x50\x00\x00\x00\x00\x00\x00\x0c\x51\x00\x00\x00\x00\x00\x00"
        "\x70\x51\x00\x00\x00\x00\x00\x00\xd8\x51\x00\x00\x00\x00\x00\x00\x3c\x52\x00\x00\x00\x00\x00\x00\xa0\x52\x00\x00\x00\x00\x00\x00\xa0\x52\x00\x00\x00\x00\x00\x00\xa0\x52\x00\x00\x00\x00\x00\x00"
        "\x00\x53\x00\x00\x00\x00\x00\x00\xa0\x52\x00\x00\x00\x00\x00\x00\xa0\x52\x00\x00\x00\x00\x00\x00\xa0\x52\x00\x00\x00\x00\x00\x00\xa0\x52\x00\x00\x00\x00\x00\x00\xa0\x52\x00\x00\x00\x00\x00\x00"
        "\xa0\x52\x00\x00\x00\x00\x00\x00\xa0\x52\x00\x00\x00\x00\x00\x00\xa0\x52\x00\x00\x00\x00\x00\x00\xa0\x52\x00\x00\x00\x00\x00\x00\x24\x53\x00\x00\x00\x00\x00\x00\x80\x53\x00\x00\x00\x00\x00\x00"
        "\xdc\x53\x00\x00\x00\x00\x00\x00\x30\x54\x00\x00\x00\x00\x00\x00\x30\x54\x00\x00\x00\x00\x00\x00\x54\x54\x00\x00\x00\x00\x00\x00\xa0\x54\x00\x00\x00\x00\x00\x00\xa0\x54\x00\x00\x00\x00\x00\x00"
        "\xc4\x54\x00\x00\x00\x00\x00\x00\x20\x55\x00\x00\x00\x00\x00\x00\x20\x55\x00\x00\x00\x00\x00\x00\x44\x55\x00\x00\x00\x00\x00\x00\x00\x56\x00\x00\x00\x00\x00\x00\xf4\x56\x00\x00\x00\x00\x00\x00"
        "\xd0\x57\x00\x00\x00\x00\x00\x00\xbc\x58\x00\x00\x00\x00\x00\x00\xc8\x58\x00\x00\x00\x00\x00\x00\xd4\x58\x00\x00\x00\x00\x00\x00\xc8\x58\x00\x00\x00\x00\x00\x00\xe0\x58\x00\x00\x00\x00\x00\x00"
        "\xe0\x58\x00\x00\x00\x00\x00\x00\xec\x58\x00\x00\x00\x00\x00\x00\xec\x58\x00\x00\x00\x00\x00\x00\xf8\x58\x00\x00\x00\x00\x00\x00\xf8\x58\x00\x00\x00\x00\x00\x00\x44\x59\x00\x00\x00\x00\x00\x00"
        "\x44\x59\x00\x00\x00\x00\x00\x00\x44\x59\x00\x00\x00\x00\x00\x00\x50\x59\x00\x00\x00\x00\x00\x00\x44\x59\x00\x00\x00\x00\x00\x00\x5c\x59\x00\x00\x00\x00\x00\x00\x5c\x59\x00\x00\x00\x00\x00\x00"
        "\xa8\x59\x00\x00\x00\x00\x00\x00\xa8\x59\x00\x00\x00\x00\x00\x00\xb4\x59\x00\x00\x00\x00\x00\x00\xb4\x59\x00\x00\x00\x00\x00\x00\xb4\x59\x00\x00\x00\x00\x00\x00\xb4\x59\x00\x00\x00\x00\x00\x00"
        "\xb4\x59\x00\x00\x00\x00\x00\x00\xb4\x59\x00\x00\x00\x00\x00\x00\xc0\x59\x00\x00\x00\x00\x00\x00\xc0\x59\x00\x00\x00\x00\x00\x00\xc0\x59\x00\x00\x00\x00\x00\x00\xc0\x59\x00\x00\x00\x00\x00\x00"
        "\xcc\x59\x00\x00\x00\x00\x00\x00\xcc\x59\x00\x00\x00\x00\x00\x00\xcc\x59\x00\x00\x00\x00\x00\x00\xcc\x59\x00\x00\x00\x00\x00\x00\xd8\x59\x00\x00\x00\x00\x00\x00\xfc\x59\x00\x00\x00\x00\x00\x00"
        "\x9c\x5a\x00\x00\x00\x00\x00\x00\xe4\x5a\x00\x00\x00\x00\x00\x00\xf0\x5a\x00\x00\x00\x00\x00\x00\xf0\x5a\x00\x00\x00\x00\x00\x00\xfc\x5a\x00\x00\x00\x00\x00\x00\xfc\x5a\x00\x00\x00\x00\x00\x00"
        "\x08\x5b\x00\x00\x00\x00\x00\x00\x14\x5b\x00\x00\x00\x00\x00\x00\x20\x5b\x00\x00\x00\x00\x00\x00\x20\x5b\x00\x00\x00\x00\x00\x00\x2c\x5b\x00\x00\x00\x00\x00\x00\x2c\x5b\x00\x00\x00\x00\x00\x00"
        "\x38\x5b\x00\x00\x00\x00\x00\x00\x44\x5b\x00\x00\x00\x00\x00\x00\x50\x5b\x00\x00\x00\x00\x00\x00\x50\x5b\x00\x00\x00\x00\x00\x00\x5c\x5b\x00\x00\x00\x00\x00\x00\x5c\x5b\x00\x00\x00\x00\x00\x00"
        "\x68\x5b\x00\x00\x00\x00\x00\x00\x74\x5b\x00\x00\x00\x00\x00\x00\x80\x5b\x00\x00\x00\x00\x00\x00\x80\x5b\x00\x00\x00\x00\x00\x00\x8c\x5b\x00\x00\x00\x00\x00\x00\x8c\x5b\x00\x00\x00\x00\x00\x00"
        "\x98\x5b\x00\x00\x00\x00\x00\x00\xa4\x5b\x00\x00\x00\x00\x00\x00\xb0\x5b\x00\x00\x00\x00\x00\x00\xb0\x5b\x00\x00\x00\x00\x00\x00\xbc\x5b\x00\x00\x00\x00\x00\x00\xbc\x5b\x00\x00\x00\x00\x00\x00"
        "\xc8\x5b\x00\x00\x00\x00\x00\x00\xc8\x5b\x00\x00\x00\x00\x00\x00\xc8\x5b\x00\x00\x00\x00\x00\x00\x14\x5c\x00\x00\x00\x00\x00\x00\x20\x5c\x00\x00\x00\x00\x00\x00\x20\x5c\x00\x00\x00\x00\x00\x00"
        "\x2c\x5c\x00\x00\x00\x00\x00\x00\xb8\x5c\x00\x00\x00\x00\x00\x00\x78\x5d\x00\x00\x00\x00\x00\x00\x0c\x5e\x00\x00\x00\x00\x00\x00\x30\x5e\x00\x00\x00\x00\x00\x00\x30\x5e\x00\x00\x00\x00\x00\x00"
        "\x3c\x5e\x00\x00\xa0\x2e\x00\x00\x16\x00\x00\x00\x00\x00\x00\x00\xac\x2e\x00\x00\x0c\x2f\x00\x00\x74\x2f\x00\x00\xb0\x2e\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xc0\x2e\x00\x00\x00\x00\x00\x00"
        "\xa2\x02\x00\x80\x00\x00\x00\x00\x1f\x00\x00\x00\x54\x00\x49\x00\x6e\x00\x64\x00\x65\x00\x78\x00\x4f\x00\x75\x00\x74\x00\x4f\x00\x66\x00\x42\x00\x6f\x00\x75\x00\x6e\x00\x64\x00\x73\x00\x45\x00"
        "\x78\x00\x63\x00\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x00\x00\x10\x2f\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x20\x2f\x00\x00\x00\x00\x00\x00"
        "\xa2\x02\x00\x80\x00\x00\x00\x00\x23\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x49\x00\x6e\x00\x64\x00\x65\x00\x78\x00\x4f\x00\x75\x00\x74\x00"
        "\x4f\x00\x66\x00\x42\x00\x6f\x00\x75\x00\x6e\x00\x64\x00\x73\x00\x45\x00\x78\x00\x63\x00\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x00\x00\x78\x2f\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00"
        "\x88\x2f\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x06\x00\x00\x00\x3c\x00\x69\x00\x6e\x00\x69\x00\x74\x00\x3e\x00\xac\x2f\x00\x00\x2c\x00\x00\x00\x00\x00\x00\x00\xb8\x2f\x00\x00"
        "\xf0\x2f\x00\x00\x30\x30\x00\x00\xbc\x2f\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xcc\x2f\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0c\x00\x00\x00\x54\x00\x41\x00\x72\x00\x72\x00"
        "\x61\x00\x79\x00\x73\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\xf4\x2f\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x04\x30\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00"
        "\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x75\x00\x74\x00\x69\x00\x6c\x00\x2e\x00\x41\x00\x72\x00\x72\x00\x61\x00\x79\x00\x73\x00\x34\x30\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x44\x30\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x06\x00\x00\x00\x63\x00\x6f\x00\x70\x00\x79\x00\x4f\x00\x66\x00\xac\x2f\x00\x00\x2d\x00\x00\x00\x00\x00\x00\x00\xac\x2f\x00\x00\x2f\x00\x00\x00"
        "\x00\x00\x00\x00\xac\x2f\x00\x00\x47\x00\x00\x00\x00\x00\x00\x00\xac\x2f\x00\x00\x48\x00\x00\x00\x00\x00\x00\x00\xac\x2f\x00\x00\x4a\x00\x00\x00\x00\x00\x00\x00\xac\x2f\x00\x00\x50\x00\x00\x00"
        "\x00\x00\x00\x00\xac\x2f\x00\x00\x51\x00\x00\x00\x00\x00\x00\x00\xac\x2f\x00\x00\x53\x00\x00\x00\x00\x00\x00\x00\xac\x2f\x00\x00\x59\x00\x00\x00\x00\x00\x00\x00\xac\x2f\x00\x00\x5a\x00\x00\x00"
        "\x00\x00\x00\x00\xac\x2f\x00\x00\x5c\x00\x00\x00\x00\x00\x00\x00\xac\x2f\x00\x00\x62\x00\x00\x00\x00\x00\x00\x00\xac\x2f\x00\x00\x63\x00\x00\x00\x00\x00\x00\x00\xac\x2f\x00\x00\x65\x00\x00\x00"
        "\x00\x00\x00\x00\xac\x2f\x00\x00\x75\x00\x00\x00\x00\x00\x00\x00\xac\x2f\x00\x00\x76\x00\x00\x00\x00\x00\x00\x00\xac\x2f\x00\x00\x78\x00\x00\x00\x00\x00\x00\x00\x34\x31\x00\x00\x36\x00\x00\x00"
        "\x00\x00\x00\x00\x40\x31\x00\x00\x78\x31\x00\x00\xc8\x31\x00\x00\x44\x31\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x54\x31\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0b\x00\x00\x00"
        "\x54\x00\x41\x00\x72\x00\x72\x00\x61\x00\x79\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x00\x00\x7c\x31\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x8c\x31\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80"
        "\x00\x00\x00\x00\x17\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x72\x00\x65\x00\x66\x00\x6c\x00\x65\x00\x63\x00\x74\x00\x2e\x00\x41\x00\x72\x00"
        "\x72\x00\x61\x00\x79\x00\x00\x00\xcc\x31\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xdc\x31\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0b\x00\x00\x00\x6e\x00\x65\x00\x77\x00\x49\x00"
        "\x6e\x00\x73\x00\x74\x00\x61\x00\x6e\x00\x63\x00\x65\x00\x00\x00\x34\x31\x00\x00\x39\x00\x00\x00\x00\x00\x00\x00\x34\x31\x00\x00\x3e\x00\x00\x00\x00\x00\x00\x00\x34\x31\x00\x00\x3c\x00\x00\x00"
        "\x00\x00\x00\x00\x30\x32\x00\x00\x48\x00\x00\x00\x00\x00\x00\x00\x3c\x32\x00\x00\x40\x32\x00\x00\x44\x32\x00\x00\x44\x31\x00\x00\x7c\x31\x00\x00\x48\x32\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00"
        "\x58\x32\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x13\x00\x00\x00\x6e\x00\x65\x00\x77\x00\x49\x00\x6e\x00\x73\x00\x74\x00\x61\x00\x6e\x00\x63\x00\x65\x00\x4c\x00\x6f\x00\x77\x00"
        "\x4c\x00\x65\x00\x76\x00\x65\x00\x6c\x00\x00\x00\x98\x32\x00\x00\x94\x00\x00\x00\x00\x00\x00\x00\xa4\x32\x00\x00\xdc\x32\x00\x00\x1c\x33\x00\x00\xa8\x32\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00"
        "\xb8\x32\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0c\x00\x00\x00\x54\x00\x53\x00\x79\x00\x73\x00\x74\x00\x65\x00\x6d\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\xe0\x32\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\xf0\x32\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00"
        "\x53\x00\x79\x00\x73\x00\x74\x00\x65\x00\x6d\x00\x20\x33\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x30\x33\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x19\x00\x00\x00\x63\x00\x75\x00"
        "\x72\x00\x72\x00\x65\x00\x6e\x00\x74\x00\x54\x00\x69\x00\x6d\x00\x65\x00\x4d\x00\x69\x00\x6c\x00\x6c\x00\x69\x00\x73\x00\x4c\x00\x6f\x00\x77\x00\x4c\x00\x65\x00\x76\x00\x65\x00\x6c\x00\x00\x00"
        "\x7c\x33\x00\x00\x21\x00\x00\x00\x00\x00\x00\x00\x88\x33\x00\x00\xc8\x33\x00\x00\x3c\x34\x00\x00\x8c\x33\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x9c\x33\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80"
        "\x00\x00\x00\x00\x10\x00\x00\x00\x57\x00\x61\x00\x73\x00\x6d\x00\x53\x00\x75\x00\x70\x00\x70\x00\x6f\x00\x72\x00\x74\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\xcc\x33\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\xdc\x33\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x2a\x00\x00\x00\x6f\x00\x72\x00\x67\x00\x2e\x00\x74\x00\x65\x00\x61\x00\x76\x00\x6d\x00\x2e\x00\x62\x00\x61\x00"
        "\x63\x00\x6b\x00\x65\x00\x6e\x00\x64\x00\x2e\x00\x77\x00\x61\x00\x73\x00\x6d\x00\x2e\x00\x72\x00\x75\x00\x6e\x00\x74\x00\x69\x00\x6d\x00\x65\x00\x2e\x00\x57\x00\x61\x00\x73\x00\x6d\x00\x53\x00"
        "\x75\x00\x70\x00\x70\x00\x6f\x00\x72\x00\x74\x00\x40\x34\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x50\x34\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x11\x00\x00\x00\x63\x00\x75\x00"
        "\x72\x00\x72\x00\x65\x00\x6e\x00\x74\x00\x54\x00\x69\x00\x6d\x00\x65\x00\x4d\x00\x69\x00\x6c\x00\x6c\x00\x69\x00\x73\x00\x00\x00\x8c\x34\x00\x00\x37\x00\x00\x00\x00\x00\x00\x00\x98\x34\x00\x00"
        "\x9c\x34\x00\x00\xa0\x34\x00\x00\x8c\x33\x00\x00\xcc\x33\x00\x00\xa4\x34\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xb4\x34\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x07\x00\x00\x00"
        "\x67\x00\x65\x00\x74\x00\x41\x00\x72\x00\x67\x00\x73\x00\x00\x00\xdc\x34\x00\x00\x44\x00\x00\x00\x00\x00\x00\x00\xe8\x34\x00\x00\xec\x34\x00\x00\xf0\x34\x00\x00\x8c\x33\x00\x00\xcc\x33\x00\x00"
        "\xf4\x34\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x04\x35\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0e\x00\x00\x00\x72\x00\x75\x00\x6e\x00\x57\x00\x69\x00\x74\x00\x68\x00\x6f\x00"
        "\x75\x00\x74\x00\x41\x00\x72\x00\x67\x00\x73\x00\xdc\x34\x00\x00\x45\x00\x00\x00\x00\x00\x00\x00\x44\x35\x00\x00\x49\x00\x00\x00\x00\x00\x00\x00\x50\x35\x00\x00\x54\x35\x00\x00\x58\x35\x00\x00"
        "\x8c\x33\x00\x00\xcc\x33\x00\x00\x5c\x35\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x6c\x35\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0b\x00\x00\x00\x72\x00\x75\x00\x6e\x00\x57\x00"
        "\x69\x00\x74\x00\x68\x00\x41\x00\x72\x00\x67\x00\x73\x00\x00\x00\x44\x35\x00\x00\x4a\x00\x00\x00\x00\x00\x00\x00\xa8\x35\x00\x00\x4a\x00\x00\x00\x00\x00\x00\x00\xb4\x35\x00\x00\xb8\x35\x00\x00"
        "\xbc\x35\x00\x00\x8c\x33\x00\x00\xcc\x33\x00\x00\xc0\x35\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xd0\x35\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x14\x00\x00\x00\x6c\x00\x61\x00"
        "\x6d\x00\x62\x00\x64\x00\x61\x00\x24\x00\x72\x00\x75\x00\x6e\x00\x57\x00\x69\x00\x74\x00\x68\x00\x41\x00\x72\x00\x67\x00\x73\x00\x24\x00\x31\x00\x10\x36\x00\x00\x45\x00\x00\x00\x00\x00\x00\x00"
        "\x1c\x36\x00\x00\x20\x36\x00\x00\x24\x36\x00\x00\x8c\x33\x00\x00\xcc\x33\x00\x00\x28\x36\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x38\x36\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00"
        "\x17\x00\x00\x00\x6c\x00\x61\x00\x6d\x00\x62\x00\x64\x00\x61\x00\x24\x00\x72\x00\x75\x00\x6e\x00\x57\x00\x69\x00\x74\x00\x68\x00\x6f\x00\x75\x00\x74\x00\x41\x00\x72\x00\x67\x00\x73\x00\x24\x00"
        "\x30\x00\x00\x00\x80\x36\x00\x00\x1a\x00\x00\x00\x00\x00\x00\x00\x8c\x36\x00\x00\xe0\x36\x00\x00\x3c\x37\x00\x00\x90\x36\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xa0\x36\x00\x00\x00\x00\x00\x00"
        "\xa2\x02\x00\x80\x00\x00\x00\x00\x1a\x00\x00\x00\x54\x00\x4e\x00\x75\x00\x6c\x00\x6c\x00\x50\x00\x6f\x00\x69\x00\x6e\x00\x74\x00\x65\x00\x72\x00\x45\x00\x78\x00\x63\x00\x65\x00\x70\x00\x74\x00"
        "\x69\x00\x6f\x00\x6e\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\xe4\x36\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xf4\x36\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x1e\x00\x00\x00"
        "\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x4e\x00\x75\x00\x6c\x00\x6c\x00\x50\x00\x6f\x00\x69\x00\x6e\x00\x74\x00\x65\x00\x72\x00\x45\x00\x78\x00\x63\x00"
        "\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x78\x2f\x00\x00\x4c\x37\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x58\x37\x00\x00\x5c\x37\x00\x00\xa4\x37\x00\x00\x00\x1f\x00\x00\x60\x37\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x70\x37\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x13\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00"
        "\x43\x00\x68\x00\x61\x00\x72\x00\x61\x00\x63\x00\x74\x00\x65\x00\x72\x00\x00\x00\xa8\x37\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xb8\x37\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00"
        "\x08\x00\x00\x00\x66\x00\x6f\x00\x72\x00\x44\x00\x69\x00\x67\x00\x69\x00\x74\x00\xe0\x37\x00\x00\x5e\x00\x00\x00\x00\x00\x00\x00\xec\x37\x00\x00\x2c\x38\x00\x00\x30\x38\x00\x00\xf0\x37\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x00\x38\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0f\x00\x00\x00\x54\x00\x43\x00\x68\x00\x61\x00\x72\x00\x61\x00\x63\x00\x74\x00\x65\x00\x72\x00"
        "\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x00\x00\x60\x37\x00\x00\x34\x38\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x44\x38\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00"
        "\x3c\x00\x63\x00\x6c\x00\x69\x00\x6e\x00\x69\x00\x74\x00\x3e\x00\x6c\x38\x00\x00\x33\x00\x00\x00\x00\x00\x00\x00\x78\x38\x00\x00\xb0\x38\x00\x00\xf0\x38\x00\x00\x7c\x38\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\x8c\x38\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0c\x00\x00\x00\x54\x00\x54\x00\x68\x00\x72\x00\x65\x00\x61\x00\x64\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00"
        "\xb4\x38\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xc4\x38\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00"
        "\x67\x00\x2e\x00\x54\x00\x68\x00\x72\x00\x65\x00\x61\x00\x64\x00\x78\x2f\x00\x00\x00\x39\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x0c\x39\x00\x00\x10\x39\x00\x00\x14\x39\x00\x00\x00\x1f\x00\x00"
        "\xb4\x38\x00\x00\x78\x2f\x00\x00\x6c\x38\x00\x00\x3a\x00\x00\x00\x00\x00\x00\x00\x6c\x38\x00\x00\x26\x00\x00\x00\x00\x00\x00\x00\x3c\x39\x00\x00\x61\x00\x00\x00\x00\x00\x00\x00\x48\x39\x00\x00"
        "\x4c\x39\x00\x00\x50\x39\x00\x00\x7c\x38\x00\x00\xb4\x38\x00\x00\x54\x39\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x64\x39\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00"
        "\x73\x00\x65\x00\x74\x00\x43\x00\x75\x00\x72\x00\x72\x00\x65\x00\x6e\x00\x74\x00\x54\x00\x68\x00\x72\x00\x65\x00\x61\x00\x64\x00\x9c\x39\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\xa8\x39\x00\x00"
        "\xac\x39\x00\x00\xb0\x39\x00\x00\x00\x1f\x00\x00\xb4\x38\x00\x00\x54\x39\x00\x00\xc0\x39\x00\x00\x1b\x00\x00\x00\x00\x00\x00\x00\xcc\x39\x00\x00\xd0\x39\x00\x00\xd4\x39\x00\x00\x7c\x38\x00\x00"
        "\xb4\x38\x00\x00\x34\x38\x00\x00\xc0\x39\x00\x00\x1f\x00\x00\x00\x00\x00\x00\x00\xf0\x39\x00\x00\x14\x00\x00\x00\x00\x00\x00\x00\xfc\x39\x00\x00\x68\x3a\x00\x00\xdc\x3a\x00\x00\x00\x3a\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x10\x3a\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x25\x00\x00\x00\x54\x00\x44\x00\x65\x00\x66\x00\x61\x00\x75\x00\x6c\x00\x74\x00\x55\x00\x6e\x00"
        "\x63\x00\x61\x00\x75\x00\x67\x00\x68\x00\x74\x00\x45\x00\x78\x00\x63\x00\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x48\x00\x61\x00\x6e\x00\x64\x00\x6c\x00\x65\x00\x72\x00\x2e\x00\x6a\x00"
        "\x61\x00\x76\x00\x61\x00\x00\x00\x6c\x3a\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x7c\x3a\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x29\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00"
        "\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x44\x00\x65\x00\x66\x00\x61\x00\x75\x00\x6c\x00\x74\x00\x55\x00\x6e\x00\x63\x00\x61\x00\x75\x00\x67\x00\x68\x00\x74\x00\x45\x00\x78\x00\x63\x00"
        "\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x48\x00\x61\x00\x6e\x00\x64\x00\x6c\x00\x65\x00\x72\x00\x00\x00\x78\x2f\x00\x00\xec\x3a\x00\x00\x45\x00\x00\x00\x00\x00\x00\x00\xf8\x3a\x00\x00"
        "\xfc\x3a\x00\x00\xa8\x3b\x00\x00\x8c\x33\x00\x00\x00\x3b\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x10\x3b\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x46\x00\x00\x00\x6f\x00\x72\x00"
        "\x67\x00\x2e\x00\x74\x00\x65\x00\x61\x00\x76\x00\x6d\x00\x2e\x00\x62\x00\x61\x00\x63\x00\x6b\x00\x65\x00\x6e\x00\x64\x00\x2e\x00\x77\x00\x61\x00\x73\x00\x6d\x00\x2e\x00\x72\x00\x75\x00\x6e\x00"
        "\x74\x00\x69\x00\x6d\x00\x65\x00\x2e\x00\x57\x00\x61\x00\x73\x00\x6d\x00\x53\x00\x75\x00\x70\x00\x70\x00\x6f\x00\x72\x00\x74\x00\x24\x00\x72\x00\x75\x00\x6e\x00\x57\x00\x69\x00\x74\x00\x68\x00"
        "\x6f\x00\x75\x00\x74\x00\x41\x00\x72\x00\x67\x00\x73\x00\x24\x00\x6c\x00\x61\x00\x6d\x00\x62\x00\x64\x00\x61\x00\x24\x00\x5f\x00\x31\x00\x34\x00\x5f\x00\x30\x00\x78\x2f\x00\x00\xb8\x3b\x00\x00"
        "\x45\x00\x00\x00\x00\x00\x00\x00\xc4\x3b\x00\x00\xc8\x3b\x00\x00\xcc\x3b\x00\x00\x8c\x33\x00\x00\x00\x3b\x00\x00\xd0\x3b\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xe0\x3b\x00\x00\x00\x00\x00\x00"
        "\xa2\x02\x00\x80\x00\x00\x00\x00\x03\x00\x00\x00\x72\x00\x75\x00\x6e\x00\x00\x00\x00\x3c\x00\x00\x16\x00\x00\x00\x00\x00\x00\x00\x0c\x3c\x00\x00\x78\x3c\x00\x00\xec\x3c\x00\x00\x10\x3c\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x20\x3c\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x25\x00\x00\x00\x54\x00\x53\x00\x74\x00\x72\x00\x69\x00\x6e\x00\x67\x00\x49\x00\x6e\x00\x64\x00"
        "\x65\x00\x78\x00\x4f\x00\x75\x00\x74\x00\x4f\x00\x66\x00\x42\x00\x6f\x00\x75\x00\x6e\x00\x64\x00\x73\x00\x45\x00\x78\x00\x63\x00\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x2e\x00\x6a\x00"
        "\x61\x00\x76\x00\x61\x00\x00\x00\x7c\x3c\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x8c\x3c\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x29\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00"
        "\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x53\x00\x74\x00\x72\x00\x69\x00\x6e\x00\x67\x00\x49\x00\x6e\x00\x64\x00\x65\x00\x78\x00\x4f\x00\x75\x00\x74\x00\x4f\x00\x66\x00\x42\x00\x6f\x00"
        "\x75\x00\x6e\x00\x64\x00\x73\x00\x45\x00\x78\x00\x63\x00\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x00\x00\x78\x2f\x00\x00\xfc\x3c\x00\x00\x16\x00\x00\x00\x00\x00\x00\x00\x08\x3d\x00\x00"
        "\x48\x3d\x00\x00\x90\x3d\x00\x00\x0c\x3d\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x1c\x3d\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0f\x00\x00\x00\x54\x00\x45\x00\x78\x00\x63\x00"
        "\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x00\x00\x4c\x3d\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x5c\x3d\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80"
        "\x00\x00\x00\x00\x13\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x45\x00\x78\x00\x63\x00\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x00\x00"
        "\x78\x2f\x00\x00\xa0\x3d\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\xac\x3d\x00\x00\xf4\x3d\x00\x00\x44\x3e\x00\x00\xb0\x3d\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xc0\x3d\x00\x00\x00\x00\x00\x00"
        "\xa2\x02\x00\x80\x00\x00\x00\x00\x13\x00\x00\x00\x54\x00\x53\x00\x74\x00\x72\x00\x69\x00\x6e\x00\x67\x00\x42\x00\x75\x00\x69\x00\x6c\x00\x64\x00\x65\x00\x72\x00\x2e\x00\x6a\x00\x61\x00\x76\x00"
        "\x61\x00\x00\x00\xf8\x3d\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x08\x3e\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x17\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00"
        "\x61\x00\x6e\x00\x67\x00\x2e\x00\x53\x00\x74\x00\x72\x00\x69\x00\x6e\x00\x67\x00\x42\x00\x75\x00\x69\x00\x6c\x00\x64\x00\x65\x00\x72\x00\x00\x00\x78\x2f\x00\x00\x54\x3e\x00\x00\x72\x00\x00\x00"
        "\x00\x00\x00\x00\x60\x3e\x00\x00\x64\x3e\x00\x00\x68\x3e\x00\x00\xb0\x3d\x00\x00\xf8\x3d\x00\x00\x6c\x3e\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x7c\x3e\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80"
        "\x00\x00\x00\x00\x06\x00\x00\x00\x61\x00\x70\x00\x70\x00\x65\x00\x6e\x00\x64\x00\x54\x3e\x00\x00\x2a\x00\x00\x00\x00\x00\x00\x00\x54\x3e\x00\x00\x30\x00\x00\x00\x00\x00\x00\x00\x54\x3e\x00\x00"
        "\x48\x00\x00\x00\x00\x00\x00\x00\xc4\x3e\x00\x00\xa8\x00\x00\x00\x00\x00\x00\x00\xd0\x3e\x00\x00\xd4\x3e\x00\x00\xd8\x3e\x00\x00\xb0\x3d\x00\x00\xf8\x3d\x00\x00\xdc\x3e\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\xec\x3e\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x06\x00\x00\x00\x69\x00\x6e\x00\x73\x00\x65\x00\x72\x00\x74\x00\xc4\x3e\x00\x00\xba\x00\x00\x00\x00\x00\x00\x00"
        "\xc4\x3e\x00\x00\xd2\x00\x00\x00\x00\x00\x00\x00\x28\x3f\x00\x00\x12\x00\x00\x00\x00\x00\x00\x00\x34\x3f\x00\x00\x38\x3f\x00\x00\x3c\x3f\x00\x00\xb0\x3d\x00\x00\xf8\x3d\x00\x00\x40\x3f\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x50\x3f\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x09\x00\x00\x00\x73\x00\x65\x00\x74\x00\x4c\x00\x65\x00\x6e\x00\x67\x00\x74\x00\x68\x00\x00\x00"
        "\x7c\x3f\x00\x00\x12\x00\x00\x00\x00\x00\x00\x00\x88\x3f\x00\x00\x8c\x3f\x00\x00\x90\x3f\x00\x00\xb0\x3d\x00\x00\xf8\x3d\x00\x00\x94\x3f\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xa4\x3f\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x74\x00\x6f\x00\x53\x00\x74\x00\x72\x00\x69\x00\x6e\x00\x67\x00\xcc\x3f\x00\x00\x12\x00\x00\x00\x00\x00\x00\x00\xd8\x3f\x00\x00"
        "\xdc\x3f\x00\x00\xe0\x3f\x00\x00\xb0\x3d\x00\x00\xf8\x3d\x00\x00\xe4\x3f\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xf4\x3f\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0e\x00\x00\x00"
        "\x65\x00\x6e\x00\x73\x00\x75\x00\x72\x00\x65\x00\x43\x00\x61\x00\x70\x00\x61\x00\x63\x00\x69\x00\x74\x00\x79\x00\xc4\x3e\x00\x00\x12\x00\x00\x00\x00\x00\x00\x00\x34\x40\x00\x00\x3d\x00\x00\x00"
        "\x00\x00\x00\x00\x40\x40\x00\x00\x80\x40\x00\x00\xc8\x40\x00\x00\x44\x40\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x54\x40\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0f\x00\x00\x00"
        "\x54\x00\x54\x00\x68\x00\x72\x00\x6f\x00\x77\x00\x61\x00\x62\x00\x6c\x00\x65\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x00\x00\x84\x40\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x94\x40\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x13\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x54\x00\x68\x00\x72\x00\x6f\x00\x77\x00\x61\x00"
        "\x62\x00\x6c\x00\x65\x00\x00\x00\x78\x2f\x00\x00\xd8\x40\x00\x00\x6a\x00\x00\x00\x00\x00\x00\x00\xe4\x40\x00\x00\xe8\x40\x00\x00\xec\x40\x00\x00\x44\x40\x00\x00\x84\x40\x00\x00\xf0\x40\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x00\x41\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00\x66\x00\x69\x00\x6c\x00\x6c\x00\x49\x00\x6e\x00\x53\x00\x74\x00\x61\x00\x63\x00"
        "\x6b\x00\x54\x00\x72\x00\x61\x00\x63\x00\x65\x00\x38\x41\x00\x00\x28\x00\x00\x00\x00\x00\x00\x00\x44\x41\x00\x00\x9c\x41\x00\x00\xfc\x41\x00\x00\x48\x41\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00"
        "\x58\x41\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x1b\x00\x00\x00\x54\x00\x41\x00\x62\x00\x73\x00\x74\x00\x72\x00\x61\x00\x63\x00\x74\x00\x53\x00\x74\x00\x72\x00\x69\x00\x6e\x00"
        "\x67\x00\x42\x00\x75\x00\x69\x00\x6c\x00\x64\x00\x65\x00\x72\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x00\x00\xa0\x41\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xb0\x41\x00\x00\x00\x00\x00\x00"
        "\xa2\x02\x00\x80\x00\x00\x00\x00\x1f\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x41\x00\x62\x00\x73\x00\x74\x00\x72\x00\x61\x00\x63\x00\x74\x00"
        "\x53\x00\x74\x00\x72\x00\x69\x00\x6e\x00\x67\x00\x42\x00\x75\x00\x69\x00\x6c\x00\x64\x00\x65\x00\x72\x00\x00\x00\x78\x2f\x00\x00\x38\x41\x00\x00\x2b\x00\x00\x00\x00\x00\x00\x00\x38\x41\x00\x00"
        "\x2c\x00\x00\x00\x00\x00\x00\x00\x24\x42\x00\x00\xf8\x01\x00\x00\x00\x00\x00\x00\x30\x42\x00\x00\x34\x42\x00\x00\x38\x42\x00\x00\x48\x41\x00\x00\xa0\x41\x00\x00\x6c\x3e\x00\x00\x24\x42\x00\x00"
        "\x40\x00\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00\x45\x00\x00\x00\x00\x00\x00\x00\x60\x42\x00\x00\x64\x42\x00\x00\x68\x42\x00\x00\x48\x41\x00\x00\xa0\x41\x00\x00\xdc\x3e\x00\x00\x54\x42\x00\x00"
        "\x49\x00\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00\x4c\x00\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00\x50\x00\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00\x4e\x00\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00"
        "\x53\x00\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00\x52\x00\x00\x00\x00\x00\x00\x00\x24\x42\x00\x00\x59\x00\x00\x00\x00\x00\x00\x00\x24\x42\x00\x00\x61\x00\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00"
        "\x6f\x00\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00\x6c\x00\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00\x71\x00\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00\x80\x00\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00"
        "\x85\x00\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00\x6d\x00\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00\x82\x00\x00\x00\x00\x00\x00\x00\x24\x42\x00\x00\xe4\x01\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00"
        "\xe8\x01\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00\xe9\x01\x00\x00\x00\x00\x00\x00\x54\x42\x00\x00\xfc\x01\x00\x00\x00\x00\x00\x00\x5c\x43\x00\x00\x0e\x02\x00\x00\x00\x00\x00\x00\x68\x43\x00\x00"
        "\x6c\x43\x00\x00\x70\x43\x00\x00\x48\x41\x00\x00\xa0\x41\x00\x00\xe4\x3f\x00\x00\x5c\x43\x00\x00\x08\x02\x00\x00\x00\x00\x00\x00\x5c\x43\x00\x00\x0b\x02\x00\x00\x00\x00\x00\x00\x5c\x43\x00\x00"
        "\x0c\x02\x00\x00\x00\x00\x00\x00\xa4\x43\x00\x00\x1d\x02\x00\x00\x00\x00\x00\x00\xb0\x43\x00\x00\xb4\x43\x00\x00\xb8\x43\x00\x00\x48\x41\x00\x00\xa0\x41\x00\x00\x94\x3f\x00\x00\xc8\x43\x00\x00"
        "\x98\x02\x00\x00\x00\x00\x00\x00\xd4\x43\x00\x00\xd8\x43\x00\x00\xdc\x43\x00\x00\x48\x41\x00\x00\xa0\x41\x00\x00\xe0\x43\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xf0\x43\x00\x00\x00\x00\x00\x00"
        "\xa2\x02\x00\x80\x00\x00\x00\x00\x0b\x00\x00\x00\x69\x00\x6e\x00\x73\x00\x65\x00\x72\x00\x74\x00\x53\x00\x70\x00\x61\x00\x63\x00\x65\x00\x00\x00\xc8\x43\x00\x00\x9a\x02\x00\x00\x00\x00\x00\x00"
        "\x2c\x44\x00\x00\x4a\x00\x00\x00\x00\x00\x00\x00\x38\x44\x00\x00\x3c\x44\x00\x00\xe4\x44\x00\x00\x8c\x33\x00\x00\x40\x44\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x50\x44\x00\x00\x00\x00\x00\x00"
        "\xa2\x02\x00\x80\x00\x00\x00\x00\x43\x00\x00\x00\x6f\x00\x72\x00\x67\x00\x2e\x00\x74\x00\x65\x00\x61\x00\x76\x00\x6d\x00\x2e\x00\x62\x00\x61\x00\x63\x00\x6b\x00\x65\x00\x6e\x00\x64\x00\x2e\x00"
        "\x77\x00\x61\x00\x73\x00\x6d\x00\x2e\x00\x72\x00\x75\x00\x6e\x00\x74\x00\x69\x00\x6d\x00\x65\x00\x2e\x00\x57\x00\x61\x00\x73\x00\x6d\x00\x53\x00\x75\x00\x70\x00\x70\x00\x6f\x00\x72\x00\x74\x00"
        "\x24\x00\x72\x00\x75\x00\x6e\x00\x57\x00\x69\x00\x74\x00\x68\x00\x41\x00\x72\x00\x67\x00\x73\x00\x24\x00\x6c\x00\x61\x00\x6d\x00\x62\x00\x64\x00\x61\x00\x24\x00\x5f\x00\x31\x00\x35\x00\x5f\x00"
        "\x30\x00\x00\x00\x78\x2f\x00\x00\xf4\x44\x00\x00\x4a\x00\x00\x00\x00\x00\x00\x00\x00\x45\x00\x00\x04\x45\x00\x00\x08\x45\x00\x00\x8c\x33\x00\x00\x40\x44\x00\x00\xd0\x3b\x00\x00\x18\x45\x00\x00"
        "\x1c\x00\x00\x00\x00\x00\x00\x00\x24\x45\x00\x00\x74\x45\x00\x00\xcc\x45\x00\x00\x28\x45\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x38\x45\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00"
        "\x17\x00\x00\x00\x54\x00\x53\x00\x74\x00\x61\x00\x63\x00\x6b\x00\x54\x00\x72\x00\x61\x00\x63\x00\x65\x00\x45\x00\x6c\x00\x65\x00\x6d\x00\x65\x00\x6e\x00\x74\x00\x2e\x00\x6a\x00\x61\x00\x76\x00"
        "\x61\x00\x00\x00\x78\x45\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x88\x45\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x1b\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00"
        "\x61\x00\x6e\x00\x67\x00\x2e\x00\x53\x00\x74\x00\x61\x00\x63\x00\x6b\x00\x54\x00\x72\x00\x61\x00\x63\x00\x65\x00\x45\x00\x6c\x00\x65\x00\x6d\x00\x65\x00\x6e\x00\x74\x00\x00\x00\x78\x2f\x00\x00"
        "\x18\x45\x00\x00\x1e\x00\x00\x00\x00\x00\x00\x00\xe8\x45\x00\x00\x30\x00\x00\x00\x00\x00\x00\x00\xf4\x45\x00\x00\x2c\x46\x00\x00\x6c\x46\x00\x00\xf8\x45\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00"
        "\x08\x46\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0c\x00\x00\x00\x54\x00\x53\x00\x74\x00\x72\x00\x69\x00\x6e\x00\x67\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x30\x46\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x40\x46\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00"
        "\x53\x00\x74\x00\x72\x00\x69\x00\x6e\x00\x67\x00\x78\x2f\x00\x00\x7c\x46\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x88\x46\x00\x00\x8c\x46\x00\x00\x90\x46\x00\x00\x00\x1f\x00\x00\x30\x46\x00\x00"
        "\x78\x2f\x00\x00\xe8\x45\x00\x00\x33\x00\x00\x00\x00\x00\x00\x00\xe8\x45\x00\x00\x31\x00\x00\x00\x00\x00\x00\x00\xe8\x45\x00\x00\x37\x00\x00\x00\x00\x00\x00\x00\xe8\x45\x00\x00\x38\x00\x00\x00"
        "\x00\x00\x00\x00\xe8\x45\x00\x00\x3a\x00\x00\x00\x00\x00\x00\x00\xe8\x45\x00\x00\x75\x00\x00\x00\x00\x00\x00\x00\xe8\x45\x00\x00\x76\x00\x00\x00\x00\x00\x00\x00\xf4\x46\x00\x00\x7a\x00\x00\x00"
        "\x00\x00\x00\x00\x00\x47\x00\x00\x04\x47\x00\x00\x08\x47\x00\x00\xf8\x45\x00\x00\x30\x46\x00\x00\x0c\x47\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x1c\x47\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80"
        "\x00\x00\x00\x00\x08\x00\x00\x00\x61\x00\x6c\x00\x6c\x00\x6f\x00\x63\x00\x61\x00\x74\x00\x65\x00\x44\x47\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x50\x47\x00\x00\x54\x47\x00\x00\x58\x47\x00\x00"
        "\x00\x1f\x00\x00\x30\x46\x00\x00\x0c\x47\x00\x00\x68\x47\x00\x00\x80\x00\x00\x00\x00\x00\x00\x00\x74\x47\x00\x00\x78\x47\x00\x00\x7c\x47\x00\x00\xf8\x45\x00\x00\x30\x46\x00\x00\x80\x47\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x90\x47\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x06\x00\x00\x00\x63\x00\x68\x00\x61\x00\x72\x00\x41\x00\x74\x00\x68\x47\x00\x00\x7f\x00\x00\x00"
        "\x00\x00\x00\x00\x68\x47\x00\x00\x82\x00\x00\x00\x00\x00\x00\x00\xcc\x47\x00\x00\x97\x00\x00\x00\x00\x00\x00\x00\xd8\x47\x00\x00\xdc\x47\x00\x00\xe0\x47\x00\x00\xf8\x45\x00\x00\x30\x46\x00\x00"
        "\xe4\x47\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xf4\x47\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x06\x00\x00\x00\x6c\x00\x65\x00\x6e\x00\x67\x00\x74\x00\x68\x00\x18\x48\x00\x00"
        "\x9b\x00\x00\x00\x00\x00\x00\x00\x24\x48\x00\x00\x28\x48\x00\x00\x2c\x48\x00\x00\xf8\x45\x00\x00\x30\x46\x00\x00\x30\x48\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x40\x48\x00\x00\x00\x00\x00\x00"
        "\xa2\x02\x00\x80\x00\x00\x00\x00\x07\x00\x00\x00\x69\x00\x73\x00\x45\x00\x6d\x00\x70\x00\x74\x00\x79\x00\x00\x00\x68\x48\x00\x00\x24\x00\x00\x00\x00\x00\x00\x00\x74\x48\x00\x00\x78\x48\x00\x00"
        "\x7c\x48\x00\x00\xf8\x45\x00\x00\x30\x46\x00\x00\x34\x38\x00\x00\x8c\x48\x00\x00\x16\x00\x00\x00\x00\x00\x00\x00\x98\x48\x00\x00\xf8\x48\x00\x00\x60\x49\x00\x00\x9c\x48\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\xac\x48\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x20\x00\x00\x00\x54\x00\x4e\x00\x65\x00\x67\x00\x61\x00\x74\x00\x69\x00\x76\x00\x65\x00\x41\x00\x72\x00\x72\x00"
        "\x61\x00\x79\x00\x53\x00\x69\x00\x7a\x00\x65\x00\x45\x00\x78\x00\x63\x00\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\xfc\x48\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\x0c\x49\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x24\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x4e\x00\x65\x00"
        "\x67\x00\x61\x00\x74\x00\x69\x00\x76\x00\x65\x00\x41\x00\x72\x00\x72\x00\x61\x00\x79\x00\x53\x00\x69\x00\x7a\x00\x65\x00\x45\x00\x78\x00\x63\x00\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00"
        "\x78\x2f\x00\x00\x70\x49\x00\x00\x21\x00\x00\x00\x00\x00\x00\x00\x7c\x49\x00\x00\xc8\x49\x00\x00\x38\x4a\x00\x00\x80\x49\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x90\x49\x00\x00\x00\x00\x00\x00"
        "\xa2\x02\x00\x80\x00\x00\x00\x00\x16\x00\x00\x00\x56\x00\x69\x00\x73\x00\x75\x00\x61\x00\x6c\x00\x69\x00\x7a\x00\x65\x00\x72\x00\x52\x00\x75\x00\x6e\x00\x74\x00\x69\x00\x6d\x00\x65\x00\x2e\x00"
        "\x6a\x00\x61\x00\x76\x00\x61\x00\xcc\x49\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xdc\x49\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x28\x00\x00\x00\x63\x00\x6f\x00\x6d\x00\x2e\x00"
        "\x62\x00\x61\x00\x62\x00\x75\x00\x68\x00\x75\x00\x62\x00\x2e\x00\x76\x00\x69\x00\x73\x00\x75\x00\x61\x00\x6c\x00\x69\x00\x7a\x00\x65\x00\x72\x00\x2e\x00\x56\x00\x69\x00\x73\x00\x75\x00\x61\x00"
        "\x6c\x00\x69\x00\x7a\x00\x65\x00\x72\x00\x52\x00\x75\x00\x6e\x00\x74\x00\x69\x00\x6d\x00\x65\x00\x5c\x1b\x00\x00\x48\x4a\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x54\x4a\x00\x00\x58\x4a\x00\x00"
        "\x5c\x4a\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\x5c\x1b\x00\x00\x6c\x4a\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x78\x4a\x00\x00\x7c\x4a\x00\x00\x80\x4a\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00"
        "\x84\x4a\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x94\x4a\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0a\x00\x00\x00\x69\x00\x6e\x00\x69\x00\x74\x00\x69\x00\x61\x00\x6c\x00\x69\x00"
        "\x7a\x00\x65\x00\xc0\x4a\x00\x00\x30\x00\x00\x00\x00\x00\x00\x00\xcc\x4a\x00\x00\xd0\x4a\x00\x00\xd4\x4a\x00\x00\x80\x49\x00\x00\xcc\x49\x00\x00\x84\x4a\x00\x00\xe4\x4a\x00\x00\xff\xff\xff\xff"
        "\x00\x00\x00\x00\xf0\x4a\x00\x00\xf4\x4a\x00\x00\xf8\x4a\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\xfc\x4a\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x0c\x4b\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80"
        "\x00\x00\x00\x00\x04\x00\x00\x00\x70\x00\x69\x00\x6e\x00\x67\x00\x2c\x4b\x00\x00\x45\x00\x00\x00\x00\x00\x00\x00\x38\x4b\x00\x00\x3c\x4b\x00\x00\x40\x4b\x00\x00\x80\x49\x00\x00\xcc\x49\x00\x00"
        "\x44\x4b\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x54\x4b\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0a\x00\x00\x00\x61\x00\x63\x00\x63\x00\x65\x00\x70\x00\x74\x00\x43\x00\x6f\x00"
        "\x64\x00\x65\x00\x2c\x4b\x00\x00\x42\x00\x00\x00\x00\x00\x00\x00\x8c\x4b\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x98\x4b\x00\x00\x9c\x4b\x00\x00\xa0\x4b\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00"
        "\x44\x4b\x00\x00\xb0\x4b\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\xbc\x4b\x00\x00\xc0\x4b\x00\x00\xc4\x4b\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\xc8\x4b\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00"
        "\xd8\x4b\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0a\x00\x00\x00\x69\x00\x6e\x00\x76\x00\x6f\x00\x6b\x00\x65\x00\x4d\x00\x61\x00\x69\x00\x6e\x00\x04\x4c\x00\x00\xff\xff\xff\xff"
        "\x00\x00\x00\x00\x10\x4c\x00\x00\x14\x4c\x00\x00\x18\x4c\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\x1c\x4c\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x2c\x4c\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80"
        "\x00\x00\x00\x00\x09\x00\x00\x00\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x53\x00\x74\x00\x65\x00\x70\x00\x00\x00\x58\x4c\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x64\x4c\x00\x00\x68\x4c\x00\x00"
        "\x6c\x4c\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\x70\x4c\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x80\x4c\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0d\x00\x00\x00\x63\x00\x61\x00"
        "\x70\x00\x74\x00\x75\x00\x72\x00\x65\x00\x4f\x00\x75\x00\x74\x00\x70\x00\x75\x00\x74\x00\x00\x00\xb4\x4c\x00\x00\x64\x00\x00\x00\x00\x00\x00\x00\xc0\x4c\x00\x00\xc4\x4c\x00\x00\xc8\x4c\x00\x00"
        "\x80\x49\x00\x00\xcc\x49\x00\x00\x70\x4c\x00\x00\xd8\x4c\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\xe4\x4c\x00\x00\xe8\x4c\x00\x00\xec\x4c\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\xf0\x4c\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x00\x4d\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0d\x00\x00\x00\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x56\x00\x61\x00\x72\x00\x69\x00\x61\x00"
        "\x62\x00\x6c\x00\x65\x00\x00\x00\x34\x4d\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x40\x4d\x00\x00\x44\x4d\x00\x00\x48\x4d\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\x4c\x4d\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\x5c\x4d\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x4d\x00\x65\x00\x74\x00\x68\x00\x6f\x00\x64\x00\x45\x00"
        "\x6e\x00\x74\x00\x72\x00\x79\x00\x94\x4d\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\xa0\x4d\x00\x00\xa4\x4d\x00\x00\xa8\x4d\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\xac\x4d\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\xbc\x4d\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0f\x00\x00\x00\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x4d\x00\x65\x00\x74\x00\x68\x00\x6f\x00\x64\x00\x45\x00"
        "\x78\x00\x69\x00\x74\x00\x00\x00\xf4\x4d\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x00\x4e\x00\x00\x04\x4e\x00\x00\x08\x4e\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\x0c\x4e\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\x1c\x4e\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x13\x00\x00\x00\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x4f\x00\x62\x00\x6a\x00\x65\x00\x63\x00\x74\x00\x43\x00"
        "\x72\x00\x65\x00\x61\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x00\x00\x5c\x4e\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x68\x4e\x00\x00\x6c\x4e\x00\x00\x70\x4e\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00"
        "\x74\x4e\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x84\x4e\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x12\x00\x00\x00\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x4f\x00\x62\x00\x6a\x00"
        "\x65\x00\x63\x00\x74\x00\x43\x00\x72\x00\x65\x00\x61\x00\x74\x00\x65\x00\x64\x00\xc0\x4e\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\xcc\x4e\x00\x00\xd0\x4e\x00\x00\xd4\x4e\x00\x00\x00\x1f\x00\x00"
        "\xcc\x49\x00\x00\xd8\x4e\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xe8\x4e\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0f\x00\x00\x00\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x46\x00"
        "\x69\x00\x65\x00\x6c\x00\x64\x00\x57\x00\x72\x00\x69\x00\x74\x00\x65\x00\x00\x00\x20\x4f\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x2c\x4f\x00\x00\x30\x4f\x00\x00\x34\x4f\x00\x00\x00\x1f\x00\x00"
        "\xcc\x49\x00\x00\x38\x4f\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x48\x4f\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x41\x00"
        "\x72\x00\x72\x00\x61\x00\x79\x00\x43\x00\x72\x00\x65\x00\x61\x00\x74\x00\x65\x00\x80\x4f\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x8c\x4f\x00\x00\x90\x4f\x00\x00\x94\x4f\x00\x00\x00\x1f\x00\x00"
        "\xcc\x49\x00\x00\x98\x4f\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xa8\x4f\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x14\x00\x00\x00\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x43\x00"
        "\x6f\x00\x6c\x00\x6c\x00\x65\x00\x63\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x45\x00\x76\x00\x65\x00\x6e\x00\x74\x00\xe8\x4f\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\xf4\x4f\x00\x00\xf8\x4f\x00\x00"
        "\xfc\x4f\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\x00\x50\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x10\x50\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x11\x00\x00\x00\x74\x00\x72\x00"
        "\x61\x00\x63\x00\x6b\x00\x4d\x00\x65\x00\x74\x00\x68\x00\x6f\x00\x64\x00\x52\x00\x65\x00\x74\x00\x75\x00\x72\x00\x6e\x00\x00\x00\x4c\x50\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x58\x50\x00\x00"
        "\x5c\x50\x00\x00\x60\x50\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\x64\x50\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x74\x50\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x14\x00\x00\x00"
        "\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x45\x00\x78\x00\x63\x00\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x54\x00\x68\x00\x72\x00\x6f\x00\x77\x00\x6e\x00\xb4\x50\x00\x00\xff\xff\xff\xff"
        "\x00\x00\x00\x00\xc0\x50\x00\x00\xc4\x50\x00\x00\xc8\x50\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\xcc\x50\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xdc\x50\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80"
        "\x00\x00\x00\x00\x12\x00\x00\x00\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x54\x00\x72\x00\x79\x00\x43\x00\x61\x00\x74\x00\x63\x00\x68\x00\x45\x00\x6e\x00\x74\x00\x65\x00\x72\x00\x18\x51\x00\x00"
        "\xff\xff\xff\xff\x00\x00\x00\x00\x24\x51\x00\x00\x28\x51\x00\x00\x2c\x51\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\x30\x51\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x40\x51\x00\x00\x00\x00\x00\x00"
        "\xa2\x02\x00\x80\x00\x00\x00\x00\x11\x00\x00\x00\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x46\x00\x69\x00\x6e\x00\x61\x00\x6c\x00\x6c\x00\x79\x00\x45\x00\x6e\x00\x74\x00\x65\x00\x72\x00\x00\x00"
        "\x7c\x51\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x88\x51\x00\x00\x8c\x51\x00\x00\x90\x51\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\x94\x51\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xa4\x51\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x14\x00\x00\x00\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x53\x00\x74\x00\x61\x00\x74\x00\x69\x00\x63\x00\x49\x00\x6e\x00\x69\x00\x74\x00\x53\x00"
        "\x74\x00\x61\x00\x72\x00\x74\x00\xe4\x51\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\xf0\x51\x00\x00\xf4\x51\x00\x00\xf8\x51\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\xfc\x51\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\x0c\x52\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x12\x00\x00\x00\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x53\x00\x74\x00\x61\x00\x74\x00\x69\x00\x63\x00\x49\x00"
        "\x6e\x00\x69\x00\x74\x00\x45\x00\x6e\x00\x64\x00\x48\x52\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x54\x52\x00\x00\x58\x52\x00\x00\x5c\x52\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\x60\x52\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x70\x52\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x12\x00\x00\x00\x74\x00\x72\x00\x61\x00\x63\x00\x6b\x00\x54\x00\x68\x00\x69\x00\x73\x00\x52\x00"
        "\x65\x00\x66\x00\x65\x00\x72\x00\x65\x00\x6e\x00\x63\x00\x65\x00\xac\x52\x00\x00\x1b\x01\x00\x00\x00\x00\x00\x00\xb8\x52\x00\x00\xbc\x52\x00\x00\xc0\x52\x00\x00\x80\x49\x00\x00\xcc\x49\x00\x00"
        "\xc4\x52\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xd4\x52\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00\x67\x00\x65\x00\x6e\x00\x65\x00\x72\x00\x61\x00\x74\x00\x65\x00"
        "\x4f\x00\x62\x00\x6a\x00\x65\x00\x63\x00\x74\x00\x49\x00\x64\x00\x0c\x53\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x18\x53\x00\x00\x1c\x53\x00\x00\x20\x53\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00"
        "\xc4\x52\x00\x00\x30\x53\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x3c\x53\x00\x00\x40\x53\x00\x00\x44\x53\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\x48\x53\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00"
        "\x58\x53\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0e\x00\x00\x00\x67\x00\x65\x00\x74\x00\x43\x00\x75\x00\x72\x00\x72\x00\x65\x00\x6e\x00\x74\x00\x53\x00\x74\x00\x65\x00\x70\x00"
        "\x8c\x53\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x98\x53\x00\x00\x9c\x53\x00\x00\xa0\x53\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\xa4\x53\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xb4\x53\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0e\x00\x00\x00\x67\x00\x65\x00\x74\x00\x43\x00\x75\x00\x72\x00\x72\x00\x65\x00\x6e\x00\x74\x00\x4c\x00\x69\x00\x6e\x00\x65\x00\xe8\x53\x00\x00"
        "\xff\xff\xff\xff\x00\x00\x00\x00\xf4\x53\x00\x00\xf8\x53\x00\x00\xfc\x53\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\x00\x54\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x10\x54\x00\x00\x00\x00\x00\x00"
        "\xa2\x02\x00\x80\x00\x00\x00\x00\x09\x00\x00\x00\x67\x00\x65\x00\x74\x00\x4f\x00\x75\x00\x74\x00\x70\x00\x75\x00\x74\x00\x00\x00\x3c\x54\x00\x00\x33\x01\x00\x00\x00\x00\x00\x00\x48\x54\x00\x00"
        "\x4c\x54\x00\x00\x50\x54\x00\x00\x80\x49\x00\x00\xcc\x49\x00\x00\x00\x54\x00\x00\x60\x54\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00\x6c\x54\x00\x00\x70\x54\x00\x00\x74\x54\x00\x00\x00\x1f\x00\x00"
        "\xcc\x49\x00\x00\x78\x54\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x88\x54\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x05\x00\x00\x00\x72\x00\x65\x00\x73\x00\x65\x00\x74\x00\x00\x00"
        "\xac\x54\x00\x00\x3d\x01\x00\x00\x00\x00\x00\x00\xb8\x54\x00\x00\xbc\x54\x00\x00\xc0\x54\x00\x00\x80\x49\x00\x00\xcc\x49\x00\x00\x78\x54\x00\x00\xd0\x54\x00\x00\xff\xff\xff\xff\x00\x00\x00\x00"
        "\xdc\x54\x00\x00\xe0\x54\x00\x00\xe4\x54\x00\x00\x00\x1f\x00\x00\xcc\x49\x00\x00\xe8\x54\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xf8\x54\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00"
        "\x0d\x00\x00\x00\x69\x00\x73\x00\x49\x00\x6e\x00\x69\x00\x74\x00\x69\x00\x61\x00\x6c\x00\x69\x00\x7a\x00\x65\x00\x64\x00\x00\x00\x2c\x55\x00\x00\x13\x00\x00\x00\x00\x00\x00\x00\x38\x55\x00\x00"
        "\x3c\x55\x00\x00\x40\x55\x00\x00\x80\x49\x00\x00\xcc\x49\x00\x00\x34\x38\x00\x00\x50\x55\x00\x00\x19\x00\x00\x00\x00\x00\x00\x00\x5c\x55\x00\x00\xa8\x55\x00\x00\xfc\x55\x00\x00\x60\x55\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x70\x55\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x16\x00\x00\x00\x54\x00\x52\x00\x75\x00\x6e\x00\x74\x00\x69\x00\x6d\x00\x65\x00\x45\x00\x78\x00"
        "\x63\x00\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\xac\x55\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xbc\x55\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80"
        "\x00\x00\x00\x00\x1a\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x52\x00\x75\x00\x6e\x00\x74\x00\x69\x00\x6d\x00\x65\x00\x45\x00\x78\x00\x63\x00"
        "\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x78\x2f\x00\x00\x0c\x56\x00\x00\x16\x00\x00\x00\x00\x00\x00\x00\x18\x56\x00\x00\x80\x56\x00\x00\xf0\x56\x00\x00\x1c\x56\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\x2c\x56\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x24\x00\x00\x00\x54\x00\x41\x00\x72\x00\x72\x00\x61\x00\x79\x00\x49\x00\x6e\x00\x64\x00\x65\x00\x78\x00\x4f\x00"
        "\x75\x00\x74\x00\x4f\x00\x66\x00\x42\x00\x6f\x00\x75\x00\x6e\x00\x64\x00\x73\x00\x45\x00\x78\x00\x63\x00\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00"
        "\x84\x56\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x94\x56\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x28\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00"
        "\x67\x00\x2e\x00\x41\x00\x72\x00\x72\x00\x61\x00\x79\x00\x49\x00\x6e\x00\x64\x00\x65\x00\x78\x00\x4f\x00\x75\x00\x74\x00\x4f\x00\x66\x00\x42\x00\x6f\x00\x75\x00\x6e\x00\x64\x00\x73\x00\x45\x00"
        "\x78\x00\x63\x00\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x78\x2f\x00\x00\x00\x57\x00\x00\x16\x00\x00\x00\x00\x00\x00\x00\x0c\x57\x00\x00\x68\x57\x00\x00\xcc\x57\x00\x00\x10\x57\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x20\x57\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x1e\x00\x00\x00\x54\x00\x49\x00\x6c\x00\x6c\x00\x65\x00\x67\x00\x61\x00\x6c\x00\x41\x00\x72\x00"
        "\x67\x00\x75\x00\x6d\x00\x65\x00\x6e\x00\x74\x00\x45\x00\x78\x00\x63\x00\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x6c\x57\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\x7c\x57\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x22\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x49\x00\x6c\x00"
        "\x6c\x00\x65\x00\x67\x00\x61\x00\x6c\x00\x41\x00\x72\x00\x67\x00\x75\x00\x6d\x00\x65\x00\x6e\x00\x74\x00\x45\x00\x78\x00\x63\x00\x65\x00\x70\x00\x74\x00\x69\x00\x6f\x00\x6e\x00\x78\x2f\x00\x00"
        "\xdc\x57\x00\x00\x53\x00\x00\x00\x00\x00\x00\x00\xe8\x57\x00\x00\x28\x58\x00\x00\x80\x58\x00\x00\xec\x57\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xfc\x57\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80"
        "\x00\x00\x00\x00\x0f\x00\x00\x00\x45\x00\x76\x00\x65\x00\x6e\x00\x74\x00\x51\x00\x75\x00\x65\x00\x75\x00\x65\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x00\x00\x2c\x58\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\x3c\x58\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x1c\x00\x00\x00\x6f\x00\x72\x00\x67\x00\x2e\x00\x74\x00\x65\x00\x61\x00\x76\x00\x6d\x00\x2e\x00\x72\x00\x75\x00"
        "\x6e\x00\x74\x00\x69\x00\x6d\x00\x65\x00\x2e\x00\x45\x00\x76\x00\x65\x00\x6e\x00\x74\x00\x51\x00\x75\x00\x65\x00\x75\x00\x65\x00\x84\x58\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x94\x58\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0d\x00\x00\x00\x70\x00\x72\x00\x6f\x00\x63\x00\x65\x00\x73\x00\x73\x00\x53\x00\x69\x00\x6e\x00\x67\x00\x6c\x00\x65\x00\x00\x00\xdc\x57\x00\x00"
        "\x58\x00\x00\x00\x00\x00\x00\x00\xdc\x57\x00\x00\x50\x00\x00\x00\x00\x00\x00\x00\xdc\x57\x00\x00\x51\x00\x00\x00\x00\x00\x00\x00\xdc\x57\x00\x00\x52\x00\x00\x00\x00\x00\x00\x00\xdc\x57\x00\x00"
        "\x54\x00\x00\x00\x00\x00\x00\x00\x04\x59\x00\x00\x79\x00\x00\x00\x00\x00\x00\x00\x10\x59\x00\x00\x14\x59\x00\x00\x18\x59\x00\x00\xec\x57\x00\x00\x2c\x58\x00\x00\x1c\x59\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\x2c\x59\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x06\x00\x00\x00\x72\x00\x65\x00\x6d\x00\x6f\x00\x76\x00\x65\x00\x04\x59\x00\x00\x76\x00\x00\x00\x00\x00\x00\x00"
        "\x04\x59\x00\x00\x77\x00\x00\x00\x00\x00\x00\x00\x68\x59\x00\x00\x7d\x00\x00\x00\x00\x00\x00\x00\x74\x59\x00\x00\x78\x59\x00\x00\x7c\x59\x00\x00\xec\x57\x00\x00\x2c\x58\x00\x00\x80\x59\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x90\x59\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x06\x00\x00\x00\x75\x00\x70\x00\x64\x00\x61\x00\x74\x00\x65\x00\x68\x59\x00\x00\x8f\x00\x00\x00"
        "\x00\x00\x00\x00\x68\x59\x00\x00\x84\x00\x00\x00\x00\x00\x00\x00\x68\x59\x00\x00\x89\x00\x00\x00\x00\x00\x00\x00\x68\x59\x00\x00\x8c\x00\x00\x00\x00\x00\x00\x00\xe4\x59\x00\x00\x1a\x00\x00\x00"
        "\x00\x00\x00\x00\xf0\x59\x00\x00\xf4\x59\x00\x00\xf8\x59\x00\x00\xec\x57\x00\x00\x2c\x58\x00\x00\x34\x38\x00\x00\x08\x5a\x00\x00\x31\x00\x00\x00\x00\x00\x00\x00\x14\x5a\x00\x00\x48\x5a\x00\x00"
        "\x98\x5a\x00\x00\x18\x5a\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x28\x5a\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0a\x00\x00\x00\x46\x00\x69\x00\x62\x00\x65\x00\x72\x00\x2e\x00"
        "\x6a\x00\x61\x00\x76\x00\x61\x00\x4c\x5a\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x5c\x5a\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x17\x00\x00\x00\x6f\x00\x72\x00\x67\x00\x2e\x00"
        "\x74\x00\x65\x00\x61\x00\x76\x00\x6d\x00\x2e\x00\x72\x00\x75\x00\x6e\x00\x74\x00\x69\x00\x6d\x00\x65\x00\x2e\x00\x46\x00\x69\x00\x62\x00\x65\x00\x72\x00\x00\x00\x78\x2f\x00\x00\xa8\x5a\x00\x00"
        "\x38\x00\x00\x00\x00\x00\x00\x00\xb4\x5a\x00\x00\xb8\x5a\x00\x00\xbc\x5a\x00\x00\x18\x5a\x00\x00\x4c\x5a\x00\x00\xc0\x5a\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xd0\x5a\x00\x00\x00\x00\x00\x00"
        "\xa2\x02\x00\x80\x00\x00\x00\x00\x04\x00\x00\x00\x70\x00\x75\x00\x73\x00\x68\x00\xa8\x5a\x00\x00\x39\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00\x3c\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00"
        "\x3a\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00\x41\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00\x42\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00\x45\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00"
        "\x43\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00\x4a\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00\x4b\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00\x4e\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00"
        "\x4c\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00\x53\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00\x54\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00\x57\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00"
        "\x55\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00\x5c\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00\x5d\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00\x60\x00\x00\x00\x00\x00\x00\x00\xa8\x5a\x00\x00"
        "\x5e\x00\x00\x00\x00\x00\x00\x00\xd4\x5b\x00\x00\xfd\x00\x00\x00\x00\x00\x00\x00\xe0\x5b\x00\x00\xe4\x5b\x00\x00\xe8\x5b\x00\x00\x18\x5a\x00\x00\x4c\x5a\x00\x00\xec\x5b\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\xfc\x5b\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x05\x00\x00\x00\x73\x00\x74\x00\x61\x00\x72\x00\x74\x00\x00\x00\xd4\x5b\x00\x00\x0c\x01\x00\x00\x00\x00\x00\x00"
        "\xd4\x5b\x00\x00\x09\x01\x00\x00\x00\x00\x00\x00\x38\x5c\x00\x00\x24\x00\x00\x00\x00\x00\x00\x00\x44\x5c\x00\x00\x48\x5c\x00\x00\xb4\x5c\x00\x00\xf8\x45\x00\x00\x4c\x5c\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\x5c\x5c\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x26\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x53\x00\x74\x00"
        "\x72\x00\x69\x00\x6e\x00\x67\x00\x24\x00\x3c\x00\x63\x00\x6c\x00\x69\x00\x6e\x00\x69\x00\x74\x00\x3e\x00\x24\x00\x6c\x00\x61\x00\x6d\x00\x62\x00\x64\x00\x61\x00\x24\x00\x5f\x00\x38\x00\x34\x00"
        "\x5f\x00\x30\x00\x78\x2f\x00\x00\xc4\x5c\x00\x00\xdd\x00\x00\x00\x00\x00\x00\x00\xd0\x5c\x00\x00\x08\x5d\x00\x00\x48\x5d\x00\x00\xd4\x5c\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xe4\x5c\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0c\x00\x00\x00\x54\x00\x4f\x00\x62\x00\x6a\x00\x65\x00\x63\x00\x74\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x0c\x5d\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\x1c\x5d\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x4f\x00\x62\x00"
        "\x6a\x00\x65\x00\x63\x00\x74\x00\x4c\x5d\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\x5c\x5d\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x08\x00\x00\x00\x67\x00\x65\x00\x74\x00\x43\x00"
        "\x6c\x00\x61\x00\x73\x00\x73\x00\x84\x5d\x00\x00\x43\x00\x00\x00\x00\x00\x00\x00\x90\x5d\x00\x00\xc8\x5d\x00\x00\x08\x5e\x00\x00\x94\x5d\x00\x00\xe0\x01\x00\x80\x00\x00\x00\x00\xa4\x5d\x00\x00"
        "\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0b\x00\x00\x00\x54\x00\x43\x00\x6c\x00\x61\x00\x73\x00\x73\x00\x2e\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x00\x00\xcc\x5d\x00\x00\xe0\x01\x00\x80"
        "\x00\x00\x00\x00\xdc\x5d\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x0f\x00\x00\x00\x6a\x00\x61\x00\x76\x00\x61\x00\x2e\x00\x6c\x00\x61\x00\x6e\x00\x67\x00\x2e\x00\x43\x00\x6c\x00"
        "\x61\x00\x73\x00\x73\x00\x00\x00\x78\x2f\x00\x00\x18\x5e\x00\x00\x4c\x00\x00\x00\x00\x00\x00\x00\x24\x5e\x00\x00\x28\x5e\x00\x00\x2c\x5e\x00\x00\x94\x5d\x00\x00\xcc\x5d\x00\x00\x4c\x5d\x00\x00"
        "\x18\x5e\x00\x00\x4e\x00\x00\x00\x00\x00\x00\x00\x48\x5e\x00\x00\x29\x01\x00\x00\x00\x00\x00\x00\x54\x5e\x00\x00\x58\x5e\x00\x00\x5c\x5e\x00\x00\x94\x5d\x00\x00\xcc\x5d\x00\x00\x60\x5e\x00\x00"
        "\xe0\x01\x00\x80\x00\x00\x00\x00\x70\x5e\x00\x00\x00\x00\x00\x00\xa2\x02\x00\x80\x00\x00\x00\x00\x10\x00\x00\x00\x67\x00\x65\x00\x74\x00\x43\x00\x6f\x00\x6d\x00\x70\x00\x6f\x00\x6e\x00\x65\x00"
        "\x6e\x00\x74\x00\x54\x00\x79\x00\x70\x00\x65\x00\x00\x00\x00\x00\x16\x00\x00\x00\x00\x00\x00\x00\x64\x05\x00\x00\x68\x05\x00\x00\x6c\x05\x00\x00\x70\x05\x00\x00\x28\x07\x00\x00\x80\x07\x00\x00"
        "\x84\x07\x00\x00\x88\x07\x00\x00\x8c\x07\x00\x00\x90\x07\x00\x00\x94\x07\x00\x00\x2c\x08\x00\x00\x30\x08\x00\x00\x3c\x08\x00\x00\x44\x0d\x00\x00\xf4\x0e\x00\x00\xa0\x10\x00\x00\xa8\x10\x00\x00"
        "\xac\x10\x00\x00\xf4\x11\x00\x00\x7c\x12\x00\x00\x80\x12\x00\x00\x30\x03\x00\x00\xc0\x02\x00\x00\x50\x02\x00\x00\xe0\x01\x00\x00\x60\x01\x00\x00\xc8\x03\x00\x00\x30\x04\x00\x00\x98\x04\x00\x00"
        "\x00\x05\x00\x00\x78\x05\x00\x00\xe0\x05\x00\x00\x48\x06\x00\x00\xb8\x06\x00\x00\xc8\x07\x00\x00\x50\x08\x00\x00\xb8\x08\x00\x00\x30\x09\x00\x00\x98\x09\x00\x00\x00\x0a\x00\x00\x70\x0a\x00\x00"
        "\x68\x0b\x00\x00\xd8\x0a\x00\x00\x10\x0c\x00\x00\x78\x0c\x00\x00\xe0\x0c\x00\x00\x48\x0d\x00\x00\xb8\x0d\x00\x00\x20\x0e\x00\x00\x90\x0e\x00\x00\x00\x0f\x00\x00\xc0\x0f\x00\x00\x30\x10\x00\x00"
        "\xb0\x10\x00\x00\x20\x11\x00\x00\x90\x11\x00\x00\x08\x12\x00\x00\x98\x12\x00\x00\x28\x13\x00\x00\xa8\x13\x00\x00\x10\x14\x00\x00\x10\x15\x00\x00\x98\x14\x00\x00\x10\x16\x00\x00\x98\x15\x00\x00"
        "\x10\x17\x00\x00\x98\x16\x00\x00\x18\x18\x00\x00\xa0\x17\x00\x00\x20\x19\x00\x00\xa8\x18\x00\x00\xa8\x19\x00\x00\x48\x1a\x00\x00\xf8\x1a\x00\x00\x80\x1b\x00\x00\xd8\x1b\x00\x00\x00\x1e\x00\x00"
        "\x48\x1f\x00\x00\xb0\x1f\x00\x00\x70\x20\x00\x00\x18\x21\x00\x00\x80\x21\x00\x00\xe8\x21\x00\x00\xe0\x22\x00\x00\x68\x22\x00\x00\xe8\x23\x00\x00\x70\x23\x00\x00", 24328);
    __start__();
    teavm_call_start();
}
