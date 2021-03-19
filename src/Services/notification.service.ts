import { Notyf } from 'notyf';
import { errorsService } from './GlobalErrors.service'

class NotificationService {

    private notyf = new Notyf({ duration: 4000, ripple: true, position: { x: "left", y: "bottom" } });

    public success(message: string): void {
        this.notyf.success(message);
    }

    public error(err: any): void {

        this.notyf.error(errorsService.getError(err));
    }
}

export const notificationService = new NotificationService();
