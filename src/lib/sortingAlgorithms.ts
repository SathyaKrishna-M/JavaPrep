
export type StepType = 'compare' | 'swap' | 'sorted' | 'pivot' | 'overwrite';

export interface SortingStep<T> {
    type: StepType;
    indices: number[]; // Indices involved in the operation (e.g., [i, j] for compare/swap)
    arrayState?: T[]; // Optional snapshot for complex updates
    description: string; // textual explanation
}

// Comparison helper
type GetValue<T> = (item: T) => number;

export const generateBubbleSortSteps = <T>(array: T[], getValue: GetValue<T>): SortingStep<T>[] => {
    const steps: SortingStep<T>[] = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            const valA = getValue(arr[j]);
            const valB = getValue(arr[j + 1]);

            steps.push({
                type: 'compare',
                indices: [j, j + 1],
                description: `Comparing ${valA} and ${valB}`
            });

            if (valA > valB) {
                steps.push({
                    type: 'swap',
                    indices: [j, j + 1],
                    description: `Swapping ${valA} and ${valB} since ${valA} > ${valB}`
                });
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        steps.push({
            type: 'sorted',
            indices: [n - i - 1],
            description: `${getValue(arr[n - i - 1])} is now in its correct sorted position.`
        });
        if (!swapped) break;
    }

    steps.push({
        type: 'sorted',
        indices: Array.from({ length: n }, (_, i) => i),
        description: 'Array is fully sorted!'
    });

    return steps;
};

export const generateSelectionSortSteps = <T>(array: T[], getValue: GetValue<T>): SortingStep<T>[] => {
    const steps: SortingStep<T>[] = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        steps.push({
            type: 'pivot',
            indices: [minIdx],
            description: `Current minimum is ${getValue(arr[minIdx])} at index ${minIdx}`
        });

        for (let j = i + 1; j < n; j++) {
            const valMin = getValue(arr[minIdx]);
            const valJ = getValue(arr[j]);

            steps.push({
                type: 'compare',
                indices: [minIdx, j],
                description: `Comparing minimum ${valMin} with ${valJ}`
            });

            if (valJ < valMin) {
                minIdx = j;
                steps.push({
                    type: 'pivot',
                    indices: [minIdx],
                    description: `New minimum found: ${valJ} at index ${minIdx}`
                });
            }
        }

        if (minIdx !== i) {
            steps.push({
                type: 'swap',
                indices: [i, minIdx],
                description: `Swapping ${getValue(arr[i])} with new minimum ${getValue(arr[minIdx])}`
            });
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
        steps.push({
            type: 'sorted',
            indices: [i],
            description: `${getValue(arr[i])} is now sorted.`
        });
    }
    steps.push({
        type: 'sorted',
        indices: Array.from({ length: n }, (_, i) => i),
        description: 'Array is fully sorted!'
    });
    return steps;
};

export const generateInsertionSortSteps = <T>(array: T[], getValue: GetValue<T>): SortingStep<T>[] => {
    const steps: SortingStep<T>[] = [];
    const arr = [...array];
    const n = arr.length;

    steps.push({ type: 'sorted', indices: [0], description: 'First element is essentially sorted.' });

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let valKey = getValue(key);
        let j = i - 1;

        steps.push({
            type: 'pivot',
            indices: [i],
            description: `Selected ${valKey} to insert into sorted portion.`
        });

        // Loop to find position
        while (j >= 0 && getValue(arr[j]) > valKey) {
            steps.push({
                type: 'compare',
                indices: [j, j + 1],
                description: `Comparing ${getValue(arr[j])} > ${valKey}`
            });

            steps.push({
                type: 'overwrite',
                indices: [j + 1],
                // We shift array content visually by snapshotting logic state
                // NOTE: For pure animation we might want 'swaps' instead of overwrites for Insertion Sort
                // to prevent 'node destruction'. Or we pass valid object references in arrayState.
                // Current logic: arr[j+1] = arr[j]. 
                // If arr[j] is object Ref A, then arr[j+1] becomes Ref A. 
                // So we have two Ref As? No, we overwrite what was at j+1 (which was Key, but we saved Key).
                // In the end we put Key back. 
                // For Framer Motion to work, 'Key' object must reappear with same ID.
                // Since 'key' variable holds the object reference, restoring it works.
                // But during the loop, we technically duplicate references in the array.
                // arr = [A, B, C] -> shift B to C -> [A, B, B]. ID conflict for framer motion?
                // Yes, if we render [A, B, B] with key={id}, React screams.
                // FIX: Insertion Sort shifts are effectively sequential swaps or we must carefully handle the hole.
                // EASIER FIX for Visualization: Treat Insertion Sort shifts as SWAPS.
                // Swapping (j, j+1) moves the larger element right and the "key" (smaller) left one step at a time.
                // This effectively places the key correctly and preserves unique IDs at all times.
                // Let's modify Insertion Sort visual logic to use SWAPS for the visual tracer.
                arrayState: undefined,
                description: `Shifting ${getValue(arr[j])} to the right`
            });

            // LOGIC CHANGE FOR VISUAL STABILITY: SWAP to emulate shift
            [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            // Update the 'swapped' step type
            steps[steps.length - 1].type = 'swap';
            steps[steps.length - 1].description = `Swapping ${getValue(arr[j])} and ${getValue(arr[j + 1])} to shift`;

            j = j - 1;
        }
        // Key is already in place due to swaps
        steps.push({
            type: 'overwrite',
            indices: [j + 1],
            arrayState: [...arr],
            description: `Inserted ${valKey} at index ${j + 1}`
        });

        steps.push({
            type: 'sorted',
            indices: Array.from({ length: i + 1 }, (_, k) => k),
            description: `Items up to index ${i} are sorted.`
        });
    }

    return steps;
};


// In-Place Merge Sort to preserve item identity for animation.
export const generateMergeSortSteps = <T>(array: T[], getValue: GetValue<T>): SortingStep<T>[] => {
    const steps: SortingStep<T>[] = [];
    const arr = [...array];

    // Helper to rotate to simulate shift
    const merge = (start: number, mid: number, end: number) => {
        let start2 = mid + 1;

        // If the direct merge is already sorted
        if (getValue(arr[mid]) <= getValue(arr[start2])) {
            return;
        }

        // Two pointers to maintain sorted order
        while (start <= mid && start2 <= end) {

            steps.push({
                type: 'compare',
                indices: [start, start2],
                description: `Comparing ${getValue(arr[start])} and ${getValue(arr[start2])}`
            });

            if (getValue(arr[start]) <= getValue(arr[start2])) {
                start++;
            } else {
                const value = arr[start2];
                const valRaw = getValue(value);
                let index = start2;

                // Shift elements right
                while (index !== start) {
                    arr[index] = arr[index - 1];
                    index--;
                }
                arr[start] = value;

                // Record the "Insertion" / Shift as an overwrite sequence or single update
                // Since this is a complex move (rotation), we pass the FULL state snapshot.
                // Framer Motion layout prop will handle the smooth movement of all items to their new indices.
                steps.push({
                    type: 'overwrite',
                    indices: [start, start2],
                    arrayState: [...arr],
                    description: `Moved ${valRaw} to position ${start}`
                });

                // Update pointers
                start++;
                mid++;
                start2++;
            }
        }
    };

    const mergeSort = (l: number, r: number) => {
        if (l < r) {
            const m = l + Math.floor((r - l) / 2);
            mergeSort(l, m);
            mergeSort(m + 1, r);
            merge(l, m, r);
        }
    };

    mergeSort(0, arr.length - 1);

    steps.push({
        type: 'sorted',
        indices: Array.from({ length: arr.length }, (_, i) => i),
        description: 'Array is fully sorted!'
    });

    return steps;
};

export const generateQuickSortSteps = <T>(array: T[], getValue: GetValue<T>): SortingStep<T>[] => {
    const steps: SortingStep<T>[] = [];
    const arr = [...array];

    const partition = (low: number, high: number): number => {
        const pivot = arr[high];
        const valPivot = getValue(pivot);

        steps.push({
            type: 'pivot',
            indices: [high],
            description: `Pivot selected: ${valPivot}`
        });

        let i = low - 1;
        for (let j = low; j < high; j++) {
            steps.push({
                type: 'compare',
                indices: [j, high],
                description: `Comparing ${getValue(arr[j])} with pivot ${valPivot}`
            });

            if (getValue(arr[j]) < valPivot) {
                i++;
                if (i !== j) {
                    steps.push({
                        type: 'swap',
                        indices: [i, j],
                        description: `Swapping ${getValue(arr[i])} and ${getValue(arr[j])} (smaller left)`
                    });
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
        }
        if (i + 1 !== high) {
            steps.push({
                type: 'swap',
                indices: [i + 1, high],
                description: `Placing pivot ${valPivot} at correct position ${i + 1}`
            });
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        }

        steps.push({
            type: 'sorted',
            indices: [i + 1],
            description: `Pivot ${valPivot} is now at its sorted position.`
        });

        return i + 1;
    };

    const quickSort = (low: number, high: number) => {
        if (low < high) {
            const pi = partition(low, high);
            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        } else if (low === high) {
            steps.push({
                type: 'sorted',
                indices: [low],
                description: `Element ${getValue(arr[low])} is in position.`
            });
        }
    };

    quickSort(0, arr.length - 1);

    steps.push({
        type: 'sorted',
        indices: Array.from({ length: arr.length }, (_, i) => i),
        description: 'Array is fully sorted!'
    });

    return steps;
};
