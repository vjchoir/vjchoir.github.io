import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoadingService {
    
    private loadingUpdatesSource = new Subject<any>();
    loadingUpdates = this.loadingUpdatesSource.asObservable();
    
    constructor() {

    }

    setLoading(value: boolean) {
        console.log("Are we loading? " + value);
        this.loadingUpdatesSource.next(value);
    }
}