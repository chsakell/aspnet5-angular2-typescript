export class Paginated {
    public _page: number = 0;
    public _pagesCount: number = 0;
    public _totalCount: number = 0;

    constructor(page: number, pagesCount: number, totalCount: number) {
        this._page = page;
        this._pagesCount = pagesCount;
        this._totalCount = totalCount;
    }

    range(): Array<any> {
        if (!this._pagesCount) { return []; }
        var step = 2;
        var doubleStep = step * 2;
        var start = Math.max(0, this._page - step);
        var end = start + 1 + doubleStep;
        if (end > this._pagesCount) { end = this._pagesCount; }

        var ret = [];
        for (var i = start; i != end; ++i) {
            ret.push(i);
        }

        return ret;
    };

    pagePlus(count: number): number {
        return + this._page + count;
    }

    search(i): void {
        this._page = i;
    };
}