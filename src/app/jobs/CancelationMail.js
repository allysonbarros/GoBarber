import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class CancelationMail {
    get key() {
        return 'CancelationMail';
    }

    async handle({ data }) {
        const { appointment } = data;

        console.log('A fila executou!');

        await Mail.senddMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Agendamento cancelado',
            template: 'cancelation',
            context: {
              provider: appointment.provider.name,
              user: appointment.user.name,
              date: format(parseISO(appointment.date), "dd 'de' MMMM 'às' HH:mm'.'", {
                locale: pt,
              }),
            }
        });
    }
}

export default new CancelationMail();