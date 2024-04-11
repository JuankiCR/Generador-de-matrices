document.getElementById('generate').addEventListener('click', generateMatrix);

function generateMatrix() {
    const numRows = parseInt(document.getElementById('numRows').value, 10);
    const numCols = parseInt(document.getElementById('numCols').value, 10);
    const method = document.getElementById('method').value;

    let matrix;
    switch (method) {
        case '1':
            matrix = linearCongruentialMethod(numRows, numCols);
            break;
        case '2':
            matrix = laggedFibonacciMethod(numRows, numCols);
            break;
        case '3':
            matrix = linearFeedbackMethod(numRows, numCols);
            break;
        case '4':
            matrix = wichmannHillMethod(numRows, numCols);
            break;
        case '5':
            matrix = blumBlumShubMethod(numRows, numCols);
            break;
        default:
            alert('Método no válido');
            return;
    }

    displayMatrix(matrix);
}

function displayMatrix(matrix) {
    const output = document.getElementById('matrixOutput');
    output.innerHTML = '';
    matrix.forEach(row => {
        let rowDiv = document.createElement('div');
        row.forEach(col => {
            let cell = document.createElement('span');
            cell.textContent = col + ' ';
            rowDiv.appendChild(cell);
        });
        output.appendChild(rowDiv);
    });
}

// 1. Método lineal congruencial
function linearCongruentialMethod(rows, cols) {
    let matrix = [];
    let a = 1664525;
    let c = 1013904223;
    let m = Math.pow(2, 32);
    let seed = Date.now();

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            seed = (a * seed + c) % m;
            row.push(seed % 2);
        }
        matrix.push(row);
    }
    return matrix;
}

// 2. Método Lagged Fibonacci
function laggedFibonacciMethod(rows, cols) {
    let matrix = [];
    let lag = 7;
    let seeds = Array.from({ length: lag }, (_, i) => (Date.now() + i) % 100);

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let nextNumber = (seeds[j % lag] + seeds[(j + 1) % lag]) % 100;
            seeds[j % lag] = nextNumber;
            row.push(nextNumber % 2);
        }
        matrix.push(row);
    }
    return matrix;
}

// 3. Método Linear Feedback Shift Register (LFSR)
function linearFeedbackMethod(rows, cols) {
    let matrix = [];
    let lfsr = Date.now() % 255;
    let tap = 0x1C;

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let lsb = lfsr & 1;
            lfsr >>= 1;
            if (lsb === 1) {
                lfsr ^= tap;
            }
            row.push(lfsr % 2);
        }
        matrix.push(row);
    }
    return matrix;
}

// 4. Método Wichmann-Hill
function wichmannHillMethod(rows, cols) {
    let matrix = [];
    let s1 = Date.now() % 30000;
    let s2 = (Date.now() + 1) % 30000;
    let s3 = (Date.now() + 2) % 30000;

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            s1 = (171 * s1) % 30269;
            s2 = (172 * s2) % 30307;
            s3 = (170 * s3) % 30323;
            let r = (s1 / 30269.0 + s2 / 30307.0 + s3 / 30323.0) % 1.0;
            row.push(Math.round(r) % 2);
        }
        matrix.push(row);
    }
    return matrix;
}

// 5. Método Blum Blum Shub
function blumBlumShubMethod(rows, cols) {
    let matrix = [];
    let seed = Date.now();
    let M = 30011; // Elegir dos primos p y q para M = p*q

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            seed = (seed * seed) % M;
            row.push(seed % 2);
        }
        matrix.push(row);
    }
    return matrix;
}