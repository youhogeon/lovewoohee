
import { useCallback, useRef, useState } from 'react'

import html2canvas from 'html2canvas'

import { FrameSelector } from '../components/FrameSelector'
import { VideoCam, VideoCamState } from '../components/VideoCam'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'


const Home = () => {
    const imageBox = useRef<HTMLDivElement>(null)

    const [selectedFrame, setSelectedFrame] = useState<string>()
    const [error, setError] = useState<string | null>(null)
    const [selectedVideoSource, setSelectedVideoSource] = useState<number>(0)
    const [videoSources, setVideoSources] = useState<string[]>([])

    const [videoCapturedCount, setVideoCapturedCount] = useState<number>(0)

    const [captureFn, setCaptureFn] = useState<((delay: number) => void)[]>([])

    const handleChangeFrame = useCallback((
        value?: string,
    ) => {
        setSelectedFrame(value)
    }, [])

    const handleCameraError = useCallback((error: string) => {
        setError(error)
    }, [])

    const handleLoadCamera = useCallback((sources: string[], captureFn: (delay: number) => void) => {
        setVideoSources(sources)
        setCaptureFn(prev => [...prev, captureFn])
    }, [])

    const handleChangeCamera = useCallback(() => {
        if (videoSources.length === 0) return

        const index = selectedVideoSource
        const nextIndex = (index + 1) % videoSources.length

        setSelectedVideoSource(nextIndex)
    }, [selectedVideoSource, videoSources])


    const handleClickSave = useCallback(() => {
        const capture = imageBox.current

        if (capture === null) return

        html2canvas(capture).then(canvas => {
            const link = document.createElement('a')
            link.href = canvas.toDataURL('image/png')
            link.download = 'my_photo.png'
            link.click()
        })
    }, [])

    const handleUpdateState = useCallback((state: VideoCamState) => {
        setVideoCapturedCount(prev => {
            if (state === 'captured') {
                return prev + 1
            }

            if (state === 'ready') {
                return prev - 1
            }

            return prev
        })
    }, [])

    const handleClickAutoCapture = useCallback(() => {
        const delay = 10

        captureFn[0](delay)
        setTimeout(() => {
            window.scrollBy(0, 250)
            captureFn[1](delay)
            setTimeout(() => {
                window.scrollBy(0, 250)
                captureFn[2](delay)
                setTimeout(() => {
                    window.scrollBy(0, 250)
                    captureFn[3](delay)
                }, delay * 1000 + 2000)
            }, delay * 1000 + 2000)
        }, delay * 1000 + 2000)
    }, [captureFn])

    return (
        <>
            <Stack
                direction="row"
                justifyContent={videoSources.length > 1 ? 'space-between' : 'center'}
                width="100%"
            >
                <FrameSelector onChange={handleChangeFrame} />

                {
                    videoSources.length > 1 &&
                    <Button variant="outlined" onClick={handleChangeCamera}>
                        카메라 변경 ({selectedVideoSource + 1}/{videoSources.length})
                    </Button>
                }
            </Stack>

            {
                error !== null && (
                    <Alert severity="error">
                        카메라 연결 오류가 발생하였습니다.<br />
                        {error}
                    </Alert>
                )
            }

            {
                selectedFrame === undefined ? (
                    <Stack sx={{ width: '100%' }} spacing={4}>
                        <Alert severity="info">
                            사진 프레임을 선택해주세요.
                        </Alert>

                        <Paper sx={{ padding: 3 }}>
                            <Typography variant="h5" mb={3}>안내사항</Typography>

                            <ul style={{ paddingLeft: 24 }}>
                                <li>촬영된 사진은 <b>외부(서버)로 절대 전송되지 않습니다.</b> 모든 작업은 사용자의 기기에서 처리됩니다.</li>
                                <li>사진 프레임은 (주)서북의 소유입니다.</li>
                            </ul>
                        </Paper>
                    </Stack>
                ) : (
                    <>
                        <Button variant="contained" sx={{ width: '100%' }} onClick={handleClickAutoCapture}>자동 촬영</Button>

                        <Box
                            sx={{
                                position: 'relative'
                            }}
                            ref={imageBox}
                        >
                            <Box sx={{
                                backgroundImage: `url(${selectedFrame})`,
                                backgroundSize: 'cover',
                                position: 'relative',
                                width: '360px',
                                height: '1072px',
                                top: 0,
                                left: 0,
                                zIndex: 999,
                                pointerEvents: 'none'
                            }}>
                            </Box>

                            {
                                [58, 305, 552, 799].map((top, idx) => (
                                    <VideoCam
                                        key={idx}
                                        onError={handleCameraError}
                                        onLoad={handleLoadCamera}
                                        onUpdateState={handleUpdateState}
                                        videoSource={videoSources[selectedVideoSource]}
                                        top={top}
                                    />
                                ))
                            }
                        </Box>

                        <Button variant="contained" sx={{ width: '100%' }} onClick={handleClickSave} disabled={videoCapturedCount != 4}>사진 저장</Button>
                    </>

                )
            }
        </>
    )
}

export default Home