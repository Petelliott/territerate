function landscape(canvas, variance, conditions) {
    this.context = canvas.getContext("2d");
    this.variance = variance || 150;
    this.conditions = conditions || [0, 0];
    this.arr = this.conditions;
    this.n = 0;


    this.displace = function() {
        var tmp = [this.arr[0]];
        for (var i = 1; i < this.arr.length; i++) {
            var avg = (this.arr[i] + this.arr[i - 1]) / 2
            var new_point = 2 * (this.variance / this.arr.length) * (Math.random() - .5);
            tmp.push(new_point + avg);
            tmp.push(this.arr[i]);
        }
        this.arr = tmp;
    };


    this.redraw = function() {
        var interval = this.context.canvas.width / (this.arr.length - 1);

        this.clear();

        this.context.beginPath();
        this.context.moveTo(0, this.context.canvas.height / 2 - this.arr[0]);
        for (var i = 1; i < this.arr.length; i++) {
            this.context.lineTo(i * interval, this.context.canvas.height / 2 - this.arr[i]);
        }
        this.context.stroke();
    };


    this.next = function() {
        if (this.n < 8) {
            this.displace();
            this.redraw();
        }
        this.n++;
    };


    this.clear = function() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    };
}
