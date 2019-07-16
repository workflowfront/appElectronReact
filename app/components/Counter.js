//       @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';
import {HotTable} from '@handsontable/react';
import moment from 'moment';

moment.locale('ru');
const TIME_FORMAT = "DD.MM.YYYY";
type Props = {
  data: object,
  shema: object
};
export default class Counter extends Component<Props> {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.dataFetch();
    this.props.shemaFetch();
  }

  render() {
    const {
      data,
      shema
    } = this.props;

    function parseShema(shema) {
      return shema.map((it, idx) => {
        return it.title
      })
    };

    function parseHelpFromShema(shema) {
      return shema.map((it, idx) => {
        let obj = {};
        obj['name'] = it.name;
        obj['type'] = it.type;
        return obj;
      })
    };

    function parseData(data, helperArr) {
      return data.map((it) => {
        let keys = Object.keys(it);
        return helperArr.map(itHelp => {
          let obj = {};
          if (keys.includes(itHelp.name)) {
            if (itHelp.type === 'date') {
              obj[itHelp.name] = moment(it[itHelp.name]).format(TIME_FORMAT);
            } else if (itHelp.type === 'currency') {
              obj[itHelp.name] = parseFloat(it[itHelp.name].sum).toFixed(1);
            } else if (itHelp.type === 'select') {
              if (Array.isArray(it[itHelp.name])) {
                obj[itHelp.name] = "<select  name='type'>" + it[itHelp.name].map(i => {
                  return "<option value=" + "'" + i.title + "'" + "selected>" + i.title + "</option>";
                }) + " </select>";
              } else {
                obj[itHelp.name] = "<select  name='type'>" + "<option value=" + "'" + it[itHelp.name].title
                  + "'" + "selected>" + it[itHelp.name].title
                  + "</option>" + " </select>";
              }
            } else {
              obj[itHelp.name] = it[itHelp.name]
            } ;
          } else {
            obj[itHelp.name] = '';
          };
          return obj;
        })
      });
    };

    function IsJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }

    let shemaData;
    let helperArr;
    let dataData;
    let columns;
    let colHeaders;
    let arr = [];
    if (IsJsonString(data) && IsJsonString(shema)) {
      shemaData = parseShema(JSON.parse(shema).fields);
      helperArr = parseHelpFromShema(JSON.parse(shema).fields);
      columns = (function (helperArrArg) {
        return helperArrArg.map((it) => {
          return {data: it.name, renderer: "html"}
        });
      })(helperArr);
      dataData = parseData(JSON.parse(data), helperArr);

      let objOuter = {};
      if (Array.isArray(dataData)) {
        dataData.forEach(i => {
          let objInner = {};
          i.forEach(it => {
            objInner = Object.assign({}, objInner, it)
          });
          objOuter = Object.assign({}, objOuter, objInner);
          arr.push(objOuter);
        });
      }
      ;
      colHeaders = helperArr.map(i => (i.name));

    }


    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x"/>
          </Link>
        </div>

        <div className={`counter ${styles.counter}`} data-tid="counter">
          {(arr && columns && colHeaders &&
            arr.length > 0 && columns.length > 0 && colHeaders.length > 0) ?
            <HotTable data={arr}
                      columns={columns}
                      colHeaders={colHeaders}
                      width="1000"
                      height="300"/> : null}
        </div>
        <div className={`counter ${styles.counter}`} data-tid="counter">
        </div>
      </div>);
  }
}

