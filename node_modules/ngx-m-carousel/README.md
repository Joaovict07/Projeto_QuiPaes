Simple and effective carousel library for angular

# Install
Run the below command to install ngx-m-carousel library

```npm i ngx-m-carousel```

# Importing

Import 'NgxMCarouselModule' into main module and add it to imports array

```
import { NgxMCarouselModule } from 'ngx-m-carousel';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxMCarouselModule
  ]
})
```

# Using ngx-m-carousel library


Add 'ngx-m-carousel' component to your html


```
<ngx-m-carousel 
  [images]="images" 
  [delay]="3000" 
  [height]="'100%'"
  [width]="'100%'"
  [pauseOnHover]="true"
  [indicators]="true"

  ></ngx-m-carousel>
```

Add your images to images array in your component.ts

```
export class AppComponent {

  title = 'testApp';
  
  images: String[] = ['./assets/image1.jpg','./assets/image2.jpg','./assets/image3.jpg','./assets/image4.jpg'];
}
//Also supports image url's
```

PROPERTIES

| Properties     | Type              | Default value | Description       |
| :------------: | :---------------:    | :-----------: | :---------------: |
| images      | String Array(String[])   | [ ]         | Array of string that contains path to the image                |
| delay       | number          |   3000         |         Time delay for each image          |
| height  | String          |    100%         | Height of the carousel. Supports all css formats of height value ex:700px,50%etc|
| width | String | 100% | Width of the carousel. Supports all css formats of width value ex: 700px, 50%etc |
| pauseOnHover | boolean | false | Pause when hover over the caousel |
| indicators | boolean | true | Show carousel indicators at the bottom |



# Thank me!
Thank you for downloading this library. If this library helps you or if you have any queries/suggestion please write it to my email ```haricshore@gmail.com```.

# Missing Features?
If you need any missing feature or if you have any complaint please write it to my email ```haricshore@gmail.com```.