import { Button as RelumeButton } from '@relume_io/relume-ui';

const Button = ({ children, variant, ...props }: { children: React.ReactNode, variant?: 'primary' | 'secondary', [key: string]: any }) => {
        
    if (!variant) {
        variant = 'primary';
    }
    
    return (
        <RelumeButton className={`button bg-${variant}`} {...props}>
            {children}
        </RelumeButton>
    )
}

export default Button;