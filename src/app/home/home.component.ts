import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DndDropEvent,DropEffect} from 'ngx-drag-drop';
import { field, value } from '../global.model';
import { SwalService } from '../shared/swal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  // default value
  value:value={
    label:"",
    value:""
  };

  // when submit input 
  success = false;

  // input -  field prop
  fieldModels:Array<field>=[
    {
      "type": "text",
      "icon": "fa-font",
      "label": "Text / نص",
      "description": "Enter your name",
      "placeholder": "Enter your name",
      "className": "form-control",
      "subtype": "text",
      "regex" : "",
      "handle":true
    },
    {
      "type": "email",
      "icon": "fa-envelope",
      "required": true,
      "label": "Email  / ايميل",
      "description": "Enter your email",
      "placeholder": "Enter your email",
      "className": "form-control",
      "subtype": "text",
      "regex" : "^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$",
      "errorText": "Please enter a valid email",
      "handle":true
    },
    {
      "type": "phone",
      "icon": "fa-phone",
      "label": "Phone / الموبايل",
      "description": "Enter your phone ",
      "placeholder": "Enter your phone",
      "className": "form-control",
      "subtype": "text",
      "regex" : "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$",
      "errorText": "Please enter a valid phone number",
      "handle":true
    },
    {
      "type": "number",
      "label": "Number / رقم",
      "icon": "fa-sort-numeric-desc",
      "description": "Age",
      "placeholder": "Enter your age",
      "className": "form-control",
      "value": "20",
      "min": 12,
      "max": 90
    },
    {
      "type": "date",
      "icon":"fa-calendar",
      "label": "Date / التاريخ",
      "placeholder": "Date",
      "className": "form-control"
    },
    {
      "type": "datetime-local",
      "icon":"fa-calendar",
      "label": "DateTime / التاريخ  الوقت",
      "placeholder": "Date Time",
      "className": "form-control"
    },
    {
      "type": "textarea",
      "icon":"fa-text-width",
      "label": "Textarea  / رسالة" 
    },
    {
      "type": "paragraph",
      "icon": "fa-paragraph",
      "label": "Paragraph / براجراف",
      "placeholder": "Type your text to display here only" 
    },
    {
      "type": "checkbox",
      "required": true,
      "label": "Checkbox / حدد ",
      "icon":"fa-list",
      "description": "Checkbox",
      "inline": true,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "radio ",
      "icon":"fa-list-ul",
      "label": "Radio / حدد ",
      "description": "Radio boxes",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "autocomplete",
      "icon":"fa-bars",
      "label": "Select / اختر",
      "description": "Select",
      "placeholder": "Select",
      "className": "form-control",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        },
        {
          "label": "Option 3",
          "value": "option-3"
        }
      ]
    },
    {
      "type": "file",
      "icon":"fa-file",
      "label": "File Upload / ارفق ملف",
      "className": "form-control",
      "subtype": "file"
    },
    {
      "type": "button ",
      "icon":"fa-paper-plane",
      "subtype": "submit / اضغط",
      "label": "Submit"
    }
  ];


  
  // result of form 
  modelFields:Array<field>=[];
  model:any = {
    theme:{
      bgColor:"ffffff",
      textColor:"555555",
      bannerImage:""
    },
    attributes:this.modelFields
  };

  report = false;
  reports:any = [];

  

  constructor(
    // spinner service
    private spinner: NgxSpinnerService,

    // swl services
     private swalService: SwalService
    
  ) { }



  ngOnInit(): void {

    // spinner loader
    this.spinner.show()
    setTimeout(()=>{
      this.spinner.hide();
    },3000)
  
  }
 // ngx-drag-drop method
   onDragged( item:any, list:any[], effect:DropEffect ) {
    if( effect === "move" ) {
      const index = list.indexOf( item );
      list.splice( index, 1 );
    }
  }
      
 // ngx-drag-drop method
  onDrop( event:DndDropEvent, list?:any[] ) {
    if( list && (event.dropEffect === "copy" || event.dropEffect === "move") ) {
      
      if(event.dropEffect === "copy")
      event.data.name = event.data.type+'-'+new Date().getTime();
      let index = event.index;
      if( typeof index === "undefined" ) {
        index = list.length;
      }
      list.splice( index, 0, event.data );
    }
  }

  // add value method 
  addValue(values){
    values.push(this.value);
    this.value={label:"",value:""};
  }

   // delete input by index
   removeField(i){
    this.swalService.showRemoveConfirmation(i).then(
      result => {
        if (result.value) {
               this.model.attributes.splice(i,1);
              this.swalService.Notifier(' Done ');
              
        }
            },
            err => {
              let errorMessage = err.message || '   Error   ';
              this.swalService.NotifierError(errorMessage)
            }
          )
        
    

  }
// create forms unputs
  formBuilder(){
    let input = new FormData;
    input.append('id',this.model._id);
    input.append('name',this.model.name);
    input.append('description',this.model.description);
    input.append('bannerImage',this.model.theme.bannerImage);
    input.append('bgColor',this.model.theme.bgColor);
    input.append('textColor',this.model.theme.textColor);
    input.append('attributes',JSON.stringify(this.model.attributes));

  }

// save form inputs
  saveInput(){
    this.report = true; 
    let input = {
      id:this.model._id
    }
  }



  toggleValue(item){
    item.selected = !item.selected;
  }

  // save input 
  submit(){
    let valid = true;
    let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
    validationArray.reverse().forEach(field => {
      console.log(field.label+'=>'+field.required+"=>"+field.value);
      if(field.required && !field.value && field.type != 'checkbox'){
        // swal('Error','Please enter '+field.label,'error');
        valid = false;
        return false;
      }
      if(field.required && field.regex){
        let regex = new RegExp(field.regex);
        if(regex.test(field.value) == false){
          // swal('Error',field.errorText,'error');
          valid = false;
          return false;
        }
      }
      if(field.required && field.type == 'checkbox'){
        if(field.values.filter(r=>r.selected).length == 0){
          // swal('Error','Please enterrr '+field.label,'error');
          valid = false;
          return false;
        }

      }
    });
    if(!valid){
      return false;
    }
    console.log('Save',this.model);
    let input = new FormData;
    input.append('formId',this.model._id);
    input.append('attributes',JSON.stringify(this.model.attributes))
  }


}
