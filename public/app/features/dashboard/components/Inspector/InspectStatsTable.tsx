import React from 'react';
import {
  FieldType,
  formattedValueToString,
  getDisplayProcessor,
  GrafanaTheme,
  QueryResultMetaStat,
  TimeZone,
} from '@grafana/data';
import { DashboardModel } from 'app/features/dashboard/state';
import { config } from 'app/core/config';
import { stylesFactory, useTheme } from '@grafana/ui';
import { css } from 'emotion';

interface InspectStatsTableProps {
  dashboard: DashboardModel;
  name: string;
  stats: QueryResultMetaStat[];
}
export const InspectStatsTable: React.FC<InspectStatsTableProps> = ({ dashboard, name, stats }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  if (!stats || !stats.length) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className="section-heading">{name}</div>
      <table className="filter-table width-30">
        <tbody>
          {stats.map((stat, index) => {
            return (
              <tr key={`${stat.displayName}-${index}`}>
                <td>{stat.displayName}</td>
                <td style={{ textAlign: 'right' }}>{formatStat(stat, dashboard.getTimezone())}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

function formatStat(stat: QueryResultMetaStat, timeZone?: TimeZone): string {
  const display = getDisplayProcessor({
    field: {
      type: FieldType.number,
      config: stat,
    },
    theme: config.theme,
    timeZone,
  });
  return formattedValueToString(display(stat.value));
}

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  return {
    wrapper: css`
      padding-bottom: ${theme.spacing.md};
    `,
  };
});
