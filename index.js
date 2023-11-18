const array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 10) + 1);
    let arrayShown = false;
    let Paused;
    let Stopped;

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualizeInsertionSort(arr, delay) {
    Paused = false;
    Stopped = false;
    const container = document.getElementById('container');

    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;

            container.innerHTML = '';
            renderBars(arr);
            await sleep(delay);
        }

        arr[j + 1] = current;

        container.innerHTML = '';
        renderBars(arr);
        while (Paused) {
            await sleep(5);
        }
        if (Stopped) {
            break;
        }
        await sleep(delay);
    }
}

async function visualizeSelectionSort(arr, delay) {
    Paused = false;
    Stopped = false;
    const container = document.getElementById('container');

    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

            container.innerHTML = '';
            renderBars(arr);
            while (Paused) {
                await sleep(5);
            }
            if (Stopped) {
                break;
            }
            await sleep(delay);
        }
    }
}

async function visualizeBubbleSort(arr, delay) {
    Paused = false;
    Stopped = false;
    const container = document.getElementById('container');

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                container.innerHTML = '';
                renderBars(arr);
                while (Paused) {
                    await sleep(5);
                }
                if (Stopped) {
                    break;
                }
                await sleep(delay);
            }
        }
    }
}

async function visualizeQuickSort(arr, start, end, delay) {
    if (start < end) {
        const pivotIndex = await partition(arr, start, end, delay);

        await visualizeQuickSort(arr, start, pivotIndex - 1, delay);
        await visualizeQuickSort(arr, pivotIndex + 1, end, delay);
    }
}

async function partition(arr, start, end, delay) {
    Paused = false;
    Stopped = false;
    const container = document.getElementById('container');
    const pivot = arr[end];
    let i = start - 1;

    for (let j = start; j < end; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];

            container.innerHTML = '';
            renderBars(arr);
            while (Paused) {
                await sleep(5);
            }
            if (Stopped) {
                return;
            }
            await sleep(delay);
        }
    }

    [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];

    container.innerHTML = '';
    renderBars(arr);
    while (Paused) {
        await sleep(5);
    }
    if (Stopped) {
        return;
    }
    await sleep(delay);

    return i + 1;
}

async function visualizeMergeSort(arr, start, end, delay) {

    Stopped = false;
    if (start < end) {
        const middle = Math.floor((start + end) / 2);

        await visualizeMergeSort(arr, start, middle, delay);
        if(Stopped) {
            return;
         }
        await visualizeMergeSort(arr, middle + 1, end, delay);
        if(Stopped) {
            return;
         }

        await merge(arr, start, middle, end, delay);
    }
}

async function merge(arr, start, middle, end, delay) {
    Paused = false;
    Stopped = false;
    const container = document.getElementById('container');

    const leftArr = arr.slice(start, middle + 1);
    const rightArr = arr.slice(middle + 1, end + 1);

    let i = 0, j = 0, k = start;

    

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }

        container.innerHTML = '';
        renderBars(arr);
        while (Paused) {
            await sleep();
        }
        if(Stopped) {
            break;
        }
       
        await sleep(delay);

        k++;
    }

    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;

        container.innerHTML = '';
        renderBars(arr);
        while (Paused) {
            await sleep();
        }
        if(Stopped){
            break;
        }
        
        await sleep(delay);
    }

    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;

        container.innerHTML = '';
        renderBars(arr);
        while (Paused) {
            await sleep();
        }
        if(Stopped) {
            break;
        }
        
        await sleep(delay);
    }
    
    
}

async function visualizeShellSort(arr, delay) {
    Paused = false;
    Stopped = false;
    const container = document.getElementById('container');
    const n = arr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;

            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;

                container.innerHTML = '';
                renderBars(arr);
                
                await sleep(delay);
            }

            arr[j] = temp;

            container.innerHTML = '';
            renderBars(arr);
            while (Paused) {
                await sleep(5);
            }
            if (Stopped) {
                break;
            }
            await sleep(delay);
        }

        gap = Math.floor(gap / 2);
    }
}

async function visualizeSort(algorithm) {
    const delay = 100;

    if (!arrayShown) {
        showArray();
        arrayShown = true;
    }

    const container = document.getElementById('container');
    container.innerHTML = '';
    renderBars(array.slice(), container);

    switch (algorithm) {
        case 'insertionSort':
            await visualizeInsertionSort(array.slice(), delay);
            break;
        case 'selectionSort':
            await visualizeSelectionSort(array.slice(), delay);
            break;
        case 'bubbleSort':
            await visualizeBubbleSort(array.slice(), delay);
            break;
        case 'quickSort':
            await visualizeQuickSort(array.slice(), 0, array.length - 1, delay);
            break;
        case 'mergeSort':
            await visualizeMergeSort(array.slice(), 0, array.length - 1, delay);
            break;
        case 'shellSort':
            await visualizeShellSort(array.slice(), delay);
            break;
        default:
            console.error('Invalid algorithm');
    }
}
const arrayContainer = document.getElementById('arrayContainer');
const container = document.getElementById('container');

function showArray() {
    container.innerHTML = '';
    arrayContainer.innerHTML = '';
    renderBars(array.slice(), arrayContainer);
}

function renderBars(arr) {
    arrayContainer.innerHTML = '';
    
    for (let i = 0; i < arr.length; i++) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${arr[i] * 5}%`;
        container.appendChild(bar);
    }
}

function pauseAnimation() {
    Paused = true;
}

function resumeAnimation() {
    Paused = false;
}
function stopAnimation(){
    Stopped = true;
}