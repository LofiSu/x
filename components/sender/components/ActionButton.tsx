import { Button, type ButtonProps } from 'antd';
import classNames from 'classnames';
import * as React from 'react';

export interface ActionButtonContextProps {
  prefixCls: string;
  onSend?: VoidFunction;
  onSendDisabled?: boolean;
  onClear?: VoidFunction;
  onClearDisabled?: boolean;
  onCancel?: VoidFunction;
  onCancelDisabled?: boolean;
}

export const ActionButtonContext = React.createContext<ActionButtonContextProps>(null!);

export interface ActionButtonProps extends ButtonProps {
  action: 'onSend' | 'onClear' | 'onCancel';
}

export default function ActionButton(props: ActionButtonProps) {
  const { className, action, onClick: outClick, ...restProps } = props;
  const context = React.useContext(ActionButtonContext);

  const onClick = context[action];
  const disabled = context[`${action}Disabled`];
  return (
    <Button
      type="text"
      disabled={disabled}
      {...restProps}
      onClick={(e) => {
        if (onClick) {
          onClick();
        }
        if (outClick) {
          outClick(e);
        }
      }}
      className={classNames(context.prefixCls, className)}
    />
  );
}