const rewire = require("rewire")
const spawn_manager = rewire("./spawn_manager")
const spawn_viz = spawn_manager.__get__("spawn_viz")
// @ponicode
describe("spawn_manager.economic", () => {
    test("0", () => {
        let callFunction = () => {
            spawn_manager.economic()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("spawn_viz", () => {
    test("0", () => {
        let callFunction = () => {
            spawn_viz({ spawning: { name: "Anas" }, room: { visual: 7588892 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            spawn_viz({ spawning: { name: "Michael" }, room: { visual: 9876 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            spawn_viz({ spawning: { name: "Edmond" }, room: { visual: 7588892 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            spawn_viz({ spawning: { name: "Pierre Edouard" }, room: { visual: "c466a48309794261b64a4f02cfcc3d64" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            spawn_viz({ spawning: { name: "Pierre Edouard" }, room: { visual: 9876 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            spawn_viz({ spawning: { name: "" }, room: { visual: Infinity } })
        }
    
        expect(callFunction).not.toThrow()
    })
})
