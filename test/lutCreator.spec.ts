import {Hald} from "../Hald";


describe('Lut Creator', () => {
    describe('Create Hal should generate a png file', () => {
        it('should create a HAL png file with canvas size zero if LUT size is zero', () => {
            let lutSize = 0;
            const canvasZero = aCanvasWithSize(lutSize);
            const hald = new Hald();
            const spyExportHald = jest.spyOn(hald as any,'exportHald')

            expect(() => hald.createHald(lutSize)).not.toThrowError();
            expect(spyExportHald).toHaveBeenCalledWith(canvasZero, lutSize);
        });

        it('should create a HAL png file with canvas size zero if LUT size negative', () => {
            let lutSize = -1;
            const canvasZero = aCanvasWithSize(lutSize);
            const hald = new Hald();
            const spyExportHald = jest.spyOn(hald as any,'exportHald')

            expect(() => hald.createHald(lutSize)).not.toThrowError();
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
            const hald = new Hald();
            const spyExportHald = jest.spyOn(hald as any,'exportHald')

            expect(() => hald.createHald(lutSize)).not.toThrowError();
            expect(spyExportHald).toHaveBeenCalledWith(aCanvasWithCalculatedSize, lutSize);
        });
    });
    describe('Export cube should generate a .cube file', () => {
        it('should not generate any cube file if the selected file has no changes', () => {
            const lutSize = 20;
            const hald = new Hald();
            const spyLoadImage = jest.spyOn(hald as any,'loadImage')
            const spyGenerateCube = jest.spyOn(hald as any,'generateCube')
            expect(() => hald.exportCube()).not.toThrowError()
            expect(spyLoadImage).toBeCalledTimes(0)
            expect(spyGenerateCube).toBeCalledTimes(0)
        });
        it('should generate cube file if we select a file', () => {
            const lutSize = 20;
            const hald = new Hald();

            const spyLoadImage = jest.spyOn(hald as any,'loadImage')
            const spyGenerateCube = jest.spyOn(hald as any,'generateCube')

            // TODO fix production code to be able to test
            expect(() => {
                const event = new Event('change')
                document.dispatchEvent(event)

                hald.exportCube()
            }).not.toThrowError()

            expect(spyLoadImage).toBeCalledTimes(1)
            expect(spyGenerateCube).toBeCalledTimes(1)
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
