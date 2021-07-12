import {Injectable} from '@angular/core';
import path from 'path';
import {AppService, LoggerLevel} from './app.service';
import {FileService} from './file.service';
import {ExecuteService} from './execute.service';
import {environment} from '../../environments/environment';
import {LeappBaseError} from "../errors/leapp-base-error";

@Injectable({
  providedIn: 'root'
})
export class DaemonService {

  constructor(
    private appService: AppService,
    private fileService: FileService,
    private executeService: ExecuteService) {

  }

  async launchDaemon() {

    // Calling leapp-daemon
    let daemonPath = path.join(this.appService.getProcess().resourcesPath, 'extraResources').substring(1);

    if (!environment.production) {
      daemonPath = `./src/assets/extraResources`;
    }

    const daemonFile = daemonPath + '/leapp_daemon';

    try {
      if (this.fileService.exists(daemonFile)) {
        const result = await this.executeService.executeAbsolute(`${daemonPath}/./leapp_daemonZ`);
      }
    } catch(err) {
      throw new LeappBaseError('Daemon Error', this, LoggerLevel.warn, err);
    }
  }
}
