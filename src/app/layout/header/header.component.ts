import { Component, AfterViewInit, ViewChild, ChangeDetectorRef,OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NewsService } from 'src/app/Services/news.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements AfterViewInit,  OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  articles: any = [];
  sources: any = [];
  selectedNewsChannel: string="Top 10 Trending News!";

  constructor(private observer: BreakpointObserver,private cd : ChangeDetectorRef, private newsApi: NewsService) { }

   ngAfterViewInit(): void {
    this.sidenav.opened = true;
    this.observer.observe(['(max-width:767px)'])
    .subscribe((res)=>{
      if(res?.matches){
        this.sidenav.mode= "over";
        this.sidenav.close();
      }else{
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    })
    this.cd.detectChanges();
   }

  searchSource(source:any){
    this.newsApi.getArticlesByID(source.id)
      .subscribe((res: any) => {
      this.selectedNewsChannel = source.name
      this.articles = res.articles;
    })
  }

   ngOnInit(): void {
    this.newsApi.initArticles().subscribe((res:any)=>{
      console.log(res);
      this.articles = res.articles;
    })
    this.newsApi.initSources().subscribe((res:any)=>{
      console.log(res);
      this.sources = res.sources;
    })
  }

}
