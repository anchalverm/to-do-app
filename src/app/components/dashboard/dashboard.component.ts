import { Component , OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  resultsArray: any[] = [];
   details:any;
   editObj: any = {};
  editvalue: boolean=false;
  constructor(private toastr: ToastrService, private http: HttpClient){}
ngOnInit(): void {
  this.fetchDataFromBackend();
}
fetchDataFromBackend() {
  this.http.get<any[]>('http://localhost:3000/api/get-data')
    .subscribe(
      (data) => {
        this.resultsArray = data;
      },
      (error) => {
        console.error('Error fetching data from the backend:', error);
      }
    );
}

submit(result:any){
console.log(result.value)
this.details=result.value;
if (!this.details.firstname) {
  this.toastr.error('Please enter a task');
  return;
}
if (this.editvalue==true) {
  if (this.editvalue) {
    console.log('Update task with ID:', this.editObj._id);
    const updatedTask = {
      firstname: this.details.firstname
    };
    this.http.put<any>(`http://localhost:3000/api/update-task/${this.editObj._id}`, updatedTask).subscribe(
      (data) => {
        console.log('Task updated:', data);
        this.fetchDataFromBackend(); 
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
   this.editObj = {};
   this.editvalue = false; 
 }
}
else {
  this.http.post<any>('http://localhost:3000/api/save-data', this.details)
    .subscribe(
      (data) => {
        console.log('Response from backend:', data);
        this.resultsArray.push(data);
        this.fetchDataFromBackend()
      },
      (error) => {
        console.error('Error saving data to the backend:', error);
      }
    );
}
result.resetForm();
}
 edit(obj: any) {
    console.log("Edit:", obj.firstname);
    if (!this.editObj.firstname) {
      this.editObj = { ...obj };
      this.editvalue=true
    }
    this.details.firstname = this.editObj.firstname;
    console.log("me",this.details.firstname)
    
  }

  delete(obj: any) {
    console.log('Delete:', obj.firstname);
    this.http.delete<any>(`http://localhost:3000/api/delete-task/${obj._id}`).subscribe(
      (data) => {
        console.log('Task deleted:', data);
        this.fetchDataFromBackend(); // Fetch data again to update the view
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }
    
  }






