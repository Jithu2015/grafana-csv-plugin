import CsvDatasource from './datasource';
import DatasourceQueryCtrl from './query_ctrl';

class DatasourceConfigCtrl {
  constructor() {
    this.init();
  }

  init() {
    this.current.jsonData.encrypt = 'true';

    this.accessModes = [
      { text: 'Local', value: 'local' },
      { text: 'SFTP', value: 'sftp' },
    ];

    this.columnTypes = [
      { text: 'Text', value: 'text' },
      { text: 'Integer', value: 'integer' },
      { text: 'Real', value: 'real' },
      { text: 'Timestamp', value: 'timestamp' },
      { text: 'Date', value: 'date' },
    ];

    this.current.jsonData.accessMode = this.current.jsonData.accessMode || 'local';
    this.current.jsonData.filename = this.current.jsonData.filename || '';
    this.current.jsonData.csvDelimiter = this.current.jsonData.csvDelimiter || '';
    this.current.jsonData.csvComment = this.current.jsonData.csvComment || '';
    this.current.jsonData.csvTrimLeadingSpace = this.current.jsonData.csvTrimLeadingSpace || true;
    this.current.jsonData.sftpHost = this.current.jsonData.sftpHost || '';
    this.current.jsonData.sftpPort = this.current.jsonData.sftpPort || '';
    this.current.jsonData.sftpUser = this.current.jsonData.sftpUser || '';
    this.current.jsonData.sftpIgnoreHostKey = this.current.jsonData.sftpIgnoreHostKey || false;
    this.current.jsonData.sftpWorkingDir = this.current.jsonData.sftpWorkingDir || '';
    this.current.jsonData.columns = this.current.jsonData.columns || [];

    this.current.secureJsonData = this.current.secureJsonData || {};
    this.current.secureJsonData.sftpPassword = this.current.secureJsonData.sftpPassword || null;

    this.onPasswordReset = (event) => {
      event.preventDefault();
      this.current['sftpPassword'] = null;
      this.current.secureJsonFields['sftpPassword'] = false;
      this.current.secureJsonData = this.current.secureJsonData || {};
      this.current.secureJsonData['sftpPassword'] = '';
    };

    this.onPasswordChange = (event) => {
      this.current.secureJsonData =  this.current.secureJsonData || {};
      this.current.secureJsonData['sftpPassword'] = event.currentTarget.value;
    };
  }

  onFilenameUpdate() {
    this.current.url = this.current.jsonData.filename;
  }

  onSftpHostUpdate() {
    this.current.url = this.current.jsonData.sftpHost + '>' + this.current.jsonData.filename;
  }

  addColumn(evt) {
    evt.preventDefault();
    this.current.jsonData.columns.push({
      name: '',
      type: 'text',
    });
  }

  deleteColumn(rowIndex) {
    this.current.jsonData.columns.splice(rowIndex, 1);
  }
}
DatasourceConfigCtrl.templateUrl = 'partials/config.html';

class FileAnnotationsQueryCtrl {
  constructor() {
  }
}

export {
  CsvDatasource as Datasource,
  DatasourceQueryCtrl as QueryCtrl,
  DatasourceConfigCtrl as ConfigCtrl,
  FileAnnotationsQueryCtrl as AnnotationsQueryCtrl,
};
