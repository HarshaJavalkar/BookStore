import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { boolean } from 'joi';
import { DataService } from '../data.service';
declare var $: any;

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})

export class AddnewComponent implements OnInit {
  file:File; 
 username:string
 sendData
 toastMessage:string



  typeArray:Array<String>
   typeLanguage:Array<String>



   constructor(private ds: DataService,private router:Router ) { }

  addimage(event){
    this.file=event.target.files[0]
  }

// form data used to hold multimedia content
formData=new FormData()


  ngOnInit(): void {


    this.typeArray=["Adventure", "Biography", "Business", "Computing", "Crime", "Fiction", "Humour", "Politics", "Religion", "Romance", "Science"  ]

    this.typeLanguage=["English", "Hindi"]
  }

  
validity:boolean=false


dataArray:Array<any>

  addProd(ref){

    console.log(ref.status)
    if(ref.status=="VALID"){


        

      
    let localData=localStorage.getItem('username')

   ref.value.active=true

   ref.value.creator=localData
   this.dataArray=ref.value
   console.log("sent data",this.dataArray)
   let productObj=ref.value
   
   this.formData.append('photo',this.file,this.file.name)
   this.formData.append("productObj",JSON.stringify(productObj))






    
    this.ds.createProduct(this.formData).subscribe(
     
     res=>{
      console.log("response", res['message'])
     if(res['message']=="Product created successfully")
      

      this.toastMessage='Product created successfully'

      window.location.reload();




      // this.router.navigateByUrl(`/adminaccount/${localData}`)

     if(res['message']=="Product already exist"){
  
     
      this.toastMessage=res['message']

     } 

     },
     err=>{
       
      this.toastMessage='Something went wrong try after some time.'


     }



    ) 
      

   
 



        

    this.validity=false
    }
 else{
  
this.toastMessage="Please fill all the details"

   this.validity=true
 }

    
  }

}
