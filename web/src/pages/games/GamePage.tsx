import { IonContent, IonHeader, IonModal, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import { useEffect, useRef, useState } from 'react'
import { DndProvider, useDrag, useDrop, useDragLayer } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

interface Token {
  id: number
  left: number
  top: number
}

enum ItemTypes {
  TOKEN = 'token',
}

const DragSource: React.FC<Token> = ({ id, left, top }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TOKEN,
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, left, top])

  return drag(
    <div
      style={{
        position: 'absolute',
        top,
        left,
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: 'orange',
        cursor: 'grab'
      }}
    />
  )
}

const DropTarget: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([])

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.TOKEN,
      drop(item: Token, monitor) {
        const offset = monitor.getSourceClientOffset()
        if (!offset) return

        const newToken: Token = {
          id: Date.now(),
          left: offset.x,
          top: offset.y,
        }

        setTokens(prev => [...prev, newToken])
        return undefined
      },
    }),
    [],
  )

  return drop(
    <div style={{background: 'gray', width: '100%', height: '100vh'}}>
      {tokens.map((token) => <DragSource key={token.id} id={token.id} top={token.top} left={token.left} />)}
    </div>
  )
}

const layerStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 1000,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}

const getItemStyles = (initialOffset: any, currentOffset: any) => {
  if (!initialOffset || !currentOffset) {
    return { display: 'none' } as React.CSSProperties
  }

  const { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
    position: 'absolute',
  } as React.CSSProperties
}

const CustomDragLayer = ({ modalRef }: { modalRef: React.RefObject<HTMLIonModalElement> }) => {
  const {
    item,
    initialOffset,
    currentOffset,
    isDragging,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.setCurrentBreakpoint(isDragging ? 0.1 : 0.5)
    }
  }, [isDragging])

  if (!isDragging) {
    return null
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: 'orange',
          }}
        />
      </div>
    </div>
  )
}

export const GamePage: React.FC = () => {
  const modalRef = useRef<HTMLIonModalElement>(null as never)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <DndProvider backend={HTML5Backend} options={{enableMouseEvents: true, delay: 100}}>
          <DropTarget />
          <CustomDragLayer modalRef={modalRef} />
        <IonModal 
          ref={modalRef} 
          isOpen={true} 
          backdropBreakpoint={1} 
          initialBreakpoint={0.5} 
          breakpoints={[0.1, 0.5, 1]} 
          canDismiss={false}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modal</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent color='light'>
            <IonRow>
              {Array.from({ length: 15 }).map((_, i) =>
                <DragSource key={i} id={i} top={108 * Math.floor(i / 3)} left={108 * (i % 3)} />
              )}
            </IonRow>
            </IonContent>
          </IonModal>
        </DndProvider>
      </IonContent>
    </IonPage>
  )
}