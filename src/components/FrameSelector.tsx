
import { useCallback, useEffect, useState } from 'react'

import frame1 from '../../assets/frame1.png'
import frame2 from '../../assets/frame2.png'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const FRAMES: {[key: string]: string} = {
    white: frame1,
    green: frame2,
}

interface FrameSelectorProps {
    onChange: (frame?: string) => void
}

export const FrameSelector = (props: FrameSelectorProps) => {
    const { onChange } = props

    const [selectedFrame, setSelectedFrame] = useState<string>()

    const handleChange = useCallback((
        _event: React.MouseEvent<HTMLElement>,
        value: string | null,
    ) => {
        if (value === null) return

        setSelectedFrame(value)
    }, [])

    useEffect(() => {
        onChange(selectedFrame ? FRAMES?.[selectedFrame] : undefined)
    }, [selectedFrame])

    return (
        <ToggleButtonGroup
            color="primary"
            value={selectedFrame}
            exclusive
            onChange={handleChange}
            aria-label="select frame image"
            size="small"
        >
            <ToggleButton value="white" aria-label="white">
            하얀 프레임
            </ToggleButton>
            <ToggleButton value="green" aria-label="green">
            초록 프레임
            </ToggleButton>
      </ToggleButtonGroup>
    )
}