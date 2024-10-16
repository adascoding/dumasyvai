// Function to generate a random string
const generateRandomString = (stringLength) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let result = '';
    for (let i = 0; i < stringLength; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result; 
};

// Function to generate an array of random strings without duplicates
const generateRandomArray = (arrayLength) => {
    const array = [];
    let randomElement;
    while (array.length < arrayLength) {
        randomElement = generateRandomString(Math.floor(Math.random() * 10) + 5); // String length between 5-14
        if (array.indexOf(randomElement) === -1) { // Ensure no duplicates
            array.push(randomElement);
        }
    }
    return array;
};

// Function to shuffle an array (Fisher-Yates shuffle algorithm)
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
};

// Function to generate two arrays with one common element
const generateTwoArraysWithOneCommonElement = (arrayLength) => {
    const array1 = generateRandomArray(arrayLength);
    const array2 = generateRandomArray(arrayLength);

    // Generate a common random string
    let commonElement = generateRandomString(Math.floor(Math.random() * 10) + 5);

    // Add the common element to both arrays
    array1.push(commonElement);
    array2.push(commonElement);

    // Shuffle both arrays
    const shuffledArray1 = shuffleArray(array1);
    const shuffledArray2 = shuffleArray(array2);

    return { array1: shuffledArray1, array2: shuffledArray2, commonElement };
};

// Algorithm 1: Brute-force algorithm
const findCommonElementBruteForce = (array1, array2) => {
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if (array1[i] === array2[j]) {
                return array1[i]; // Return the first matching element found
            }
        }
    }
    return null;
};

// Algorithm 2: Using includes()
const findCommonElementUsingIncludes = (array1, array2) => {
    for (let el of array1) {
        if (array2.includes(el)) {
            return el;
        }
    }
    return null;
};

// Merge Sort Function
const mergeSort = (array) => {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, middle));
    const right = mergeSort(array.slice(middle));

    return merge(left, right);
};

// Merge Helper Function
const merge = (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};

// Binary Search Helper Function
const binarySearch = (array, target) => {
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (array[mid] === target) {
            return true;
        } else if (array[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return false;
};

// Algorithm 3: Find common element using merge sort and binary search
const findCommonElementUsingBinarySearch = (array1, array2) => {
    const sortedArray1 = mergeSort(array1);
    for (let el of array2) {
        if (binarySearch(sortedArray1, el)) {
            return el;
        }
    }
    return null;
};

// Algorithm 4: Find common element using built-in sort and binary search
const findCommonElementUsingSortAndBinarySearch = (array1, array2) => {
    // Sorting with built-in sort method (alphabetically)
    const sortedArray1 = array1.sort(); 
    for (let el of array2) {
        if (binarySearch(sortedArray1, el)) {
            return el;
        }
    }
    return null;
};

// Performance Test Function
const testAlgorithms = () => {
    const { array1, array2, commonElement } = generateTwoArraysWithOneCommonElement(10000);
    console.time('Brute-force Algorithm');
    const resultBruteForce = findCommonElementBruteForce(array1, array2);
    console.timeEnd('Brute-force Algorithm');
    console.log('Common element (Brute-force):', resultBruteForce);
    
    console.time('Includes Algorithm');
    const resultIncludes = findCommonElementUsingIncludes(array1, array2);
    console.timeEnd('Includes Algorithm');
    console.log('Common element (Includes):', resultIncludes);
    
    console.time('Merge Sort and Binary Search Algorithm');
    const resultBinarySearch = findCommonElementUsingBinarySearch(array1, array2);
    console.timeEnd('Merge Sort and Binary Search Algorithm');
    console.log('Common element (Binary Search):', resultBinarySearch);
    
    console.time('Built-in Sort and Binary Search Algorithm');
    const resultBinarySearch2 = findCommonElementUsingSortAndBinarySearch(array1, array2);
    console.timeEnd('Built-in Sort and Binary Search Algorithm');
    console.log('Common element (Binary Search with Built-in Sort):', resultBinarySearch2);
};

// Run the test
testAlgorithms();
