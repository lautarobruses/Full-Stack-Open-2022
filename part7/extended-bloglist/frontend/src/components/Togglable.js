import { useState, useImperativeHandle, forwardRef } from 'react'

import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '', margin: 5 }
    const showWhenVisible = { display: visible ? '' : 'none', margin: 5 }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <>
            <div style={hideWhenVisible}>
                <Button variant='info' onClick={toggleVisibility} >
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button variant='outline-danger' onClick={toggleVisibility} >
                    Cancel
                </Button>
            </div>
        </>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable
