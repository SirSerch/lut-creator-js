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

        it('should create a HAL png file with canvas size zero if LUT size negative', () => {
            let lutSize = -1;
            const canvasZero = aCanvasWithSize(lutSize);
            const hald = new Hald(lutSize);
            const spyExportHald = jest.spyOn(hald as any,'exportHald')

            expect(() => hald.createHald(0)).not.toThrowError();
            expect(spyExportHald).toHaveBeenCalledWith(canvasZero, lutSize);
        });

        it.each([
            [20],
            [25],
            [64],
            [144], // very expensive
        ])
        ('should create the png file if LUT size is not zero (%d)', (lutSize: number) => {
            const aCanvasWithCalculatedSize = aCanvasWithSize(lutSize);
            const hald = new Hald(lutSize);
            const spyExportHald = jest.spyOn(hald as any,'exportHald')

            expect(() => hald.createHald(lutSize)).not.toThrowError();
            expect(spyExportHald).toHaveBeenCalledWith(aCanvasWithCalculatedSize, lutSize);
        });
    });
    describe('Export cube should generate a .cube file', () => {
        it('should not generate any cube file if the selected file has no changes', () => {
            const lutSize = 20;
            const hald = new Hald(lutSize);
            const spyLoadImage = jest.spyOn(hald as any,'loadImage')
            const spyGenerateCube = jest.spyOn(hald as any,'generateCube')
            expect(() => hald.exportCube()).not.toThrowError()
            expect(spyLoadImage).toBeCalledTimes(0)
            expect(spyGenerateCube).toBeCalledTimes(0)
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
