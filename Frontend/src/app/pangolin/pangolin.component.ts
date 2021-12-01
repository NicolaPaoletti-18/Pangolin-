import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pangolin } from '../shared/pangolin';
import { PangolinService } from '../shared/pangolin.service';

declare const M : any; 

@Component({
  selector: 'app-pangolin',
  templateUrl: './pangolin.component.html',
  styleUrls: ['./pangolin.component.css'],
  providers: [PangolinService]
})
export class PangolinComponent implements OnInit {

  constructor( public pangolinService: PangolinService) { }

  ngOnInit() {
    this.resetForm();
    this.reFreshPangolinList();
  }

onSubmit(form: NgForm){
  if(form.value._id == ""){
  this.pangolinService.postPangolin(form.value).subscribe((res) => {
    this.resetForm(form); 
    this.reFreshPangolinList();
  });
  M.toast ({ html: 'Saved successfully', classes: 'rounded'}); 
}else{
  this.pangolinService.putPangolin(form.value).subscribe((res) => {
    this.resetForm(form); 
    this.reFreshPangolinList();
  });
  M.toast ({ html: 'Update successfully', classes: 'rounded'}); 
}}



  resetForm(form?: NgForm){
    if(form)
    form.reset();
    this.pangolinService.selectedPangolin = {
      _id:"",
      age: 0,
      famille:"",
      race:"",
      nourriture: ""
    }
  }
  reFreshPangolinList(){
    this.pangolinService.getPangolinList().subscribe((res) => {
      this.pangolinService.pangolin = res as Pangolin[]; 
    })
  }


  onEdit(pan: Pangolin) {
    this.pangolinService.selectedPangolin = pan; 
  }
  onDelete(_id: string, form: NgForm) {
    if(confirm('Are you ure to delete this record ? ') == true){
      this.pangolinService.deletePangolin(_id).subscribe((res) => {
        this.reFreshPangolinList();
        this.resetForm(form); 
        M.toast({ html: 'Deleted successfully', classes: 'rounded'});
      })
    }
  }
}


