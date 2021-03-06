import { ToastrService } from 'ngx-toastr';
import { ColorService } from './../../services/colorService/color.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup |any ; 
  constructor(private colorService:ColorService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }
  createColorForm(){
    this.colorAddForm=this.formBuilder.group({
     name:['',Validators.required]
    })
  }
  ngOnInit(): void {
    this.createColorForm();
  }
  addColor(){
    
    if(this.colorAddForm?.valid){
      let colorModel=Object.assign({},this.colorAddForm.value);
      this.colorService.addColor(colorModel).subscribe((response)=>{
        this.toastrService.success(response.message,"Başarılı")
      },(responseError)=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Doğrulama hatası")}       
        }
      })  
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }


}
