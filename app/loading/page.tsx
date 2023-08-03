import { LoadingComponent } from '@/components/Loading/Loading'
import css from './page.module.css'

export default function Loading(): JSX.Element {
  return (
    <div className={css.wrapper}>
      <LoadingComponent />
    </div>
  )
}