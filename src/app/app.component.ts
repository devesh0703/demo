import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'assingment';
  errorPopUp=true;
  errorFormMessage="";
  firstList=[{'id':1,'title':'firstlist','description':'first list descriptions'}]
  secondList=[{'id':1,'title':'secondlist','description':'second list descriptions'}]
  thirdList=[{'id':1,'title':'thirdlist','description':'third list descriptions'}]

  defaultList:string="";
  addModal:bootstrap.Modal | undefined
  editModal:bootstrap.Modal | undefined

  ngOnInit(): void{

    this.addModal = new bootstrap.Modal(document.getElementById('myModal')!) ;
    this.editModal = new bootstrap.Modal(document.getElementById('editModal')!) ;

    if(localStorage.getItem('firstList')){
      this.firstList = JSON.parse(localStorage.getItem('firstList')||'{}');
    }
    if(localStorage.getItem('secondList')){
    this.secondList = JSON.parse(localStorage.getItem('secondList')||'{}');
    }
    if(localStorage.getItem('thirdList')){
     this.thirdList = JSON.parse(localStorage.getItem('thirdList')||'{}');
    }
  }

drop(event:CdkDragDrop<any>){
  console.log(event)
  if(event.previousContainer == event.container){
    moveItemInArray(event.container.data,event.previousIndex,event.currentIndex);
  }
  else{
    transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
  }

 localStorage.setItem('firstList', JSON.stringify(this.firstList));
 localStorage.setItem('secondList', JSON.stringify(this.secondList));
 localStorage.setItem('thirdList', JSON.stringify(this.thirdList));

}

openModal(element:HTMLElement){
  this.addModal?.show()
}


save(){
  this.errorPopUp=true;
  let title=document.getElementById('title') as HTMLInputElement;
  let description=document.getElementById('description') as HTMLInputElement;
  let selectColumn =document.getElementById('column') as HTMLSelectElement;

  if(title?.value && description?.value){
  let res = /^[a-zA-Z]+$/.test(title?.value);
  if(!res){
    this.errorFormMessage += "Title should only contain alphabets.\n";
    this.errorPopUp = false;
  }
  if(description?.value?.length < 25){
    this.errorFormMessage += "Description should minimum 25 characters.\n";
    this.errorPopUp = false;
  }
  if(this.errorPopUp){
    let data = {'id':0,'title':title?.value,'description':description?.value};

    switch(selectColumn?.value){
      case 'firstlist': 
        data.id=this.firstList?.length;
        this.firstList.push(data);break;

      case 'secondlist':
        data.id=this.secondList?.length;
        this.secondList.push(data);break;

      case 'thirdlist':
        data.id=this.thirdList?.length;
        this.thirdList.push(data);break;
    }
    localStorage.setItem('firstList', JSON.stringify(this.firstList));
    localStorage.setItem('secondList', JSON.stringify(this.secondList));
    localStorage.setItem('thirdList', JSON.stringify(this.thirdList));
    title.value='';
    description.value='';
    selectColumn.value='firstlist';
  }
  }
  else{
    this.errorFormMessage="";
    this.errorFormMessage += "Title should only contain alphabets.\n";
    this.errorFormMessage += "Description should minimum 25 characters.\n";
    this.errorPopUp = false;
  }
  if(this.errorPopUp){
    this.addModal?.hide()
  }
}

editCards(title:string,description:string,dropdown:string){
  this.errorPopUp=true;
  let edittitle=document.getElementById('edittitle') as HTMLInputElement;
  let editdescription=document.getElementById('editdescription') as HTMLInputElement;
  let selectColumn =document.getElementById('editcolumn') as HTMLSelectElement;

  edittitle.value=title;
  editdescription.value=description;
  selectColumn.value=dropdown;
  this.defaultList=dropdown;
  this.editModal?.show();
}

editCardsSave(){
  this.errorPopUp=true;
  let title=document.getElementById('edittitle') as HTMLInputElement;
  let description=document.getElementById('editdescription') as HTMLInputElement;
  let selectColumn =document.getElementById('editcolumn') as HTMLSelectElement;

  if(title?.value && description?.value){
  let res = /^[a-zA-Z]+$/.test(title?.value);
  if(!res){
    this.errorFormMessage += "Title should only contain alphabets.\n";
    this.errorPopUp = false;
  }
  if(description?.value?.length < 25){
    this.errorFormMessage += "Description should minimum 25 characters.\n";
    this.errorPopUp = false;
  }
  if(this.errorPopUp){
    let data = {'id':0,'title':title?.value,'description':description?.value};

    let index=this.firstList.findIndex(a=>a.title == title?.value);

    if(this.defaultList == selectColumn.value){
      this.firstList[index].title=title.value;
      this.firstList[index].description=description.value;
    }
    else{
      let index;
      switch(this.defaultList){
      case 'firstlist':
        index=this.firstList.findIndex(a=>a.title == title?.value);
        this.firstList.splice(index,1);
        break;

      case 'secondlist':
        index=this.secondList.findIndex(a=>a.title == title?.value);
        this.secondList.splice(index,1);
        break;

      case 'thirdlist':
        index=this.thirdList.findIndex(a=>a.title == title?.value);
        this.thirdList.splice(index,1);
        break;;
    }

    switch(selectColumn?.value){
      case 'firstlist': 
        data.id=this.firstList?.length;
        this.firstList.push(data);break;

      case 'secondlist':
        data.id=this.secondList?.length;
        this.secondList.push(data);break;

      case 'thirdlist':
        data.id=this.thirdList?.length;
        this.thirdList.push(data);break;
    }

    }

    localStorage.setItem('firstList', JSON.stringify(this.firstList));
    localStorage.setItem('secondList', JSON.stringify(this.secondList));
    localStorage.setItem('thirdList', JSON.stringify(this.thirdList));

    title.value='';
    description.value='';
    selectColumn.value='firstlist';

  }
  }
  else{
    this.errorFormMessage="";
    this.errorFormMessage += "Title should only contain alphabets.\n";
    this.errorFormMessage += "Description should minimum 25 characters.\n";
    this.errorPopUp = false;
  }
  if(this.errorPopUp){
    this.editModal?.hide()
  }
  
}

deleteCard(){

  let title=document.getElementById('edittitle') as HTMLInputElement;

  let index;
  switch(this.defaultList){
    case 'firstlist':
      index=this.firstList.findIndex(a=>a.title == title?.value);
      this.firstList.splice(index,1);
      break;

    case 'secondlist':
      index=this.secondList.findIndex(a=>a.title == title?.value);
      this.secondList.splice(index,1);
      break;

    case 'thirdlist':
      index=this.thirdList.findIndex(a=>a.title == title?.value);
      this.thirdList.splice(index,1);
      break;;
    }
    
    localStorage.setItem('firstList', JSON.stringify(this.firstList));
    localStorage.setItem('secondList', JSON.stringify(this.secondList));
    localStorage.setItem('thirdList', JSON.stringify(this.thirdList));
    this.editModal?.hide();
}

}
