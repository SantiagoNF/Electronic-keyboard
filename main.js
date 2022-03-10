const keys = [
    [
        ['º', 'ª'],
        ['1', '!'],
        ['2', '"'],
        ['3', '#'],
        ['4', '$'],
        ['5', '%'],
        ['6', '&'],
        ['7', '/'],
        ['8', '('],
        ['9', ')'],
        ['0', '='],
        ["'", '?'],
        ['¡', '¿']
    ], // primera fila del teclado
    [
        ['q', 'Q'],
        ['w', 'W'],
        ['e', 'E'],
        ['r', 'R'],
        ['t', 'T'],
        ['y', 'Y'],
        ['u', 'U'],
        ['i', 'I'],
        ['o', 'O'],
        ['p', 'P'],
        ["`", '^'],
        ['+', '*']
    ],
    [
        ['MAYUS', 'MAYUS'],
        ['a', 'A'],
        ['s', 'S'],
        ['d', 'D'],
        ['f', 'F'],
        ['g', 'G'],
        ['h', 'H'],
        ['j', 'J'],
        ['k', 'K'],
        ['l', 'L'],
        ['ñ', 'Ñ'],
        ["'", '"'],
        ['Ç', 'ç']
    ],
    [
        ['SHIFT', 'SHIFT'],
        ['<', '>'],
        ['z', 'Z'],
        ['x', 'X'],
        ['c', 'C'],
        ['v', 'V'],
        ['b', 'B'],
        ['n', 'N'],
        ['m', 'M'],
        [',', ';'],
        ['.', ':'],
        ['-', '_'],
        ['SHIFT', 'SHIFT']
    ],
    [ ['SPACE', 'SPACE'] ] // ultima fila del teclado
];


let mayus = false
let shift = false
let current = null


function renderKeyboard() {
    const keyboardContainer = document.querySelector('#keyboard-container')
    let empty = `<div class="key-empty"></div>`
    
    const layer = keys.map((layer) => {
        return layer.map((key) => {
            if (key[0] === 'SHIFT') {
                return ` <button class="key key-shift  ${shift ? 'activated' : ' '}" >${key[0]} </button>`
            }
            if (key[0] === 'MAYUS') {
                return `<button class="key key-mayus ${mayus ? 'activated' : ' '} "> ${key[0]} </button>`
            }
            if (key[0] === 'SPACE') {
                return `<button class="key key-space"></button>`
            }
            return `<button class="key key-normal"> ${shift? key[1]: mayus && key[0].toLocaleLowerCase().charCodeAt(0) >= 97 && key[0].toLocaleLowerCase().charCodeAt(0) <= 122? key[1]: key[0]} </button>`
        })
    
    })

    layer[1].push(empty)
    layer[0].unshift(empty)

    const htmlLayers = layer.map((layer) => {
        return layer.join(' ')
    })

    keyboardContainer.innerHTML = ''
    console.log(layer.length)
    htmlLayers.forEach((layer) => {
        keyboardContainer.innerHTML += `<div class="layer"> ${layer} </div>`
    })

    document.querySelectorAll('.key').forEach((key) => {
        key.addEventListener('click', (e) => {
            if (current) {
                if (key.textContent.trim() === 'SHIFT'){
                    shift = !shift
                } else if (key.textContent.trim() === 'MAYUS') {
                    mayus = !mayus
                } else if (key.textContent === '') {
                    current.value += ' '
                } else {
                    current.value += key.textContent.trim()
                    if (shift) {
                        shift = false
                    }
                }
                renderKeyboard()
                current.focus()
            }
        })
    })
}

document.querySelectorAll('input').forEach((input) => {
    input.addEventListener('focusin', (e) => {
        current = e.target
    })
})

renderKeyboard()