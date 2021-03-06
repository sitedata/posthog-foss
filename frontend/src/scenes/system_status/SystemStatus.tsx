import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Alert, Table } from 'antd'
import { systemStatusLogic } from './systemStatusLogic'
import { useValues } from 'kea'

const columns = [
    {
        title: 'Metric',
        dataIndex: 'metric',
    },
    {
        title: 'Value',
        dataIndex: 'value',
    },
]

export const SystemStatus = hot(_Status)
function _Status(): JSX.Element {
    const { systemStatus, systemStatusLoading, error } = useValues(systemStatusLogic)
    return (
        <div>
            <h1 className="page-header">System Status</h1>
            <p style={{ maxWidth: 600 }}>
                <i>Here you can find all the critical runtime details about your PostHog installation.</i>
            </p>
            <br />
            {error && (
                <Alert
                    message={error.detail || <span>Something went wrong. Please try again or contact us.</span>}
                    type="error"
                />
            )}
            <br />
            <Table
                data-attr="system-status-table"
                size="small"
                rowKey={(item): string => item.metric}
                pagination={{ pageSize: 99999, hideOnSinglePage: true }}
                rowClassName="cursor-pointer"
                dataSource={systemStatus}
                columns={columns}
                loading={systemStatusLoading}
            />
        </div>
    )
}
