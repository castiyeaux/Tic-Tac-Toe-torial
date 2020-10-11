import java.awt.*;

public class Square {
    private Position pos;
    private Color bgColor;
    private String symbol;

    public Square(int x, int y){
        this.symbol = "";
        this.pos = new Position(x,y);
        this.bgColor = Color.WHITE;

    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public void setBgColor(Color bgColor) {
        this.bgColor = bgColor;
    }

    public String getSymbol() {
        return symbol;
    }

    public Color getBgColor() {
        return bgColor;
    }

    public class Position{
        int x_pos,y_pos;
        public Position(int x , int y){
            this.x_pos = x;
            this.y_pos = y;

        }

        public int getX_pos() {
            return x_pos;
        }

        public int getY_pos() {
            return y_pos;
        }
    }
}
