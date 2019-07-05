import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector:'app-header',
    templateUrl: './header.Component.html',
    styles: ['./headerComponent.css']
})
export class HeaderComponent{

    @Output()
    feature = new EventEmitter<string>();

    onSelect(menu: string){
        console.log(menu);
        this.feature.emit(menu);
    }
}