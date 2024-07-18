import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jon-details',
  templateUrl: './jon-details.component.html',
  styleUrls: ['./jon-details.component.css']
})
export class JonDetailsComponent {
  jobId: string | null = null;
  jobDetails: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.getJobDetails(this.jobId);
    }
  }
  
  getJobDetails(id: string) {
    this.http.get(`http://localhost:3000/api/jobs/${id}`).subscribe(
      (response: any) => {
        this.jobDetails = response.data;
      },
      (error) => {
        console.error('Error fetching job details:', error);
      }
    );
  }
}
