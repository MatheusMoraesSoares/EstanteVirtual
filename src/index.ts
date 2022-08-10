import { app } from './controller/app'
import { atletaRouter } from './routes/atletaRouter'
import { competicaoRouter } from './routes/competicaoRouter'

app.use('/competicao', competicaoRouter)
app.use('/atleta', atletaRouter)