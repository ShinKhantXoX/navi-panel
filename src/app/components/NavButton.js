import { Button } from "@mantine/core"

export const NavButton = ({label, click, disabled, color=null}) => {

    return(
        <Button
            color={color}
            variant="outline"
            onClick={() => click()}
            compact
            disabled={disabled}
        > 
        {label} 
    </Button>
    )
} 