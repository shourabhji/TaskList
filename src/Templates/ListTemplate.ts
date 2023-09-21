import FullList from "../models/FullList";

interface DomList {
    ul : HTMLElement,
    clear(): void,
    render(fullList:FullList): void
}

export default class ListTemplate implements DomList {

    ul: HTMLUListElement
    
    static instance : ListTemplate = new ListTemplate()

    private constructor() {
        this.ul = document.getElementById('TaskItems') as HTMLUListElement

    }

    clear(): void {
        this.ul.innerHTML = ''
    }
    render(fullList: FullList): void {
        this.clear()
        fullList.list.forEach(item => {
            const li = document.createElement('li') as HTMLLIElement
            li.className = "task flex justify-between flex-wrap overflow-clip w-5/6 m-auto p-4 bg-slate-700 rounded-sm my-2"
            
            const check = document.createElement('input') as HTMLInputElement

            check.id = item.id
            check.tabIndex = 0
            check.type = 'checkbox'
            check.checked =  item.checked
            li.append(check)

            const label = document.createElement('label') as HTMLLabelElement

            label.htmlFor = item.id
            label.textContent = item.item
            if (item.checked)
                label.className = "textdeco"
            else
                label.className = 'text-white'

          
            li.append(label)
            check.addEventListener('change', () => {
                item.checked = !item.checked
                if(item.checked)
                    label.className = "textdeco"
                else
                    label.className = 'text-white'
                fullList.save()
            })

            const button = document.createElement('button') as HTMLButtonElement

            button.className = ' bg-red-600 h-8 p-1 rounded-md text-white'

            button.textContent = 'Delete '
            li.append(button)

            button.addEventListener('click', () => {
                fullList.removeITem(item.id)
                this.render(fullList)
            })


            this.ul.append(li)

        })

    }
}