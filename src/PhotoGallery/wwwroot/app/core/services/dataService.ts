import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

    public _pageSize: number;
    public _baseUri: string;

    constructor(public http: Http) {

    }

    set(baseUri: string, pageSize?: number): void {
        this._baseUri = baseUri;
        this._pageSize = pageSize;
    }

    get(page: number) {
        var uri = this._baseUri + page.toString() + '/' + this._pageSize.toString();

        return this.http.get(uri)
            .map(response => (<Response>response));
    }

    post(data?: any, mapJson: boolean = true) {
        if (mapJson)
            return this.http.post(this._baseUri, data)
                .map(response => <any>(<Response>response).json());
        else
            return this.http.post(this._baseUri, data);
    }

    delete(id: number) {
        return this.http.delete(this._baseUri + '/' + id.toString())
            .map(response => <any>(<Response>response).json())
    }

    deleteResource(resource: string) {
        return this.http.delete(resource)
            .map(response => <any>(<Response>response).json())
    }
}