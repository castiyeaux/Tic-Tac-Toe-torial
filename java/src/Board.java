import java.util.ArrayList;

public class Board {

    ArrayList<Square> squares;

    public Board(){
        squares = new ArrayList<Square>();
        for(int i=0;i<3;i++){
            for(int j=0;j<3;j++){
                squares.add(new Square(i,j));
            }
        }
    }

    public ArrayList<Square> getSquares() {
        return squares;
    }
}
