window.addEventListener('load', () => {
    const deleteBtn = document.querySelectorAll('.delete-btn')
    
    deleteBtn.forEach((btn, index) => {
        const modal = document.querySelectorAll('.modal')
        const cancelarBtn = modal[index].querySelector('span')
        btn.addEventListener('click', () => {
            modal[index].classList.add('-active')
            console.log(index)
        })
        
        cancelarBtn.addEventListener('click', () => {
            modal[index].classList.remove('-active')
        })
    })
})