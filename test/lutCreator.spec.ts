import {Hald} from "../Hald";


describe('Lut Creator', () => {
    describe('Create Hal should generate a png file', () => {
        it('should create a HAL png file with canvas size zero if LUT size is zero', () => {
            let lutSize = 0;
            const canvasZero = aCanvasWithSize(lutSize);
            const hald = new Hald(lutSize);
            const spyExportHald = jest.spyOn(hald as any,'exportHald')

            expect(() => hald.createHald(0)).not.toThrowError();
            expect(spyExportHald).toHaveBeenCalledWith(canvasZero, lutSize);
        });

        it('should create the png file if lut size is not zero', () => {
            let lutSize = 20;
            const aCanvasWithCalculatedSize = aCanvasWithSize(lutSize);
            const hald = new Hald(lutSize);
            const spyExportHald = jest.spyOn(hald as any,'exportHald')

            expect(() => hald.createHald(lutSize)).not.toThrowError();
            expect(spyExportHald).toHaveBeenCalledWith(aCanvasWithCalculatedSize, lutSize);
        });
    });
});

// TODO move this logic to somewhere once the production code allows it
function aCanvasWithSize(lutSize: number) {
    const canvasSize = Math.round((lutSize ** 3) ** 0.5);
    const aCanvasWithCalculatedSize = document.createElement('canvas');
    aCanvasWithCalculatedSize.width = canvasSize;
    aCanvasWithCalculatedSize.height = canvasSize;
    return aCanvasWithCalculatedSize;
}
