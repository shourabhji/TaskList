import './css/style.css'
import FullList from './models/FullList'
import ListItem from './models/ListItem'
import ListTemplate from './Templates/ListTemplate'


const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance


  const itemEmptyForm = document.getElementById('inputEntryForm') as HTMLFormElement
  itemEmptyForm.addEventListener("submit", (e: SubmitEvent): void => {
    e.preventDefault()
    const input = document.getElementById("addText") as HTMLInputElement
    const newText: string = input.value.trim()
    if (!newText.length) return
    
    input.value = ''

  
    const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length -1].id ) -1 : 1
    
  
     

    const newItem = new ListItem(itemId.toString() , newText)

    fullList.addItem(newItem)

    template.render(fullList)

  })

    const clearItems = document.getElementById("clearItems") as HTMLButtonElement

    clearItems?.addEventListener("click", ():void => {
      fullList.clearList()
      template.clear()

    })
    fullList.load()
    template.render(fullList)
    
 

}


document.addEventListener("DOMContentLoaded",initApp)