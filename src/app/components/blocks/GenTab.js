import Generator from './Generator'
import Favorites from "./Favorites";
import EmotionButtons from '../EmotionButtons'
export default function GenTab({ select }) {

    return (
        <div className='max-w-6xl'>
            {
                select === 1 ?
                    <div>
                        <div className='pb-32'>
                            <EmotionButtons />
                        </div>
                        <div>
                            <Generator />
                        </div>
                    </div> : ''
            }
            {
                select === 2 ? <div> <Favorites /> </div> : ''
            }
        </div>
    )
}