import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import { DisplayChart } from '../DisplayChart/DisplayChart';
import IdivItem from '../IdivItem/IdivItem';
import { IState } from '../../store';
import Select from 'react-select';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query {
  getMetrics
}
`;
interface optInt {
  value: string;
  label: string;
}
interface IMyObject {
  label: number;
  value: number;
}
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  dropdown: {
    minWidth: '400px',
    display: 'inline-flex',
    margin: '0 auto',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  flexcolumn: {
    flexDirection: 'column',
    display: 'flex',
  },
  spacing: {
    padding: theme.spacing(2),
    textAlign: 'center',
    minHeight: '340px',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    flex: '1',
  },
}));

interface Itate {
  selectedValue: IMyObject[];
}
export type lType = {
  getMetrics: any;
};
export interface myobj {
  [key: string]: any;
}
export interface Listarr {
  [index: number]: { label: string; value: string };
}

const getListDisplay = (state: IState) => {
  return state.listDisplay;
};

export default () => {
  return (
    <Provider value={client}>
      <List />
    </Provider>
  );
};
const List: React.FC = () => {
  const classes = useStyles();
  let [selectedValue, onSelected] = useState<simpleInt[]>([]);

  const dispatch = useDispatch();
  const listData: myobj = useSelector(getListDisplay);
  const opt: lType = listData.getMetrics;
  const optArr: string[] = opt.getMetrics;
  let optionsList: optInt[] = [];

  if (optArr) {
    optArr.forEach((item: any) => {
      optionsList.push({ label: item, value: item });
    });
  }

  type MyOption = { label: string; value: number };
  type MyOptionType = { label: string; value: number };
  interface simpleInt {
    label?: string | null;
    value?: string | null;
  }

  type simpleType = simpleInt[];

  const selectt = (val?: any) => {
    if (val) {
      let valuee: simpleInt[] = val;
      onSelected(valuee);
    } else {
      onSelected([]);
    }
  };

  type OptionType = { label: string; value: number };
  let listofEquipments = <Select options={optionsList} isMulti onChange={selectt} />;

  const [result] = useQuery({
    query,
  });
  const { data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.equipmentsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const getMetrics = data;
    dispatch(actions.equipmentsListDataRecevied(getMetrics));
  }, [dispatch, data, error]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container fixed>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12}>
            <Box textAlign="center">
              <Paper className={classes.dropdown}>{listofEquipments}</Paper>
            </Box>
          </Grid>
          {selectedValue.length > 0 ? (
            <Grid item xs={3}>
              {selectedValue.map((item, index) => {
                return (
                  <Grid item key={index} xs={12}>
                    <Paper className={classes.paper}>
                      <IdivItem selectedValue={item.value}></IdivItem>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          ) : null}
          {selectedValue.length > 0 ? (
            <Grid item xs={9} className={classes.flexcolumn}>
              <Paper className={classes.spacing}>
                <DisplayChart selectedValue={selectedValue}></DisplayChart>
              </Paper>
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </div>
  );
};
